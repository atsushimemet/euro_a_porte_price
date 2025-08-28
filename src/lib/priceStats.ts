import { PriceData, PriceStats } from '@/types/database';

/**
 * 配列の中央値を計算
 */
function calculateMedian(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  
  if (sorted.length % 2 === 0) {
    return (sorted[mid - 1] + sorted[mid]) / 2;
  }
  return sorted[mid];
}

/**
 * 配列のパーセンタイルを計算
 */
function calculatePercentile(values: number[], percentile: number): number {
  const sorted = [...values].sort((a, b) => a - b);
  const index = (percentile / 100) * (sorted.length - 1);
  
  if (index === Math.floor(index)) {
    return sorted[index];
  }
  
  const lower = Math.floor(index);
  const upper = Math.ceil(index);
  const weight = index - lower;
  
  return sorted[lower] * (1 - weight) + sorted[upper] * weight;
}

/**
 * 価格データから統計情報を計算
 */
export function calculatePriceStats(priceData: PriceData[]): PriceStats[] {
  // 年代別にグループ化
  const groupedByEra = priceData.reduce((acc, data) => {
    const era = data.era || 'unknown';
    if (!acc[era]) {
      acc[era] = [];
    }
    acc[era].push(data);
    return acc;
  }, {} as Record<string, PriceData[]>);

  const stats: PriceStats[] = [];

  Object.entries(groupedByEra).forEach(([era, eraData]) => {
    const prices = eraData.map(d => d.price);
    const count = prices.length;
    
    // サンプル数が少ない場合は信頼性を低く設定
    const isUnreliable = count < 10;
    
    // 価格の分散を計算して、分散が大きい場合も信頼性を低く設定
    const mean = prices.reduce((sum, price) => sum + price, 0) / count;
    const variance = prices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) / count;
    const standardDeviation = Math.sqrt(variance);
    const coefficientOfVariation = standardDeviation / mean;
    
    // 変動係数が0.5を超える場合は分散が大きいと判断
    const hasHighVariance = coefficientOfVariation > 0.5;
    
    const stat: PriceStats = {
      era,
      median: Math.round(calculateMedian(prices)),
      min: Math.min(...prices),
      max: Math.max(...prices),
      q25: Math.round(calculatePercentile(prices, 25)),
      q75: Math.round(calculatePercentile(prices, 75)),
      count,
      updated_at: eraData.reduce((latest, data) => 
        new Date(data.updated_at) > new Date(latest) ? data.updated_at : latest,
        eraData[0].updated_at
      ),
      is_unreliable: isUnreliable || hasHighVariance,
    };
    
    stats.push(stat);
  });

  // 年代順にソート（1940s, 1950s, 1960s, 1970s...）
  return stats.sort((a, b) => {
    const eraA = parseInt(a.era.replace(/\D/g, ''));
    const eraB = parseInt(b.era.replace(/\D/g, ''));
    return eraA - eraB;
  });
}

/**
 * モックデータ生成（開発用）
 */
export function generateMockPriceData(): PriceData[] {
  const mockData: PriceData[] = [];
  
  // 1950s データ（信頼性高）
  const prices1950s = [45000, 52000, 48000, 55000, 42000, 50000, 38000, 40000, 43000, 35000, 41000, 46000, 37000, 39000, 44000];
  prices1950s.forEach((price, index) => {
    mockData.push({
      id: mockData.length + 1,
      item_id: 1,
      tag_id: 2,
      price,
      era: '1950s',
      condition: index < 5 ? 'デッドストック' : index < 10 ? '極美品' : '美品',
      source_url: `https://example.com/auction${index + 1}`,
      notes: `サンプルデータ ${index + 1}`,
      created_at: `2024-01-${10 + index}T10:00:00Z`,
      updated_at: `2024-01-${10 + index}T10:00:00Z`,
    });
  });
  
  // 1960s データ（信頼性低 - サンプル数少）
  const prices1960s = [35000, 38000, 32000, 30000, 28000, 33000, 26000, 29000];
  prices1960s.forEach((price, index) => {
    mockData.push({
      id: mockData.length + 1,
      item_id: 1,
      tag_id: 3,
      price,
      era: '1960s',
      condition: index < 2 ? 'デッドストック' : index < 5 ? '美品' : '良品',
      source_url: `https://example.com/auction${index + 16}`,
      notes: `サンプルデータ ${index + 1}`,
      created_at: `2024-01-${10 + index}T12:00:00Z`,
      updated_at: `2024-01-${10 + index}T12:00:00Z`,
    });
  });
  
  // 1940s データ（高価格帯）
  const prices1940s = [80000, 75000, 72000, 68000, 65000, 70000];
  prices1940s.forEach((price, index) => {
    mockData.push({
      id: mockData.length + 1,
      item_id: 1,
      tag_id: 1,
      price,
      era: '1940s',
      condition: index < 2 ? 'デッドストック' : index < 4 ? '極美品' : '美品',
      source_url: `https://example.com/auction${index + 24}`,
      notes: `希少品 ${index + 1}`,
      created_at: `2024-01-${12 + index}T14:00:00Z`,
      updated_at: `2024-01-${12 + index}T14:00:00Z`,
    });
  });
  
  // 1970s データ（低価格帯、安定）
  const prices1970s = [25000, 28000, 22000, 24000, 20000, 23000, 18000, 21000, 19000];
  prices1970s.forEach((price, index) => {
    mockData.push({
      id: mockData.length + 1,
      item_id: 1,
      tag_id: 4,
      price,
      era: '1970s',
      condition: index < 2 ? 'デッドストック' : index < 5 ? '極美品' : '美品',
      source_url: `https://example.com/auction${index + 30}`,
      notes: `比較的新しい年代 ${index + 1}`,
      created_at: `2024-01-${11 + index}T16:00:00Z`,
      updated_at: `2024-01-${11 + index}T16:00:00Z`,
    });
  });
  
  return mockData;
}