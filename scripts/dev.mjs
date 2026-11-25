import './build.mjs';
import {createServer} from 'node:http';
import {createReadStream,existsSync,statSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import handler from '../api/chat.mjs';
const root=fileURLToPath(new URL('../',import.meta.url));
if(existsSync(path.join(root,'.env.local')))process.loadEnvFile(path.join(root,'.env.local'));
const dist=path.join(root,'dist');
const types={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.mp4':'video/mp4','.webp':'image/webp','.jpg':'image/jpeg','.jpeg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml','.ico':'image/x-icon','.woff2':'font/woff2'};
createServer(async(req,res)=>{
 try{
  const url=new URL(req.url,'http://localhost'); if(url.pathname==='/api/chat')return await handler(req,res);
  const file=path.resolve(dist,'.'+decodeURIComponent(url.pathname==='/'?'/index.html':url.pathname));
  if(!file.startsWith(dist+path.sep)||!existsSync(file)||!statSync(file).isFile()){res.writeHead(404);return res.end('Not found');}
  const size=statSync(file).size; const type=types[path.extname(file)]||'application/octet-stream';
  const range=req.headers.range?.match(/^bytes=(\d+)-(\d*)$/);
  if(range){const start=Number(range[1]),end=Math.min(range[2]?Number(range[2]):size-1,size-1);if(start>end){res.writeHead(416,{'Content-Range':`bytes */${size}`});return res.end();}res.writeHead(206,{'Content-Type':type,'Content-Length':end-start+1,'Content-Range':`bytes ${start}-${end}/${size}`,'Accept-Ranges':'bytes'});return createReadStream(file,{start,end}).pipe(res);}
  res.writeHead(200,{'Content-Type':type,'Content-Length':size,'Accept-Ranges':'bytes'});createReadStream(file).pipe(res);
 }catch{res.writeHead(500);res.end('Local server error');}
}).listen(3000,'127.0.0.1',()=>console.log('Open http://localhost:3000'));
