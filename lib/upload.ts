import { createClient } from "@/lib/supabase/client";

const BUCKET = "app-images";

export async function uploadAppImage(
  file: File,
  path: string
): Promise<string> {
  const supabase = createClient();
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    upsert: true,
  });
  if (error) throw error;
  const {
    data: { publicUrl },
  } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return publicUrl;
}
