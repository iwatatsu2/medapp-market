import type { AppData } from "@/components/app-card";

export const SEED_APPS: AppData[] = [
  {
    id: "1",
    slug: "dm-compass",
    name: "DM Compass",
    tagline: "糖尿病病棟管理の計算・ガイドツール",
    description:
      "研修医・病棟担当医のための糖尿病マネジメント支援アプリ。必要エネルギー量計算、糖尿病性腎症病期分類、末梢輸液インスリン混注量、IVHインスリン混注量、スライディングスケール自動生成などの計算ツールと、インスリン製剤一覧、経口血糖降下薬、糖尿病分類、合併症リファレンスなどのガイド機能を搭載。スマートフォンに最適化されたUIで、病棟での即時参照が可能です。",
    price: 0,
    category: ["diabetes-endocrine", "resident"],
    app_url: "https://iwatatsu2.github.io/dm-compass/",
    demo_url: "https://iwatatsu2.github.io/dm-compass/",
    screenshots: ["/screenshots/dm-compass-1.png"],
    target_roles: ["doctors", "nurses"],
    developer_name: "岩本 達也",
    developer_specialty: "糖尿病内分泌代謝内科",
  },
];
