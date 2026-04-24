"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { Session } from "@/types";
import { getConsultantsByIds } from "@/lib/consultants";

interface SessionCardProps {
  session: Session;
}

const statusColors: Record<string, string> = {
  selecting: "bg-yellow-500/20 text-yellow-400",
  debating: "bg-blue-500/20 text-blue-400",
  completed: "bg-emerald-500/20 text-emerald-400",
  error: "bg-red-500/20 text-red-400",
};

export function SessionCard({ session }: SessionCardProps) {
  const consultants = getConsultantsByIds(session.consultant_ids);
  const date = new Date(session.created_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Link href={`/session/${session.id}`}>
      <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-base line-clamp-2 flex-1">
              {session.question}
            </CardTitle>
            <Badge
              variant="outline"
              className={`shrink-0 ${statusColors[session.status] || ""}`}
            >
              {session.status}
            </Badge>
          </div>
          <CardDescription className="flex items-center gap-2 mt-2">
            <span>{date}</span>
            <span>&middot;</span>
            <span>{session.language === "th" ? "🇹🇭" : "🇺🇸"}</span>
            <span>&middot;</span>
            <span className="text-xs">
              {consultants.map((c) => c.name).join(", ")}
            </span>
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
