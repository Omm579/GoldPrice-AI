import React from 'react';
import { Moon, Sun, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';

const Header: React.FC = () => {
  const { isDark, setIsDark } = useTheme();

  return (
    <motion.header 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white dark:bg-dark-900 shadow-lg border-b border-gold-200 dark:border-dark-700"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="bg-gradient-to-r from-gold-400 to-gold-600 p-2 rounded-xl">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gold-600 to-gold-800 bg-clip-text text-transparent">
                Gold Price AI
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Advanced Prediction & Analytics
              </p>
            </div>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsDark(!isDark)}
            className="p-3 rounded-xl bg-gray-100 dark:bg-dark-800 hover:bg-gray-200 dark:hover:bg-dark-700 transition-colors"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-gold-500" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600" />
            )}
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;