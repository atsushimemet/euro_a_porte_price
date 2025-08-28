'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Plus, Database, TrendingUp, LogOut } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';

export default function AdminDashboard() {
  const { admin, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !admin) {
      router.push('/admin/login');
    }
  }, [admin, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-ios-gray-50 dark:bg-black flex items-center justify-center">
        <div className="text-ios-gray-500">読み込み中...</div>
      </div>
    );
  }

  if (!admin) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-ios-gray-50 dark:bg-black">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="large-title">管理ダッシュボード</h1>
            <p className="text-ios-gray-500 mt-2">
              ようこそ、{admin.username}さん
            </p>
          </div>
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="text-red-600 hover:text-red-700"
          >
            <LogOut className="h-4 w-4 mr-2" />
            ログアウト
          </Button>
        </div>

        {/* クイックアクション */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Link href="/admin/prices/add">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plus className="h-5 w-5 mr-2 text-ios-blue" />
                  価格データ追加
                </CardTitle>
                <CardDescription>
                  新しい価格データを入力
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/admin/prices">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="h-5 w-5 mr-2 text-ios-blue" />
                  価格データ管理
                </CardTitle>
                <CardDescription>
                  既存の価格データを編集・削除
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/admin/analytics">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-ios-blue" />
                  統計情報
                </CardTitle>
                <CardDescription>
                  データの統計情報を確認
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>

        {/* 最近の活動 */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>最近追加されたデータ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-ios-gray-50 dark:bg-ios-gray-800 rounded-ios">
                  <div>
                    <div className="font-medium">ブラックモールスキン 1950s</div>
                    <div className="text-sm text-ios-gray-500">¥45,000</div>
                  </div>
                  <div className="text-sm text-ios-gray-500">
                    2024/01/15
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-ios-gray-50 dark:bg-ios-gray-800 rounded-ios">
                  <div>
                    <div className="font-medium">ブラックモールスキン 1960s</div>
                    <div className="text-sm text-ios-gray-500">¥35,000</div>
                  </div>
                  <div className="text-sm text-ios-gray-500">
                    2024/01/14
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>データ統計</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-ios-gray-50 dark:bg-ios-gray-800 rounded-ios">
                  <div className="text-2xl font-bold text-ios-blue">23</div>
                  <div className="text-sm text-ios-gray-500">総データ数</div>
                </div>
                <div className="text-center p-4 bg-ios-gray-50 dark:bg-ios-gray-800 rounded-ios">
                  <div className="text-2xl font-bold text-ios-blue">4</div>
                  <div className="text-sm text-ios-gray-500">年代カテゴリ</div>
                </div>
                <div className="text-center p-4 bg-ios-gray-50 dark:bg-ios-gray-800 rounded-ios">
                  <div className="text-2xl font-bold text-ios-blue">1</div>
                  <div className="text-sm text-ios-gray-500">アイテム数</div>
                </div>
                <div className="text-center p-4 bg-ios-gray-50 dark:bg-ios-gray-800 rounded-ios">
                  <div className="text-2xl font-bold text-ios-blue">4</div>
                  <div className="text-sm text-ios-gray-500">状態カテゴリ</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}