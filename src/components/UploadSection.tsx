import React, { useState, useRef } from 'react';
import { Upload, FileText, Download, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const UploadSection: React.FC = () => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const csvFile = files.find(file => file.type === 'text/csv' || file.name.endsWith('.csv'));
    
    if (csvFile) {
      handleFileUpload(csvFile);
    }
  };

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
    }, 2000);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const generateSampleCSV = () => {
    const headers = 'Date,Price,Volume\n';
    const sampleData = [
      '2024-01-01,2045.50,1500000',
      '2024-01-02,2048.20,1650000',
      '2024-01-03,2052.80,1720000',
      '2024-01-04,2049.40,1580000',
      '2024-01-05,2055.10,1690000',
    ].join('\n');
    
    const blob = new Blob([headers + sampleData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'gold_price_sample.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white dark:bg-dark-900 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-dark-700"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
          <Upload className="w-6 h-6 mr-2 text-gold-500" />
          Custom Data Analysis
        </h2>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={generateSampleCSV}
          className="flex items-center px-4 py-2 text-sm bg-gold-100 dark:bg-gold-900/20 text-gold-700 dark:text-gold-300 rounded-lg hover:bg-gold-200 dark:hover:bg-gold-900/30 transition-colors"
        >
          <Download className="w-4 h-4 mr-2" />
          Sample CSV
        </motion.button>
      </div>

      <div
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all ${
          isDragOver
            ? 'border-gold-400 bg-gold-50 dark:bg-gold-900/20'
            : 'border-gray-300 dark:border-dark-600 hover:border-gold-300 dark:hover:border-gold-600'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileInputChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        <AnimatePresence mode="wait">
          {isProcessing ? (
            <motion.div
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <div className="w-16 h-16 border-4 border-gold-200 border-t-gold-500 rounded-full animate-spin mx-auto"></div>
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Processing your data...
              </p>
            </motion.div>
          ) : uploadedFile ? (
            <motion.div
              key="uploaded"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto">
                <FileText className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-lg font-medium text-gray-900 dark:text-white">
                  File uploaded successfully!
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {uploadedFile.name} ({(uploadedFile.size / 1024).toFixed(1)} KB)
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-600 text-white rounded-lg font-medium hover:from-gold-600 hover:to-gold-700 transition-all shadow-lg"
              >
                Analyze Data
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="upload"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <div className="w-16 h-16 bg-gold-100 dark:bg-gold-900/20 rounded-full flex items-center justify-center mx-auto">
                <Upload className="w-8 h-8 text-gold-600 dark:text-gold-400" />
              </div>
              <div>
                <p className="text-lg font-medium text-gray-900 dark:text-white">
                  Upload your gold price data
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Drag and drop a CSV file or click to browse
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-700/50">
        <div className="flex items-start">
          <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
          <div className="text-sm text-blue-800 dark:text-blue-300">
            <p className="font-medium mb-1">CSV Format Requirements:</p>
            <ul className="list-disc list-inside space-y-1 ml-2 text-blue-700 dark:text-blue-400">
              <li>Date column (YYYY-MM-DD format)</li>
              <li>Price column (numeric values)</li>
              <li>Optional: Volume column</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UploadSection;