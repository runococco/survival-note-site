// サバイバルモード（ヘッダーの「サバイバル」をタップ → YES で始まる1分間のゾンビ撃ち）
// 画像は既存のゾンビスプライトだけ。ほかはすべてコードで描く。終了ボタンを押すまでページ遷移しない。
(function(){
"use strict";
var D=document,H=D.documentElement,W=window,SPR="img/18e62db8ab77.webp";
var GAME=60,ZMAX=7,BLMAX=60,BLRUN=10,CKMAX=40,PTMAX=60;
var st=null; // 実行中の状態
function el(t,c,p){var e=D.createElement(t);if(c)e.className=c;if(p)p.appendChild(e);return e}
function rnd(a,b){return a+Math.random()*(b-a)}
function vw(){return W.innerWidth}function vh(){return W.innerHeight}

var css='html.svon,html.svon body{overflow-x:hidden!important;overflow-x:clip!important}html.svon,html.svon *{-webkit-user-select:none!important;user-select:none!important;-webkit-touch-callout:none!important;cursor:crosshair!important}'+
'html.svon{touch-action:manipulation;-webkit-tap-highlight-color:transparent}'+
'.svL{position:fixed;inset:0;pointer-events:none;z-index:2147483000;overflow:hidden;contain:strict}'+
'.svV{position:fixed;inset:0;pointer-events:none;z-index:2147482990;box-shadow:inset 0 0 90px 10px rgba(150,0,0,.45);animation:svvg 2.4s ease-in-out infinite}'+
'@keyframes svvg{50%{box-shadow:inset 0 0 120px 18px rgba(170,0,0,.6)}}'+
'.svF{position:absolute;left:0;top:0;width:0;height:0;pointer-events:none;z-index:2147482995}'+
'.svck{position:absolute;width:70px;height:70px;margin:-35px 0 0 -35px;animation:svck 4.2s linear forwards}'+
'@keyframes svck{0%{transform:scale(.6)}6%{transform:scale(1)}70%{opacity:1}to{opacity:0;transform:scale(1)}}'+
'.svck.svgo{animation:svgo .25s linear forwards}@keyframes svgo{to{opacity:0}}'+
'.svH{position:fixed;left:0;right:0;top:0;z-index:2147483100;display:flex;align-items:center;gap:14px;padding:calc(env(safe-area-inset-top) + 8px) 12px 10px;background:linear-gradient(rgba(6,2,4,.92),rgba(6,2,4,.72));border-bottom:1px solid rgba(255,60,60,.28);color:#fff;font:800 11px/1 "Helvetica Neue",Arial,sans-serif;letter-spacing:.18em;pointer-events:none}'+
'.svH .svt,.svH .svs{display:flex;flex-direction:column;gap:3px;color:rgba(255,255,255,.5)}.svH b{font:italic 800 22px/1 "Helvetica Neue",Arial,sans-serif;letter-spacing:.02em;color:#fff;font-variant-numeric:tabular-nums;text-shadow:0 0 10px rgba(255,40,40,.55)}.svH .svt{min-width:46px}.svH .svs{flex:1}'+
'.svH button,.svM button{pointer-events:auto;font:800 12px/1 "Helvetica Neue",Arial,sans-serif;letter-spacing:.22em;color:#fff;background:transparent;border:1px solid rgba(255,80,80,.7);border-radius:0;padding:10px 14px 10px 16px;cursor:pointer!important;touch-action:manipulation;clip-path:polygon(8px 0,100% 0,100% calc(100% - 8px),calc(100% - 8px) 100%,0 100%,0 8px)}'+
'.svH .svt.svlow b{color:#ff4040;animation:svbl .5s steps(2) infinite}@keyframes svbl{50%{opacity:.35}}.svH button{background:rgba(10,3,5,.92)}.svH .svbar{position:absolute;left:0;bottom:-1px;height:2px;width:100%;background:linear-gradient(90deg,#ff2a2a,#ff7a3a);box-shadow:0 0 8px #f22;transform-origin:0 50%}'+
'.svz{position:absolute;left:0;top:0;background:url('+SPR+') 0 0 no-repeat;image-rendering:pixelated;transform-origin:50% 100%;will-change:transform;filter:drop-shadow(0 0 8px rgba(110,190,255,.35))}'+
'.svz.svdd{filter:sepia(1) saturate(6) hue-rotate(-40deg) brightness(.8)}'+
'.svp{position:absolute;left:0;top:0;width:6px;height:6px;border-radius:1px;will-change:transform,opacity}'+
'.svfl{position:absolute;width:34px;height:34px;margin:-17px 0 0 -17px;border-radius:50%;background:radial-gradient(#fff 0,#ffe27a 25%,rgba(255,120,0,.55) 50%,rgba(255,80,0,0) 70%);animation:svfl .16s ease-out forwards}'+
'@keyframes svfl{from{transform:scale(.5)}to{transform:scale(1.3);opacity:0}}'+
'.svpt{position:absolute;margin:-10px 0 0 -30px;width:60px;text-align:center;font:900 18px/1 system-ui,sans-serif;color:#ffd23f;text-shadow:0 0 4px #000,0 0 8px #f00;animation:svpt .8s ease-out forwards}'+
'@keyframes svpt{to{transform:translateY(-40px);opacity:0}}'+
'.svB{position:absolute;inset:0;background:rgba(200,0,0,.35);animation:svgo .45s ease-out forwards}'+
'.svC{position:absolute;left:0;right:0;top:42%;text-align:center;font:italic 800 54px/1 "Helvetica Neue",Arial,sans-serif;color:#fff;text-shadow:3px 0 rgba(255,0,40,.8),-3px 0 rgba(0,220,255,.35),0 0 24px rgba(255,0,0,.6);letter-spacing:.12em;animation:svcd .8s ease-out forwards}.svC.svw{font-size:38px;letter-spacing:.3em}'+
'@keyframes svcd{from{transform:scale(1.8);opacity:0}25%{transform:scale(1);opacity:1}80%{opacity:1}to{opacity:0}}'+
'.svM{position:fixed;inset:0;z-index:2147483200;display:flex;align-items:center;justify-content:center;padding:16px;background:radial-gradient(rgba(30,0,0,.55),rgba(0,0,0,.82));animation:svin .25s ease-out}'+
'@keyframes svin{from{opacity:0}}'+
'.svM>div{position:relative;width:min(330px,100%);background:repeating-linear-gradient(0deg,rgba(255,255,255,.025) 0 1px,transparent 1px 3px),linear-gradient(160deg,#16070a,#070305 70%);border:1px solid rgba(255,70,70,.22);padding:26px 22px 22px;text-align:center;color:#eee;font:14px/1.6 "Zen Kaku Gothic New",system-ui,sans-serif;box-shadow:0 0 40px rgba(180,0,0,.3);clip-path:polygon(14px 0,100% 0,100% calc(100% - 14px),calc(100% - 14px) 100%,0 100%,0 14px)}'+
'.svM>div:before,.svM>div:after{content:"";position:absolute;width:18px;height:18px;border:2px solid #ff3434}.svM>div:before{right:6px;top:6px;border-left:0;border-bottom:0}.svM>div:after{left:6px;bottom:6px;border-right:0;border-top:0}'+
'.svM .svtg{display:inline-flex;align-items:center;gap:8px;font:800 10px/1 "Helvetica Neue",Arial,sans-serif;letter-spacing:.4em;color:#ff4a4a;margin-bottom:14px}.svM .svtg i{width:7px;height:7px;background:#ff2a2a;box-shadow:0 0 8px #f00;animation:svbl 1s steps(2) infinite}'+
'.svM h2{margin:0 0 10px;font:400 27px/1.25 "Dela Gothic One",sans-serif;letter-spacing:.06em;color:#fff;text-shadow:2px 0 rgba(255,0,40,.75),-2px 0 rgba(0,200,255,.3);animation:svjt 2.2s steps(1) infinite}'+
'@keyframes svjt{0%,100%{transform:none}91%{transform:translate(1px,-1px)}93%{transform:translate(-2px,1px)}95%{transform:none}}'+
'.svM .svsub{margin:0 0 22px;font:700 10px/1 "Helvetica Neue",Arial,sans-serif;letter-spacing:.32em;color:rgba(255,255,255,.45)}.svM .svbt{display:flex;gap:10px;justify-content:center}'+
'.svM button{flex:1;max-width:130px;padding:14px 10px;font-size:13px}.svM button.svy{background:linear-gradient(135deg,#d11a22,#8c0b12);border-color:#ff5050;box-shadow:0 0 18px rgba(255,0,0,.35)}.svM button.svn{color:rgba(255,255,255,.75)}'+
'.svM .svsc{font:italic 800 58px/1 "Helvetica Neue",Arial,sans-serif;color:#fff;text-shadow:3px 0 rgba(255,0,40,.7),0 0 22px rgba(255,40,0,.45);margin:6px 0 8px;font-variant-numeric:tabular-nums;letter-spacing:.02em}'+
'.svM .svrs{display:grid;grid-template-columns:1fr auto;gap:0;margin:0 0 22px;text-align:left;border-top:1px solid rgba(255,255,255,.08)}.svM .svrs>*{padding:9px 2px;border-bottom:1px solid rgba(255,255,255,.08)}.svM .svrs span{font:800 11px/1.3 "Helvetica Neue",Arial,sans-serif;letter-spacing:.24em;color:rgba(255,255,255,.55)}.svM .svrs span small{display:block;font:500 10px/1.3 "Zen Kaku Gothic New",sans-serif;letter-spacing:.1em;color:rgba(255,255,255,.35)}.svM .svrs b{text-align:right;font:italic 800 20px/1.6 "Helvetica Neue",Arial,sans-serif;font-variant-numeric:tabular-nums}'+
'.svM .svbe{display:inline-block;margin:0 0 18px;font:800 10px/1 "Helvetica Neue",Arial,sans-serif;letter-spacing:.3em;color:rgba(255,255,255,.5)}.svM .svbe.svnr{color:#111;background:#ffcf3a;padding:5px 8px 5px 10px;box-shadow:0 0 14px rgba(255,200,0,.5)}';

function addCss(){if(D.getElementById("svcss"))return;var s=el("style");s.id="svcss";s.textContent=css;D.head.appendChild(s)}

// ---------- 確認ダイアログ ----------
function modal(h){var m=el("div","svM",D.body);m.setAttribute("data-sv","1");var b=el("div","",m);b.setAttribute("role","dialog");b.setAttribute("aria-modal","true");b.innerHTML=h;return m}
function ask(){addCss();if(st||D.querySelector(".svM"))return;H.classList.add("svred");
var m=modal('<div class="svtg"><i></i>SURVIVAL MODE</div><h2>覚悟はいいか？</h2><div class="svsub">60 SEC ／ TAP TO SHOOT</div><div class="svbt"><button type="button" class="svy">YES</button><button type="button" class="svn">NO</button></div>');
var y=m.querySelector(".svy");try{y.focus({preventScroll:true})}catch(x){}
m.querySelector(".svn").onclick=function(){m.remove();H.classList.remove("svred")};
y.onclick=function(){m.remove();start()};
m.addEventListener("click",function(e){if(e.target===m){m.remove();H.classList.remove("svred")}})}

// ---------- 開始・終了 ----------
function start(){addCss();if(st)return;H.classList.add("svon","svred");
st={score:0,kill:0,brk:0,shot:0,hit:0,zs:[],cks:[],blown:[],hid:[],anims:[],pts:0,hits:new WeakMap(),t0:0,end:0,raf:0,sp:0,on:false,over:false};
st.V=el("div","svV",D.body);st.F=el("div","svF",D.body);st.L=el("div","svL",D.body);
var h=el("div","svH",D.body);h.setAttribute("data-sv","1");h.innerHTML='<span class="svt">TIME<b>60</b></span><span class="svs">SCORE<b>0</b></span><button type="button" aria-label="サバイバル終了">EXIT</button><i class="svbar"></i>';
st.H=h;st.tE=h.querySelector(".svt");st.tB=st.tE.querySelector("b");st.bar=h.querySelector(".svbar");st.sB=h.querySelector(".svs b");
h.querySelector("button").onclick=quit;
on(true);
count(["3","2","1","SURVIVE"],function(){st.on=true;st.t0=performance.now();st.end=st.t0+GAME*1000;st.next=st.t0+300;loop()})}
function count(a,cb){var i=0;(function n(){if(!st)return;if(i>=a.length){cb();return}var c=el("div","svC"+(a[i].length>3?" svw":""),st.L);c.textContent=a[i++];setTimeout(function(){c.remove()},800);setTimeout(n,i==a.length?350:650)})()}
function clearPlay(){if(!st)return;cancelAnimationFrame(st.raf);st.on=false;st.anims.forEach(function(a){try{a.cancel()}catch(x){}});st.anims=[];st.hid.forEach(function(h){h[0].style.visibility=h[1]});st.hid=[];st.blown=[];st.L.textContent="";st.F.textContent="";st.zs=[];st.cks=[];st.pts=0}
function quit(){if(!st)return;clearPlay();[st.V,st.F,st.L,st.H].forEach(function(e){e.remove()});[].forEach.call(D.querySelectorAll(".svM"),function(m){m.remove()});on(false);st=null;H.classList.remove("svon","svred")}
function again(){quit();start()}

// ---------- 入力（終了するまでページの操作を止める） ----------
var dn=null;
function ours(t){return t&&t.closest&&t.closest("[data-sv]")}
function blockAll(e){if(ours(e.target))return;e.stopPropagation();if(e.cancelable&&e.type!="touchstart"&&e.type!="touchmove")e.preventDefault()}
function pDown(e){if(ours(e.target))return;e.stopPropagation();var t=e.target;if(t&&/^(INPUT|SELECT|TEXTAREA|LABEL|OPTION)$/.test(t.tagName))e.preventDefault();if(e.isPrimary===false||(e.button&&e.button!=0))return;dn={x:e.clientX,y:e.clientY,t:Date.now(),id:e.pointerId}}
function pUp(e){if(ours(e.target))return;e.stopPropagation();var d=dn;dn=null;if(!d||d.id!==e.pointerId)return;if(Math.abs(e.clientX-d.x)>12||Math.abs(e.clientY-d.y)>12||Date.now()-d.t>700)return;shoot(e.clientX,e.clientY)}
function pCan(){dn=null}
function keyB(e){if(ours(e.target))return;if(e.key=="Enter"||e.key==" "){e.preventDefault();e.stopPropagation()}}
function focB(e){var t=e.target;if(!ours(t)&&t&&/^(INPUT|SELECT|TEXTAREA)$/.test(t.tagName))try{t.blur()}catch(x){}}
function vis(){if(D.hidden&&st&&st.on){st.pause=performance.now()}else if(!D.hidden&&st&&st.pause){var d=performance.now()-st.pause;st.end+=d;st.next+=d;st.zs.forEach(function(z){z.t0+=d});st.pause=0}}
function on(a){var f=a?"addEventListener":"removeEventListener",o={capture:true,passive:false};
W[f]("pointerdown",pDown,o);W[f]("pointerup",pUp,o);W[f]("pointercancel",pCan,o);
["click","dblclick","auxclick","mousedown","mouseup","contextmenu","submit"].forEach(function(t){W[f](t,blockAll,o)});
W[f]("touchstart",blockAll,{capture:true,passive:true});W[f]("touchend",blockAll,o);
W[f]("keydown",keyB,o);W[f]("focusin",focB,true);D[f]("visibilitychange",vis)}

// ---------- 射撃 ----------
function shoot(x,y){if(!st||!st.on)return;st.shot++;flash(x,y);
var best=null,bd=1e9;st.zs.forEach(function(z){if(z.dead)return;var r=z.e.getBoundingClientRect(),p=10;if(x>=r.left-p&&x<=r.right+p&&y>=r.top-p&&y<=r.bottom+p){var d=Math.hypot(x-(r.left+r.right)/2,y-(r.top+r.bottom)/2);if(d<bd){bd=d;best=z}}});
if(best){st.hit++;kill(best,x,y);return}
var t=pick(x,y);crack(x,y,t);if(!t)return;st.hit++;var n=(st.hits.get(t)||0)+1;st.hits.set(t,n);var r=t.getBoundingClientRect(),need=r.width*r.height>40000?3:2;
if(n>=need&&st.blown.length<BLMAX&&st.anims.filter(function(a){return a.playState=="running"}).length<BLRUN)blow(t,x,y,r);else add(5,x,y)}

// 撃った場所にある「枠」っぽい要素を探す
function pick(x,y){var es=D.elementsFromPoint?D.elementsFromPoint(x,y):[D.elementFromPoint(x,y)],A=vw()*vh();
for(var i=0;i<es.length;i++){var e=es[i];if(!e||e===D.body||e===H)break;if(e.ownerSVGElement)e=e.ownerSVGElement;if(ours(e)||e.id=="main"||e.tagName=="MAIN")continue;
if(st.blown.some(function(b){return b===e||b.contains(e)}))return null;
var r=e.getBoundingClientRect(),a=r.width*r.height;if(a<120||a>A*.6||r.width>vw()*1.05)continue;
if(/^(IMG|SVG|svg|BUTTON|A|INPUT|SELECT|TEXTAREA|FIGURE|SUMMARY|DETAILS|TABLE|TR|LI|H1|H2|H3|H4|VIDEO|CANVAS|PICTURE)$/.test(e.tagName))return e;
var s=getComputedStyle(e);if(parseFloat(s.borderTopWidth)>0||parseFloat(s.borderBottomWidth)>0||parseFloat(s.borderLeftWidth)>0||(s.backgroundColor&&!/rgba\(.*,\s*0\)$|transparent/.test(s.backgroundColor))||s.backgroundImage!="none"||s.boxShadow!="none")return e}
return null}

// 弾痕とヒビ（ページに張り付く。数秒で消える）
function crack(x,y,t){var sx=x+W.scrollX,sy=y+W.scrollY,p=[],k=5+(Math.random()*3|0),i,j,a,r,px,py,s='';
for(i=0;i<k;i++){a=i/k*6.283+rnd(-.35,.35);r=rnd(16,33);px=35;py=35;var d='M35 35';for(j=1;j<=3;j++){var rr=r*j/3,aa=a+rnd(-.28,.28);px=35+Math.cos(aa)*rr;py=35+Math.sin(aa)*rr;d+='L'+px.toFixed(1)+' '+py.toFixed(1)}p.push(d);
if(Math.random()<.5){var a2=a+rnd(.4,.8)*(Math.random()<.5?-1:1),r2=r*rnd(.3,.55),mx=35+Math.cos(a+.1)*r*.55,my=35+Math.sin(a+.1)*r*.55;p.push('M'+mx.toFixed(1)+' '+my.toFixed(1)+'L'+(mx+Math.cos(a2)*r2).toFixed(1)+' '+(my+Math.sin(a2)*r2).toFixed(1))}}
var ring='',rs=rnd(9,13);for(i=0;i<k;i++){a=i/k*6.283;ring+=(i?'L':'M')+(35+Math.cos(a)*rs*rnd(.8,1.15)).toFixed(1)+' '+(35+Math.sin(a)*rs*rnd(.8,1.15)).toFixed(1)}ring+='Z';
s='<svg viewBox="0 0 70 70" width="70" height="70"><g fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="'+p.join('')+ring+'" stroke="rgba(0,0,0,.55)" stroke-width="2.4"/><path d="'+p.join('')+ring+'" stroke="rgba(235,240,255,.85)" stroke-width="1"/></g>'+
'<circle cx="35" cy="35" r="6" fill="rgba(200,200,210,.35)"/><circle cx="35" cy="35" r="4.2" fill="#050507" stroke="#9aa" stroke-width=".8"/><circle cx="34" cy="34" r="1.3" fill="rgba(255,255,255,.35)"/></svg>';
var c=el("div","svck",st.F);c.style.left=sx+"px";c.style.top=sy+"px";c.innerHTML=s;c._t=t;st.cks.push(c);
setTimeout(function(){c.remove();if(st){var i=st.cks.indexOf(c);if(i>=0)st.cks.splice(i,1)}},4300);
while(st.cks.length>CKMAX)st.cks.shift().remove()}

// 枠が吹き飛ぶ
function blow(t,x,y,r){var cx=(r.left+r.right)/2,cy=(r.top+r.bottom)/2,dir=(cx-x)||rnd(-1,1),sg=dir>=0?1:-1;
var dx=sg*rnd(160,340)+(cx-vw()/2)*.4,up=rnd(90,220),dy=vh()-r.top+60,rot=sg*rnd(25,80);
var a=t.animate([{transform:'translate(0,0) rotate(0)',offset:0},{transform:'translate('+(dx*.35).toFixed(0)+'px,'+(-up).toFixed(0)+'px) rotate('+(rot*.35).toFixed(0)+'deg)',offset:.3,easing:'ease-in'},{transform:'translate('+dx.toFixed(0)+'px,'+dy.toFixed(0)+'px) rotate('+rot.toFixed(0)+'deg)',opacity:.9,offset:1}],{duration:1150,easing:'cubic-bezier(.2,.7,.3,1)',fill:'forwards'});
st.anims.push(a);st.blown.push(t);var hv=t.style.visibility;a.onfinish=function(){if(!st||st.blown.indexOf(t)<0)return;st.hid.push([t,hv]);t.style.visibility='hidden';a.cancel()};st.brk++;
st.cks.forEach(function(c){if(c._t===t||(c._t&&t.contains(c._t)))c.classList.add("svgo")});
var col='#bbb';try{var s=getComputedStyle(t);col=s.backgroundColor&&!/rgba\(.*,\s*0\)$|transparent/.test(s.backgroundColor)?s.backgroundColor:(s.borderTopColor||s.color)}catch(e){}
burst(x,y,8,[col,'#ddd','#888','#ffcf6b'],380);shake(D.body,4);add(30,x,y)}

// ---------- ゾンビ ----------
function spawn(now){if(st.zs.filter(function(z){return !z.dead}).length>=ZMAX)return;
var s=rnd(2.1,2.7),w=38*s,h=33*s,top=st.H.offsetHeight+6,x=rnd(6,Math.max(8,vw()-w-6)),y=rnd(top,Math.max(top+2,vh()-h-10)),prog=(now-st.t0)/(GAME*1000);
var e=el("div","svz",st.L);e.style.width=w+"px";e.style.height=h+"px";e.style.backgroundSize=(304*s)+"px "+h+"px";
e.animate([{backgroundPosition:'0 0'},{backgroundPosition:(-304*s)+'px 0'}],{duration:rnd(1100,1500),easing:'steps(8)',iterations:Infinity});
var z={e:e,x:x,y:y,w:w,h:h,s:s,t0:now,life:rnd(3600,4400)-prog*1300,v:rnd(10,22)*(x+w/2<vw()/2?1:-1),dead:false};st.zs.push(z);
e.animate([{opacity:0,clipPath:'inset(100% 0 0 0)'},{opacity:1,clipPath:'inset(0 0 0 0)'}],{duration:380,easing:'ease-out'})}
function place(z,now){var a=(now-z.t0)/z.life,g=1+Math.min(1,a)*.45,x=z.x+z.v*(now-z.t0)/1000;z.cx=x;
z.e.style.transform='translate('+x.toFixed(1)+'px,'+z.y.toFixed(1)+'px) scale('+(z.v<0?-g:g).toFixed(3)+','+g.toFixed(3)+')';
z.e.style.zIndex=Math.round(z.y)}
function kill(z,x,y){z.dead=true;st.kill++;add(100,x,y-20);var e=z.e;e.classList.add("svdd");burst(x,y,10,['#b3001b','#7a0010','#e0162b','#4a0008'],300);
var tr=e.style.transform;e.getAnimations&&e.getAnimations().forEach(function(a){a.pause()});
e.animate([{transform:tr,opacity:1},{transform:tr+' rotate('+(z.v<0?-80:80)+'deg) translateY(6px)',opacity:0}],{duration:520,easing:'ease-in',fill:'forwards'}).onfinish=function(){e.remove()};drop(z)}
function drop(z){var i=st.zs.indexOf(z);if(i>=0)st.zs.splice(i,1)}
function bite(z){z.dead=true;var e=z.e;el("div","svB",st.L).addEventListener("animationend",function(){this.remove()});shake(D.body,8);
e.animate([{opacity:1},{opacity:0}],{duration:300,fill:'forwards'}).onfinish=function(){e.remove()};drop(z)}

// ---------- 演出 ----------
function flash(x,y){var f=el("div","svfl",st.L);f.style.left=x+"px";f.style.top=y+"px";setTimeout(function(){f.remove()},170)}
function burst(x,y,n,cols,sp){for(var i=0;i<n&&st.pts<PTMAX;i++){st.pts++;var p=el("div","svp",st.L),a=rnd(0,6.283),v=rnd(.4,1)*sp,dx=Math.cos(a)*v*.35,dy=Math.sin(a)*v*.35-40;
p.style.background=cols[i%cols.length];var sz=rnd(3,7);p.style.width=p.style.height=sz+"px";
p.animate([{transform:'translate('+x+'px,'+y+'px) rotate(0)',opacity:1},{transform:'translate('+(x+dx)+'px,'+(y+dy+90)+'px) rotate('+rnd(-300,300)+'deg)',opacity:0}],{duration:rnd(450,750),easing:'cubic-bezier(.2,.6,.5,1)'}).onfinish=function(){this.effect.target.remove();if(st)st.pts--}}}
function shake(t,m){if(!t||!t.animate||W.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches)return;st.L.animate([{transform:'translate(0,0)'},{transform:'translate('+m+'px,'+(-m/2)+'px)'},{transform:'translate('+(-m)+'px,'+(m/2)+'px)'},{transform:'translate(0,0)'}],{duration:220})}
function add(n,x,y){st.score+=n;st.sB.textContent=st.score;if(n>=30){var p=el("div","svpt",st.L);p.textContent="+"+n;p.style.left=x+"px";p.style.top=y+"px";setTimeout(function(){p.remove()},820)}}

// ---------- ループ ----------
function loop(){if(!st||!st.on)return;st.raf=requestAnimationFrame(loop);if(st.pause)return;var now=performance.now(),left=Math.max(0,st.end-now),sec=Math.ceil(left/1000);
st.bar.style.transform="scaleX("+(left/GAME/1000).toFixed(4)+")";if(st.tB.textContent!=sec){st.tB.textContent=sec;st.tE.classList.toggle("svlow",sec<=10)}
if(left<=0){finish();return}
if(now>=st.next){spawn(now);var prog=(now-st.t0)/(GAME*1000);st.next=now+rnd(900,1500)*(1-prog*.55)}
st.zs.slice().forEach(function(z){if(z.dead)return;if(now-z.t0>z.life){bite(z);return}place(z,now)})}

function finish(){st.on=false;cancelAnimationFrame(st.raf);st.tB.textContent="0";
st.zs.forEach(function(z){z.e.animate([{opacity:1},{opacity:0}],{duration:400,fill:'forwards'})});
var best=0,nb=false;try{best=+localStorage.getItem("svbest")||0;if(st.score>best){localStorage.setItem("svbest",st.score);nb=best>0;best=st.score}}catch(x){best=Math.max(best,st.score)}
var acc=st.shot?Math.round(st.hit/st.shot*100):0;
var c=el("div","svC svw",st.L);c.textContent="TIME UP";
setTimeout(function(){if(!st)return;var m=modal('<div class="svtg"><i></i>RESULT</div><h2>生還</h2><div class="svsc">'+st.score+'</div>'+(nb?'<div class="svbe svnr">NEW RECORD</div>':'<div class="svbe">BEST '+best+'</div>')+
'<div class="svrs"><span>KILLS<small>倒したゾンビ</small></span><b>'+st.kill+'</b><span>DESTROYED<small>吹き飛ばした枠</small></span><b>'+st.brk+'</b><span>ACCURACY<small>命中率</small></span><b>'+acc+'%</b></div>'+
'<div class="svbt"><button type="button" class="svy">RETRY</button><button type="button" class="svn">EXIT</button></div>');
m.querySelector(".svy").onclick=again;m.querySelector(".svn").onclick=quit},1100)}

W.SV={ask:ask,start:start,quit:quit};
})();
