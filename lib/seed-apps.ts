import type { AppData } from "@/components/app-card";

export const SEED_APPS: AppData[] = [
  {
    id: "1",
    slug: "insucalc",
    name: "InsuCalc",
    tagline: "インスリン量を簡単計算",
    description:
      "1型糖尿病患者向けのインスリン投与量計算ツール。食事のカーボ量と血糖値を入力するだけで、食事ボーラス＋補正ボーラスを自動計算。時間帯別のCIR設定、食品データベース、投与履歴管理機能搭載。PWA対応でスマホからも快適に使えます。",
    price: 0,
    category: "糖尿病内分泌代謝内科",
    app_url: "https://insucalc.vercel.app",
    demo_url: "https://insucalc.vercel.app",
    developer_name: "岩本 達也",
    developer_specialty: "糖尿病内分泌代謝内科",
  },
  {
    id: "2",
    slug: "t1life",
    name: "T1Life",
    tagline: "1型糖尿病コミュニティ",
    description:
      "1型糖尿病の当事者・家族のためのコミュニティプラットフォーム。CGM、インスリン、食事、低血糖、運動など9つのカテゴリで経験を共有。医療者と患者をつなぐ新しい形のコミュニケーションツール。",
    price: 0,
    category: "糖尿病内分泌代謝内科",
    app_url: "https://t1life.vercel.app",
    demo_url: "https://t1life.vercel.app",
    developer_name: "岩本 達也",
    developer_specialty: "糖尿病内分泌代謝内科",
  },
  {
    id: "3",
    slug: "endoguide",
    name: "内分泌負荷試験ガイド",
    tagline: "内分泌検査のクイックリファレンス",
    description:
      "研修医・専攻医のための内分泌負荷試験・抑制試験リファレンス。HPA軸、甲状腺、成長ホルモン、性腺など8つの内分泌軸を網羅。当直中でもすぐに確認できるダークモードUI。",
    price: 0,
    category: "糖尿病内分泌代謝内科",
    app_url: "https://endoguide.vercel.app",
    demo_url: "https://endoguide.vercel.app",
    developer_name: "岩本 達也",
    developer_specialty: "糖尿病内分泌代謝内科",
  },
];
