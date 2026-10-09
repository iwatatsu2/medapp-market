# -*- coding: utf-8 -*-
"""Antaa Vol.4（新版）— 無料・監修済みのcase01をアプリのUI/写真まるごとで見せるデッキ
DM Compass TrainingのUI言語（ink/琥珀/明朝/モノ/ヘアライン）そのまま。13枚。"""
import pathlib

D = pathlib.Path(__file__).resolve().parent
A = "assets"

HEAD = """<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Shippori+Mincho+B1:wght@600;700&family=IBM+Plex+Mono:wght@400;500&family=Noto+Sans+JP:wght@400;500;700&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{width:1280px;height:720px;overflow:hidden;background:#0b0d10;color:#e8e4da;font-family:'Noto Sans JP',sans-serif}
.slide{width:1280px;height:720px;position:relative;overflow:hidden}
.mincho{font-family:'Shippori Mincho B1',serif;font-weight:600;letter-spacing:.02em}
.mono{font-family:'IBM Plex Mono',monospace;text-transform:uppercase;letter-spacing:.18em}
.dim{color:#7d8494}.amber{color:#e8b04b}
.best{color:#57d98a}.good{color:#6aa9f7}.ctx{color:#e3b341}.poor{color:#ef7070}
.fadeb{position:absolute;inset:0;background:linear-gradient(to bottom,rgba(11,13,16,.25),rgba(11,13,16,0) 30%,rgba(11,13,16,.65) 72%,#0b0d10 100%)}
.fader{position:absolute;inset:0;background:linear-gradient(to right,rgba(11,13,16,0) 40%,rgba(11,13,16,.85) 78%,#0b0d10 100%)}
.hairline-strong{border-top:1px solid #3a4252}
.choice{display:flex;gap:22px;padding:16px 4px;border-bottom:1px solid #262c37;align-items:flex-start}
.choice .abc{font-family:'IBM Plex Mono',monospace;color:#7d8494;font-size:19px;padding-top:3px}
.choice .lbl{font-size:22.5px;font-weight:500;line-height:1.55}
.labrow{display:flex;justify-content:space-between;padding:11px 14px 11px 2px;border-bottom:1px solid #262c37;font-size:20px}
.labrow .v{font-family:'IBM Plex Mono',monospace;letter-spacing:0;font-weight:500}
.chip{font-family:'IBM Plex Mono',monospace;letter-spacing:.16em;font-size:15px;color:rgba(232,228,218,.85)}
.brandbar{position:absolute;top:26px;left:70px;right:70px;display:flex;justify-content:space-between;z-index:9}
.brandbar span{font-family:'IBM Plex Mono',monospace;letter-spacing:.18em;font-size:13px;color:rgba(232,228,218,.8)}
.badge{display:inline-block;background:#e8b04b;color:#0b0d10;font-weight:700;font-size:12px;padding:3px 12px;letter-spacing:.1em}
.phone{border-radius:34px;border:7px solid #232a36;box-shadow:0 30px 80px rgba(0,0,0,.7)}
</style></head><body><div class="slide">
"""
FOOT = "</div></body></html>"

def w(n, body):
    (D / f"s{n:02d}.html").write_text(HEAD + body + FOOT)

def brand(right=""):
    return f'<div class="brandbar"><span>DM COMPASS TRAINING — 考える症例</span><span>{right}</span></div>'

def choices(items):
    rows = ['<div class="hairline-strong" style="margin-top:14px">']
    for i, t in enumerate(items):
        rows.append(f'<div class="choice"><span class="abc">{"ABCD"[i]}</span><span class="lbl">{t}</span></div>')
    rows.append("</div>")
    return "".join(rows)

def qslide(n, qno, phase, prompt, items, img="case01-first-visit.jpg"):
    w(n, f"""
<img src="{A}/{img}" style="position:absolute;left:0;top:0;width:100%;height:200px;object-fit:cover;object-position:50% 32%">
<div style="position:absolute;left:0;top:0;width:100%;height:200px;background:linear-gradient(to bottom,rgba(11,13,16,.45),#0b0d10 96%)"></div>
{brand(f"Q{qno} / 4")}
<div style="position:absolute;left:70px;top:96px;right:70px">
  <p class="chip">QUESTION {qno:02d} — {phase}</p>
  <p class="mincho" style="font-size:37px;color:#fff;line-height:1.4;margin-top:10px">{prompt}</p>
  {choices(items)}
</div>
<div style="position:absolute;bottom:26px;left:70px;right:70px;display:flex;justify-content:space-between">
  <span class="mono" style="font-size:12px;color:#e8b04b">ページをめくる前に、1つ選んでください</span>
  <span class="mono" style="font-size:13px;color:#7d8494">正解はひとつではありません</span>
</div>
""")

def aslide(n, qno, title, best_label, best_exp, others):
    rows = ""
    for mark, cls, lbl, exp in others:
        rows += f'''<div style="display:flex;gap:16px;padding:12px 2px;border-bottom:1px solid #262c37">
        <span class="mincho {cls}" style="font-size:22px;width:30px;flex-shrink:0;text-align:center">{mark}</span>
        <div><span style="font-size:19px;font-weight:700">{lbl}</span>
        <span style="font-size:17px;color:#7d8494;font-weight:400">　{exp}</span></div></div>'''
    w(n, f"""
{brand(f"A{qno} / 4")}
<div style="position:absolute;left:70px;top:82px;right:70px">
  <p class="chip">ANSWER {qno:02d}</p>
  <p class="mincho" style="font-size:31px;color:#fff;line-height:1.4;margin-top:8px">{title}</p>
  <div style="border-left:3px solid #57d98a;padding-left:26px;margin-top:24px">
    <p><span class="mincho best" style="font-size:42px">◎</span>
    <span style="font-size:21px;font-weight:700;margin-left:12px">{best_label}</span></p>
    <p style="font-size:20px;line-height:1.8;color:#e8e4da;margin-top:8px;max-width:1080px">{best_exp}</p>
  </div>
  <div class="hairline-strong" style="margin-top:22px">{rows}</div>
</div>
""")

# 1. 表紙フック
w(1, f"""
<img src="{A}/case01-first-visit.jpg" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover">
<div class="fadeb"></div>
{brand("VOL.4")}
<div style="position:absolute;left:70px;bottom:64px;right:70px">
  <p class="chip" style="margin-bottom:14px">CASE 01 · 62歳男性 · <span class="amber">専門医監修済み</span></p>
  <p class="mincho" style="font-size:72px;line-height:1.25;color:#fff">健診でHbA1c <span class="amber">8.7%</span>。<br>あなたなら、どうする？</p>
  <p style="font-size:22px;color:#cfc9bc;margin-top:16px;font-weight:500">自覚症状なしの初診——最初の3手で、数年先の予後が変わる。4問だけ、一緒に考えてください。</p>
  <p class="mono" style="font-size:13px;color:#7d8494;margin-top:20px">DR. IWATATSU — DIABETES &amp; ENDOCRINOLOGY ／ 教育目的の架空症例</p>
</div>
""")

# 2. 症例提示
w(2, f"""
<img src="{A}/case01-first-visit.jpg" style="position:absolute;left:0;top:0;width:62%;height:100%;object-fit:cover">
<div class="fader"></div>
{brand("CASE 01")}
<div style="position:absolute;left:70px;bottom:56px;width:460px">
  <p class="chip">62歳男性 · 会社員 · 初診</p>
  <p class="mincho" style="font-size:35px;line-height:1.5;color:#fff;margin-top:12px">「症状は、<br>特にないんですけど」</p>
</div>
<div style="position:absolute;right:84px;top:104px;width:440px">
  <p class="mono" style="font-size:13px;color:#7d8494;margin-bottom:6px">健診（同一採血）</p>
  <div class="hairline-strong">
    <div class="labrow"><span class="dim">空腹時血糖</span><span class="v poor">168 mg/dL ↑</span></div>
    <div class="labrow"><span class="dim">HbA1c</span><span class="v poor">8.7 % ↑</span></div>
  </div>
  <p class="mono" style="font-size:13px;color:#7d8494;margin:22px 0 6px">PROFILE</p>
  <div class="hairline-strong">
    <div class="labrow"><span class="dim">BMI</span><span class="v">27.0</span></div>
    <div class="labrow"><span class="dim">血圧</span><span class="v">138/86 mmHg</span></div>
    <div class="labrow"><span class="dim">飲酒</span><span class="v">ビール500mL/日</span></div>
    <div class="labrow"><span class="dim">家族歴</span><span class="v">父が2型糖尿病</span></div>
  </div>
  <p style="font-size:17.5px;color:#cfc9bc;margin-top:16px;font-weight:500">2年前からHbA1c 6%台後半を指摘されるも<span class="amber">放置していた</span>。</p>
</div>
""")

# 3-4. Q1/A1
qslide(3, 1, "初診", "まず何を確認しますか？", [
    "眼科受診を依頼し、網膜症・腎症・神経障害の合併症評価を先に進める",
    "まず食事・運動療法を指導し、3か月後に再評価する",
    "健診値の誤差の可能性があるため、まずHbA1cのみ再検して結果を待つ",
    "口渇・体重減少などの症状、既往歴・薬剤歴を問診し、糖尿病の成因と緊急性を評価する",
])
aslide(4, 1, "最初の仕事は「本当に典型的な2型か」の見極め",
    "問診で成因と緊急性を評価する",
    "急激な発症・著明な体重減少・ケトーシス徴候があれば1型や清涼飲料水ケトーシスを、ステロイド等の薬剤歴があれば二次性を考えます。ここを飛ばすと以後の方針がすべて狂います。本症例は緩徐な経過・肥満・家族歴から典型的な2型が最も考えやすい状況でした。",
    [("○","good","合併症評価を先に","方向は正しい。ただし「まず」は成因と緊急性。並行して進める"),
     ("△","ctx","HbA1cのみ再検して待つ","同一採血で血糖+HbA1cがともに糖尿病型なら診断は確定できる——待つ必要はない"),
     ("×","poor","生活指導で3か月様子見","評価なしの放置は1型や膵癌合併の見逃しリスク")])

# 5-6. Q2/A2
qslide(5, 2, "検査", "今日、どの検査を行いますか？", [
    "75g経口ブドウ糖負荷試験（OGTT）を予約する",
    "血糖値とHbA1cのみ測定する",
    "抗GAD抗体・Cペプチドを含めた成因精査もあわせて提出する",
    "随時血糖・HbA1c再検に加え、尿検査（ケトン体・アルブミン）、腎機能・肝機能・脂質を測定する",
], img="case01-exam.jpg")
aslide(6, 2, "初診日に「診断」と「治療薬を選ぶ材料」を揃える",
    "血糖・HbA1c＋尿ケトン/アルブミン・腎機能・肝機能・脂質のセット",
    "腎機能を知らずにメトホルミンは開始できず、尿アルブミンを見ずに腎症の病期は決められません。初診日にこのセットを揃えると、診断確定と薬剤選択が同日に終わり、治療開始が1受診分早くなります。",
    [("○","good","抗GAD・Cペプチドも提出","非肥満・急速進行例では有用。SPIDDMを疑う閾値は低くてよい"),
     ("△","ctx","血糖とHbA1cのみ","診断は付くが結局もう一度採血になり、治療開始が遅れる"),
     ("×","poor","OGTTを予約","明らかな高血糖でのOGTTは不要かつ高血糖を誘発しうる")])

# 7. 検査結果（アプリのlabs表そのまま）
w(7, f"""
<img src="{A}/case01-exam.jpg" style="position:absolute;left:0;top:0;width:100%;height:200px;object-fit:cover;object-position:50% 35%">
<div style="position:absolute;left:0;top:0;width:100%;height:200px;background:linear-gradient(to bottom,rgba(11,13,16,.45),#0b0d10 96%)"></div>
{brand("RESULTS")}
<div style="position:absolute;left:70px;top:100px;right:70px">
  <p class="chip">検査結果 — 2型糖尿病と診断</p>
  <div style="display:flex;gap:60px;margin-top:16px">
    <div style="flex:1">
      <div class="hairline-strong">
        <div class="labrow"><span class="dim">随時血糖</span><span class="v poor">182 mg/dL ↑</span></div>
        <div class="labrow"><span class="dim">HbA1c（再検）</span><span class="v poor">8.6 % ↑</span></div>
        <div class="labrow"><span class="dim">尿ケトン体</span><span class="v">(−)</span></div>
        <div class="labrow"><span class="dim">尿アルブミン/Cr比</span><span class="v ctx">45 mg/gCr ↑</span></div>
      </div>
    </div>
    <div style="flex:1">
      <div class="hairline-strong">
        <div class="labrow"><span class="dim">eGFR</span><span class="v">68 mL/分/1.73m²</span></div>
        <div class="labrow"><span class="dim">LDL-C</span><span class="v ctx">138 mg/dL ↑</span></div>
        <div class="labrow"><span class="dim">ALT</span><span class="v">42 U/L（軽度上昇）</span></div>
      </div>
    </div>
  </div>
  <p style="font-size:18.5px;color:#cfc9bc;margin-top:26px;font-weight:500">微量アルブミン尿を認め、早期腎症が<span class="amber">疑われる</span>（再検で持続を確認）。脂質も未介入。<br>——さて、治療をどう始めるか。</p>
</div>
""")

# 8-9. Q3/A3
qslide(8, 3, "治療選択", "食事・運動療法の指導に加えて、薬物療法は？", [
    "グリメピリド（SU薬）を開始する",
    "メトホルミンを開始する",
    "SGLT2阻害薬を開始する",
    "薬物療法は開始せず、生活習慣改善のみで3か月経過をみる",
])
aslide(9, 3, "薬は「病態」で選ぶ——肥満・腎機能保持ならこの2択",
    "メトホルミンを開始する",
    "肥満2型でeGFR 68と腎機能も保たれており、有力な第一選択。体重を増やさず低血糖が少なく、安価で長期エビデンスが豊富です。少量から漸増して消化器症状を避けます。",
    [("○","good","SGLT2阻害薬","尿アルブミン上昇があり腎保護の恩恵が期待できる。これも好手"),
     ("△","ctx","生活習慣のみで3か月","選ぶなら「達しなければ薬物開始」の期限と目標をセットで"),
     ("×","poor","SU薬","低血糖と体重増加が、この病態と真逆を向く")])

# 10. 分岐の見せ場
w(10, f"""
<img src="{A}/case01-followup.jpg" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:brightness(.4)">
<div style="position:absolute;inset:0;background:linear-gradient(to bottom,rgba(11,13,16,.6),rgba(11,13,16,.92))"></div>
{brand("3 MONTHS LATER")}
<div style="position:absolute;left:70px;top:92px;right:70px">
  <p class="chip">このアプリの核心</p>
  <p class="mincho" style="font-size:40px;color:#fff;margin-top:8px">選んだ薬で、<span class="amber">3か月後が変わる。</span></p>
  <div style="display:flex;gap:14px;margin-top:30px">
    <div style="flex:1;border-top:2px solid #57d98a;padding:16px 14px;background:rgba(18,21,27,.85)">
      <p class="mono" style="font-size:11px;color:#57d98a">メトホルミン</p>
      <p class="mincho" style="font-size:26px;margin-top:8px">7.2%</p>
      <p style="font-size:16px;color:#a9a294;margin-top:6px">体重−2kg・低血糖なし。次はLDLと腎症へ</p>
    </div>
    <div style="flex:1;border-top:2px solid #6aa9f7;padding:16px 14px;background:rgba(18,21,27,.85)">
      <p class="mono" style="font-size:11px;color:#6aa9f7">SGLT2阻害薬</p>
      <p class="mincho" style="font-size:26px;margin-top:8px">7.3%</p>
      <p style="font-size:16px;color:#a9a294;margin-top:6px">体重−2.5kg・尿アルブミン改善傾向</p>
    </div>
    <div style="flex:1;border-top:2px solid #e3b341;padding:16px 14px;background:rgba(18,21,27,.85)">
      <p class="mono" style="font-size:11px;color:#e3b341">生活習慣のみ</p>
      <p class="mincho" style="font-size:26px;margin-top:8px">8.4%</p>
      <p style="font-size:16px;color:#a9a294;margin-top:6px">−0.2%にとどまり、本人は落胆。次の一手を問われる</p>
    </div>
    <div style="flex:1;border-top:2px solid #ef7070;padding:16px 14px;background:rgba(18,21,27,.85)">
      <p class="mono" style="font-size:11px;color:#ef7070">SU薬</p>
      <p class="mincho" style="font-size:26px;margin-top:8px">7.4%</p>
      <p style="font-size:16px;color:#a9a294;margin-top:6px">運転前の低血糖1回・体重＋1.5kg。薬剤見直しへ</p>
    </div>
  </div>
  <p style="font-size:18px;color:#cfc9bc;margin-top:24px">どの道を選んでも「その後の設問」が続き、最後に自分の全選択を◎○△×で振り返る——それがこの症例トレーニングです。</p>
</div>
""")

# 11. Take Home
w(11, f"""
{brand("TAKE HOME")}
<div style="position:absolute;left:70px;top:100px;right:70px">
  <p class="chip">TAKE HOME MESSAGE</p>
  <p class="mincho" style="font-size:34px;color:#fff;margin-top:10px">初診の3手で、数年先が変わる。</p>
  <div class="hairline-strong" style="margin-top:28px">
    <div style="display:flex;gap:20px;padding:18px 2px;border-bottom:1px solid #262c37"><span class="mono dim" style="font-size:14px;padding-top:6px">01</span><span style="font-size:22px;font-weight:500;line-height:1.7">最初の仕事は「成因の見立て」と「緊急性の評価」——典型的2型と決めつけない</span></div>
    <div style="display:flex;gap:20px;padding:18px 2px;border-bottom:1px solid #262c37"><span class="mono dim" style="font-size:14px;padding-top:6px">02</span><span style="font-size:22px;font-weight:500;line-height:1.7">腎機能・尿アルブミン・脂質は初診日に揃える——治療薬の選択材料になる</span></div>
    <div style="display:flex;gap:20px;padding:18px 2px;border-bottom:1px solid #262c37"><span class="mono dim" style="font-size:14px;padding-top:6px">03</span><span style="font-size:22px;font-weight:500;line-height:1.7">薬は病態で選ぶ——肥満例はメトホルミン/SGLT2阻害薬が有力、SU薬第一選択は避ける</span></div>
  </div>
  <p style="font-size:14.5px;color:#7d8494;margin-top:24px">本スライドは教育目的の一般的な医学情報です（架空症例・糖尿病専門医監修済み）。診療は最新のガイドライン・添付文書・個々の病態に基づいて判断してください。</p>
</div>
""")

# 12. アプリ紹介（完成度の提示）
w(12, f"""
{brand("THE APP")}
<div style="position:absolute;left:70px;top:90px;width:560px">
  <div style="display:flex;align-items:center;gap:16px">
    <img src="{A}/icon-192.png" style="width:64px;height:64px;border-radius:14px">
    <div>
      <p class="mincho" style="font-size:28px;color:#fff">DM Compass Training</p>
      <p class="mono" style="font-size:13px;color:#7d8494">CASE-BASED DIABETES TRAINING</p>
    </div>
  </div>
  <p style="font-size:18.5px;line-height:1.9;margin-top:22px">いま読んだ症例を、スマホで<b class="amber">「選びながら」</b>疑似診療できます。この症例は<b class="amber">無料・登録不要</b>。</p>
  <div class="hairline-strong" style="margin-top:18px">
    <div class="labrow"><span class="dim">症例</span><span class="v">外来・病棟 15症例（継続追加）</span></div>
    <div class="labrow"><span class="dim">判定</span><span class="v">4択 → ◎○△× ＋ 専門医の思考解説</span></div>
    <div class="labrow"><span class="dim">分岐</span><span class="v">選択で経過が変わる・全選択肢を復習可</span></div>
    <div class="labrow"><span class="dim">機能</span><span class="v">テーマ別選択・進捗記録・成績表示</span></div>
    <div class="labrow"><span class="dim">品質</span><span class="v">各症例に参考文献・専門医監修を順次表示</span></div>
  </div>
</div>
<img src="{A}/phone-home.png" class="phone" style="position:absolute;right:390px;top:54px;width:292px">
<img src="{A}/phone-case01.png" class="phone" style="position:absolute;right:64px;top:54px;width:292px">
""")

# 13. CTA
w(13, f"""
<img src="{A}/case01-first-visit.jpg" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:brightness(.35)">
<div style="position:absolute;inset:0;background:linear-gradient(to bottom,rgba(11,13,16,.5),rgba(11,13,16,.9))"></div>
{brand("NEXT STEP")}
<div style="position:absolute;left:70px;top:0;bottom:0;right:70px;display:flex;flex-direction:column;justify-content:center">
  <p class="chip">この患者の続きを、自分の選択で。</p>
  <p class="mincho" style="font-size:52px;color:#fff;margin-top:12px">症例を、<span class="amber">選びながら診る。</span></p>
  <div style="display:flex;align-items:center;gap:18px;margin-top:34px">
    <img src="{A}/icon-192.png" style="width:56px;height:56px;border-radius:12px">
    <p class="mono amber" style="font-size:26px;letter-spacing:.08em">dm-compass-training.vercel.app</p>
  </div>
  <p style="font-size:18.5px;color:#cfc9bc;margin-top:18px">無料・登録不要でこの症例を最後までプレイできます。<br>調べものは無料リファレンス <b>DM Compass</b>（dm-compass.vercel.app）をどうぞ。</p>
  <p class="mono" style="font-size:13px;color:#7d8494;margin-top:26px">個人制作の医学教育教材（全症例架空）／ご意見・症例リクエストはコメントでぜひ</p>
</div>
""")

print("13 slides generated")
