export interface GoldPrice {
  date: string;
  price: number;
  change: number;
  changePercent: number;
}

export interface PredictionData {
  date: string;
  predicted: number;
  confidence: number;
  trend: 'up' | 'down' | 'stable';
}

export interface NewsItem {
  title: string;
  description: string;
  publishedAt: string;
  source: string;
  url: string;
}

export interface ModelMetrics {
  mae: number;
  rmse: number;
  accuracy: number;
  r2Score: number;
}

export interface ChartDataPoint {
  date: string;
  gold: number;
  silver?: number;
  bitcoin?: number;
  sensex?: number;
}