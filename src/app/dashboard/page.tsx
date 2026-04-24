import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { SessionCard } from "@/components/session/SessionCard";
import { Plus, LogOut } from "lucide-react";
import type { Session } from "@/types";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: sessions } = await supabase
    .from("sessions")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="border-b border-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center text-white text-sm font-bold">
            CC
          </div>
          <span className="font-semibold text-lg">Consultant Council</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">
            {user.email}
          </span>
          <form
            action={async () => {
              "use server";
              const supabase = await createClient();
              await supabase.auth.signOut();
              redirect("/login");
            }}
          >
            <Button variant="ghost" size="sm" type="submit">
              <LogOut className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </nav>

      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Your Sessions</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Past boardroom meetings and their outcomes
            </p>
          </div>
          <Link href="/session/new">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Session
            </Button>
          </Link>
        </div>

        {!sessions || sessions.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-2xl mx-auto mb-4">
              ?
            </div>
            <h2 className="text-lg font-semibold mb-2">
              No sessions yet
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Ask your first question and watch the council debate.
            </p>
            <Link href="/session/new">
              <Button>Start your first session</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {(sessions as Session[]).map((session) => (
              <SessionCard key={session.id} session={session} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
