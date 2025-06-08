import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Calendar, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { generateHistoricalData } from '../utils/mockData';
import { format, parseISO } from 'date-fns';

const HistoricalChart: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<7 | 30 | 90 | 365>(30);
  const [selectedMetals, setSelectedMetals] = useState<string[]>(['gold']);

  const data = useMemo(() => generateHistoricalData(selectedPeriod), [selectedPeriod]);

  const periods = [
    { days: 7, label: '1W' },
    { days: 30, label: '1M' },
    { days: 90, label: '3M' },
    { days: 365, label: '1Y' },
  ];

  const metals = [
    { key: 'gold', label: 'Gold', color: '#f59e0b' },
    { key: 'silver', label: 'Silver', color: '#6b7280' },
    { key: 'bitcoin', label: 'Bitcoin', color: '#f97316' },
    { key: 'sensex', label: 'Sensex', color: '#3b82f6' },
  ];

  const toggleMetal = (metalKey: string) => {
    setSelectedMetals(prev => 
      prev.includes(metalKey)
        ? prev.filter(m => m !== metalKey)
        : [...prev, metalKey]
    );
  };

  const formatTooltipValue = (value: number, name: string) => {
    if (name === 'bitcoin' || name === 'sensex') {
      return [`$${value.toLocaleString()}`, name.charAt(0).toUpperCase() + name.slice(1)];
    }
    return [`$${value.toFixed(2)}`, name.charAt(0).toUpperCase() + name.slice(1)];
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white dark:bg-dark-900 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-dark-700"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 space-y-4 lg:space-y-0">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
          <BarChart3 className="w-6 h-6 mr-2 text-gold-500" />
          Historical Prices
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex bg-gray-100 dark:bg-dark-800 rounded-xl p-1">
            {periods.map((period) => (
              <motion.button
                key={period.days}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedPeriod(period.days as 7 | 30 | 90 | 365)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedPeriod === period.days
                    ? 'bg-gold-500 text-white shadow-lg'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {period.label}
              </motion.button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {metals.map((metal) => (
              <motion.button
                key={metal.key}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleMetal(metal.key)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all border-2 ${
                  selectedMetals.includes(metal.key)
                    ? 'border-current text-white'
                    : 'border-gray-300 dark:border-dark-600 text-gray-600 dark:text-gray-400 hover:border-current'
                }`}
                style={{
                  backgroundColor: selectedMetals.includes(metal.key) ? metal.color : 'transparent',
                  borderColor: selectedMetals.includes(metal.key) ? metal.color : undefined,
                }}
              >
                {metal.label}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="date" 
              tickFormatter={(value) => format(parseISO(value), 'MMM dd')}
              className="text-gray-600 dark:text-gray-400"
            />
            <YAxis className="text-gray-600 dark:text-gray-400" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
              }}
              labelFormatter={(label) => format(parseISO(label), 'PPP')}
              formatter={formatTooltipValue}
            />
            <Legend />
            {metals.map((metal) => 
              selectedMetals.includes(metal.key) && (
                <Line
                  key={metal.key}
                  type="monotone"
                  dataKey={metal.key}
                  stroke={metal.color}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6, fill: metal.color }}
                  name={metal.label}
                />
              )
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default HistoricalChart;