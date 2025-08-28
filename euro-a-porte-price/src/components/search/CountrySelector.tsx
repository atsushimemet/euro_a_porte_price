'use client';

import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { Card } from '../ui/Card';
import { Country } from '@/types/database';

interface CountrySelectorProps {
  countries: Country[];
  onSelect: (country: Country) => void;
}

export function CountrySelector({ countries, onSelect }: CountrySelectorProps) {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const handleSelect = (country: Country) => {
    setSelectedCountry(country);
    onSelect(country);
  };

  return (
    <div className="space-y-4">
      <div className="section-header">国を選択</div>
      <div className="space-y-2">
        {countries.map((country) => (
          <Card
            key={country.id}
            padding="none"
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedCountry?.id === country.id
                ? 'ring-2 ring-ios-blue bg-ios-blue/5'
                : ''
            }`}
            onClick={() => handleSelect(country)}
          >
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-ios-gray-100 dark:bg-ios-gray-700 flex items-center justify-center">
                  <span className="text-sm font-medium">
                    {country.code}
                  </span>
                </div>
                <div>
                  <h3 className="font-medium">{country.name}</h3>
                  <p className="text-sm text-ios-gray-500">
                    {country.code}
                  </p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-ios-gray-400" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}