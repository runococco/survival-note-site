# 虹の祝福（CR率）: 白さんのゲーム画面で確認したパターン。数値も確認済み
NIJ=[(7,"NNNS","虹3+星空1","10"),(7,"NNNG","虹3+金1","10"),(7,"NNNN","虹4","10"),(6,"NNSP","虹2+星空1+紫1","9"),(6,"NNNP","虹3+紫1","9"),(5,"NNSB","虹2+星空1","8"),(5,"NNPP","虹2+紫2","8"),(5,"NNNB","虹3","8"),(4,"NNPB","虹2+紫1","7"),(3,"NNBB","虹2","6"),(2,"NPBB","虹1+紫1","5"),(1,"NBBB","虹1","4")]
import json
COLS=[
 ("有機の祝福","感染者ダメージ","org","%",[(7,"PPGS","紫2+金1+星空1","10"),(7,"PPPS","紫3+星空1","10"),(7,"PPPG","紫3+金1","10"),(7,"PPPP","紫4","10"),(5,"PPSB","紫2+星空1","8"),(5,"PPGB","紫2+金1","8"),(5,"PPPB","紫3","8"),(3,"PPBB","紫2","6"),(1,"PBBB","紫1","4")]),
 ("金色の祝福","CR回避率","gld","%",[(7,"GGGS","金3+星空1","10"),(7,"GGGG","金4","10"),(6,"GGSP","金2+星空1+紫1","9"),(6,"GGGP","金3+紫1","9"),(5,"GGSB","金2+星空1","8"),(5,"GGPP","金2+紫2","8"),(5,"GGGB","金3","8"),(4,"GGPB","金2+紫1","7"),(3,"GGBB","金2","6"),(2,"GPBB","金1+紫1","5"),(1,"GBBB","金1","4")]),
 ("星空の祝福","攻撃力","sky","+",[(7,"SSNN","星空2+虹2","2.5"),(7,"SSGG","星空2+金2","2.5"),(7,"SSSG","星空3+金1","2.5"),(7,"SSSS","星空4","2.5"),(6,"SSGP","星空2+金1+紫1","2.3"),(6,"SSSP","星空3+紫1","2.3"),(5,"SSPP","星空2+紫2","2.0"),(5,"SSGB","星空2+金1","2.0"),(5,"SSSB","星空3","2.0"),(4,"SGPB","星空1+金1+紫1","1.8"),(4,"SSPB","星空2+紫1","1.8"),(3,"SGBB","星空1+金1","1.5"),(3,"SSBB","星空2","1.5"),(2,"SPBB","星空1+紫1","1.3"),(1,"SBBB","星空1","1.0")]),
 ("彩白の祝福","アーマー値","wht","+",[(7,"WWWS","彩白3+星空1","2.5"),(7,"WWWG","彩白3+金1","2.5"),(7,"WWWW","彩白4","2.5"),(6,"WWSP","彩白2+星空1+紫1","2.3"),(6,"WWGP","彩白2+金1+紫1","2.3"),(6,"WWWP","彩白3+紫1","2.3"),(5,"WWSB","彩白2+星空1","2.0"),(5,"WWPP","彩白2+紫2","2.0"),(5,"WWGB","彩白2+金1","2.0"),(5,"WWWB","彩白3","2.0"),(4,"WWPB","彩白2+紫1","1.8"),(3,"WWBB","彩白2","1.5"),(2,"WPBB","彩白1+紫1","1.3"),(1,"WBBB","彩白1","1.0")]),
 ("虹の祝福","CR率","nij","%",NIJ),
]
# 並び順: ☆が多い順。同じ☆の中では、レアな食材を多く使う順
# レア度 青<紫<金<彩白<星空<虹。一番レアな食材の数が多い順、同じなら次にレアな食材の数で比べる
RK={'B':0,'P':1,'G':2,'W':3,'S':4,'N':5}
def rkey(r):return (-r[0],[-RK[c] for c in sorted(r[1],key=lambda c:-RK[c])])
COLS=[(n,e,c,u,sorted(rows,key=rkey)) for n,e,c,u,rows in COLS]
import os
TXT=os.environ.get('TXT')
CH={'P':'紫','G':'金','S':'星','W':'彩','B':'青','N':'虹'}
def tile(k):return ('<span class="t tx '+k+'">'+CH[k]+'</span>') if TXT else '<img class="t" src="icons/ic_'+k+'.png">'
def row(r,u):
  s,t,l,v=r
  val="" if not v else (v+"%") if u=="%" else ("+"+v)
  return f'<div class="r{" top" if s==7 else ""}"><b class="st"><i>☆</i>{s}</b><div class="mid"><div class="ts">{"".join(tile(c) for c in t)}</div><span class="lb">{l}</span></div><b class="v">{val}</b></div>'
IMG=os.environ.get("IMG","../../img/")
FISH={"S":"hoshizora-gyoniku","N":"niji-gyoniku","O":"gyoou-gyoniku-v3","W":"saihaku-gyoniku","K":"king-meat-mix4b"}
SP=[("SSKK","攻撃力+2.5","星空魚肉×2＋魚キング精肉×2"),("SNOW","攻撃力+2.5","星空魚肉＋虹の魚肉＋魚王の魚肉＋彩白の魚肉"),("WWON","アーマー値+2.5","彩白の魚肉×2＋星空以外の魚肉×2"),("NNNK","CR率+10%","虹の魚肉×3＋魚キング精肉×1")]
sp='<div class="box sp"><h3><svg class="hi"><use href="#ifish"/></svg>深淵の薄造り</h3>'+"".join(f'<div class="spr"><div class="fs">{"".join(f"<img src={chr(34)}{IMG}{FISH[c]}.webp{chr(34)}>" for c in f)}</div><b class="sv"><small>{v.split("+")[0]}</small>+{v.split("+")[1]}</b><span class="lb">{l.replace("＋","＋<wbr>")}</span></div>' for f,v,l in SP)+'</div>'
ex='<div class="box sp"><h3><svg class="hi"><use href="#ifish"/></svg>カニキングの濃厚スープ</h3><div class="spr" style="border:0;padding-bottom:0"><div class="fs">'+('<img src="'+IMG+'kin-kaniniku-v3.webp">')*4+'</div><b class="sv"><small>CR回避率</small>+10%</b><span class="lb">魚王の蟹肉×4</span></div></div>'
cols=""
for i,(n,e,c,u,rows) in enumerate(COLS):
  extra=sp if i==0 else ex if i==1 else ""
  cols+=f'<section class="col {c}"><h2><span>{n}</span><small>{e}</small></h2>{"".join(row(r,u) for r in rows)}{extra}</section>'
leg="".join(f'<span class="lg">{tile(k)}<b>{a}</b><i>{b}</i></span>' for k,a,b in [("B","青","レア食材"),("P","紫","有機野菜・果物・変異魚の肉"),("G","金","金色の野菜・果物"),("W","白","彩白・白彩の卵・ミルク"),("S","星空","星空の野菜・果物・卵・ミルク"),("N","虹","虹大根・虹の魚肉")])
tpl=open(os.environ.get('TPL','tpl.html')).read()
open(os.environ.get('OUT','out.html'),'w').write(tpl.replace('%LEG%',leg).replace('%COLS%',cols))
