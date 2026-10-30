import type { RoleKey } from "@/lib/types";

// DBの target_roles が未設定のまま追加されたアプリの振り分け（DBの値と合算して使う）
export const ROLE_ASSIGNMENTS: Record<string, RoleKey[]> = {
  "ns-compass": ["nurses"],
  "disaster-dm-care": ["doctors", "nurses", "pharmacists"],
  "hypo-school-kit": ["general"],
  "endo-compass-training": ["doctors"],
  // CDEJ受験トラックがあるので看護師・薬剤師にも
  "dm-compass-training": ["doctors", "nurses", "pharmacists"],
};

export function rolesFor(app: { slug: string; target_roles?: string[] | null }): string[] {
  return [...new Set([...(app.target_roles ?? []), ...(ROLE_ASSIGNMENTS[app.slug] ?? [])])];
}

// トップのアプリ一覧を職種で絞り込んで開くためのハッシュ（例: /#for-doctors）
export const ROLE_HASH_PREFIX = "#for-";
