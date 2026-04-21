import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { getUserPurchases } from "@/lib/purchases";
import { Button } from "@/components/ui/button";

export async function PurchasedApps({ userId }: { userId: string }) {
  const purchases = await getUserPurchases(userId);

  return (
    <div className="mt-8 rounded-2xl bg-card p-8">
      <h2 className="font-serif text-lg font-medium">購入済みアプリ</h2>
      {purchases.length === 0 ? (
        <p className="mt-4 text-sm text-muted-foreground">
          まだ購入したアプリはありません。
        </p>
      ) : (
        <div className="mt-4 space-y-3">
          {purchases.map((p: { id: string; amount: number; purchased_at: string; apps: { name: string; slug: string; app_url: string } }) => (
            <div
              key={p.id}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div>
                <p className="font-medium">{p.apps?.name}</p>
                <p className="text-xs text-muted-foreground">
                  ¥{p.amount.toLocaleString()} ・{" "}
                  {new Date(p.purchased_at).toLocaleDateString("ja-JP")}
                </p>
              </div>
              <Button size="sm" variant="outline" className="gap-1" asChild>
                <Link href={`/apps/${p.apps?.slug}/view`}>
                  開く
                  <ExternalLink className="size-3" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
