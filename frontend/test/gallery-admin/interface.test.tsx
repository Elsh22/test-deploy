import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
const mocks=vi.hoisted(()=>({api:vi.fn(),put:vi.fn(),push:vi.fn(),replace:vi.fn(),refresh:vi.fn()}));
vi.mock('next/navigation',()=>({useRouter:()=>({push:mocks.push,replace:mocks.replace,refresh:mocks.refresh})}));
vi.mock('@/lib/gallery-admin/client',async(original)=>({...await original<typeof import('@/lib/gallery-admin/client')>(),galleryApi:mocks.api}));
vi.mock('@/lib/gallery-admin/upload',async(original)=>({...await original<typeof import('@/lib/gallery-admin/upload')>(),directPut:mocks.put}));
import { GalleryApiError } from '../../src/lib/gallery-admin/client';
import { UploadTransferError } from '../../src/lib/gallery-admin/upload';
import LoginForm from '../../src/components/GalleryAdmin/LoginForm';
import Dashboard from '../../src/components/GalleryAdmin/Dashboard';
import AlbumForm from '../../src/components/GalleryAdmin/AlbumForm';
import AlbumEditor from '../../src/components/GalleryAdmin/AlbumEditor';
import UploadQueue from '../../src/components/GalleryAdmin/UploadQueue';
import SessionControls from '../../src/components/GalleryAdmin/SessionControls';
import { album, albumId, one, photo, two } from './fixtures';
beforeEach(()=>{vi.resetAllMocks();mocks.api.mockResolvedValue({});mocks.put.mockResolvedValue(undefined);});
describe('administrator interface',()=>{
 it('shows an unconfirmed server revocation rather than claiming successful logout',async()=>{
  const user=userEvent.setup();mocks.api.mockRejectedValueOnce(new GalleryApiError(503,'Browser session cleared. Server revocation could not be confirmed.'));
  render(<SessionControls email="admin@example.test"/>);await user.click(screen.getByRole('button',{name:'Sign out'}));
  await waitFor(()=>expect(screen.getByRole('alert').textContent).toContain('revocation could not be confirmed'));
  expect(mocks.replace).not.toHaveBeenCalled();
 });
 it('signs in without storing credentials and ignores untrusted redirects',async()=>{
  const user=userEvent.setup();const storage=vi.spyOn(Storage.prototype,'setItem');mocks.api.mockResolvedValue({redirect:'https://attacker.example'});
  render(<LoginForm expired={false}/>);await user.type(screen.getByLabelText('Email'),'admin@example.test');await user.type(screen.getByLabelText('Password'),'test-password');
  await user.click(screen.getByRole('button',{name:'Sign in'}));
  await waitFor(()=>expect(mocks.replace).toHaveBeenCalledWith('/gallery-admin'));expect(storage).not.toHaveBeenCalled();storage.mockRestore();
 });
 it('explains expired sessions without inventing a refresh flow',()=>{
  render(<LoginForm expired/>);expect(screen.getByRole('status').textContent).toContain('Sign in again');expect(screen.queryByText(/register/i)).toBeNull();
 });
 it('creates albums using the real API contract',async()=>{
  const user=userEvent.setup();mocks.api.mockResolvedValue(album());render(<Dashboard albums={[]}/>);
  fireEvent.click(screen.getByText('Create album',{selector:'summary'}));await user.type(screen.getByLabelText('Title'),'New event');
  const form=screen.getByLabelText('Title').closest('form')!;await user.click(within(form).getByRole('button',{name:'Create album'}));
  await waitFor(()=>expect(mocks.api).toHaveBeenCalledWith('albums','POST',expect.objectContaining({title:'New event',slug:'new-event'})));
  expect(mocks.push).toHaveBeenCalledWith(`/gallery-admin/albums/${albumId}`);
 });
 it('edits metadata according to the published slug rule',async()=>{
  const user=userEvent.setup(),save=vi.fn().mockResolvedValue(undefined);render(<AlbumForm album={album({status:'PUBLISHED'})} onSave={save}/>);
  expect((screen.getByLabelText(/Album slug/) as HTMLInputElement).disabled).toBe(true);
  await user.clear(screen.getByLabelText('Title'));await user.type(screen.getByLabelText('Title'),'Edited title');
  await user.click(screen.getByRole('button',{name:'Save details'}));await waitFor(()=>expect(save).toHaveBeenCalledWith(expect.objectContaining({title:'Edited title'})));
  expect(save.mock.calls[0][0]).not.toHaveProperty('slug');
 });
 it('renders actual covers and status filters from API data',async()=>{
  const user=userEvent.setup();render(<Dashboard albums={[album(),album({id:two,title:'Historical',status:'ARCHIVED'})]}/>);
  expect(screen.getAllByRole('article')).toHaveLength(2);expect(screen.getAllByRole('img')[0].getAttribute('src')).toContain('/api/gallery-admin/photos/');
  await user.click(screen.getByRole('button',{name:'Archived'}));expect(screen.getAllByRole('article')).toHaveLength(1);expect(screen.getByRole('heading',{name:'Historical'})).toBeTruthy();
 });
 it('provides accessible ordering controls and saves the complete order',async()=>{
  const user=userEvent.setup();mocks.api.mockImplementation(async(path:string)=>path===`albums/${albumId}`?album({photos:[photo(two),photo()]}):{});
  render(<AlbumEditor initialAlbum={album()}/>);await user.click(screen.getByRole('button',{name:'Move two.webp earlier'}));
  await waitFor(()=>expect(mocks.api).toHaveBeenCalledWith(`albums/${albumId}/photos/order`,'PUT',{photoIds:[two,one]}));
 });
 it('saves cover selection using the existing protected endpoint',async()=>{
  const user=userEvent.setup();mocks.api.mockImplementation(async(path:string)=>path===`albums/${albumId}`?album({photos:[photo(one,{isCover:false}),photo(two,{isCover:true})]}):{});
  render(<AlbumEditor initialAlbum={album()}/>);await user.click(within(screen.getByRole('article',{name:'Photograph two.webp'})).getByRole('button',{name:'Set cover'}));
  await waitFor(()=>expect(mocks.api).toHaveBeenCalledWith(`albums/${albumId}/cover`,'PUT',{photoId:two}));
 });
 it('disables publication when the required cover is not processed',()=>{
  render(<AlbumEditor initialAlbum={album({photos:[photo(one,{status:'PENDING'})]})}/>);
  expect((screen.getByRole('button',{name:'Review publication'}) as HTMLButtonElement).disabled).toBe(true);
 });
 it('requires publication confirmation and supports archival without deletion',async()=>{
  const user=userEvent.setup();mocks.api.mockImplementation(async(path:string)=>album({status:path.endsWith('/archive')?'ARCHIVED':'PUBLISHED'}));
  render(<AlbumEditor initialAlbum={album()}/>);await user.click(screen.getByRole('button',{name:'Review publication'}));expect(mocks.api).not.toHaveBeenCalled();
  await user.click(within(screen.getByRole('dialog')).getByRole('button',{name:'Publish album'}));
  await waitFor(()=>expect(mocks.api).toHaveBeenCalledWith(`albums/${albumId}/publish`,'POST',{photoIds:[one,two]}));
  await waitFor(()=>expect(screen.queryByRole('dialog')).toBeNull());await user.click(screen.getByRole('button',{name:'Archive album'}));
  await user.click(within(screen.getByRole('dialog')).getByRole('button',{name:'Archive album'}));
  await waitFor(()=>expect(mocks.api).toHaveBeenCalledWith(`albums/${albumId}/archive`,'POST',{}));
 });
 it('shows authorization failures and redirects expired sessions safely',async()=>{
  const user=userEvent.setup();mocks.api.mockRejectedValueOnce(new GalleryApiError(403,'You do not have permission.'));
  render(<AlbumEditor initialAlbum={album()}/>);let button=within(screen.getByRole('article',{name:'Photograph two.webp'})).getByRole('button',{name:'Set cover'});
  await user.click(button);await waitFor(()=>expect(screen.getByRole('alert').textContent).toContain('permission'));
  mocks.api.mockRejectedValueOnce(new GalleryApiError(401,'Sign in again'));
  await user.click(button);await waitFor(()=>expect(mocks.replace).toHaveBeenCalledWith('/gallery-admin/login?expired=1'));
 });
});
function setupUploads(){
 mocks.api.mockImplementation(async(path:string,_method:string,body:any)=>{
  if(path.endsWith('/uploads')){const id=body.filename==='one.webp'?one:two;return {photoId:id,status:'PENDING',method:'PUT',uploadUrl:`https://dmc-gallery-staging-2026.s3.us-east-2.amazonaws.com/uploads/${albumId}/${id}.webp?sig=test`,headers:{'Content-Type':'image/webp','If-None-Match':'*'}};}
  return {status:path.endsWith('/complete')?'UPLOADED':'PROCESSED'};
 });
 render(<UploadQueue album={album({photos:[]})} onRefresh={vi.fn().mockResolvedValue(undefined)} onBusy={vi.fn()} onExpired={vi.fn()}/>);
}
describe('bulk upload interface',()=>{
 it('uploads multiple selected photographs and reports each completed result',async()=>{
  const user=userEvent.setup();setupUploads();
  await user.upload(screen.getByLabelText(/Choose photographs or drop them here/),[new File(['bytes'],'one.webp',{type:'image/webp'}),new File(['bytes'],'two.webp',{type:'image/webp'})]);
  await user.click(screen.getByRole('button',{name:'Upload queued photos'}));await waitFor(()=>expect(screen.getAllByText('Ready')).toHaveLength(2));expect(mocks.put).toHaveBeenCalledTimes(2);
 });
 it('offers per-file retry without duplicating a possibly successful upload',async()=>{
  const user=userEvent.setup();setupUploads();mocks.put.mockRejectedValueOnce(new UploadTransferError(0));
  await user.upload(screen.getByLabelText(/Choose photographs or drop them here/),new File(['bytes'],'one.webp',{type:'image/webp'}));
  await user.click(screen.getByRole('button',{name:'Upload queued photos'}));await waitFor(()=>expect(screen.getByRole('button',{name:'Retry one.webp'})).toBeTruthy());
  await user.click(screen.getByRole('button',{name:'Retry one.webp'}));await waitFor(()=>expect(screen.getByText('Ready')).toBeTruthy());expect(mocks.put).toHaveBeenCalledOnce();
 });
 it('rejects a batch larger than twenty before any requests',()=>{
  setupUploads();fireEvent.change(screen.getByLabelText(/Choose photographs or drop them here/),{target:{files:Array.from({length:21},(_,i)=>new File(['x'],`${i}.webp`,{type:'image/webp'}))}});
  expect(screen.getByRole('alert').textContent).toContain('20 photographs');expect(mocks.api).not.toHaveBeenCalled();
 });
});

it('blocks publication until queued uploads are completed or explicitly dismissed',async()=>{
 const user=userEvent.setup();render(<AlbumEditor initialAlbum={album()}/>);
 const review=screen.getByRole('button',{name:'Review publication'}) as HTMLButtonElement;expect(review.disabled).toBe(false);
 await user.upload(screen.getByLabelText(/Choose photographs or drop them here/),new File(['bytes'],'new.webp',{type:'image/webp'}));
 await waitFor(()=>expect(review.disabled).toBe(true));
 await user.click(screen.getByRole('button',{name:'Remove new.webp from queue'}));await waitFor(()=>expect(review.disabled).toBe(false));
});
it('accepts multiple dropped files without starting an upload before confirmation',()=>{
 setupUploads();const zone=screen.getByLabelText(/Choose photographs or drop them here/).closest('label')!;
 fireEvent.drop(zone,{dataTransfer:{files:[new File(['bytes'],'one.webp',{type:'image/webp'}),new File(['bytes'],'two.webp',{type:'image/webp'})]}});
 expect(screen.getAllByText('Queued')).toHaveLength(2);expect(mocks.api).not.toHaveBeenCalled();
});
