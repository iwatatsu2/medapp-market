import type { AppData } from "@/components/app-card";

export const SEED_APPS: AppData[] = [
  {
    id: "1",
    slug: "dm-compass",
    name: "DM Compass",
    tagline: "糖尿病病棟管理の計算・ガイドツール",
    description:
      "研修医・病棟担当医のための糖尿病マネジメント支援アプリ。必要エネルギー量計算、糖尿病性腎症病期分類、末梢輸液インスリン混注量、IVHインスリン混注量、スライディングスケール自動生成などの計算ツールと、インスリン製剤一覧、経口血糖降下薬、糖尿病分類、合併症リファレンスなどのガイド機能を搭載。スマートフォンに最適化されたUIで、病棟での即時参照が可能です。",
    price: 980,
    category: "糖尿病内分泌代謝内科",
    app_url: "https://iwatatsu2.github.io/dm-compass/",
    demo_url: "https://iwatatsu2.github.io/dm-compass/",
    developer_name: "岩本 達也",
    developer_specialty: "糖尿病内分泌代謝内科",
  },
  {
    id: "2",
    slug: "endo-compass",
    name: "Endo Compass",
    tagline: "内分泌負荷試験のクイックリファレンス",
    description:
      "研修医・専攻医のための内分泌負荷試験・抑制試験リファレンス。HPA軸、甲状腺、成長ホルモン、性腺、副腎、カルシウム代謝など8つの内分泌軸を網羅。各試験のプロトコル、判定基準、注意事項をすぐに確認できます。当直中でもすぐに使えるダークモード対応UI。",
    price: 0,
    category: "糖尿病内分泌代謝内科",
    app_url: "https://endoguide.vercel.app/endocrine",
    demo_url: "https://endoguide.vercel.app/endocrine",
    developer_name: "岩本 達也",
    developer_specialty: "糖尿病内分泌代謝内科",
  },
  {
    id: "3",
    slug: "electrolyte-compass",
    name: "Electrolyte Compass",
    tagline: "電解質異常の鑑別・計算ツール",
    description:
      "電解質異常の鑑別と計算を支援するWebアプリ。酸塩基平衡（AG、補正HCO3、Winter式、UAG）、低Na血症（浸透圧、自由水、鑑別フロー）、高Na血症（補正Na、自由水欠乏量）、低K・高K血症（TTKG、FEK）、Ca異常（補正Ca、PTH鑑別）、Mg・P異常、AKI鑑別（FENa）の11セクションを搭載。救急・病棟での迅速な判断をサポートします。",
    price: 0,
    category: "腎臓内科",
    app_url: "https://iwatatsu2.github.io/electrolyte-compass/",
    demo_url: "https://iwatatsu2.github.io/electrolyte-compass/",
    developer_name: "岩本 達也",
    developer_specialty: "糖尿病内分泌代謝内科",
  },
];
