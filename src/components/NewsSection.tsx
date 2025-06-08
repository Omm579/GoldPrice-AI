import React from 'react';
import { Newspaper, ExternalLink, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { mockNews } from '../utils/mockData';
import { format, parseISO } from 'date-fns';

const NewsSection: React.FC = () => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white dark:bg-dark-900 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-dark-700"
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
        <Newspaper className="w-6 h-6 mr-2 text-gold-500" />
        Market News
      </h2>

      <div className="space-y-4">
        {mockNews.map((article, index) => (
          <motion.div
            key={index}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.01 }}
            className="p-4 bg-gray-50 dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 hover:border-gold-300 dark:hover:border-gold-600 transition-all cursor-pointer group"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">
                {article.title}
              </h3>
              <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gold-500 transition-colors flex-shrink-0 ml-2" />
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 leading-relaxed">
              {article.description}
            </p>
            
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
              <span className="font-medium text-gold-600 dark:text-gold-400">
                {article.source}
              </span>
              <div className="flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {format(parseISO(article.publishedAt), 'MMM dd, HH:mm')}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-gold-500 to-gold-600 text-white rounded-xl font-medium hover:from-gold-600 hover:to-gold-700 transition-all shadow-lg hover:shadow-xl"
      >
        View More News
      </motion.button>
    </motion.div>
  );
};

export default NewsSection;