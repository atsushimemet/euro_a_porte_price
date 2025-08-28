'use client';

import { useState } from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Tag, Item, Country } from '@/types/database';

interface TagSelectorProps {
  tags: Tag[];
  selectedCountry: Country;
  selectedItem: Item;
  onSelect: (tags: Tag[]) => void;
  onBack: () => void;
}

export function TagSelector({ 
  tags, 
  selectedCountry, 
  selectedItem, 
  onSelect, 
  onBack 
}: TagSelectorProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const handleTagToggle = (tag: Tag) => {
    setSelectedTags(prev => {
      const isSelected = prev.some(t => t.id === tag.id);
      if (isSelected) {
        return prev.filter(t => t.id !== tag.id);
      } else {
        return [...prev, tag];
      }
    });
  };

  const handleSearch = () => {
    onSelect(selectedTags);
  };

  const groupedTags = tags.reduce((acc, tag) => {
    if (!acc[tag.category]) {
      acc[tag.category] = [];
    }
    acc[tag.category].push(tag);
    return acc;
  }, {} as Record<string, Tag[]>);

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'era': return '年代';
      case 'condition': return '状態';
      default: return 'その他';
    }
  };

  return (
    <div className="space-y-4">
      {/* 戻るボタン */}
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="p-1"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="text-sm text-ios-gray-500">
          {selectedCountry.name} → {selectedItem.name}
        </div>
      </div>

      <div className="section-header">タグを選択</div>

      {Object.entries(groupedTags).map(([category, categoryTags]) => (
        <div key={category} className="space-y-2">
          <h3 className="text-sm font-medium text-ios-gray-700 dark:text-ios-gray-300">
            {getCategoryName(category)}
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {categoryTags.map((tag) => {
              const isSelected = selectedTags.some(t => t.id === tag.id);
              return (
                <Card
                  key={tag.id}
                  padding="sm"
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    isSelected
                      ? 'ring-2 ring-ios-blue bg-ios-blue text-white'
                      : ''
                  }`}
                  onClick={() => handleTagToggle(tag)}
                >
                  <div className="text-center">
                    <span className="text-sm font-medium">{tag.name}</span>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      ))}

      {selectedTags.length > 0 && (
        <div className="sticky bottom-4">
          <Button
            fullWidth
            onClick={handleSearch}
            className="shadow-lg"
          >
            <Search className="h-4 w-4 mr-2" />
            価格を検索 ({selectedTags.length}個のタグ)
          </Button>
        </div>
      )}
    </div>
  );
}