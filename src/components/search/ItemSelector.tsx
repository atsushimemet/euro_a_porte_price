'use client';

import { useState } from 'react';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Item, Country } from '@/types/database';

interface ItemSelectorProps {
  items: Item[];
  selectedCountry: Country;
  onSelect: (item: Item) => void;
  onBack: () => void;
}

export function ItemSelector({ items, selectedCountry, onSelect, onBack }: ItemSelectorProps) {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const handleSelect = (item: Item) => {
    setSelectedItem(item);
    onSelect(item);
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
          {selectedCountry.name}
        </div>
      </div>

      <div className="section-header">アイテムを選択</div>
      <div className="space-y-2">
        {items.map((item) => (
          <Card
            key={item.id}
            padding="none"
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedItem?.id === item.id
                ? 'ring-2 ring-ios-blue bg-ios-blue/5'
                : ''
            }`}
            onClick={() => handleSelect(item)}
          >
            <div className="flex items-center justify-between p-4">
              <div className="flex-1">
                <h3 className="font-medium">{item.name}</h3>
                {item.description && (
                  <p className="text-sm text-ios-gray-500 mt-1">
                    {item.description}
                  </p>
                )}
              </div>
              <ChevronRight className="h-5 w-5 text-ios-gray-400" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}