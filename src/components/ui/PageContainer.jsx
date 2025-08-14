import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

const variants = {
  hidden: { opacity: 0, y: 8 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 }
};

const PageContainer = ({ className, children }) => {
  return (
    <motion.div
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={cn('min-h-screen bg-background', className)}
    >
      {children}
    </motion.div>
  );
};

export default PageContainer;


