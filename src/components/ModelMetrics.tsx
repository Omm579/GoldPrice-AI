import React from 'react';
import { Brain, Target, TrendingUp, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { modelMetrics } from '../utils/mockData';

const ModelMetrics: React.FC = () => {
  const metrics = [
    {
      key: 'accuracy',
      label: 'Accuracy',
      value: `${modelMetrics.accuracy}%`,
      icon: Target,
      color: 'from-green-500 to-green-600',
      bgColor: 'from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20',
      borderColor: 'border-green-200 dark:border-green-700/50',
    },
    {
      key: 'mae',
      label: 'Mean Absolute Error',
      value: `$${modelMetrics.mae}`,
      icon: Award,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20',
      borderColor: 'border-blue-200 dark:border-blue-700/50',
    },
    {
      key: 'rmse',
      label: 'Root Mean Square Error',
      value: `$${modelMetrics.rmse}`,
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20',
      borderColor: 'border-purple-200 dark:border-purple-700/50',
    },
    {
      key: 'r2Score',
      label: 'R² Score',
      value: modelMetrics.r2Score.toFixed(3),
      icon: Brain,
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
        <Brain className="w-6 h-6 mr-2 text-gold-500" />
        Model Performance
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => {
          const IconComponent = metric.icon;
          
          return (
            <motion.div
              key={metric.key}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className={`bg-gradient-to-br ${metric.bgColor} rounded-xl p-4 border ${metric.borderColor} hover:shadow-lg transition-all`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${metric.color}`}>
                  <IconComponent className="w-5 h-5 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {metric.value}
                  </div>
                </div>
              </div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {metric.label}
              </p>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-gold-50 to-gold-100 dark:from-gold-900/20 dark:to-gold-800/20 rounded-xl border border-gold-200 dark:border-gold-700/50">
        <p className="text-sm text-gold-800 dark:text-gold-300 font-medium">
          🎯 <strong>Model Insight:</strong> Our LSTM neural network achieves {modelMetrics.accuracy}% accuracy 
          with excellent R² score of {modelMetrics.r2Score}, indicating strong predictive performance for gold price forecasting.
        </p>
      </div>
    </motion.div>
  );
};

export default ModelMetrics;