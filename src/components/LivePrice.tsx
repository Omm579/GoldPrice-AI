import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getCurrentPrice } from '../utils/mockData';
import { GoldPrice } from '../types';

const LivePrice: React.FC = () => {
  const [price, setPrice] = useState<GoldPrice | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPrice = () => {
      const newPrice = getCurrentPrice();
      setPrice(newPrice);
      setIsLoading(false);
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 5000);

    return () => clearInterval(interval);
  }, []);

  if (isLoading || !price) {
    return (
      <div className="bg-white dark:bg-dark-900 rounded-2xl shadow-xl p-6 border border-gold-200 dark:border-dark-700">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 dark:bg-dark-700 rounded mb-4"></div>
          <div className="h-12 bg-gray-200 dark:bg-dark-700 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-dark-700 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  const getTrendIcon = () => {
    if (price.change > 0) return <TrendingUp className="w-6 h-6 text-green-500" />;
    if (price.change < 0) return <TrendingDown className="w-6 h-6 text-red-500" />;
    return <Minus className="w-6 h-6 text-gray-500" />;
  };

  const getTrendColor = () => {
    if (price.change > 0) return 'text-green-500';
    if (price.change < 0) return 'text-red-500';
    return 'text-gray-500';
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-gradient-to-br from-gold-50 to-gold-100 dark:from-dark-900 dark:to-dark-800 rounded-2xl shadow-xl p-6 border border-gold-200 dark:border-dark-700 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-gold-400/5 to-gold-600/5 animate-pulse-slow"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Live Gold Price
          </h3>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-3 h-3 bg-green-400 rounded-full animate-pulse"
          ></motion.div>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={price.price}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className="text-4xl font-bold text-gray-900 dark:text-white mb-2"
              >
                ${price.price.toLocaleString()}
              </motion.div>
            </AnimatePresence>
            
            <div className={`flex items-center space-x-2 ${getTrendColor()}`}>
              {getTrendIcon()}
              <span className="text-lg font-medium">
                ${Math.abs(price.change).toFixed(2)} ({Math.abs(price.changePercent).toFixed(2)}%)
              </span>
            </div>
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-500 dark:text-gray-400">Per Troy Ounce</p>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              Updated: {new Date().toLocaleTimeString()}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LivePrice;