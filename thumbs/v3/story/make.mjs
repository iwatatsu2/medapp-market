// ストーリーズ用 1080x1920 のHTMLを各アプリぶん書き出す（中央にv3カバー・上に問い・下にプロフィール誘導）
import fs from 'node:fs';
const A = [
  ['insucalc',            '#4A2A14', '#FFD66B', '外食の日、<br>インスリン<br>何単位にしてる？', 'InsuCalc'],
  ['aruita-map',          '#F3EAD6', '#D7261E', 'きょう、<br>どこまで歩いた？', '歩いたマップ'],
  ['dm-compass',          '#071224', '#7FD3FF', '当直で<br>「血糖600です」<br>と呼ばれたら？', 'DM Compass'],
  ['weekly-shot',         '#06C755', '#FFFFFF', '週1の注射、<br>打ち忘れたこと<br>ある？', 'WeeklyShot'],
  ['t1life',              '#C9A57A', '#2B6BE8', '1型のこと、<br>気軽に聞ける場所<br>ある？', 'T1Life'],
  ['kidney-rx',           '#F7EEDB', '#2238C9', '腎機能で<br>薬の量を調べるの、<br>めんどうじゃない？', 'KidneyRx'],
  ['glucose-diary',       '#F6EFE4', '#B5674D', '血糖の記録、<br>続いてる？', 'Glucose Diary'],
  ['pharma-dm-guide',     '#06221E', '#5EE6B8', '手術の前、<br>糖尿病の薬は<br>いつ止める？', 'PharmaDM Guide'],
  ['obesity-checker',     '#141414', '#FFB703', '「肥満」と<br>「肥満症」、<br>違いわかる？', '肥満症チェッカー'],
  ['electrolyte-compass', '#FFF4EE', '#E0473C', 'Na 118。<br>どう補正する？', 'Electrolyte Compass'],
  ['nurse-shift',         '#EDE7F6', '#E2558B', 'シフト表、<br>まだ紙で<br>管理してる？', 'Nurse Shift'],
  ['infecti-ref',         '#05070A', '#B6F36B', '肺炎の<br>最初の抗菌薬、<br>迷わない？', 'InfectiRef'],
];
const light = (hex) => { const n = parseInt(hex.slice(1), 16); const r = n >> 16, g = (n >> 8) & 255, b = n & 255; return (r * 299 + g * 587 + b * 114) / 1000 > 150; };
for (const [k, bg, ac, hook, name] of A) {
  const fg = light(bg) ? '#1E1A16' : '#FFFFFF';
  const html = `<!doctype html><html lang="ja"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@700;900&display=swap" rel="stylesheet">
<style>*{margin:0;padding:0;box-sizing:border-box}body{width:1080px;height:1920px}
.wrap{position:relative;width:1080px;height:1920px;overflow:hidden;background:${bg};color:${fg};font-family:'Zen Kaku Gothic New',sans-serif}
.glow{position:absolute;left:-200px;top:700px;width:1480px;height:900px;background:radial-gradient(closest-side,${ac}33,transparent)}
.label{position:absolute;left:80px;top:250px;font-weight:900;font-size:36px;color:${ac};letter-spacing:.06em}
h1{position:absolute;left:80px;top:320px;font-weight:900;font-size:104px;line-height:1.22;letter-spacing:-.01em}
.card{position:absolute;left:40px;top:880px;width:1000px;height:563px;border-radius:34px;overflow:hidden;transform:rotate(-2deg);box-shadow:0 40px 80px rgba(0,0,0,.35);border:6px solid ${light(bg) ? '#fff' : 'rgba(255,255,255,.9)'}}
.card img{width:100%;height:100%;display:block}
.cta{position:absolute;left:50%;top:1530px;transform:translateX(-50%);white-space:nowrap;background:#fff;color:#111;border-radius:999px;padding:30px 54px;font-weight:900;font-size:44px;box-shadow:0 14px 34px rgba(0,0,0,.25)}
.cta b{color:${light(ac) && ac !== '#FFFFFF' ? '#111' : ac === '#FFFFFF' ? '#06A548' : ac}}
.free{position:absolute;left:0;right:0;top:1665px;text-align:center;font-weight:700;font-size:32px;opacity:.85}
</style></head><body><div class="wrap"><div class="glow"></div>
<div class="label">糖尿病専門医がつくった無料アプリ</div>
<h1>${hook}</h1>
<div class="card"><img src="../out-${k}.png"></div>
<div class="cta">くわしくは <b>プロフィールのリンク</b> から 👆</div>
<div class="free">${name} ・ 無料で公開中</div>
</div></body></html>`;
  fs.writeFileSync(new URL(`./${k}.html`, import.meta.url), html);
}
console.log('wrote', A.length);
