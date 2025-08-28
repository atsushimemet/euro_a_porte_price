import Link from 'next/link';
import { Search, TrendingUp, Database } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function Home() {
  return (
    <div className="min-h-screen bg-ios-gray-50 dark:bg-black">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* ヒーローセクション */}
        <div className="text-center mb-12">
          <h1 className="large-title mb-4">
            Euro a porte Price
          </h1>
          <p className="text-lg text-ios-gray-600 dark:text-ios-gray-300 mb-8 max-w-2xl mx-auto">
            ユーロヴィンテージの年代別相場を直感的に確認できるサイト。
            価格は管理者が円で手動入稿し、iOSアプリ風デザインで検索・表示します。
          </p>
          <Link href="/search">
            <Button size="lg" className="shadow-lg">
              <Search className="h-5 w-5 mr-2" />
              価格を検索する
            </Button>
          </Link>
        </div>

        {/* 機能紹介 */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Search className="h-5 w-5 mr-2 text-ios-blue" />
                階層検索
              </CardTitle>
              <CardDescription>
                国 → アイテム → タグの3ステップで相場をシンプルに確認
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-ios-blue" />
                年代別表示
              </CardTitle>
              <CardDescription>
                中央値・25–75%レンジ・サンプル数・更新日を年代別カードで表示
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="h-5 w-5 mr-2 text-ios-blue" />
                信頼性指標
              </CardTitle>
              <CardDescription>
                サンプル不足や分散大は「ほぼ言い値」で明示
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* ターゲット紹介 */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">こんな方におすすめ</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>バイヤー・コレクター</CardTitle>
                <CardDescription>
                  仕入れや購入の判断材料として相場情報を活用
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>出品者</CardTitle>
                <CardDescription>
                  適正な価格設定のための参考データを取得
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>ショップ・メディア</CardTitle>
                <CardDescription>
                  記事や商品説明での相場引用に利用
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* 注目アイテム */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-center">注目アイテム</h2>
          <div className="max-w-md mx-auto">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle>ブラックモールスキン</CardTitle>
                <CardDescription>
                  モンサンミッシェル等で使用された作業着
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-ios-gray-500">産地</span>
                    <div className="font-medium">フランス</div>
                  </div>
                  <div>
                    <span className="text-ios-gray-500">年代</span>
                    <div className="font-medium">1940s-1970s</div>
                  </div>
                </div>
                <Link href="/search">
                  <Button variant="ghost" className="w-full mt-4">
                    価格を確認する
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
