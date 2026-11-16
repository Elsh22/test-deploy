import { describe, expect, it, vi } from 'vitest';
import { GalleryApiError } from '../../src/lib/gallery-admin/client';
import { runPhotoUpload, UploadTransferError, validatePhotoFile, type UploadTask } from '../../src/lib/gallery-admin/upload';
import { canPublish, movePhoto } from '../../src/lib/gallery-admin/types';
import { album, albumId, one, photo, two } from './fixtures';
function task(name='one.webp'): UploadTask { return { id: crypto.randomUUID(), requestId: crypto.randomUUID(), albumId,
 name, mimeType:'image/webp', sizeBytes:5, file:new File(['bytes'],name,{type:'image/webp'}), phase:'queued', progress:0 }; }
function transport(id=one) {
 return { api:vi.fn(async(path:string):Promise<any> => path.endsWith('/uploads') ? {
  photoId:id, status:'PENDING', method:'PUT', uploadUrl:`https://dmc-gallery-staging-2026.s3.us-east-2.amazonaws.com/uploads/${albumId}/${id}.webp?signature=test`,
  headers:{'Content-Type':'image/webp','If-None-Match':'*'},
 } : {photoId:id,status:path.endsWith('/complete')?'UPLOADED':'PROCESSED'}), put:vi.fn(async()=>undefined) };
}
describe('retry-safe direct upload workflow',()=>{
 it('uploads and processes multiple photographs independently',async()=>{
  const first=transport(),second=transport(two);
  const a=await runPhotoUpload(task(),first,vi.fn()),b=await runPhotoUpload(task('two.webp'),second,vi.fn());
  expect([a.phase,b.phase]).toEqual(['processed','processed']);
  expect(first.put).toHaveBeenCalledOnce(); expect(second.put).toHaveBeenCalledOnce();
  expect(first.api.mock.calls.map(([path])=>path)).toEqual([`albums/${albumId}/uploads`,`photos/${one}/complete`,`photos/${one}/process`]);
 });
 it('checks an ambiguous failed PUT before retrying, avoiding another upload',async()=>{
  const io=transport();io.put.mockRejectedValueOnce(new UploadTransferError(0));
  const failed=await runPhotoUpload(task(),io,vi.fn()); expect(failed.phase).toBe('error');expect(failed.photoId).toBe(one);
  const retried=await runPhotoUpload(failed,io,vi.fn());expect(retried.phase).toBe('processed');
  expect(io.put).toHaveBeenCalledOnce();expect(io.api.mock.calls.filter(([path])=>path.endsWith('/uploads'))).toHaveLength(1);
 });
 it('renews a missing upload with the same idempotency identity and photo key',async()=>{
  const io=transport();const original=task();io.put.mockRejectedValueOnce(new UploadTransferError(0));
  const failed=await runPhotoUpload(original,io,vi.fn());
  const normal=io.api.getMockImplementation()!;let probe=true;
  io.api.mockImplementation(async path=>{if(path.endsWith('/complete')&&probe){probe=false;throw new GalleryApiError(409,'Upload missing');}return normal(path);});
  const retried=await runPhotoUpload(failed,io,vi.fn());expect(retried.phase).toBe('processed');expect(retried.photoId).toBe(one);
  const bodies=io.api.mock.calls.filter(([path])=>path.endsWith('/uploads')) as unknown as Array<[string,string,{requestId:string}]>;
  expect(bodies.map(call=>call[2].requestId)).toEqual([original.requestId,original.requestId]);
 });
 it('retries processing without requesting another upload or PUT',async()=>{
  const io=transport();const normal=io.api.getMockImplementation()!;let fail=true;
  io.api.mockImplementation(async path=>{if(path.endsWith('/process')&&fail){fail=false;throw new GalleryApiError(503,'Busy');}return normal(path);});
  const failed=await runPhotoUpload(task(),io,vi.fn());expect(failed.completed).toBe(true);
  expect((await runPhotoUpload(failed,io,vi.fn())).phase).toBe('processed');expect(io.put).toHaveBeenCalledOnce();
 });
 it('preserves identity after a lost presign response',async()=>{
  const io=transport(),initial=task();io.api.mockRejectedValueOnce(new GalleryApiError(503,'Unavailable'));
  const failed=await runPhotoUpload(initial,io,vi.fn());expect(failed.requestId).toBe(initial.requestId);
  await runPhotoUpload(failed,io,vi.fn());
  expect((io.api.mock.calls[0] as unknown as any[])[2].requestId).toBe((io.api.mock.calls[1] as unknown as any[])[2].requestId);
 });
 it('handles an S3 412 by verifying the existing object',async()=>{
  const io=transport();io.put.mockRejectedValueOnce(new UploadTransferError(412));
  expect((await runPhotoUpload(task(),io,vi.fn())).phase).toBe('processed');
 });
 it('never sends a file to an untrusted upload destination',async()=>{
  const io=transport();io.api.mockResolvedValueOnce({photoId:one,status:'PENDING',method:'PUT',uploadUrl:'https://attacker.example/upload',headers:{'Content-Type':'image/webp','If-None-Match':'*'}});
  expect((await runPhotoUpload(task(),io,vi.fn())).phase).toBe('error');expect(io.put).not.toHaveBeenCalled();
 });
 it('propagates an expired session so the queue pauses for reauthentication',async()=>{
  const io=transport();io.api.mockRejectedValueOnce(new GalleryApiError(401,'Sign in again'));
  await expect(runPhotoUpload(task(),io,vi.fn())).rejects.toMatchObject({status:401});expect(io.put).not.toHaveBeenCalled();
 });
 it('validates type, extension, and size before requests',()=>{
  expect(validatePhotoFile(new File(['x'],'image.svg',{type:'image/svg+xml'}))).toBeTruthy();
  expect(validatePhotoFile(new File([new Uint8Array(10*1024*1024+1)],'image.png',{type:'image/png'}))).toBeTruthy();
  expect(validatePhotoFile(new File(['x'],'image.png',{type:'image/png'}))).toBeNull();
 });
});
describe('album management rules',()=>{
 it('permits only a non-empty processed selection containing exactly one cover',()=>{
  expect(canPublish(album(),[one,two])).toBe(true);expect(canPublish(album(),[])).toBe(false);
  expect(canPublish(album({photos:[photo(one,{status:'PENDING'})]}),[one])).toBe(false);
  expect(canPublish(album({photos:[photo(one,{isCover:false})]}),[one])).toBe(false);
  expect(canPublish(album({status:'ARCHIVED'}),[one])).toBe(false);
 });
 it('reorders without adding/removing or mutating photographs',()=>{
  const photos=album().photos;expect(movePhoto(photos,two,0).map(p=>p.id)).toEqual([two,one]);expect(photos[0].id).toBe(one);
 });
});
