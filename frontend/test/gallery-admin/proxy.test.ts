// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';
const mocks=vi.hoisted(()=>({getCookie:vi.fn(),redirect:vi.fn()}));
vi.mock('next/headers',()=>({cookies:async()=>({get:mocks.getCookie})}));
vi.mock('next/navigation',()=>({redirect:mocks.redirect,notFound:()=>{throw new Error('NOT_FOUND')}}));
import { galleryProxy, allowedRoute } from '../../src/lib/gallery-admin/proxy';
import { apiBaseUrl, requireGalleryAdmin, tokenLifetime } from '../../src/lib/gallery-admin/server';
import { albumId, one } from './fixtures';
function token(exp=Math.floor(Date.now()/1000)+900){return `test.${Buffer.from(JSON.stringify({exp})).toString('base64url')}.signature`;}
function request(path:string,method='GET',body?:unknown,origin='http://localhost:3000',jwt=token()){
 return new NextRequest(`http://localhost:3000/api/gallery-admin/${path}`,{method,headers:{Origin:origin,'Content-Type':'application/json',Cookie:`dmc-gallery-admin=${jwt}`},...(method!=='GET'?{body:JSON.stringify(body??{})}:{})});
}
const fetcher=vi.fn();
beforeEach(()=>{vi.stubGlobal('fetch',fetcher);fetcher.mockReset();vi.stubEnv('NODE_ENV','test');vi.stubEnv('GALLERY_ADMIN_ORIGIN','http://localhost:3000');vi.stubEnv('GALLERY_API_BASE_URL','http://127.0.0.1:4000');mocks.getCookie.mockReset();mocks.redirect.mockImplementation(()=>{throw new Error('REDIRECT')});});
afterEach(()=>{vi.unstubAllEnvs();vi.unstubAllGlobals();});
describe('server-only admin proxy security',()=>{
 it('sets a short-lived HttpOnly session and never returns the access token',async()=>{
  const jwt=token();fetcher.mockResolvedValueOnce(Response.json({accessToken:jwt})).mockResolvedValueOnce(Response.json({id:'admin',email:'admin@example.test',role:'ADMIN'}));
  const result=await galleryProxy(request('login','POST',{email:'admin@example.test',password:'not-a-real-password'}),['login']);
  expect(result.status).toBe(200);expect(result.headers.get('set-cookie')).toContain('HttpOnly');expect(result.headers.get('set-cookie')).toContain('SameSite=strict');
  expect(await result.text()).not.toContain(jwt);
 });
 it('uses Secure and the host-only cookie prefix in production',async()=>{
  vi.stubEnv('NODE_ENV','production');fetcher.mockResolvedValueOnce(Response.json({accessToken:token()})).mockResolvedValueOnce(Response.json({id:'admin',role:'ADMIN'}));
  const result=await galleryProxy(request('login','POST',{}),['login']);const cookie=result.headers.get('set-cookie')!;
  expect(cookie).toContain('__Host-dmc-gallery-admin');expect(cookie).toContain('Secure');expect(cookie).not.toContain('Domain=');
 });
 it.each(['https://attacker.example','null',''])('rejects a CSRF/login-CSRF origin: %s',async(origin)=>{
  const result=await galleryProxy(request('login','POST',{},origin),['login']);expect(result.status).toBe(403);expect(fetcher).not.toHaveBeenCalled();
 });
 it('rejects missing and expired session cookies before forwarding',async()=>{
  const result=await galleryProxy(request('albums','GET',undefined,undefined,token(1)),['albums']);expect(result.status).toBe(401);expect(result.headers.get('set-cookie')).toContain('Max-Age=0');expect(fetcher).not.toHaveBeenCalled();
 });
 it('clears a session rejected by Nest and sanitizes backend errors',async()=>{
  fetcher.mockResolvedValueOnce(Response.json({message:'raw private ARN, token, and SQL'},{status:401}));
  const result=await galleryProxy(request('albums'),['albums']);expect(result.status).toBe(401);expect(result.headers.get('set-cookie')).toContain('Max-Age=0');expect(await result.text()).not.toContain('SQL');
 });
 it('preserves authorization failures without exposing AWS details',async()=>{
  fetcher.mockResolvedValueOnce(Response.json({message:'arn:aws:secret'},{status:403}));
  const result=await galleryProxy(request('albums'),['albums']);expect(result.status).toBe(403);expect(await result.text()).not.toContain('arn:');
 });
 it('allows only explicit API operations and blocks traversal or arbitrary upstream URLs',()=>{
  expect(allowedRoute('PUT',['albums',albumId,'cover'])).toBe(`admin/albums/${albumId}/cover`);
  expect(allowedRoute('POST',['photos',one,'process'])).toBe(`admin/photos/${one}/process`);
  expect(allowedRoute('POST',['albums','..','publish'])).toBeNull();expect(allowedRoute('GET',['https://attacker.example'])).toBeNull();
 });
 it('forwards JSON metadata and JWT only to the configured backend',async()=>{
  fetcher.mockResolvedValueOnce(Response.json({id:albumId},{status:201}));
  const body={title:'New album',slug:'new-album'};
  expect((await galleryProxy(request('albums','POST',body),['albums'])).status).toBe(201);
  expect(fetcher.mock.calls[0][0]).toBe('http://127.0.0.1:4000/api/admin/albums');expect(fetcher.mock.calls[0][1].body).toBe(JSON.stringify(body));expect(fetcher.mock.calls[0][1].redirect).toBe('error');
 });
 it('rejects large bodies rather than proxying image uploads',async()=>{
  const result=await galleryProxy(request('albums','POST',{data:'x'.repeat(33000)}),['albums']);expect(result.status).toBe(400);expect(fetcher).not.toHaveBeenCalled();
 });
 it('streams authorized previews without exposing a staging URL',async()=>{
  fetcher.mockResolvedValueOnce(new Response('webp',{headers:{'Content-Type':'image/webp'}}));
  const result=await galleryProxy(request(`photos/${one}/preview`),['photos',one,'preview']);expect(result.status).toBe(200);expect(result.headers.get('cache-control')).toContain('no-store');expect(result.headers.has('location')).toBe(false);expect(await result.text()).toBe('webp');
 });
 it('requires same-origin POST logout and expires the cookie',async()=>{
  fetcher.mockResolvedValueOnce(Response.json({ok:true}));
  const result=await galleryProxy(request('logout','POST',{}),['logout']);expect(result.status).toBe(200);expect(result.headers.get('set-cookie')).toContain('Max-Age=0');
  expect(fetcher.mock.calls[0][0]).toBe('http://127.0.0.1:4000/api/auth/logout');
 });
 it('clears the local session and reports an unconfirmed server revocation on outage',async()=>{
  fetcher.mockRejectedValueOnce(new Error('network down'));
  const result=await galleryProxy(request('logout','POST'),['logout']);expect(result.status).toBe(503);expect(result.headers.get('set-cookie')).toContain('Max-Age=0');
 });
 it('rejects content types that only start with application/json',async()=>{
  const req=request('albums','POST',{});req.headers.set('content-type','application/jsonp');
  expect((await galleryProxy(req,['albums'])).status).toBe(400);expect(fetcher).not.toHaveBeenCalled();
 });
 it('passes a bounded retry interval without backend error details',async()=>{
  fetcher.mockResolvedValueOnce(Response.json({message:'private'},{status:429,headers:{'Retry-After':'900'}}));
  const result=await galleryProxy(request('login','POST'),['login']);expect(result.status).toBe(429);expect(result.headers.get('retry-after')).toBe('900');expect(await result.text()).not.toContain('private');
 });
 it('fails closed for unsafe API configuration and token lifetimes',()=>{
  vi.stubEnv('GALLERY_API_BASE_URL','http://attacker.example');expect(()=>apiBaseUrl()).toThrow();expect(tokenLifetime('invalid')).toBe(0);expect(tokenLifetime(token(1))).toBe(0);
 });
 it('protects server-rendered routes with a backend check, not cookie presence alone',async()=>{
  mocks.getCookie.mockReturnValue({value:token()});fetcher.mockResolvedValueOnce(Response.json({message:'expired'},{status:401}));
  await expect(requireGalleryAdmin()).rejects.toThrow('REDIRECT');expect(mocks.redirect).toHaveBeenCalledWith('/gallery-admin/login?expired=1');
 });
});
