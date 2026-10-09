# -*- coding: utf-8 -*-
"""Antaa編集可能版の表紙(スライド1)だけを『顔出し版』に差し替える外科手術スクリプト。
左=フック文言 / 右=Dr.いわたつ白衣ポートレート（境界に琥珀ライン）。
使い方: python3 swap_cover_face.py
"""
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from pptx.oxml.ns import qn
from PIL import Image
import pathlib

D = pathlib.Path(__file__).resolve().parent
INK = RGBColor(0x0B, 0x0D, 0x10)
LINE = RGBColor(0x3A, 0x42, 0x52)
AMBER = RGBColor(0xE8, 0xB0, 0x4B)
PAPER = RGBColor(0xF5, 0xF2, 0xEA)
DIM = RGBColor(0xDD, 0xD8, 0xCC)
WHITE = RGBColor(0xFF, 0xFF, 0xFF)
MINCHO, GOTHIC, MONO = "游明朝", "游ゴシック", "Courier New"

# 表紙右パネル用ポートレート（上寄せ・アスペクト5.2:7.5）
src = Image.open("/Users/iwamototatsuya/Desktop/Claude-Projects/dm-compass-training/public/author.jpg")
w, h = src.size
nw = int(h * (5.2 / 7.5))
x0 = max(0, (w - nw) // 2)
cover_img = D / "assets/author-cover.jpg"
src.crop((x0, 0, x0 + nw, h)).save(cover_img, quality=88)

def set_font(run, size, bold, color, font):
    f = run.font
    f.size = Pt(size); f.bold = bold; f.color.rgb = color; f.name = font
    rPr = run._r.get_or_add_rPr()
    for tag in ("latin", "ea", "cs"):
        el = rPr.find(qn("a:" + tag))
        if el is None:
            el = rPr.makeelement(qn("a:" + tag), {}); rPr.append(el)
        el.set("typeface", font)

def txt(s, x, y, w_, h_, paras, spacing=1.2):
    tb = s.shapes.add_textbox(Inches(x), Inches(y), Inches(w_), Inches(h_))
    tf = tb.text_frame; tf.word_wrap = True
    tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0
    for i, para in enumerate(paras):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.line_spacing = spacing; p.space_after = Pt(4)
        for t, size, bold, color, font in para:
            r = p.add_run(); r.text = t
            set_font(r, size, bold, color, font)
    return tb

prs = Presentation(str(D / "DM_Compass_vol4_考える症例_健診HbA1c87_編集可能版.pptx"))
s = prs.slides[0]
for shp in list(s.shapes):
    shp._element.getparent().remove(shp._element)
s.background.fill.solid(); s.background.fill.fore_color.rgb = INK

from PIL import ImageDraw as _ID
DPI = 150  # 焼き込み画像の解像度
def px(inch): return int(inch * DPI)

AUTH_W = 4.3                    # 右：医師パネル幅
LPW = 13.333 - AUTH_W          # 左：患者パネル幅
PW, PH = px(LPW), px(7.5)

# ── 左パネル: 患者写真を縦フル被覆で切り出し、下グラデ＋上バー影を焼き込む ──
src = Image.open("/Users/iwamototatsuya/Desktop/Claude-Projects/dm-compass-training/public/images/case01-first-visit.jpg").convert("RGB")
sw, sh = src.size
scale = max(PW/sw, PH/sh)
rp = src.resize((int(sw*scale), int(sh*scale)), Image.LANCZOS)
# 人物（中央やや左）が収まるよう、やや左寄せでクロップ
cx = int(rp.width * 0.42)
left = min(max(0, cx - PW//2), rp.width - PW)
patient = rp.crop((left, 0, left + PW, PH))
ov = Image.new("L", (PW, PH), 0); dd = _ID.Draw(ov)
for y in range(PH):
    t = y / PH
    a = 0
    if t < 0.12:                         # 上：ブランドバー用に軽く
        a = int((0.12 - t) / 0.12 * 90)
    if t > 0.52:                         # 下52%以降を徐々に暗く→文字が映える
        a = max(a, int(min(1.0, (t - 0.52) / 0.33) * 235))
    dd.line([(0, y), (PW, y)], fill=a)
patient = Image.composite(Image.new("RGB", (PW, PH), INK), patient, ov)
left_img = D / "assets/cover-left.jpg"; patient.save(left_img, quality=90)
s.shapes.add_picture(str(left_img), 0, 0, width=Inches(LPW), height=Inches(7.5))

# ── 右パネル: 医師ポートレート（下グラデ焼き込み）──
src2 = Image.open("/Users/iwamototatsuya/Desktop/Claude-Projects/dm-compass-training/public/author.jpg").convert("RGB")
AW, AH = px(AUTH_W), px(7.5)
w0, h0 = src2.size
sc2 = max(AW/w0, AH/h0)
r2 = src2.resize((int(w0*sc2), int(h0*sc2)), Image.LANCZOS)
lx = (r2.width - AW)//2
auth = r2.crop((lx, 0, lx+AW, AH))
ov2 = Image.new("L", (AW, AH), 0); d2 = _ID.Draw(ov2)
for y in range(AH):
    t = y / AH
    a = int(min(1.0, (t - 0.60) / 0.28) * 225) if t > 0.60 else 0
    d2.line([(0, y), (AW, y)], fill=a)
auth = Image.composite(Image.new("RGB", (AW, AH), INK), auth, ov2)
auth_img = D / "assets/author-strip.jpg"; auth.save(auth_img, quality=90)
s.shapes.add_picture(str(auth_img), Inches(LPW), 0, width=Inches(AUTH_W), height=Inches(7.5))
# 境界の琥珀ライン
bar2 = s.shapes.add_shape(1, Inches(LPW - 0.025), 0, Inches(0.05), Inches(7.5))
bar2.fill.solid(); bar2.fill.fore_color.rgb = AMBER; bar2.line.fill.background(); bar2.shadow.inherit = False

# ── 左パネルのテキスト（下部にまとめる・帯なし）──
txt(s, 0.55, 0.3, 8, 0.3, [[("DM COMPASS TRAINING — 考える症例  VOL.4", 11, True, RGBColor(0xEC,0xE8,0xDE), MONO)]])
txt(s, 0.55, 4.55, LPW-0.8, 0.35, [[("CASE 01 · 62歳男性 · 専門医監修済み", 13, True, AMBER, MONO)]])
txt(s, 0.55, 5.0, LPW-0.8, 1.6, [[("健診でHbA1c ", 40, True, WHITE, MINCHO), ("8.7%", 40, True, AMBER, MINCHO), ("。", 40, True, WHITE, MINCHO)],
                                 [("あなたなら、どうする？", 40, True, WHITE, MINCHO)]], spacing=1.14)
txt(s, 0.55, 6.72, LPW-0.8, 0.6, [[("自覚症状なしの初診。最初の3手で、数年先の予後が変わる。", 15, True, PAPER, GOTHIC)]])

# ── 右パネルのテキスト（下部）──
RX = LPW + 0.3
txt(s, RX, 5.78, AUTH_W-0.55, 0.35, [[("出題・監修", 13, True, AMBER, MONO)]])
txt(s, RX, 6.2, AUTH_W-0.55, 0.5, [[("Dr.いわたつ", 30, True, WHITE, MINCHO)]])
txt(s, RX, 6.78, AUTH_W-0.45, 0.6, [[("糖尿病・内分泌内科", 13, True, RGBColor(0xEC,0xE8,0xDE), GOTHIC)], [("専門医・指導医／医学博士", 13, True, RGBColor(0xEC,0xE8,0xDE), GOTHIC)]], spacing=1.25)

prs.save(str(D / "DM_Compass_vol4_考える症例_健診HbA1c87_編集可能版.pptx"))
print("表紙: 患者主役＋監修者チップ版に差し替え完了")
