# Euro a porte Price

ユーロヴィンテージの年代別相場を直感的に確認できるサイト

## 概要

Euro a porte Priceは、フランスをはじめとするヨーロッパのヴィンテージアイテム（特にブラックモールスキン・モンサンミッシェル等）の年代別相場を直感的に確認できるWebアプリケーションです。

価格は管理者が円で手動入稿し、iOSアプリ風デザインで検索・表示します。

## 主な機能

### 🔍 階層検索
- 国 → アイテム → タグの3ステップで相場をシンプルに確認
- 直感的な操作でスムーズな検索体験

### 📊 年代別価格表示
- 中央値・25–75%レンジ・サンプル数・更新日を年代別カードで表示
- 価格分布の可視化
- サンプル不足や分散大は「ほぼ言い値」で明示

### 🔐 管理機能
- 固定2アカウントによるセキュアな管理システム
- 価格データの追加・編集機能
- 統計情報ダッシュボード

### 🎨 モダンなUI/UX
- iOSアプリ風デザイン
- ダークモード対応
- レスポンシブデザイン

## 技術スタック

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, カスタムiOS風デザイン
- **Database**: PostgreSQL (Supabase推奨)
- **Authentication**: JWT (固定2アカウント)
- **Icons**: Lucide React
- **Deployment**: Vercel推奨

## 開発環境セットアップ

### 前提条件
- Node.js 18以上
- npm または yarn

### インストール
```bash
# リポジトリのクローン
git clone <repository-url>
cd euro-a-porte-price

# 依存関係のインストール
npm install

# 環境変数の設定
cp .env.local.example .env.local
```

### 環境変数の設定
`.env.local`ファイルに以下の値を設定してください：

```env
# Supabase設定
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_key

# 管理者認証用
ADMIN_JWT_SECRET=your_jwt_secret
ADMIN_PASSWORD_SALT=your_password_salt
```

### データベースセットアップ
```bash
# 1. Supabaseプロジェクトを作成
# 2. database/schema.sqlをSupabaseのSQL Editorで実行
# 3. (オプション) database/sample_data.sqlでサンプルデータを追加
```

### 開発サーバーの起動
```bash
npm run dev
```

http://localhost:3000 でアプリケーションにアクセスできます。

## 管理者ログイン

開発環境では以下のテストアカウントが利用できます：

- **ユーザー名**: admin1 / **パスワード**: password123
- **ユーザー名**: admin2 / **パスワード**: password123

管理画面: http://localhost:3000/admin/login

## ディレクトリ構造

```
src/
├── app/                    # Next.js App Router
│   ├── admin/             # 管理画面
│   ├── api/               # API Routes
│   └── search/            # 検索ページ
├── components/            # Reactコンポーネント
│   ├── layout/           # レイアウトコンポーネント
│   ├── price/            # 価格表示コンポーネント
│   ├── search/           # 検索関連コンポーネント
│   └── ui/               # 基本UIコンポーネント
├── contexts/             # React Context
├── lib/                  # ユーティリティ関数
└── types/                # TypeScript型定義

database/
├── schema.sql            # データベーススキーマ
└── sample_data.sql       # サンプルデータ
```

## ターゲットユーザー

### バイヤー・コレクター
仕入れや購入の判断材料として相場情報を活用

### 出品者
適正な価格設定のための参考データを取得

### ショップ・メディア
記事や商品説明での相場引用に利用

## デプロイ

### Vercel (推奨)
```bash
# Vercel CLIを使用
npx vercel

# または GitHubと連携してデプロイ
```

### 環境変数の設定
Vercelでの本番環境では、以下の環境変数を設定してください：

**必須の環境変数:**
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_role_key
ADMIN_JWT_SECRET=your_jwt_secret_key_here
```

**Vercelでの設定方法:**
1. Vercelダッシュボードでプロジェクトを選択
2. Settings → Environment Variables
3. 上記の環境変数を追加
4. デプロイを再実行

**404エラーの場合:**
- 環境変数が正しく設定されているか確認
- Supabaseプロジェクトが有効か確認
- ビルドログでエラーがないか確認

## ライセンス

このプロジェクトは私的利用を目的として開発されています。

## 貢献

バグ報告や機能要望は Issues でお知らせください。