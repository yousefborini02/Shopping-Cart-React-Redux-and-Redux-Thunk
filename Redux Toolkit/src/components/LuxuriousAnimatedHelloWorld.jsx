import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const colorSchemes = [
  { bg: 'from-gray-900 via-purple-900 to-blue-900', text: 'from-indigo-300 via-purple-300 to-pink-300' },
  { bg: 'from-gray-900 via-green-900 to-teal-900', text: 'from-blue-300 via-teal-300 to-green-300' },
  { bg: 'from-gray-900 via-red-900 to-orange-900', text: 'from-yellow-300 via-orange-300 to-red-300' },
];

const LuxuriousAnimatedHelloWorld = () => {
  const [colorScheme, setColorScheme] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setColorScheme((prev) => (prev + 1) % colorSchemes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`flex items-center justify-center min-h-screen bg-gradient-to-br ${colorSchemes[colorScheme].bg} transition-all duration-1000 ease-in-out overflow-hidden`}>
      <motion.div
        className="relative flex items-center justify-center p-24 bg-black bg-opacity-30 rounded-full shadow-2xl overflow-hidden backdrop-blur-lg"
        initial={{ scale: 0.9, rotate: -5, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 opacity-20"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <AnimatePresence mode="wait">
          <motion.div
            key={colorScheme}
            className="relative z-10 text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h1
              className={`text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r ${colorSchemes[colorScheme].text}`}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              Hello world!
            </motion.h1>
            <motion.p
              className="mt-8 text-3xl text-gray-300 font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Welcome to our luxurious design
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default LuxuriousAnimatedHelloWorld;