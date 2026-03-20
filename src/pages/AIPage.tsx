import { Link } from "wouter";
import { Mail, Linkedin, Instagram, MessageCircle, ArrowLeft, Cpu, Sparkles, Zap, Target } from "lucide-react";

// ============================================================================
// AI WITH CONTROL PAGE
// AI strategy, implementation and execution
// ============================================================================

const navStyles = `
  .nav-link-ai {
    position: relative;
  }
  .nav-link-ai::after {
    content: '';
    position: absolute;
    left: 24px;
    bottom: 6px;
    height: 2px;
    width: 0;
    background: linear-gradient(90deg, #c2410c 0%, #ea580c 30%, #1e2936 100%);
    transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .nav-link-ai:hover::after {
    width: calc(100% - 48px);
  }
  .nav-link-ai.active::after {
    width: 20px;
    background: linear-gradient(90deg, #c2410c 0%, #1e2936 100%);
  }
  .nav-link-ai.active:hover::after {
    width: calc(100% - 48px);
    background: linear-gradient(90deg, #c2410c 0%, #ea580c 30%, #1e2936 100%);
  }
`;

const capabilities = [
  {
    icon: Target,
    title: "AI Strategy",
    description: "Helping organisations cut through the AI hype and identify where it actually makes sense. Not chasing trends. Finding value."
  },
  {
    icon: Zap,
    title: "Implementation",
    description: "Building AI-powered tools using LLMs including Claude, Gemini and Grok. Prompt engineering, context orchestration, agentic workflows."
  },
  {
    icon: Sparkles,
    title: "Vibe Coding",
    description: "Right-sized, right-timed solutions that actually get used. Build what's needed, nothing more, ship it, learn, iterate."
  },
  {
    icon: Cpu,
    title: "Decision Intelligence",
    description: "Contributor to British Airways Operational Decision Intelligence. Bridging strategy, delivery and technical implementation."
  }
];

export default function AIPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-['Montserrat',sans-serif]">

      {/* ================================================================ */}
      {/* LEFT SIDEBAR NAV - Desktop */}
      {/* ================================================================ */}
      <style>{navStyles}</style>

      <aside className="fixed left-0 top-0 h-full z-50 hidden lg:flex flex-col"
        style={{
          width: 'clamp(280px, 20vw, 360px)',
          background: 'linear-gradient(180deg, #0a0a0a 0%, #111 50%, #0a0a0a 100%)',
          boxShadow: '4px 0 30px rgba(0,0,0,0.5)',
        }}
      >
        {/* Logo / Name */}
        <Link to="/" className="px-10 pt-10 pb-6">
          <h1 className="text-[44px] tracking-tight font-['Poppins',sans-serif] text-white">
            <span className="font-normal">Jason</span>
            <span className="font-bold ml-1">Jones</span>
            <span className="text-white/30 font-normal ml-2">:</span>
            <span className="text-white/30 font-normal ml-1">:</span>
          </h1>
        </Link>

        {/* Navigation */}
        <nav className="flex-1 px-6 py-4 overflow-y-auto font-['Poppins',sans-serif]">
          <Link to="/" className="nav-link-ai flex items-center gap-2 px-4 py-2 text-[17px] font-normal lowercase tracking-[0.1em] text-white hover:text-[#ea580c] transition-all duration-200">
            <ArrowLeft size={14} /> back to home
          </Link>

          <div className="my-4 mx-4 border-t border-[#3d4d5f]/40" />

          <a href="#hero" className="nav-link-ai active block px-4 py-2 text-[17px] font-normal lowercase tracking-[0.1em] text-[#ea580c] transition-all duration-200">
            AI with Control
          </a>
          <a href="#capabilities" className="nav-link-ai block px-4 py-2 text-[17px] font-normal lowercase tracking-[0.1em] text-white hover:text-[#ea580c] transition-all duration-200">
            capabilities
          </a>
          <a href="#approach" className="nav-link-ai block px-4 py-2 text-[17px] font-normal lowercase tracking-[0.1em] text-white hover:text-[#ea580c] transition-all duration-200">
            approach
          </a>
          <a href="#contact" className="nav-link-ai block px-4 py-2 text-[17px] font-normal lowercase tracking-[0.1em] text-white hover:text-[#ea580c] transition-all duration-200">
            get in touch
          </a>
        </nav>

        {/* Social Links */}
        <div className="px-6 py-8">
          <div className="flex flex-wrap gap-3">
            <a
              href="mailto:jason@flowency.co.uk"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-[#ea580c] text-white hover:opacity-60 transition-all duration-200"
            >
              <Mail size={16} />
            </a>
            <a
              href="https://www.linkedin.com/in/jjonesuk"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-[#0077b5] text-white hover:opacity-60 transition-all duration-200"
            >
              <Linkedin size={16} />
            </a>
            <a
              href="https://www.instagram.com/jayjonesy73"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-[#E4405F] text-white hover:opacity-60 transition-all duration-200"
            >
              <Instagram size={16} />
            </a>
            <a
              href="https://wa.me/447758240770"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-[#25D366] text-white hover:opacity-60 transition-all duration-200"
            >
              <MessageCircle size={16} />
            </a>
          </div>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-[#3d4d5f]/30">
        <div className="flex items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2 text-[#ea580c]">
            <ArrowLeft size={18} />
            <span className="text-sm font-medium">Home</span>
          </Link>
          <span className="text-white font-['Poppins',sans-serif] font-bold">AI with Control</span>
        </div>
      </div>

      {/* ================================================================ */}
      {/* MAIN CONTENT */}
      {/* ================================================================ */}
      <main className="lg:ml-[clamp(280px,20vw,360px)] pt-16 lg:pt-0">

        {/* ============================================================ */}
        {/* HERO */}
        {/* ============================================================ */}
        <section id="hero" className="min-h-[70vh] flex items-center px-8 lg:px-16 py-20 relative overflow-hidden bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#1e2936]">
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `linear-gradient(#ea580c 1px, transparent 1px), linear-gradient(90deg, #ea580c 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }} />

          <div className="relative z-10 max-w-4xl">
            <p className="text-[#ea580c] text-xs font-bold uppercase tracking-[0.2em] mb-6">What I Do</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8 text-white font-['Poppins',sans-serif]">
              AI with Control
            </h1>
            <p className="text-xl md:text-2xl text-[#d0d8e0] leading-relaxed mb-8">
              From strategy to implementation to execution.<br />
              Not theory. Working systems.
            </p>
            <p className="text-[#a8b5c4] text-lg leading-relaxed max-w-2xl">
              Actively building AI products and helping clients navigate AI strategy, implementation and execution.
              Practical experience in prompt engineering, context orchestration and agentic workflow design.
            </p>
          </div>
        </section>

        {/* ============================================================ */}
        {/* CAPABILITIES */}
        {/* ============================================================ */}
        <section id="capabilities" className="px-8 lg:px-16 py-20 bg-[#1e2936]">
          <div className="max-w-6xl mx-auto">
            <p className="text-[#ea580c] text-xs font-bold uppercase tracking-[0.15em] mb-4">Capabilities</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white font-['Poppins',sans-serif] mb-12">
              What I bring to AI work
            </h2>

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
              Grounded in delivery, not hype
            </h2>

            <div className="space-y-6 text-[#d0d8e0] text-lg leading-relaxed">
              <p>
                Building AI-powered SaaS tools using LLMs including Claude, Gemini and Grok.
                Practical experience in prompt engineering, context orchestration and agentic workflow design.
              </p>
              <p>
                Vibe coding done properly: right-sized, right-timed solutions that actually get used.
                Build what's needed, nothing more, ship it, learn, iterate.
              </p>
              <p>
                The same instinct that strips 85 initiatives down to 14 applies here: focus on value,
                not capability theatre. Speed without recklessness. Simplicity without corners cut.
              </p>
            </div>

            {/* Highlight box */}
            <div className="mt-12 p-8 bg-gradient-to-br from-[#c2410c]/15 to-[#ea580c]/5 border-l-4 border-[#ea580c] rounded-r-lg">
              <p className="text-white text-lg font-medium mb-2">Recent Work</p>
              <p className="text-[#d0d8e0]">
                Contributor to British Airways Operational Decision Intelligence.
                Bridges strategy, delivery and technical implementation credibly.
              </p>
            </div>

            {/* Clients */}
            <div className="mt-12 pt-8 border-t border-[#3d4d5f]/30">
              <p className="text-[11px] text-[#a8b5c4] uppercase tracking-[0.15em] font-semibold mb-3">Clients</p>
              <p className="text-[#d0d8e0] text-lg">
                British Airways / IAG · Cheshire Data Systems · Intrapay / Sappaya
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* CONTACT */}
        {/* ============================================================ */}
        <section id="contact" className="px-8 lg:px-16 py-20 bg-gradient-to-r from-[#c2410c] to-[#ea580c]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white font-['Poppins',sans-serif] mb-6">
              Let's talk AI
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Whether you're exploring AI strategy, need hands-on implementation help,
              or want to build something specific - I'd be happy to chat.
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
            <p className="text-[#a8b5c4] text-[11px]">&copy; {new Date().getFullYear()} Jason Jones</p>
            <div className="flex items-center gap-6 text-[#a8b5c4] text-[11px]">
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
