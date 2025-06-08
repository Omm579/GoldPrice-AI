import { GoldPrice, PredictionData, NewsItem, ModelMetrics, ChartDataPoint } from '../types';
import { format, subDays, addDays } from 'date-fns';

// Generate mock historical data
export const generateHistoricalData = (days: number): ChartDataPoint[] => {
  const data: ChartDataPoint[] = [];
  let basePrice = 2000;
  
  for (let i = days; i >= 0; i--) {
    const date = format(subDays(new Date(), i), 'yyyy-MM-dd');
    const volatility = (Math.random() - 0.5) * 50;
    basePrice += volatility;
    
    data.push({
      date,
      gold: Math.round(basePrice * 100) / 100,
      silver: Math.round((basePrice * 0.04) * 100) / 100,
      bitcoin: Math.round((basePrice * 20) * 100) / 100,
      sensex: Math.round((basePrice * 25) * 100) / 100,
    });
  }
  
  return data;
};

// Current gold price
export const getCurrentPrice = (): GoldPrice => {
  const price = 2050 + (Math.random() - 0.5) * 20;
  const change = (Math.random() - 0.5) * 30;
  
  return {
    date: new Date().toISOString(),
    price: Math.round(price * 100) / 100,
    change: Math.round(change * 100) / 100,
    changePercent: Math.round((change / price) * 10000) / 100,
  };
};

// Generate predictions
export const generatePredictions = (days: number): PredictionData[] => {
  const predictions: PredictionData[] = [];
  let basePrice = 2050;
  
  for (let i = 1; i <= days; i++) {
    const date = format(addDays(new Date(), i), 'yyyy-MM-dd');
    const trend = Math.random() > 0.5 ? 'up' : 'down';
    const change = trend === 'up' ? Math.random() * 20 : -Math.random() * 15;
    basePrice += change;
    
    predictions.push({
      date,
      predicted: Math.round(basePrice * 100) / 100,
      confidence: Math.round((0.7 + Math.random() * 0.3) * 100),
      trend: Math.abs(change) < 5 ? 'stable' : trend,
    });
  }
  
  return predictions;
};

// Mock news data
export const mockNews: NewsItem[] = [
  {
    title: "Gold Prices Surge Amid Global Economic Uncertainty",
    description: "Investors flock to safe-haven assets as market volatility increases...",
    publishedAt: new Date().toISOString(),
    source: "Financial Times",
    url: "#"
  },
  {
    title: "Federal Reserve Policy Impact on Precious Metals",
    description: "Latest Fed decisions show significant influence on gold trading patterns...",
    publishedAt: new Date(Date.now() - 3600000).toISOString(),
    source: "Reuters",
    url: "#"
  },
  {
    title: "Asian Markets Drive Gold Demand Higher",
    description: "Strong buying interest from Asian markets pushes gold prices upward...",
    publishedAt: new Date(Date.now() - 7200000).toISOString(),
    source: "Bloomberg",
    url: "#"
  }
];

// Model performance metrics
export const modelMetrics: ModelMetrics = {
  mae: 12.34,
  rmse: 18.76,
  accuracy: 87.5,
  r2Score: 0.92,
};