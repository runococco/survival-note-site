import json
COLS=[
 ("有機の祝福","感染者ダメージ","org","%",[(7,"PPGS","紫2+金1+星空1","10"),(7,"PPPS","紫3+星空1","10"),(7,"PPPG","紫3+金1","10"),(7,"PPPP","紫4","10"),(5,"PPSB","紫2+星空1","8"),(5,"PPGB","紫2+金1","8"),(5,"PPPB","紫3","8"),(3,"PPBB","紫2","6"),(1,"PBBB","紫1","4")]),
 ("金色の祝福","CR回避率","gld","%",[(7,"GGGS","金3+星空1","10"),(7,"GGGG","金4","10"),(6,"GGSP","金2+星空1+紫1","9"),(6,"GGGP","金3+紫1","9"),(5,"GGSB","金2+星空1","8"),(5,"GGPP","金2+紫2","8"),(5,"GGGB","金3","8"),(4,"GGPB","金2+紫1","7"),(3,"GGBB","金2","6"),(2,"GPBB","金1+紫1","5"),(1,"GBBB","金1","4")]),
 ("星空の祝福","攻撃力","sky","+",[(7,"SSGG","星空2+金2","2.5"),(7,"SSSG","星空3+金1","2.5"),(7,"SSSS","星空4","2.5"),(6,"SSGP","星空2+金1+紫1","2.3"),(6,"SSSP","星空3+紫1","2.3"),(5,"SSPP","星空2+紫2","2.0"),(5,"SSGB","星空2+金1","2.0"),(5,"SSSB","星空3","2.0"),(4,"SGPB","星空1+金1+紫1","1.8"),(4,"SSPB","星空2+紫1","1.8"),(3,"SGBB","星空1+金1","1.5"),(3,"SSBB","星空2","1.5"),(2,"SPBB","星空1+紫1","1.3"),(1,"SBBB","星空1","1.0")]),
 ("彩白の祝福","アーマー値","wht","+",[(7,"WWWS","彩白3+星空1","2.5"),(7,"WWWG","彩白3+金1","2.5"),(7,"WWWW","彩白4","2.5"),(6,"WWSP","彩白2+星空1+紫1","2.3"),(6,"WWGP","彩白2+金1+紫1","2.3"),(6,"WWWP","彩白3+紫1","2.3"),(5,"WWSB","彩白2+星空1","2.0"),(5,"WWPP","彩白2+紫2","2.0"),(5,"WWGB","彩白2+金1","2.0"),(5,"WWWB","彩白3","2.0"),(4,"WWPB","彩白2+紫1","1.8"),(3,"WWBB","彩白2","1.5"),(2,"WPBB","彩白1+紫1","1.3"),(1,"WBBB","彩白1","1.0")]),
]
def tile(k):return '<svg class="t"><use href="#t'+k+'"/></svg>'
def row(r,u):
  s,t,l,v=r
  val=(v+"%") if u=="%" else ("+"+v)
  return f'<div class="r{" top" if s==7 else ""}"><b class="st"><i>☆</i>{s}</b><div class="mid"><div class="ts">{"".join(tile(c) for c in t)}</div><span class="lb">{l}</span></div><b class="v">{val}</b></div>'
FISH={"S":"hoshizora-gyoniku","N":"niji-gyoniku","O":"gyoou-gyoniku-v3","W":"saihaku-gyoniku","K":"king-meat-mix4b"}
SP=[("SSKK","攻撃力+2.5","星空魚肉×2＋魚キング精肉×2"),("SNOW","攻撃力+2.5","星空魚肉＋虹の魚肉＋魚王の魚肉＋彩白の魚肉"),("WWON","アーマー値+2.5","彩白の魚肉×2＋星空以外の魚肉×2"),("NNNK","CR率+10%","虹の魚肉×3＋魚キング精肉×1")]
sp='<div class="box sp"><h3><svg class="hi"><use href="#ifish"/></svg>特殊パターン：深淵の薄造り</h3><p class="bd">材料は魚キング精肉×4。<wbr>入れる肉でバフが変わる。</p>'+"".join(f'<div class="spr"><div class="fs">{"".join(f"<img src={chr(34)}{FISH[c]}.webp{chr(34)}>" for c in f)}</div><b class="sv"><small>{v.split("+")[0]}</small>+{v.split("+")[1]}</b><span class="lb">{l.replace("＋","＋<wbr>")}</span></div>' for f,v,l in SP)+'<p class="ng">カニ・イカ・ロブスターの肉は使えない</p></div>'
ex='<div class="box ex"><h3><svg class="hi"><use href="#ibasket"/></svg>食材の例</h3>'+"".join(f'<div class="exr">{tile(k)}<div><b class="{c}">{n}</b><span>{d.replace("・","・<wbr>")}</span></div></div>' for k,n,c,d in [("G","金色","gld","かぼちゃ・桃・柿・トマト・タケノコ"),("S","星空","sky","卵・アヒルの卵・ガチョウの卵・かぼちゃ・桃・柿・トマト・スイカ"),("W","彩白（白彩）","wht","卵・アヒルの卵・ガチョウの卵・ミルク")])+'</div>'
cols=""
for i,(n,e,c,u,rows) in enumerate(COLS):
  extra=sp if i==0 else ex if i==1 else ""
  cols+=f'<section class="col {c}"><h2><span>{n}</span><small>{e}</small></h2>{"".join(row(r,u) for r in rows)}{extra}</section>'
leg="".join(f'<span class="lg">{tile(k)}<b>{a}</b><i>{b}</i></span>' for k,a,b in [("B","青","通常食材"),("P","紫","有機・変異魚の肉"),("G","金","金色"),("W","白","彩白・白彩"),("S","虹","星空・虹")])
tpl=open('tpl.html').read()
open('out.html','w').write(tpl.replace('%LEG%',leg).replace('%COLS%',cols))
