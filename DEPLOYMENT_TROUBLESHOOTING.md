# デプロイトラブルシューティングガイド

## 404: NOT_FOUND エラーの解決方法

### 📋 よくある原因（重要度順）

#### 1. **プロジェクト構造の問題** ⭐⭐⭐
- Vercelはプロジェクトルートに`package.json`があることを期待します
- サブディレクトリ（例：`euro-a-porte-price/`）内にプロジェクトがある場合、404エラーが発生
- **解決方法**: サブディレクトリの内容を全てプロジェクトルートに移動

#### 2. **ビルド設定の問題** ⭐⭐⭐
- 不正な`vercel.json`設定（特に`functions`の設定ミス）
- **解決方法**: `vercel.json`を削除（Next.js 15では自動検出推奨）

#### 3. **クライアントサイドレンダリングの問題** ⭐⭐
- AuthProviderがサーバーサイドレンダリング時に利用できない
- **解決方法**: ClientWrapperコンポーネントでAuthProviderを包む

### 4. 環境変数の確認

Vercelダッシュボードで以下の環境変数が設定されているか確認してください：

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_role_key
ADMIN_JWT_SECRET=your_jwt_secret_key_here
```

### 2. Supabaseプロジェクトの確認

- Supabaseプロジェクトが有効で、正しいURLとキーが設定されているか
- データベーステーブルが正しく作成されているか（`database/schema.sql`を参照）

### 3. ビルドログの確認

Vercelのデプロイメントページで：
1. "Functions" タブを確認
2. ビルドログでエラーメッセージを確認
3. Runtime logs でエラーを確認

### 4. 一般的な解決方法

#### 方法1: 環境変数の再設定
1. Vercelダッシュボード → Settings → Environment Variables
2. 既存の環境変数を削除
3. 新しい値で再作成
4. "Redeploy" を実行

#### 方法2: vercel.jsonの確認
Next.js 15では`vercel.json`は通常不要です。もし存在する場合は削除を検討してください。
Vercelが自動でNext.jsプロジェクトを検出し、適切な設定を適用します。

#### 方法3: ローカルでのテスト
```bash
# 依存関係のインストール
npm install

# ローカルでビルドテスト
npm run build

# ローカルで起動テスト
npm run start
```

#### 方法4: 段階的デプロイ
1. まず環境変数なしでビルドが成功するか確認
2. 必要な環境変数を一つずつ追加
3. 各ステップでデプロイを確認

### 5. エラーコード別対処法

- **hnd1::zsx68-xxx**: Vercelのエッジランタイムエラー
  - 環境変数の不備が原因の可能性が高い
  - Supabaseの接続設定を確認

### 6. サポート

解決しない場合は、以下の情報を含めてサポートに連絡：
- エラーメッセージ全文
- Vercelのビルドログ
- 環境変数の設定状況（値は隠して）
- ブラウザのネットワークタブのエラー