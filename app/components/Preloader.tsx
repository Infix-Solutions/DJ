"use client";

import { AnimatePresence, motion } from "motion/react";

export function Preloader({ loaded }: { loaded: boolean }) {
  return (
    <AnimatePresence>
      {!loaded && (
        <motion.div className="preloader" exit={{ opacity: 0 }} transition={{ duration: 0.7 }}>
          <div className="preloader-mark">A<span>.</span></div>
          <p>ENTERING THE WORLD OF</p>
          <div className="preloader-line"><i /></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
