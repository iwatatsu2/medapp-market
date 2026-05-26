export interface ToolData {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  emoji: string;
  url: string;
  tags: string[];
  color: string;
  thumbnail_url?: string;
  screenshots?: string[];
}

export const SEED_TOOLS: ToolData[] = [
  {
    slug: "morning-checker",
    name: "あさのしたく チェッカー",
    tagline: "こどもの朝・夜の準備をイラストでチェック",
    description:
      "4歳〜小学生向け。かわいいイラストをタッチして、朝や夜の準備を楽しく習慣化。\n\n【特徴】\n・1〜4人対応（きょうだいでも使える）\n・朝モード／夜モード切替\n・名前・性別・タスクをカスタマイズ\n・絵文字＋テキストで自由タスク追加OK\n・月〜金の5日間連続達成でごほうび演出\n・登録不要、無料、タブレット横画面推奨",
    emoji: "🌅",
    url: "https://morning-checker.vercel.app",
    tags: ["子育て", "無料", "登録不要"],
    color: "from-orange-400 to-pink-500",
  },
];
