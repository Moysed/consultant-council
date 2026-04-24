"use client";

import { motion } from "framer-motion";

interface BoardroomTableProps {
  isActive?: boolean;
}

export function BoardroomTable({ isActive = false }: BoardroomTableProps) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Ambient glow */}
      {isActive && (
        <motion.div
          className="absolute w-[55%] h-[45%] rounded-[50%] blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse, rgba(59,130,246,0.08) 0%, transparent 70%)",
          }}
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      )}

      {/* Table surface */}
      <svg
        viewBox="0 0 400 250"
        className="w-[60%] h-auto"
        style={{ filter: "drop-shadow(0 4px 20px rgba(0,0,0,0.15))" }}
      >
        {/* Table shadow */}
        <ellipse
          cx="200"
          cy="135"
          rx="160"
          ry="80"
          className="fill-black/10 dark:fill-white/5"
        />
        {/* Table surface */}
        <ellipse
          cx="200"
          cy="125"
          rx="155"
          ry="75"
          className="fill-[#1a1a2e] dark:fill-[#0f0f23]"
          stroke="rgba(59,130,246,0.3)"
          strokeWidth="1"
        />
        {/* Table highlight */}
        <ellipse
          cx="200"
          cy="115"
          rx="120"
          ry="50"
          fill="none"
          stroke="rgba(59,130,246,0.1)"
          strokeWidth="0.5"
        />
        {/* Center emblem */}
        <text
          x="200"
          y="130"
          textAnchor="middle"
          className="fill-blue-400/30 text-[11px] font-semibold tracking-widest"
        >
          COUNCIL
        </text>
      </svg>
    </div>
  );
}
