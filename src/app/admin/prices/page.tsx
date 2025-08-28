'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Plus, Edit, Trash2, Search, ArrowLeft } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/contexts/AuthContext';

// ダミーデータ（実際の実装では APIから取得）
const dummyPriceData = [
  {
    id: 1,
    country: 'フランス',
    item: 'ブラックモールスキン',
    tag: 'ジャケット',
    decade: '1950s',
    price: 45000,
    condition: '良好',
    createdAt: '2024/01/15',
    updatedAt: '2024/01/15'
  },
  {
    id: 2,
    country: 'フランス',
    item: 'ブラックモールスキン',
    tag: 'ジャケット',
    decade: '1960s',
    price: 35000,
    condition: '普通',
    createdAt: '2024/01/14',
    updatedAt: '2024/01/14'
  },
  {
    id: 3,
    country: 'フランス',
    item: 'ブラックモールスキン',
    tag: 'パンツ',
    decade: '1950s',
    price: 25000,
    condition: '良好',
    createdAt: '2024/01/13',
    updatedAt: '2024/01/13'
  },
];

export default function PricesPage() {
  const { admin, isLoading } = useAuth();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [priceData, setPriceData] = useState(dummyPriceData);

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

  const filteredData = priceData.filter(item =>
    item.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.tag.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: number) => {
    if (confirm('この価格データを削除しますか？')) {
      setPriceData(priceData.filter(item => item.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-ios-gray-50 dark:bg-black">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/admin">
              <button className="p-2 rounded-lg hover:bg-ios-gray-100 dark:hover:bg-ios-gray-800 transition-colors">
                <ArrowLeft className="h-5 w-5" />
              </button>
            </Link>
            <div>
              <h1 className="large-title">価格データ管理</h1>
              <p className="text-ios-gray-500 mt-2">
                価格データの一覧・編集・削除
              </p>
            </div>
          </div>
          <Link href="/admin/prices/add">
            <button className="bg-ios-blue text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>新規追加</span>
            </button>
          </Link>
        </div>

        {/* 検索フィルター */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="h-5 w-5 mr-2" />
              検索・フィルター
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">キーワード検索</label>
                <Input
                  placeholder="アイテム名、タグ、国名で検索"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* データ一覧 */}
        <Card>
          <CardHeader>
            <CardTitle>価格データ一覧</CardTitle>
            <CardDescription>
              登録されている価格データ（{filteredData.length}件）
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredData.length === 0 ? (
                <div className="text-center py-8 text-ios-gray-500">
                  検索条件に一致するデータがありません
                </div>
              ) : (
                filteredData.map((item) => (
                  <div
                    key={item.id}
                    className="border border-ios-gray-200 dark:border-ios-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="grid md:grid-cols-6 gap-4 items-center">
                      <div>
                        <div className="font-medium">{item.item}</div>
                        <div className="text-sm text-ios-gray-500">{item.country}</div>
                      </div>
                      <div>
                        <div className="text-sm text-ios-gray-500">タグ</div>
                        <div className="font-medium">{item.tag}</div>
                      </div>
                      <div>
                        <div className="text-sm text-ios-gray-500">年代</div>
                        <div className="font-medium">{item.decade}</div>
                      </div>
                      <div>
                        <div className="text-sm text-ios-gray-500">価格</div>
                        <div className="font-medium">¥{item.price.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-sm text-ios-gray-500">状態</div>
                        <div className="font-medium">{item.condition}</div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          className="p-2 text-ios-blue hover:bg-ios-blue hover:bg-opacity-10 rounded transition-colors"
                          title="編集"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                          title="削除"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-ios-gray-100 dark:border-ios-gray-700 text-xs text-ios-gray-500">
                      作成: {item.createdAt} | 更新: {item.updatedAt}
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}