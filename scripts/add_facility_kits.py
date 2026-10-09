# -*- coding: utf-8 -*-
"""施設向け教材2本（てあて連絡帳・災害パック）をMedApp Marketに登録する
使い方: cd medapp-market && python3 scripts/add_endo_training_app.py
やること: 既存行からdeveloper_id/サムネ配置規約を自動検出 → サムネをStorageへアップ → appsへINSERT（既存slugならUPDATE）
"""
import json, pathlib, subprocess, re

ROOT = pathlib.Path(__file__).resolve().parent.parent
env = {}
for line in (ROOT / ".env.local").read_text().splitlines():
    if "=" in line and not line.strip().startswith("#"):
        k, v = line.split("=", 1)
        env[k.strip()] = v.strip().strip('"')
URL, KEY = env["NEXT_PUBLIC_SUPABASE_URL"], env["SUPABASE_SERVICE_ROLE_KEY"]
H = ["-H", f"apikey: {KEY}", "-H", f"Authorization: Bearer {KEY}"]

def api(method, path, data=None, extra=None, raw=None):
    cmd = ["curl", "-s", "-X", method, f"{URL}{path}", *H]
    if extra: cmd += extra
    if data is not None: cmd += ["-H", "Content-Type: application/json", "-d", json.dumps(data)]
    if raw: cmd += raw
    return subprocess.run(cmd, capture_output=True, text=True).stdout

# 1) 既存行から規約を検出
rows = json.loads(api("GET", "/rest/v1/apps?select=developer_id,thumbnail_url&limit=1&thumbnail_url=not.is.null"))
assert rows, "appsテーブルから既存行を取得できません"
dev_id = rows[0]["developer_id"]
thumb_sample = rows[0]["thumbnail_url"]
print("developer_id:", dev_id)


m = re.search(r"/storage/v1/object/public/([^/]+)/", thumb_sample)
bucket = m.group(1) if m else "thumbnails"

def upsert(app, thumb_file):
    obj = app["slug"] + ".jpg"
    api("POST", f"/storage/v1/object/{bucket}/{obj}",
        extra=["-H", "Content-Type: image/jpeg", "-H", "x-upsert: true"],
        raw=["--data-binary", f"@{ROOT}/scripts/{thumb_file}"])
    app = {**app, "developer_id": dev_id, "price": 0, "screenshots": [], "is_published": True,
           "thumbnail_url": f"{URL}/storage/v1/object/public/{bucket}/{obj}"}
    ex = json.loads(api("GET", f"/rest/v1/apps?select=id&slug=eq.{app['slug']}"))
    if ex:
        r = api("PATCH", f"/rest/v1/apps?id=eq.{ex[0]['id']}", data=app, extra=["-H", "Prefer: return=minimal"])
        print("UPDATED", app["slug"], r[:120])
    else:
        r = api("POST", "/rest/v1/apps", data=app, extra=["-H", "Prefer: return=minimal"])
        print("INSERTED", app["slug"], r[:120])

upsert({
    "slug": "hypo-school-kit",
    "name": "てあて連絡帳｜低血糖対応 研修キット",
    "tagline": "低血糖のとき、まわりの大人がすぐ動ける。学校・園の先生向け",
    "description": "1型糖尿病の子どもが低血糖になったとき、学校・保育園・学童・スポーツクラブの先生がすぐ動けるようにするための教材です。低血糖のサインと基本対応の掲示カード（A4・印刷可）と、体育の授業のシナリオは無料・登録不要で使えます。職員研修としてまとめて使いたい施設向けに、全シナリオ演習・確認テスト・修了証つきの施設ライセンス（年額9,800円）もあります。糖尿病専門医 Dr.いわたつ 作成。",
    "category": ["糖尿病", "学校・保育", "低血糖"],
    "app_url": "https://hypo-school-kit.vercel.app/?utm_source=medapp&utm_medium=market",
}, "thumbnail-hypo-school-kit.jpg")

upsert({
    "slug": "disaster-dm-care",
    "name": "災害時の糖尿病ケア 研修パック",
    "tagline": "発災直後から避難所・仮設まで。災害時の糖尿病ケアを症例で",
    "description": "災害時に糖尿病のある人を支えるための、医療機関・薬局・訪問看護・介護施設向けの教材です。患者さんとご家族向けの「災害への備えチェックリスト」は無料・登録不要で印刷できます。発災直後・避難所・慢性期のシナリオ演習、確認テスト、施設の備えチェックシート、患者指導用の配布資料は施設ライセンス（年額19,800円）で利用できます。糖尿病専門医 Dr.いわたつ 作成。",
    "category": ["糖尿病", "災害医療", "医療者教育"],
    "app_url": "https://disaster-dm-care.vercel.app/?utm_source=medapp&utm_medium=market",
}, "thumbnail-disaster-dm-care.jpg")
