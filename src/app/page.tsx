import Link from "next/link";
import { Button } from "@/components/ui/button";
import { consultants } from "@/lib/consultants";

export default function LandingPage() {
  const featured = consultants.slice(0, 8);

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
        <Link href="/login">
          <Button variant="outline" size="sm">
            Sign In
          </Button>
        </Link>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20">
        <div className="max-w-3xl text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            Your personal
            <br />
            <span className="text-blue-400">boardroom of legends</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            36 world-class advisors debate your toughest decisions. From Elon
            Musk to Warren Buffett, from Dieter Rams to Charlie Munger — they
            argue, interrupt, and synthesize until you have clarity.
          </p>

          <div className="flex gap-4 justify-center pt-4">
            <Link href="/login">
              <Button size="lg" className="text-base px-8">
                Enter the Boardroom
              </Button>
            </Link>
          </div>
        </div>

        {/* Featured advisors */}
        <div className="mt-20 max-w-4xl w-full">
          <p className="text-center text-sm text-muted-foreground mb-6 tracking-wider uppercase">
            Your advisors
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {featured.map((c) => (
              <div
                key={c.id}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card border border-border"
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
                  <p className="text-xs text-muted-foreground">{c.domain}</p>
                </div>
              </div>
            ))}
            <div className="flex items-center px-3 py-2 text-sm text-muted-foreground">
              +{consultants.length - featured.length} more advisors
            </div>
          </div>
        </div>

        {/* How it works */}
        <div className="mt-20 max-w-4xl w-full">
          <p className="text-center text-sm text-muted-foreground mb-8 tracking-wider uppercase">
            How it works
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-lg mx-auto">
                1
              </div>
              <h3 className="font-semibold">Ask your question</h3>
              <p className="text-sm text-muted-foreground">
                Describe the decision you&apos;re facing. Works in English and
                Thai.
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-lg mx-auto">
                2
              </div>
              <h3 className="font-semibold">AI selects advisors</h3>
              <p className="text-sm text-muted-foreground">
                2-4 relevant experts are chosen based on domain, keywords, and
                natural tensions.
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-lg mx-auto">
                3
              </div>
              <h3 className="font-semibold">Watch them debate</h3>
              <p className="text-sm text-muted-foreground">
                Advisors argue, interrupt, and challenge each other — then
                deliver a clear recommendation.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-6 text-center text-sm text-muted-foreground">
        Built for the AI Contest &middot; Powered by Claude
      </footer>
    </div>
  );
}
