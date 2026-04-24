"use client";

import { motion } from "framer-motion";
import type { SessionSummary } from "@/types";
import { Separator } from "@/components/ui/separator";

interface ExecutiveSummaryProps {
  summary: SessionSummary;
}

export function ExecutiveSummary({ summary }: ExecutiveSummaryProps) {
  return (
    <motion.div
      className="border border-blue-500/30 rounded-xl bg-blue-500/5 p-6 mx-4 my-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="text-center mb-4">
        <p className="text-xs tracking-[0.3em] text-blue-400 font-semibold">
          EXECUTIVE SUMMARY FOR THE PRESIDENT
        </p>
      </div>

      <Separator className="bg-blue-500/20 mb-4" />

      {summary.agrees.length > 0 && (
        <div className="mb-4">
          <p className="text-sm font-semibold text-emerald-400 mb-2">
            The room agrees on:
          </p>
          <ul className="space-y-1">
            {summary.agrees.map((point, i) => (
              <li key={i} className="text-sm text-foreground pl-4">
                &bull; {point}
              </li>
            ))}
          </ul>
        </div>
      )}

      {summary.splits.length > 0 && (
        <div className="mb-4">
          <p className="text-sm font-semibold text-amber-400 mb-2">
            The room splits on:
          </p>
          <ul className="space-y-1">
            {summary.splits.map((point, i) => (
              <li key={i} className="text-sm text-foreground pl-4">
                &bull; {point}
              </li>
            ))}
          </ul>
        </div>
      )}

      {summary.recommendation && (
        <div className="mb-4">
          <p className="text-sm font-semibold text-blue-400 mb-1">
            Recommended action:
          </p>
          <p className="text-sm text-foreground pl-4">
            {summary.recommendation}
          </p>
        </div>
      )}

      {summary.risk && (
        <div className="mb-4">
          <p className="text-sm font-semibold text-red-400 mb-1">
            Risk if you don&apos;t act:
          </p>
          <p className="text-sm text-foreground pl-4">{summary.risk}</p>
        </div>
      )}

      <Separator className="bg-blue-500/20 my-4" />

      <p className="text-center text-sm text-muted-foreground italic">
        The floor is yours, President.
      </p>
    </motion.div>
  );
}
