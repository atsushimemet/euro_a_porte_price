export interface Country {
  id: number;
  name: string;
  code: string;
  created_at: string;
}

export interface Item {
  id: number;
  name: string;
  description: string | null;
  country_id: number;
  created_at: string;
  country?: Country;
}

export interface Tag {
  id: number;
  name: string;
  category: 'era' | 'condition' | 'other';
  created_at: string;
}

export interface PriceData {
  id: number;
  item_id: number;
  tag_id: number;
  price: number;
  era: string | null;
  condition: string | null;
  source_url: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  item?: Item;
  tag?: Tag;
}

export interface ItemTag {
  id: number;
  item_id: number;
  tag_id: number;
  item?: Item;
  tag?: Tag;
}

export interface Admin {
  id: number;
  username: string;
  password_hash: string;
  is_active: boolean;
  created_at: string;
}

// 価格統計データ
export interface PriceStats {
  era: string;
  median: number;
  min: number;
  max: number;
  q25: number;
  q75: number;
  count: number;
  updated_at: string;
  is_unreliable: boolean; // サンプル不足や分散大の場合
}

// 検索結果
export interface SearchResult {
  item: Item;
  priceStats: PriceStats[];
}