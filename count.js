// アクセス数を数える（GoatCounter。Cookie なし・個人を特定しない）。
// どのページが見られたかと、どこから来たか（X・検索など）だけを送る。
// ページ内の移動（?p=…）も 1 ページとして数える。
(function(){
var GC="https://survivalnote.goatcounter.com/count";
// 自分の端末を数えないとき: #nocount をつけて 1 回開く（#count で元に戻す）。ブラウザごとに保存。
var h=window.SNH0!=null?window.SNH0:location.hash;try{if(h=="#nocount"){localStorage.setItem("skipgc","t");alert("このブラウザからのアクセスは数えないようにしました。")}else if(h=="#count"){localStorage.removeItem("skipgc");alert("このブラウザからのアクセスを数えるようにしました。")}if(localStorage.getItem("skipgc")=="t")return}catch(_){}
if(location.hostname!="survival-note.picoruno.com"||navigator.webdriver)return;
var last=null,first=true,q0=window.SNQ0!=null?window.SNQ0:location.search;
function path(){var P=new URLSearchParams(location.search);["ref","utm_source","utm_medium","utm_campaign"].forEach(function(k){P.delete(k)});var s=P.toString();return location.pathname+(s?"?"+s:"")}
window.snCount=function(){var p=path();if(p===last)return;last=p;
var q={p:p,t:document.title,rnd:Math.random().toString(36).slice(2)};
if(first){q.r=document.referrer;q.q=q0;q.s=[screen.width,screen.height,devicePixelRatio||1].join(",");first=false}
var u=GC+"?"+Object.keys(q).map(function(k){return k+"="+encodeURIComponent(q[k])}).join("&");
var i=new Image();i.src=u};
if(document.visibilityState=="prerender")document.addEventListener("visibilitychange",function v(){if(document.visibilityState!="prerender"){document.removeEventListener("visibilitychange",v);snCount()}});else snCount();
})();
