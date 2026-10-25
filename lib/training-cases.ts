// 無料ツール → 症例トレーニングへの入口（medapp）。
// 対応する症例がある場所にだけ置く。タイトルは症例側の表記そのまま（~/Desktop/Claude-Projects/revenue-report/check_entries.py が照合・URLの200も確認）。
// utm: utm_source=medapp / utm_medium=tool / utm_campaign=<場所>
export type TrainingCase = { app: 'dm' | 'endo'; title: string; free: boolean; url: string };

export const TRAINING_CASES: Record<string, TrainingCase> = {
  // DM Compass → 初診・薬剤選択症例
  "dm-compass": {
    app: 'dm',
    title: "健診でHbA1c 8.7%を指摘された62歳男性",
    free: true,
    url: 'https://dm-compass-training.vercel.app/case/kenshin-hba1c-87?utm_source=medapp&utm_medium=tool&utm_campaign=app-dm-compass',
  },
  // Endo Compass（負荷試験）→ 副腎クリーゼ症例
  "endo-compass": {
    app: 'endo',
    title: "深夜、ステロイドを3日止めた関節リウマチの58歳がショックで運ばれてきた——採血は出していい、でも結果は待てるか？",
    free: true,
    url: 'https://endo-compass-training.vercel.app/case/endo-adrenal-crisis-58?utm_source=medapp&utm_medium=tool&utm_campaign=app-endo-compass',
  },
  // Electrolyte Compass → 重症低ナトリウム血症症例
  "electrolyte-compass": {
    app: 'endo',
    title: "Na110で痙攣する72歳——『早く正常に戻したい』その焦りが、数日後に話せなくなる原因になる",
    free: false,
    url: 'https://endo-compass-training.vercel.app/case/endo-severe-hyponatremia-72?utm_source=medapp&utm_medium=tool&utm_campaign=app-electrolyte-compass',
  },
  // PharmaDM Guide（休薬）→ 周術期管理症例
  "pharma-dm-guide": {
    app: 'dm',
    title: "大腸癌手術を控えたHbA1c 8.1%の70歳男性",
    free: false,
    url: 'https://dm-compass-training.vercel.app/case/periop-insulin-70?utm_source=medapp&utm_medium=tool&utm_campaign=app-pharma-dm-guide',
  },
  // KidneyRx（腎機能別用量）→ CKD・メトホルミン症例
  "kidney-rx": {
    app: 'dm',
    title: "eGFR 38を指摘されたメトホルミン内服中の58歳男性",
    free: false,
    url: 'https://dm-compass-training.vercel.app/case/ckd-metformin-58?utm_source=medapp&utm_medium=tool&utm_campaign=app-kidney-rx',
  },
  // InsuCalc → インスリン導入症例
  "insucalc": {
    app: 'dm',
    title: "血糖348 mg/dL・HbA1c 11.2%で入院した未治療糖尿病の60歳男性",
    free: false,
    url: 'https://dm-compass-training.vercel.app/case/insulin-intro-60?utm_source=medapp&utm_medium=tool&utm_campaign=app-insucalc',
  },
};
