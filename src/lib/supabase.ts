import { createClient } from '@supabase/supabase-js';

// 環境変数の取得（デフォルト値で安全に初期化）
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

// 環境変数の検証とログ出力
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  console.error('Missing env.NEXT_PUBLIC_SUPABASE_URL');
}
if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.error('Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

// Supabaseクライアントの初期化（エラーでクラッシュしないように）
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 管理者認証用のサービスロールクライアント
export const supabaseAdmin = supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey)
  : supabase;

if (!supabaseServiceKey) {
  console.warn('Missing env.SUPABASE_SERVICE_KEY - admin features will be disabled');
}