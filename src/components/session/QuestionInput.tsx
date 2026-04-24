"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, Loader2 } from "lucide-react";

interface QuestionInputProps {
  onSubmit: (question: string) => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export function QuestionInput({
  onSubmit,
  isLoading = false,
  disabled = false,
}: QuestionInputProps) {
  const [question, setQuestion] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || isLoading) return;
    onSubmit(question.trim());
  };

  const isThai = /[\u0E00-\u0E7F]/.test(question);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <Textarea
          placeholder="What decision do you need advice on? / คุณต้องการคำปรึกษาเรื่องอะไร?"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          disabled={disabled || isLoading}
          className="min-h-[120px] text-base resize-none pr-12 bg-card border-border"
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
              handleSubmit(e);
            }
          }}
        />
        {question && (
          <motion.span
            className="absolute top-3 right-3 text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            {isThai ? "🇹🇭 Thai" : "🇺🇸 English"}
          </motion.span>
        )}
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          Ctrl+Enter to submit
        </p>
        <Button
          type="submit"
          disabled={!question.trim() || isLoading || disabled}
          size="lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Selecting advisors...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Convene the Council
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
