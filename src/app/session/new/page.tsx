"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { QuestionInput } from "@/components/session/QuestionInput";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import type { SelectionResult } from "@/types";

export default function NewSessionPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selection, setSelection] = useState<SelectionResult | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (question: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create session");
      }

      const data = await res.json();
      setSelection(data.selection);
      setSessionId(data.session.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartDebate = () => {
    if (sessionId) {
      router.push(`/session/${sessionId}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="border-b border-border px-6 py-4 flex items-center gap-2">
        <Link
          href="/dashboard"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Dashboard
        </Link>
        <span className="text-muted-foreground">/</span>
        <span className="text-sm font-medium">New Session</span>
      </nav>

      <main className="flex-1 max-w-2xl mx-auto w-full px-6 py-12">
        <h1 className="text-3xl font-bold mb-2">Convene the Council</h1>
        <p className="text-muted-foreground mb-8">
          What decision do you need the boardroom to debate?
        </p>

        <QuestionInput
          onSubmit={handleSubmit}
          isLoading={isLoading}
          disabled={!!selection}
        />

        {error && (
          <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        <AnimatePresence>
          {selection && (
            <motion.div
              className="mt-8 space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {/* Selection result */}
              <div className="border border-border rounded-xl p-6 bg-card">
                <p className="text-xs tracking-wider text-muted-foreground uppercase mb-4">
                  Selected Advisors
                </p>

                <div className="flex flex-wrap gap-3 mb-4">
                  {selection.consultants.map((c) => (
                    <div
                      key={c.id}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-background"
                    >
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                        style={{ backgroundColor: c.color }}
                      >
                        {c.name
                          .split(" ")
                          .map((w) => w[0])
                          .filter((ch) => ch === ch.toUpperCase())
                          .slice(0, 2)
                          .join("")}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{c.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {c.lens}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-sm text-muted-foreground mb-3">
                  {selection.reasoning}
                </p>

                {selection.tensions.length > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      Tensions:
                    </span>
                    {selection.tensions.map((t) => (
                      <Badge key={t} variant="outline" className="text-xs">
                        {t}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Start debate */}
              <button
                onClick={handleStartDebate}
                className="w-full py-4 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold text-lg transition-colors"
              >
                Enter the Boardroom
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
