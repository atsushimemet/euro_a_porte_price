'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { PriceStats } from '@/types/database';
import { AlertTriangle, TrendingUp, Calendar, Users } from 'lucide-react';

interface PriceCardProps {
  priceStats: PriceStats;
}

export function PriceCard({ priceStats }: PriceCardProps) {
  const formatPrice = (price: number) => `¥${price.toLocaleString()}`;
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">
            {priceStats.era}
          </CardTitle>
          {priceStats.is_unreliable && (
            <div className="flex items-center space-x-1 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded-full text-xs">
              <AlertTriangle className="h-3 w-3" />
              <span>ほぼ言い値</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 中央値（メイン価格） */}
        <div className="text-center p-4 bg-ios-blue/5 dark:bg-ios-blue/10 rounded-ios">
          <div className="text-sm text-ios-gray-500 mb-1">中央値</div>
          <div className="text-2xl font-bold text-ios-blue">
            {formatPrice(priceStats.median)}
          </div>
        </div>

        {/* 価格レンジ */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-ios-gray-50 dark:bg-ios-gray-800 rounded-ios">
            <div className="text-xs text-ios-gray-500 mb-1">25%レンジ</div>
            <div className="font-medium text-sm">
              {formatPrice(priceStats.q25)}
            </div>
          </div>
          <div className="text-center p-3 bg-ios-gray-50 dark:bg-ios-gray-800 rounded-ios">
            <div className="text-xs text-ios-gray-500 mb-1">75%レンジ</div>
            <div className="font-medium text-sm">
              {formatPrice(priceStats.q75)}
            </div>
          </div>
        </div>

        {/* 最小・最大値 */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-xs text-ios-gray-500 mb-1">最小価格</div>
            <div className="font-medium text-sm">
              {formatPrice(priceStats.min)}
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-ios-gray-500 mb-1">最大価格</div>
            <div className="font-medium text-sm">
              {formatPrice(priceStats.max)}
            </div>
          </div>
        </div>

        {/* メタ情報 */}
        <div className="border-t border-ios-gray-100 dark:border-ios-gray-700 pt-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-1 text-ios-gray-500">
              <Users className="h-3 w-3" />
              <span>サンプル数</span>
            </div>
            <span className="font-medium">{priceStats.count}件</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-1 text-ios-gray-500">
              <Calendar className="h-3 w-3" />
              <span>更新日</span>
            </div>
            <span className="font-medium">{formatDate(priceStats.updated_at)}</span>
          </div>
        </div>

        {/* 価格分布バー（視覚的表現） */}
        <div className="space-y-2">
          <div className="text-xs text-ios-gray-500">価格分布</div>
          <div className="relative h-2 bg-ios-gray-100 dark:bg-ios-gray-700 rounded-full overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
              style={{
                width: `${((priceStats.q75 - priceStats.q25) / (priceStats.max - priceStats.min)) * 100}%`,
                left: `${((priceStats.q25 - priceStats.min) / (priceStats.max - priceStats.min)) * 100}%`,
              }}
            />
            <div
              className="absolute top-0 w-0.5 h-full bg-ios-blue"
              style={{
                left: `${((priceStats.median - priceStats.min) / (priceStats.max - priceStats.min)) * 100}%`,
              }}
            />
          </div>
          <div className="flex justify-between text-xs text-ios-gray-400">
            <span>{formatPrice(priceStats.min)}</span>
            <span>{formatPrice(priceStats.max)}</span>
          </div>
        </div>

        {priceStats.is_unreliable && (
          <div className="text-xs text-yellow-700 dark:text-yellow-300 bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded-ios">
            <strong>注意:</strong> サンプル数が少ないか価格のばらつきが大きいため、参考程度にご利用ください。
          </div>
        )}
      </CardContent>
    </Card>
  );
}