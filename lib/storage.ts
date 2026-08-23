import { createClient } from "@supabase/supabase-js";

const BUCKET = "portfolio";

let client: ReturnType<typeof createClient> | null = null;

function supabase() {
  if (!client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) throw new Error("Supabase storage is not configured");
    client = createClient(url, key, { auth: { persistSession: false } });
  }
  return client;
}

async function ensureBucket(): Promise<void> {
  const { data } = await supabase().storage.getBucket(BUCKET);
  if (!data) {
    await supabase().storage.createBucket(BUCKET, { public: true });
  }
}

export async function uploadImage(
  file: File,
  folder: string,
): Promise<string> {
  await ensureBucket();
  const ext = (file.name.split(".").pop() ?? "webp").toLowerCase();
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  const { error } = await supabase().storage
    .from(BUCKET)
    .upload(path, buffer, {
      contentType: file.type || "application/octet-stream",
      upsert: false,
    });
  if (error) throw new Error(error.message);
  const { data } = supabase().storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export function isStorageConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
}
