"use client";

import { motion } from "framer-motion";
import type { Consultant } from "@/types";
import type { AvatarState } from "@/hooks/useBoardroomAnimation";
import { getInitials } from "@/lib/consultants";

interface ConsultantAvatarProps {
  consultant: Consultant;
  state: AvatarState;
  position: { x: number; y: number };
  size?: number;
}

const stateVariants = {
  idle: { scale: 1, boxShadow: "0 0 0px rgba(0,0,0,0)" },
  speaking: {
    scale: 1.15,
    boxShadow: "0 0 30px rgba(59, 130, 246, 0.6)",
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
  interrupted: {
    scale: 1,
    x: [0, -4, 4, -4, 4, 0],
    transition: { duration: 0.4, ease: "easeInOut" as const },
  },
  listening: {
    scale: 1,
    boxShadow: "0 0 0px rgba(0,0,0,0)",
    transition: { duration: 0.3 },
  },
};

export function ConsultantAvatar({
  consultant,
  state,
  position,
  size = 72,
}: ConsultantAvatarProps) {
  const initials = getInitials(consultant.name);

  return (
    <motion.div
      className="absolute flex flex-col items-center gap-1"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: "translate(-50%, -50%)",
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      <motion.div
        className="rounded-full flex items-center justify-center text-white font-bold relative"
        style={{
          width: size,
          height: size,
          backgroundColor: consultant.color,
          fontSize: size * 0.32,
        }}
        variants={stateVariants}
        animate={state}
      >
        {initials}
        {state === "speaking" && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: `2px solid ${consultant.color}` }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.8, 0, 0.8] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </motion.div>

      <div className="text-center">
        <p className="text-xs font-semibold text-foreground whitespace-nowrap">
          {consultant.name}
        </p>
        <span
          className="text-[10px] px-1.5 py-0.5 rounded-full text-white"
          style={{ backgroundColor: consultant.color }}
        >
          {consultant.domain}
        </span>
      </div>
    </motion.div>
  );
}
