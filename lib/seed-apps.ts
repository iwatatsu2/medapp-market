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
  {
    id: "2",
    slug: "psych-agitation",
    name: "不穏時対応ガイド",
    tagline: "精神科入院患者の不穏時対応クイックリファレンス",
    description:
      "精神科病棟での不穏時対応を素早く確認できるWebアプリ。軽度（興奮・焦燥）→中等度（暴言・拒薬）→重度（暴力・自傷他害）の3段階に分けた対応フローチャートと使用薬剤一覧を収録。環境調整の具体策、リスペリドン内用液からの段階的エスカレーション、オランザピン筋注時のベンゾ併用禁忌など実臨床に即した内容。せん妄対応ガイド（過活動型/低活動型/混合型の鑑別、薬物療法、アルコール離脱せん妄）も搭載。ダークモード対応で夜間当直にも最適。",
    price: 0,
    category: ["psychiatry", "emergency", "resident"],
    app_url: "https://psych-agitation.vercel.app",
    demo_url: "https://psych-agitation.vercel.app",
    screenshots: [],
    target_roles: ["doctors", "nurses"],
    developer_name: "岩本 達也",
    developer_specialty: "糖尿病内分泌代謝内科",
  },
];
