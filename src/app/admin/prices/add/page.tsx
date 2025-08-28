'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';
import { Country, Item, Tag } from '@/types/database';

// モックデータ（実際の実装ではAPIから取得）
const mockCountries: Country[] = [
  { id: 1, name: 'フランス', code: 'FR', created_at: '2024-01-01T00:00:00Z' },
];

const mockItems: Item[] = [
  {
    id: 1,
    name: 'ブラックモールスキン',
    description: 'モンサンミッシェル等で使用された作業着',
    country_id: 1,
    created_at: '2024-01-01T00:00:00Z',
  },
];

const mockTags: Tag[] = [
  { id: 1, name: '1940s', category: 'era', created_at: '2024-01-01T00:00:00Z' },
  { id: 2, name: '1950s', category: 'era', created_at: '2024-01-01T00:00:00Z' },
  { id: 3, name: '1960s', category: 'era', created_at: '2024-01-01T00:00:00Z' },
  { id: 4, name: '1970s', category: 'era', created_at: '2024-01-01T00:00:00Z' },
  { id: 5, name: 'デッドストック', category: 'condition', created_at: '2024-01-01T00:00:00Z' },
  { id: 6, name: '極美品', category: 'condition', created_at: '2024-01-01T00:00:00Z' },
  { id: 7, name: '美品', category: 'condition', created_at: '2024-01-01T00:00:00Z' },
  { id: 8, name: '良品', category: 'condition', created_at: '2024-01-01T00:00:00Z' },
];

interface FormData {
  itemId: string;
  tagId: string;
  price: string;
  era: string;
  condition: string;
  sourceUrl: string;
  notes: string;
}

export default function AddPricePage() {
  const { admin, isLoading } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    itemId: '',
    tagId: '',
    price: '',
    era: '',
    condition: '',
    sourceUrl: '',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      // 実際の実装ではAPIエンドポイントに送信
      console.log('Submitting price data:', formData);
      
      // モック成功処理
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess(true);
      setFormData({
        itemId: '',
        tagId: '',
        price: '',
        era: '',
        condition: '',
        sourceUrl: '',
        notes: '',
      });
      
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      setError('データの保存に失敗しました');
    } finally {
      setIsSubmitting(false);
    }
  };

  const eraTags = mockTags.filter(tag => tag.category === 'era');
  const conditionTags = mockTags.filter(tag => tag.category === 'condition');

  return (
    <div className="min-h-screen bg-ios-gray-50 dark:bg-black">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center space-x-4 mb-6">
            <Link href="/admin">
              <Button variant="ghost" size="sm" className="p-1">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="large-title">価格データ追加</h1>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>新しい価格データ</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* アイテム選択 */}
                <div className="space-y-2">
                  <label htmlFor="itemId" className="text-sm font-medium">
                    アイテム
                  </label>
                  <select
                    id="itemId"
                    name="itemId"
                    value={formData.itemId}
                    onChange={handleInputChange}
                    className="flex h-10 w-full rounded-ios border border-ios-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ios-blue dark:border-ios-gray-700 dark:bg-ios-gray-800"
                    required
                  >
                    <option value="">アイテムを選択</option>
                    {mockItems.map(item => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 年代選択 */}
                <div className="space-y-2">
                  <label htmlFor="era" className="text-sm font-medium">
                    年代
                  </label>
                  <select
                    id="era"
                    name="era"
                    value={formData.era}
                    onChange={handleInputChange}
                    className="flex h-10 w-full rounded-ios border border-ios-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ios-blue dark:border-ios-gray-700 dark:bg-ios-gray-800"
                    required
                  >
                    <option value="">年代を選択</option>
                    {eraTags.map(tag => (
                      <option key={tag.id} value={tag.name}>
                        {tag.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 状態選択 */}
                <div className="space-y-2">
                  <label htmlFor="condition" className="text-sm font-medium">
                    状態
                  </label>
                  <select
                    id="condition"
                    name="condition"
                    value={formData.condition}
                    onChange={handleInputChange}
                    className="flex h-10 w-full rounded-ios border border-ios-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ios-blue dark:border-ios-gray-700 dark:bg-ios-gray-800"
                    required
                  >
                    <option value="">状態を選択</option>
                    {conditionTags.map(tag => (
                      <option key={tag.id} value={tag.name}>
                        {tag.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 価格入力 */}
                <div className="space-y-2">
                  <label htmlFor="price" className="text-sm font-medium">
                    価格（円）
                  </label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="例: 45000"
                    required
                  />
                </div>

                {/* 根拠URL（任意） */}
                <div className="space-y-2">
                  <label htmlFor="sourceUrl" className="text-sm font-medium">
                    根拠URL（任意）
                  </label>
                  <Input
                    id="sourceUrl"
                    name="sourceUrl"
                    type="url"
                    value={formData.sourceUrl}
                    onChange={handleInputChange}
                    placeholder="https://example.com"
                  />
                </div>

                {/* 備考（任意） */}
                <div className="space-y-2">
                  <label htmlFor="notes" className="text-sm font-medium">
                    備考（任意）
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={3}
                    className="flex w-full rounded-ios border border-ios-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ios-blue dark:border-ios-gray-700 dark:bg-ios-gray-800"
                    placeholder="追加の情報があれば記入してください"
                  />
                </div>

                {error && (
                  <div className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 p-3 rounded-ios">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="text-sm text-green-500 bg-green-50 dark:bg-green-900/20 p-3 rounded-ios">
                    価格データが正常に追加されました
                  </div>
                )}

                <Button
                  type="submit"
                  fullWidth
                  disabled={isSubmitting}
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isSubmitting ? '保存中...' : '保存'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}