import React from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import LivePrice from './components/LivePrice';
import PredictionCards from './components/PredictionCards';
import HistoricalChart from './components/HistoricalChart';
import NewsSection from './components/NewsSection';
import ModelMetrics from './components/ModelMetrics';
import UploadSection from './components/UploadSection';
import InvestmentInsights from './components/InvestmentInsights';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-dark-950 dark:to-dark-900 transition-colors duration-300">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            AI-Powered Gold Price
            <span className="bg-gradient-to-r from-gold-500 to-gold-700 bg-clip-text text-transparent">
              {' '}Prediction
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Advanced machine learning models providing accurate gold price forecasts, 
            real-time market analysis, and intelligent investment insights.
          </p>
        </motion.div>

        {/* Live Price */}
        <LivePrice />

        {/* Prediction Cards */}
        <PredictionCards />

        {/* Charts and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <HistoricalChart />
          </div>
          <div className="space-y-8">
            <NewsSection />
          </div>
        </div>

        {/* Model Performance */}
        <ModelMetrics />

        {/* Additional Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <UploadSection />
          <InvestmentInsights />
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center py-8 mt-16 border-t border-gray-200 dark:border-dark-700"
        >
          <p className="text-gray-600 dark:text-gray-400">
            © 2024 Gold Price AI. Advanced prediction algorithms powered by machine learning.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            Built with React, TypeScript, and cutting-edge AI technology.
          </p>
        </motion.footer>
      </main>
    </div>
  );
}

export default App;