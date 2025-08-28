'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, TrendingUp, Database, Users, Calendar } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { useAuth } from '@/contexts/AuthContext';

// ダミー統計データ
const statsData = {
  totalItems: 156,
  totalPrices: 1243,
  countries: 8,
  decades: 7,
  avgPrice: 32500,
  recentActivity: 23,
  monthlyGrowth: 12.5,
  popularItems: [
    { name: 'ブラックモールスキン', count: 45, avgPrice: 38000 },
    { name: 'インディゴワーク', count: 32, avgPrice: 28000 },
    { name: 'リネンシャツ', count: 28, avgPrice: 15000 },
    { name: 'レザージャケット', count: 24, avgPrice: 85000 },
  ],
  priceRanges: [
    { range: '¥0 - ¥20,000', count: 412 },
    { range: '¥20,001 - ¥40,000', count: 523 },
    { range: '¥40,001 - ¥60,000', count: 201 },
    { range: '¥60,001 - ¥100,000', count: 87 },
    { range: '¥100,000+', count: 20 },
  ],
  countryDistribution: [
    { country: 'フランス', count: 678, percentage: 54.5 },
    { country: 'イタリア', count: 234, percentage: 18.8 },
    { country: 'ドイツ', count: 156, percentage: 12.5 },
    { country: 'その他', count: 175, percentage: 14.2 },
  ],
};

export default function AnalyticsPage() {
  const { admin, isLoading } = useAuth();
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

  return (
    <div className="min-h-screen bg-ios-gray-50 dark:bg-black">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Link href="/admin">
            <button className="p-2 rounded-lg hover:bg-ios-gray-100 dark:hover:bg-ios-gray-800 transition-colors mr-4">
              <ArrowLeft className="h-5 w-5" />
            </button>
          </Link>
          <div>
            <h1 className="large-title">統計情報</h1>
            <p className="text-ios-gray-500 mt-2">
              価格データの統計情報とアナリティクス
            </p>
          </div>
        </div>

        {/* 概要統計 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-ios-blue">{statsData.totalItems}</div>
                  <div className="text-sm text-ios-gray-500">総アイテム数</div>
                </div>
                <Database className="h-8 w-8 text-ios-blue opacity-60" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-ios-blue">{statsData.totalPrices.toLocaleString()}</div>
                  <div className="text-sm text-ios-gray-500">総価格データ数</div>
                </div>
                <TrendingUp className="h-8 w-8 text-ios-blue opacity-60" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-ios-blue">¥{statsData.avgPrice.toLocaleString()}</div>
                  <div className="text-sm text-ios-gray-500">平均価格</div>
                </div>
                <Users className="h-8 w-8 text-ios-blue opacity-60" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-green-600">+{statsData.monthlyGrowth}%</div>
                  <div className="text-sm text-ios-gray-500">月間成長率</div>
                </div>
                <Calendar className="h-8 w-8 text-green-600 opacity-60" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* 人気アイテム */}
          <Card>
            <CardHeader>
              <CardTitle>人気アイテム</CardTitle>
              <CardDescription>データ登録数の多いアイテム</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {statsData.popularItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-ios-blue bg-opacity-10 rounded-full flex items-center justify-center text-sm font-medium text-ios-blue">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-ios-gray-500">{item.count}件のデータ</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">¥{item.avgPrice.toLocaleString()}</div>
                      <div className="text-sm text-ios-gray-500">平均価格</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 価格帯分布 */}
          <Card>
            <CardHeader>
              <CardTitle>価格帯分布</CardTitle>
              <CardDescription>価格レンジ別のデータ分布</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {statsData.priceRanges.map((range, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{range.range}</span>
                      <span className="font-medium">{range.count}件</span>
                    </div>
                    <div className="w-full bg-ios-gray-200 dark:bg-ios-gray-700 rounded-full h-2">
                      <div
                        className="bg-ios-blue h-2 rounded-full"
                        style={{ width: `${(range.count / statsData.totalPrices) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 国別分布 */}
        <Card>
          <CardHeader>
            <CardTitle>国別データ分布</CardTitle>
            <CardDescription>登録データの国別内訳</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {statsData.countryDistribution.map((country, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-ios-blue rounded-full" style={{ opacity: 1 - index * 0.2 }}></div>
                      <span className="font-medium">{country.country}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{country.count}件</div>
                      <div className="text-sm text-ios-gray-500">{country.percentage}%</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-48 h-48 rounded-full border-8 border-ios-gray-200 dark:border-ios-gray-700">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-ios-blue">{statsData.totalPrices}</div>
                      <div className="text-sm text-ios-gray-500">総データ数</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}