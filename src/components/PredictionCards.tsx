import React, { useState } from 'react';
import { Calendar, TrendingUp, TrendingDown, Minus, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { generatePredictions } from '../utils/mockData';
import { PredictionData } from '../types';

const PredictionCards: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<7 | 15 | 30>(7);
  const [predictions] = useState<Record<number, PredictionData[]>>({
    7: generatePredictions(7),
    15: generatePredictions(15),
    30: generatePredictions(30),
  });

  const periods = [
    { days: 7, label: '7 Days' },
    { days: 15, label: '15 Days' },
    { days: 30, label: '30 Days' },
  ];

  const currentPredictions = predictions[selectedPeriod];
  const lastPrediction = currentPredictions[currentPredictions.length - 1];
  const avgConfidence = Math.round(
    currentPredictions.reduce((sum, p) => sum + p.confidence, 0) / currentPredictions.length
  );

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-5 h-5 text-green-500" />;
      case 'down': return <TrendingDown className="w-5 h-5 text-red-500" />;
      default: return <Minus className="w-5 h-5 text-gray-500" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-500';
      case 'down': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
          <Target className="w-6 h-6 mr-2 text-gold-500" />
          AI Predictions
        </h2>
        
        <div className="flex bg-gray-100 dark:bg-dark-800 rounded-xl p-1">
          {periods.map((period) => (
            <motion.button
              key={period.days}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedPeriod(period.days as 7 | 15 | 30)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedPeriod === period.days
                  ? 'bg-gold-500 text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {period.label}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-700/50"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300">
              Predicted Price
            </h3>
            <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-3xl font-bold text-blue-900 dark:text-blue-100 mb-2">
            ${lastPrediction.predicted.toLocaleString()}
          </div>
          <p className="text-sm text-blue-600 dark:text-blue-400">
            {selectedPeriod}-day forecast
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-2xl p-6 border border-purple-200 dark:border-purple-700/50"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-300">
              Confidence Level
            </h3>
            <div className="w-5 h-5 bg-purple-600 dark:bg-purple-400 rounded-full animate-pulse"></div>
          </div>
          <div className="text-3xl font-bold text-purple-900 dark:text-purple-100 mb-2">
            {avgConfidence}%
          </div>
          <p className="text-sm text-purple-600 dark:text-purple-400">
            Model accuracy
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={`bg-gradient-to-br rounded-2xl p-6 border ${
            lastPrediction.trend === 'up'
              ? 'from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700/50'
              : lastPrediction.trend === 'down'
              ? 'from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-red-200 dark:border-red-700/50'
              : 'from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-800/20 border-gray-200 dark:border-gray-700/50'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-semibold ${getTrendColor(lastPrediction.trend)} dark:opacity-90`}>
              Market Trend
            </h3>
            {getTrendIcon(lastPrediction.trend)}
          </div>
          <div className={`text-3xl font-bold mb-2 ${getTrendColor(lastPrediction.trend)} dark:opacity-90`}>
            {lastPrediction.trend.toUpperCase()}
          </div>
          <p className={`text-sm ${getTrendColor(lastPrediction.trend)} dark:opacity-75`}>
            {selectedPeriod}-day outlook
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default PredictionCards;