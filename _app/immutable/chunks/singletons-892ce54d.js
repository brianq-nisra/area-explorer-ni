import{E as a,s as y,F as m,G as q,H as w}from"./index-89985eea.js";const o=[];function z(n,i){return{subscribe:A(n,i).subscribe}}function A(n,i=a){let c;const e=new Set;function f(t){if(y(n,t)&&(n=t,c)){const r=!o.length;for(const s of e)s[1](),o.push(s,n);if(r){for(let s=0;s<o.length;s+=2)o[s][0](o[s+1]);o.length=0}}}function b(t){f(t(n))}function l(t,r=a){const s=[t,r];return e.add(s),e.size===1&&(c=i(f)||a),t(n),()=>{e.delete(s),e.size===0&&(c(),c=null)}}return{set:f,update:b,subscribe:l}}function F(n,i,c){const e=!Array.isArray(n),f=e?[n]:n,b=i.length<2;return z(c,l=>{let t=!1;const r=[];let s=0,d=a;const g=()=>{if(s)return;d();const u=i(e?r[0]:r,l);b?l(u):d=w(u)?u:a},_=f.map((u,p)=>m(u,h=>{r[p]=h,s&=~(1<<p),t&&g()},()=>{s|=1<<p}));return t=!0,g(),function(){q(_),d()}})}let x;function G(n){x=n.client}export{x as c,F as d,G as i,A as w};
