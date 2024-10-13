'use client';
import { AnimatePresence } from 'framer-motion';
import React from 'react';

const Presence = ({ children }: React.PropsWithChildren) => {

  function handleExitComplete() {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0 });
    }
  }

  return <AnimatePresence mode="wait" onExitComplete={handleExitComplete}> {children}</AnimatePresence>
};

export default Presence;
