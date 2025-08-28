'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { CountrySelector } from '@/components/search/CountrySelector';
import { ItemSelector } from '@/components/search/ItemSelector';
import { TagSelector } from '@/components/search/TagSelector';
import { PriceCard } from '@/components/price/PriceCard';
import { Country, Item, Tag, PriceStats } from '@/types/database';

// モックデータ（実際の実装ではAPIから取得）
const mockCountries: Country[] = [
  { id: 1, name: 'フランス', code: 'FR', created_at: '2024-01-01T00:00:00Z' },
  { id: 2, name: 'イタリア', code: 'IT', created_at: '2024-01-01T00:00:00Z' },
  { id: 3, name: 'イギリス', code: 'GB', created_at: '2024-01-01T00:00:00Z' },
  { id: 4, name: 'ドイツ', code: 'DE', created_at: '2024-01-01T00:00:00Z' },
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

type SearchStep = 'country' | 'item' | 'tag' | 'results';

export default function SearchPage() {
  const [currentStep, setCurrentStep] = useState<SearchStep>('country');
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [results, setResults] = useState<PriceStats[]>([]);

  const [countries, setCountries] = useState<Country[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    // 実際の実装ではAPIから取得
    setCountries(mockCountries);
    setTags(mockTags);
  }, []);

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    // 実際の実装では、選択された国に基づいてアイテムを取得
    setItems(mockItems.filter(item => item.country_id === country.id));
    setCurrentStep('item');
  };

  const handleItemSelect = (item: Item) => {
    setSelectedItem(item);
    setCurrentStep('tag');
  };

  const handleTagSelect = (tags: Tag[]) => {
    setSelectedTags(tags);
    // 実際の実装では、選択された条件で価格データを検索
    // モックデータで統計計算を実行
    import('@/lib/priceStats').then(({ generateMockPriceData, calculatePriceStats }) => {
      const mockPriceData = generateMockPriceData();
      const filteredData = mockPriceData.filter(data => 
        data.item_id === selectedItem?.id &&
        tags.some(tag => tag.name === data.era || tag.name === data.condition)
      );
      const stats = calculatePriceStats(filteredData);
      setResults(stats);
    });
    setCurrentStep('results');
  };

  const handleBack = () => {
    switch (currentStep) {
      case 'item':
        setCurrentStep('country');
        setSelectedCountry(null);
        break;
      case 'tag':
        setCurrentStep('item');
        setSelectedItem(null);
        break;
      case 'results':
        setCurrentStep('tag');
        setSelectedTags([]);
        break;
    }
  };

  return (
    <div className="min-h-screen bg-ios-gray-50 dark:bg-black">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <div className="max-w-md mx-auto">
          <div className="mb-6">
            <h1 className="large-title">価格検索</h1>
            <p className="text-ios-gray-500 mt-2">
              国 → アイテム → タグの順で選択してください
            </p>
          </div>

          {currentStep === 'country' && (
            <CountrySelector
              countries={countries}
              onSelect={handleCountrySelect}
            />
          )}

          {currentStep === 'item' && selectedCountry && (
            <ItemSelector
              items={items}
              selectedCountry={selectedCountry}
              onSelect={handleItemSelect}
              onBack={handleBack}
            />
          )}

          {currentStep === 'tag' && selectedCountry && selectedItem && (
            <TagSelector
              tags={tags}
              selectedCountry={selectedCountry}
              selectedItem={selectedItem}
              onSelect={handleTagSelect}
              onBack={handleBack}
            />
          )}

          {currentStep === 'results' && (
            <div className="space-y-6">
              <button
                onClick={handleBack}
                className="text-ios-blue text-sm hover:text-ios-blue/80 transition-colors"
              >
                ← 検索条件を変更
              </button>
              
              <div>
                <div className="section-header mb-4">検索結果</div>
                <div className="text-sm text-ios-gray-500 mb-4">
                  {selectedCountry?.name} / {selectedItem?.name} / {selectedTags.map(tag => tag.name).join(', ')}
                </div>
              </div>
              
              {results.length > 0 ? (
                <div className="space-y-4">
                  {results.map((result) => (
                    <PriceCard key={result.era} priceStats={result} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-ios-gray-500 mb-2">該当する価格データが見つかりませんでした</div>
                  <div className="text-sm text-ios-gray-400">
                    検索条件を変更してお試しください
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}