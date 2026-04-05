import { Link } from "wouter";
import { ArrowLeft, Target, Zap, Sparkles, Cpu } from "lucide-react";

// ============================================================================
// AI WITH CONTROL PAGE
// Personal brand style - no sidebar nav, full-width content
// ============================================================================

const capabilities = [
  {
    icon: Target,
    title: "Seeing where it actually matters",
    description: "There's a lot of noise right now. Most of it doesn't matter. The question isn't 'where can we use AI?' It's 'where does this genuinely change the outcome?' That's usually a much smaller, more interesting answer."
  },
  {
    icon: Zap,
    title: "Taking things from prototype to real",
    description: "It's never been easier to build something that looks impressive. It's still hard to make it yours. Data, logic, ownership, reliability. That's the difference between a demo and something you can stand behind. That's the work."
  },
  {
    icon: Sparkles,
    title: "Keeping control of what matters",
    description: "Your data. Your prompts. Your decisions. Not trapped inside someone else's tool. AI moves fast, but lock-in happens even faster if you're not paying attention."
  },
  {
    icon: Cpu,
    title: "Making decisions visible",
    description: "AI changes how decisions get made. That's useful. It's also risky if no one can see or understand what's happening. I tend to pull that into the open, so decisions can be understood, challenged, and improved."
  }
];

export default function AIPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-['Montserrat',sans-serif]">

      {/* ================================================================ */}
      {/* MAIN CONTENT - Full Width */}
      {/* ================================================================ */}
      <main>

        {/* ============================================================ */}
        {/* HERO */}
        {/* ============================================================ */}
        <section id="hero" className="min-h-[70vh] flex flex-col justify-center px-8 lg:px-16 py-20 relative overflow-hidden bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#1e2936]">
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `linear-gradient(#ea580c 1px, transparent 1px), linear-gradient(90deg, #ea580c 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }} />

          <div className="relative z-10 max-w-4xl">
            {/* Back link */}
            <Link to="/" className="inline-flex items-center gap-2 text-[#c0cad4] hover:text-[#ea580c] transition-colors duration-200 mb-12">
              <ArrowLeft size={16} />
              <span className="text-sm">Home</span>
            </Link>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white font-['Poppins',sans-serif]">
              AI with control
            </h1>
            <p className="text-xl md:text-2xl text-[#d0d8e0] leading-relaxed mb-10">
              Helping people build things that actually work, and actually belong to them.
            </p>

            <div className="space-y-6 text-[#c0cad4] text-lg leading-relaxed max-w-2xl">
              <p className="text-[#ea580c] font-medium">Same instincts. New tools.</p>
              <p>
                I'm not coming at AI as a theorist or a strategist. I'm building with it. Real systems. Real constraints. Real trade-offs.
              </p>
              <p>
                Some of it starts as rough prototypes in tools like Replit, Lovable or Bolt. Some of it ends up as production systems running properly. Owned, controlled, and relied on.
              </p>
              <p>
                That gap between something that works and something that's real. That's where I spend most of my time.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* CAPABILITIES */}
        {/* ============================================================ */}
        <section id="capabilities" className="px-8 lg:px-16 py-20 bg-[#1e2936]">
          <div className="max-w-6xl mx-auto">
            <p className="text-[#ea580c] text-xs font-bold uppercase tracking-[0.15em] mb-4">What I bring into AI work</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white font-['Poppins',sans-serif] mb-4">
              Not services. Just how I tend to operate.
            </h2>
            <p className="text-[#c0cad4] text-lg mb-12 max-w-2xl">
              These aren't offerings. They're instincts I've developed from doing this work.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {capabilities.map((cap, index) => (
                <div
                  key={index}
                  className="p-6 lg:p-8 bg-[#2d3a4a] rounded-lg border border-[#3d4d5f]/30
                             hover:border-[#ea580c]/30 hover:bg-[#3d4d5f] transition-all duration-300"
                >
                  <cap.icon className="w-10 h-10 text-[#ea580c] mb-4" strokeWidth={1.5} />
                  <h3 className="text-xl font-bold text-white font-['Poppins',sans-serif] mb-3">
                    {cap.title}
                  </h3>
                  <p className="text-[#d0d8e0] text-[15px] leading-relaxed">
                    {cap.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* APPROACH */}
        {/* ============================================================ */}
        <section id="approach" className="px-8 lg:px-16 py-20 bg-[#0a0a0a]">
          <div className="max-w-4xl mx-auto">
            <p className="text-[#ea580c] text-xs font-bold uppercase tracking-[0.15em] mb-4">Approach</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white font-['Poppins',sans-serif] mb-8">
              How I approach it
            </h2>

            <div className="space-y-6 text-[#d0d8e0] text-lg leading-relaxed">
              <p className="text-white font-medium">Grounded in delivery. Always.</p>
              <p>
                I'm working hands-on with LLMs, building systems, wiring things together. Not experimenting for the sake of it. Not chasing whatever's trending this week. Just figuring out what works, what breaks, and what actually holds up when people start relying on it.
              </p>
              <p>
                Right now, a lot of people are vibe coding. And to be fair, it's impressive. You can get something working in hours that used to take weeks. But most of it isn't really yours. It's running somewhere else. It depends on things you don't control. It breaks in ways you can't see.
              </p>
              <p>
                I tend to step in at that point. Take what's been built. Strip it back. Rebuild it properly. So it runs. So it's owned. So it lasts.
              </p>
            </div>

            {/* Highlight box */}
            <div className="mt-12 p-8 bg-gradient-to-br from-[#c2410c]/15 to-[#ea580c]/5 border-l-4 border-[#ea580c] rounded-r-lg">
              <p className="text-white text-lg font-medium mb-4">What's changing</p>
              <div className="space-y-4 text-[#d0d8e0]">
                <p>
                  The way we build software is shifting. Right now, AI still produces things we recognise: files, repos, structures. That's not because it has to. It's because we do. That constraint is already starting to loosen.
                </p>
                <p>
                  The role of the human is moving: from writing code to shaping intent. From building systems to controlling them.
                </p>
                <p>
                  Which means the problem changes. It's no longer "can we build this?" It's "do we understand and control what we've built?"
                </p>
                <p className="text-white font-medium">
                  That's the shift I'm interested in.
                </p>
              </div>
            </div>

            {/* Work list */}
            <div className="mt-12 pt-8 border-t border-[#3d4d5f]/30">
              <p className="text-[11px] text-[#c0cad4] uppercase tracking-[0.15em] font-semibold mb-4">Where I've been applying this</p>
              <ul className="space-y-2 text-[#d0d8e0] text-lg">
                <li>Taking AI prototypes into production</li>
                <li>Building AI-powered SaaS tools</li>
                <li>Helping teams avoid accidental lock-in</li>
                <li>Making AI-driven decisions visible and usable</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* CONTACT */}
        {/* ============================================================ */}
        <section id="contact" className="px-8 lg:px-16 py-20 bg-gradient-to-r from-[#c2410c] to-[#ea580c]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white font-['Poppins',sans-serif] mb-6">
              If you're in the middle of this
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Half-built things. Ideas that kind of work. Systems that don't quite hold together. That's usually where the interesting work starts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:jason@flowency.co.uk"
                className="px-8 py-4 bg-white text-[#c2410c] font-semibold rounded-lg
                           hover:bg-white/90 transition-colors duration-200"
              >
                Email me
              </a>
              <a
                href="https://www.linkedin.com/in/jjonesuk"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white/10 text-white font-semibold rounded-lg border border-white/30
                           hover:bg-white/20 transition-colors duration-200"
              >
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-8 lg:px-16 py-8 bg-[#0a0a0a] border-t border-[#3d4d5f]/30">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#c0cad4] text-[11px]">&copy; {new Date().getFullYear()} Jason Jones</p>
            <div className="flex items-center gap-6 text-[#c0cad4] text-[11px]">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <Link to="/what-shapes-me" className="hover:text-white transition-colors">What Shapes Me</Link>
              <a href="https://flowency.co.uk" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Flowency</a>
            </div>
          </div>
        </footer>

      </main>
    </div>
  );
}
