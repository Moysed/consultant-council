"use client";

import { motion } from "framer-motion";

interface StageDirectionProps {
  speaker: string;
  action: string;
}

export function StageDirection({ speaker, action }: StageDirectionProps) {
  return (
    <motion.div
      className="flex justify-center my-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-xs text-muted-foreground italic">
        {speaker} *{action}*
      </p>
    </motion.div>
  );
}
