// X（旧Twitter）のリンクをスマホでは X アプリのプロフィールで直接開く。
// iPhone では https://x.com/... がアプリに渡らず App Store やホームに飛ぶことがあるため、
// まずアプリ用の twitter:// で開き、アプリが開かなかったときだけ普通の URL に切り替える。
(function(){
var ua=navigator.userAgent||"",mob=/iPhone|iPad|iPod|Android/i.test(ua)||(/Macintosh/.test(ua)&&navigator.maxTouchPoints>1);
if(!mob)return;
document.addEventListener("click",function(e){
var a=e.target.closest&&e.target.closest('a[href^="https://x.com/"]');if(!a)return;
var m=a.getAttribute("href").match(/^https:\/\/x\.com\/([A-Za-z0-9_]{1,15})\/?$/);if(!m)return;
e.preventDefault();
var web=a.href,t=setTimeout(function(){if(!document.hidden)location.href=web},1500),
stop=function(){clearTimeout(t)};
document.addEventListener("visibilitychange",function v(){if(document.hidden){stop();document.removeEventListener("visibilitychange",v)}});
window.addEventListener("pagehide",stop,{once:true});
location.href="twitter://user?screen_name="+m[1];
});
})();
