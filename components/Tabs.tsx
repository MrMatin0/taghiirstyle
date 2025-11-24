/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { motion } from 'framer-motion';

interface TabsProps {
  themes: { [key: string]: { title: string } };
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ themes, activeTab, setActiveTab }) => {
  return (
    <div
      className="flex flex-wrap justify-center gap-2 rounded-lg bg-neutral-200 dark:bg-black/20 backdrop-blur-sm p-2 border border-neutral-300 dark:border-white/10 mb-4 w-full"
    >
      {Object.keys(themes).map((key) => (
        <button
          key={key}
          onClick={() => setActiveTab(key)}
          className={`${
            activeTab === key ? 'text-black' : 'text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white'
          } relative rounded-full px-4 py-2 text-sm sm:text-base font-anton tracking-wide transition focus-visible:outline-2 whitespace-nowrap`}
          style={{
            WebkitTapHighlightColor: 'transparent',
          }}
          aria-pressed={activeTab === key}
        >
          {activeTab === key && (
            <motion.span
              layoutId="bubble"
              className="absolute inset-0 z-10 bg-yellow-400"
              style={{ borderRadius: 9999 }}
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-20 pointer-events-none">{themes[key].title}</span>
        </button>
      ))}
    </div>
  );
};

export default Tabs;