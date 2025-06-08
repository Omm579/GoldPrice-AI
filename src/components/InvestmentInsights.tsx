import React from 'react';
import { Lightbulb, TrendingUp, TrendingDown, DollarSign, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const InvestmentInsights: React.FC = () => {
  const insights = [
    {
      type: 'bullish',
      title: 'Strong Buying Opportunity',
      description: 'Technical indicators show oversold conditions with RSI below 30. Historical patterns suggest potential 5-8% upside in the next 2 weeks.',
      confidence: 78,
      icon: TrendingUp,
      color: 'from-green-500 to-green-600',
      bgColor: 'from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20',
      borderColor: 'border-green-200 dark:border-green-700/50',
    },
    {
      type: 'neutral',
      title: 'Market Consolidation Phase',
      description: 'Gold prices are moving sideways within a tight range. Consider dollar-cost averaging strategy for consistent exposure.',
      confidence: 65,
      icon: DollarSign,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20',
      borderColor: 'border-blue-200 dark:border-blue-700/50',
    },
    {
      type: 'warning',
      title: 'Volatility Alert',
      description: 'Increased market volatility expected due to upcoming Fed announcement. Consider reducing position size temporarily.',
      confidence: 82,
      icon: AlertTriangle,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20',
      borderColor: 'border-orange-200 dark:border-orange-700/50',
    },
  ];

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white dark:bg-dark-900 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-dark-700"
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
        <Lightbulb className="w-6 h-6 mr-2 text-gold-500" />
        Investment Insights
      </h2>

      <div className="space-y-4">
        {insights.map((insight, index) => {
          const IconComponent = insight.icon;
          
          return (
            <motion.div
              key={index}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.01 }}
              className={`bg-gradient-to-br ${insight.bgColor} rounded-xl p-5 border ${insight.borderColor} hover:shadow-lg transition-all`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${insight.color} mr-3`}>
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {insight.title}
                    </h3>
                    <div className="flex items-center mt-1">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400 mr-2">
                        Confidence:
                      </span>
                      <div className="flex items-center">
                        <div className="w-16 h-2 bg-gray-200 dark:bg-dark-700 rounded-full mr-2">
                          <div
                            className={`h-full bg-gradient-to-r ${insight.color} rounded-full transition-all duration-1000`}
                            style={{ width: `${insight.confidence}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                          {insight.confidence}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {insight.description}
              </p>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-gold-50 to-gold-100 dark:from-gold-900/20 dark:to-gold-800/20 rounded-xl border border-gold-200 dark:border-gold-700/50">
        <p className="text-sm text-gold-800 dark:text-gold-300 font-medium">
          💡 <strong>AI Recommendation:</strong> Based on current market conditions and technical analysis, 
          a balanced approach with 60% long-term holdings and 40% tactical allocation is recommended for optimal risk-adjusted returns.
        </p>
      </div>
    </motion.div>
  );
};

export default InvestmentInsights;