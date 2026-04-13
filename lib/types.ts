export type App = {
  id: string;
  developer_id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  category: string;
  app_url: string;
  demo_url: string | null;
  thumbnail_url: string | null;
  screenshots: string[];
  is_published: boolean;
  created_at: string;
  developer_name?: string;
  developer_specialty?: string;
};

export type Profile = {
  id: string;
  display_name: string;
  specialty: string | null;
  hospital: string | null;
  is_developer: boolean;
  created_at: string;
};

export type Purchase = {
  id: string;
  user_id: string;
  app_id: string;
  stripe_session_id: string | null;
  amount: number;
  purchased_at: string;
};

// Antaa Slide準拠の診療科カテゴリ
export const CATEGORIES = [
  { value: "all", label: "すべて" },
  // 内科系
  { value: "general-medicine", label: "内科" },
  { value: "gastroenterology", label: "消化器内科" },
  { value: "cardiology", label: "循環器内科" },
  { value: "pulmonology", label: "呼吸器内科" },
  { value: "hematology", label: "血液内科" },
  { value: "diabetes-endocrine", label: "糖尿病内分泌代謝内科" },
  { value: "nephrology", label: "腎臓内科" },
  { value: "rheumatology", label: "アレ膠リウマチ内科" },
  { value: "neurology", label: "脳神経内科" },
  { value: "general-practice", label: "総合診療科" },
  { value: "allergy", label: "アレルギー科" },
  { value: "oncology", label: "腫瘍内科" },
  { value: "geriatrics", label: "老年内科" },
  { value: "infectious-disease", label: "感染症科" },
  { value: "palliative", label: "緩和ケア科" },
  // 外科系
  { value: "surgery", label: "外科" },
  { value: "gi-surgery", label: "消化器外科" },
  { value: "thoracic-surgery", label: "呼吸器外科" },
  { value: "breast-surgery", label: "乳腺外科" },
  { value: "orthopedics", label: "整形外科" },
  { value: "neurosurgery", label: "脳神経外科" },
  { value: "urology", label: "泌尿器科" },
  { value: "plastic-surgery", label: "形成外科" },
  { value: "oral-surgery", label: "歯科口腔外科" },
  { value: "rehabilitation", label: "リハビリテーション科" },
  { value: "cardiovascular-surgery", label: "心臓血管外科" },
  { value: "head-neck-surgery", label: "頭頸部外科" },
  // その他
  { value: "emergency", label: "救急科" },
  { value: "icu", label: "集中治療科" },
  { value: "pediatrics", label: "小児科" },
  { value: "obstetrics", label: "産婦人科" },
  { value: "psychiatry", label: "精神科" },
  { value: "radiology", label: "放射線科" },
  { value: "anesthesiology", label: "麻酔科" },
  { value: "occupational-health", label: "産業医" },
  { value: "resident", label: "初期研修医" },
  { value: "kampo", label: "漢方医学" },
  { value: "basic-medicine", label: "基礎医学系" },
  { value: "dermatology", label: "皮膚科" },
  { value: "ophthalmology", label: "眼科" },
  { value: "ent", label: "耳鼻咽喉科" },
  { value: "medical-student", label: "医学生" },
  { value: "other", label: "その他" },
] as const;
