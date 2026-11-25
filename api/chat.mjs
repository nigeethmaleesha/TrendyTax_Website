import {answerQuestion} from '../lib/chat.mjs';
// Best-effort instance-local limits; use a distributed limiter / WAF before public launch.
const hits=new Map();
function limited(ip){const now=Date.now(); for(const [key,val] of hits) if(val.until<now) hits.delete(key); if(hits.size>=5000&&!hits.has(ip)) return true; const h=hits.get(ip)||{n:0,until:now+60000};h.n++;hits.set(ip,h);return h.n>8;}
const errorMessages={NOT_CONFIGURED:'The AI assistant is not configured yet. Please contact our team.',QUOTA:'The assistant has reached its temporary usage limit. Please try again later or contact our team.',PROVIDER_ERROR:'The AI assistant is temporarily unavailable. Please try again or contact our team.'};
export default async function handler(req,res){
  res.setHeader('Cache-Control','no-store'); res.setHeader('Content-Type','application/json; charset=utf-8');
  const send=(status,data)=>{res.statusCode=status;res.end(JSON.stringify(data));};
  if(req.method!=='POST'){res.setHeader('Allow','POST');return send(405,{error:'Use POST.'});}
  const origin=req.headers.origin; if(origin){try{if(new URL(origin).host!==req.headers.host)return send(403,{error:'Request not allowed.'});}catch{return send(403,{error:'Request not allowed.'});}}
  if(!String(req.headers['content-type']||'').startsWith('application/json'))return send(415,{error:'Expected JSON.'});
  try{
    let body=req.body;
    if(body===undefined){let raw='';for await(const chunk of req){raw+=chunk;if(raw.length>12000)return send(413,{error:'Request too large.'});}body=JSON.parse(raw);}
    if(typeof body==='string')body=JSON.parse(body);
    if(!body||typeof body.message!=='string'||!body.message.trim()||body.message.length>600)return send(400,{error:'Please enter a question of 1–600 characters.'});
    const history=body.history??[];if(!Array.isArray(history)||history.length>3||history.some(x=>typeof x!=='string'||x.length>600))return send(400,{error:'Invalid conversation history.'});
    const ip=String(req.headers['x-real-ip']||req.headers['x-forwarded-for']||req.socket?.remoteAddress||'unknown').split(',')[0].trim();
    if(limited(ip))return send(429,{error:'Too many questions. Please wait a minute.'});
    return send(200,await answerQuestion(body.message.trim(),history));
  }catch(err){if(err instanceof SyntaxError)return send(400,{error:'Invalid JSON.'});return send(err.status||503,{error:errorMessages[err.code]||errorMessages.PROVIDER_ERROR});}
}
