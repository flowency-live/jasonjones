import { useEffect } from "react";
import { Link } from "wouter";
import { Mail, Linkedin, Instagram, MessageCircle, ArrowLeft } from "lucide-react";

// ============================================================================
// WHAT SHAPES ME PAGE
// Books, Music, Drummers - the influences behind the work
// ============================================================================

// CSS for sliding underline animation with gradient fade (matching HomePage)
const navStyles = `
  .nav-link-shapes {
    position: relative;
  }
  .nav-link-shapes::after {
    content: '';
    position: absolute;
    left: 24px;
    bottom: 6px;
    height: 2px;
    width: 0;
    background: linear-gradient(90deg, #c2410c 0%, #ea580c 30%, #1e2936 100%);
    transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .nav-link-shapes:hover::after {
    width: calc(100% - 48px);
  }
  .nav-link-shapes.active::after {
    width: 20px;
    background: linear-gradient(90deg, #c2410c 0%, #1e2936 100%);
  }
  .nav-link-shapes.active:hover::after {
    width: calc(100% - 48px);
    background: linear-gradient(90deg, #c2410c 0%, #ea580c 30%, #1e2936 100%);
  }
`;

const currentlyReading = [
  { title: "Beyond Belief", author: "Nir Eyal", cover: "/assets/images/books/beyondbelief.webp", description: "Currently listening. Will update when finished." },
];

const professionalBooks = [
  { title: "Flow Engineering", author: "Pereira & Davis", cover: "/assets/images/books/flow-engineering.jpg", description: "The question every exec asks me: 'how do I get results faster?' This book answers it practically, clearly and without the usual fluff. Essential reading for anyone serious about delivery." },
  { title: "The Principles of Product Development Flow", author: "Donald Reinertsen", cover: "/assets/images/books/principles-product-dev-flow.jpg", description: "Not for the faint-hearted. Reinertsen's economic framework for flow changed how I think about prioritisation, WIP and the true cost of delay. Dense, rigorous, transformative." },
  { title: "Project to Product", author: "Mik Kersten", cover: "/assets/images/books/project-to-product.jpg", description: "Saw a keynote and was immediately taken. The forensic challenge to silo and project thinking, reframed as value streams and product thinking, is still one of the most important shifts an organisation can make." },
  { title: "Sooner, Safer, Happier", author: "Jon Smart et al", cover: "/assets/images/books/sooner-safer-happier.jpg", description: "Does what it says on the tin. Practical, honest, grounded in real transformation experience. The title alone is a better transformation goal than most strategy decks I've seen." },
  { title: "Leading Change", author: "John Kotter", cover: "/assets/images/books/leading-change.jpg", description: "Still the clearest framework for understanding why change fails and what to do instead. Every transformation I've been part of has bumped into one of Kotter's eight stages. Usually the ones people skip." },
  { title: "Making Work Visible", author: "Dominica DeGrandis", cover: "/assets/images/books/making-work-visible.jpg", description: "Time theft is real and most organisations have no idea it's happening. Dominica names the five thieves and shows you how to see them. I've used this in client workshops more times than I can count." },
  { title: "Kanban", author: "David J. Anderson", cover: "/assets/images/books/kanban-condensed.jpg", description: "The book that codified what many teams were already doing instinctively. Anderson gave us the language to talk about flow, WIP limits, and pull systems in a way that boards and teams could both understand. Foundational." },
  { title: "Lean Change Management", author: "Jason Little", cover: "/assets/images/books/lean-change-management.jpg", description: "Change that sticks has to be owned by the people living it. Jason Little gets this in a way that most change management approaches completely miss. Practical, human, and genuinely useful." },
  { title: "A Seat at the Table", author: "Mark Schwartz", cover: "/assets/images/books/seat-at-the-table.jpg", description: "IT leadership reframed. The conversation between technology and the business has needed this book for decades. Clarity, confidence, and a strong sense of what good actually looks like." },
  { title: "Getting Naked", author: "Patrick Lencioni", cover: "/assets/images/books/getting-naked.jpg", description: "The most important thing a consultant can do is be vulnerable enough to tell the truth before they've won the trust. Lencioni's fable captures something I try to live by, especially when it's uncomfortable." },
  { title: "Commitment", author: "Maassen & Geary", cover: "/assets/images/books/commitment.jpg", description: "A genuinely novel format, fiction used to explain real options thinking and economic decision-making. I've recommended this to more CTOs than any other book on this list." },
  { title: "Flow", author: "Fin Goulding & Haydn Shaughnessy", cover: "/assets/images/books/flow-goulding.jpg", description: "A rare book that bridges the human and systemic sides of flow, not just the engineering metrics, but what it actually takes to build organisations that can move." },
  { title: "Agile Software Development Ecosystems", author: "Jim Highsmith", cover: "/assets/images/books/agile-ecosystems.jpg", description: "One of the original texts. Before SAFe, before the Spotify model, before every consultancy had an agile brand, Highsmith was writing the foundations. Reminds you where all of this came from." },
  { title: "Turtles All the Way Down", author: "DeLozier & Grinder", cover: "/assets/images/books/turtles-all-the-way-down.jpg", description: "NLP modelling strategies for personal genius. The meta-level thinking about how people learn and how patterns form has informed how I coach more than most agile books." },
  { title: "Thinking, Fast and Slow", author: "Daniel Kahneman", cover: "/assets/images/books/thinking-fast-slow.jpg", description: "Two systems. One that reacts fast, pattern-matches and jumps to conclusions. One that works harder, thinks slower, and is usually right. Understanding the difference has made me a better coach, facilitator, and listener." },
];

const personalBooks = [
  { title: "Shoe Dog", author: "Phil Knight", cover: "/assets/images/books/shoe-dog.jpg", description: "The Nike origin story. Honest, messy, brilliant. A reminder that building something real is never the clean narrative it looks like in retrospect. One of the most energising reads I've had in years." },
  { title: "Bill Drummond", author: "Paolo Hewitt", cover: "/assets/images/books/bill-drummond.jpg", description: "The KLF. Art, music, chaos and burning a million pounds on a Scottish island. A book about doing things your own way and not caring whether it fits the framework. More relevant to my work than it has any right to be." },
  { title: "The Subtle Art of Not Giving a F*ck", author: "Mark Manson", cover: "/assets/images/books/subtle-art.jpg", description: "I've never been interested in saying what people want to hear. In rooms where everyone else was staying quiet, I called it, grounded, always, but called it. This book puts a framework around what I've always just done instinctively." },
  { title: "Radical Candor", author: "Kim Scott", cover: "/assets/images/books/RC-Book.webp", description: "Care personally, challenge directly. Scott's framework gave me the language for something I'd always believed: that the kindest thing you can do is tell people the truth. Ruinous empathy helps no one." },
];

const drummers = [
  { name: "Neil Peart", band: "Rush", description: "Precision, complexity, intellect. Peart treated the drum kit as a compositional instrument, not just a rhythm section. Every note placed with intent. The systems thinker's drummer." },
  { name: "Jeff Porcaro", band: "Toto", description: "The half-time shuffle on Rosanna. Possibly the most studied groove in recorded music history. Porcaro made feel look effortless, which is the hardest thing to do. Context, sensitivity, taste." },
  { name: "Keith Moon", band: "The Who", description: "Beautiful, deliberate chaos. Moon played around the beat, not on it, and somehow it worked. A reminder that rules exist to be understood deeply before you break them beautifully." },
];

const albums = [
  { title: "Exile on Main Street", artist: "The Rolling Stones", description: "Loose, raw, layered. A masterpiece that sounds like it wasn't trying to be one. More ideas per side than most bands produce in a career." },
  { title: "Never Mind the Bollocks", artist: "The Sex Pistols", description: "It wasn't supposed to work. It worked completely. Sometimes the most disruptive thing you can do is say 'this is wrong' loudly enough that everyone stops pretending it isn't." },
  { title: "Dark Side of the Moon", artist: "Pink Floyd", description: "Precision meeting emotion. A record about time, money, madness and what we do to each other, built with obsessive craft and then played at enormous scale. Nick Mason holds the whole thing together. Quietly." },
];

export default function WhatShapesMePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-['Montserrat',sans-serif]">

      {/* ================================================================ */}
      {/* LEFT SIDEBAR NAV - Desktop */}
      {/* Matching HomePage theme with gradient background and animated underlines */}
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
          <Link to="/" className="nav-link-shapes flex items-center gap-2 px-4 py-2 text-[17px] font-normal lowercase tracking-[0.1em] text-white hover:text-[#ea580c] transition-all duration-200">
            <ArrowLeft size={14} /> back to home
          </Link>

          <div className="my-4 mx-4 border-t border-[#3d4d5f]/40" />

          <a href="#hero" className="nav-link-shapes active block px-4 py-2 text-[17px] font-normal lowercase tracking-[0.1em] text-[#ea580c] transition-all duration-200">
            what shapes me
          </a>
          <a href="#currently-reading" className="nav-link-shapes block px-4 py-2 text-[17px] font-normal lowercase tracking-[0.1em] text-white hover:text-[#ea580c] transition-all duration-200">
            currently reading
          </a>
          <a href="#books-pro" className="nav-link-shapes block px-4 py-2 text-[17px] font-normal lowercase tracking-[0.1em] text-white hover:text-[#ea580c] transition-all duration-200">
            books - professional
          </a>
          <a href="#books-personal" className="nav-link-shapes block px-4 py-2 text-[17px] font-normal lowercase tracking-[0.1em] text-white hover:text-[#ea580c] transition-all duration-200">
            books - personal
          </a>
          <a href="#drummers" className="nav-link-shapes block px-4 py-2 text-[17px] font-normal lowercase tracking-[0.1em] text-white hover:text-[#ea580c] transition-all duration-200">
            the drummers
          </a>
          <a href="#albums" className="nav-link-shapes block px-4 py-2 text-[17px] font-normal lowercase tracking-[0.1em] text-white hover:text-[#ea580c] transition-all duration-200">
            albums
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

      {/* Mobile back button */}
      <Link to="/" className="lg:hidden fixed top-4 left-4 z-[100] p-2 text-white/60 hover:text-white flex items-center gap-2 text-sm">
        <ArrowLeft size={20} /> Back
      </Link>

      {/* ================================================================ */}
      {/* MAIN CONTENT */}
      {/* ================================================================ */}
      <main className="lg:ml-[clamp(280px,20vw,360px)]">

        {/* ============================================================ */}
        {/* HERO */}
        {/* ============================================================ */}
        <section id="hero" className="px-8 lg:px-16 py-16 relative overflow-hidden">
          <div className="relative z-10 max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight">
              What Shapes
              <br />
              <span className="text-[#ea580c] font-normal">Me</span>
            </h1>
          </div>
        </section>

        {/* ============================================================ */}
        {/* CURRENTLY READING / LISTENING */}
        {/* ============================================================ */}
        <section id="currently-reading" className="px-8 lg:px-16 py-16 bg-[#1e2936]">
          <div className="max-w-6xl mx-auto">
            <p className="text-[#c2410c] text-xs font-bold uppercase tracking-[0.1em] mb-2">Now</p>
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-white">Currently Reading / Listening</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {currentlyReading.map((book, index) => (
                <FlipBookCard key={index} number={index + 1} {...book} dark />
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* PROFESSIONAL BOOKS */}
        {/* ============================================================ */}
        <section id="books-pro" className="px-8 lg:px-16 py-16 bg-white text-black">
          <div className="max-w-6xl mx-auto">
            <p className="text-[#c2410c] text-xs font-bold uppercase tracking-[0.1em]st mb-2">Books</p>
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Professional</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {professionalBooks.map((book, index) => (
                <FlipBookCard key={index} number={index + 1} {...book} />
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* FEATURED BOOK - THE PHOENIX PROJECT */}
        {/* ============================================================ */}
        <section className="px-8 lg:px-16 py-16 bg-[#0a0a0a]">
          <div className="max-w-6xl mx-auto">
            <p className="text-[#c2410c] text-xs font-bold uppercase tracking-[0.1em]st mb-2">Featured</p>
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-white">The one that changed everything</h2>

            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-48 md:w-56 flex-shrink-0 mx-auto md:mx-0">
                <div className="perspective-[1000px]">
                  <div className="relative group cursor-pointer transition-transform duration-700 transform-style-3d hover:rotate-y-180">
                    <div className="backface-hidden">
                      <img
                        src="/assets/images/books/the-pheonix-project.jpg"
                        alt="The Phoenix Project"
                        className="w-full shadow-2xl"
                      />
                    </div>
                    <div className="absolute inset-0 backface-hidden rotate-y-180 bg-[#c2410c] p-4 flex flex-col justify-center">
                      <p className="text-black text-xs font-bold uppercase tracking-[0.1em]st mb-2">Gene Kim, Kevin Behr & George Spafford</p>
                      <p className="text-black/80 text-[13px] leading-relaxed">The Phoenix Project</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-2">The Phoenix Project</h3>
                <p className="text-[#c2410c] text-sm mb-4">Gene Kim, Kevin Behr & George Spafford</p>
                <div className="space-y-4 text-white/85 text-[16px] leading-relaxed">
                  <p>If I could recommend one book to every IT leader, CTO, or frustrated delivery manager, this would be it. The Phoenix Project took the principles of lean manufacturing and showed, through narrative, how they apply to software delivery and IT operations.</p>
                  <p>It's a novel about a fictional company in crisis, but it reads like a documentary of every dysfunctional organisation I've ever worked with. The politics, the firefighting, the heroics that mask systemic failure, it's all there. And then, slowly, the transformation begins.</p>
                  <p>This book didn't just change how I think about delivery. It gave me a language to explain to executives why their projects are late, why their teams are burned out, and what they can actually do about it. The Four Types of Work. The Three Ways. Theory of Constraints applied to IT. All of it came together here first.</p>
                  <p className="text-white/70 italic">If you haven't read it, start here. Everything else on this list makes more sense after you do.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* PERSONAL BOOKS */}
        {/* ============================================================ */}
        <section id="books-personal" className="px-8 lg:px-16 py-16 bg-[#111]">
          <div className="max-w-6xl mx-auto">
            <p className="text-[#c2410c] text-xs font-bold uppercase tracking-[0.1em]st mb-2">Books</p>
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Personal</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {personalBooks.map((book, index) => (
                <FlipBookCard key={index} number={professionalBooks.length + index + 1} {...book} dark />
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* THE DRUMMERS */}
        {/* ============================================================ */}
        <section id="drummers" className="px-8 lg:px-16 py-16 bg-[#c2410c] text-black">
          <div className="max-w-6xl mx-auto">
            <p className="text-black/60 text-xs font-bold uppercase tracking-[0.1em]st mb-2">Music</p>
            <h2 className="text-2xl md:text-3xl font-bold mb-8">The Drummers</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {drummers.map((drummer, index) => (
                <div key={index} className="bg-black/10 p-6">
                  <h3 className="text-xl font-bold mb-1">{drummer.name}</h3>
                  <p className="text-black/60 text-sm mb-4">{drummer.band}</p>
                  <p className="text-black/80 text-[15px] leading-relaxed">{drummer.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* ALBUMS */}
        {/* ============================================================ */}
        <section id="albums" className="px-8 lg:px-16 py-16 bg-[#0a0a0a]">
          <div className="max-w-6xl mx-auto">
            <p className="text-[#c2410c] text-xs font-bold uppercase tracking-[0.1em]st mb-2">Music</p>
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Albums</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {albums.map((album, index) => (
                <div key={index} className="border border-white/10 p-6">
                  <h3 className="text-xl font-bold mb-1">{album.title}</h3>
                  <p className="text-white/70 text-sm mb-4">{album.artist}</p>
                  <p className="text-white/85 text-[15px] leading-relaxed">{album.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-8 lg:px-16 py-8 bg-[#0a0a0a] border-t border-white/10">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/30 text-[11px]">&copy; {new Date().getFullYear()} Jason Jones</p>
            <div className="flex items-center gap-6 text-white/30 text-[11px]">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <a href="https://flowency.co.uk" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Flowency</a>
            </div>
          </div>
        </footer>

      </main>
    </div>
  );
}

// ============================================================================
// COMPONENTS
// ============================================================================

// Flip card styles injected via style tag for 3D transform support
const fadeCardStyles = `
  .fade-card {
    position: relative;
    height: 320px;
    overflow: hidden;
  }
  .fade-card-front,
  .fade-card-back {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    transition: opacity 0.4s ease;
  }
  .fade-card-front {
    opacity: 1;
  }
  .fade-card-back {
    opacity: 0;
  }
  .fade-card:hover .fade-card-front {
    opacity: 0;
  }
  .fade-card:hover .fade-card-back {
    opacity: 1;
  }
`;

function FlipBookCard({
  number,
  title,
  author,
  cover,
  description,
  dark = false
}: {
  number: number;
  title: string;
  author: string;
  cover: string;
  description: string;
  dark?: boolean
}) {
  return (
    <>
      <style>{fadeCardStyles}</style>
      <div className="fade-card">
        {/* Front - Book Cover */}
        <div className="fade-card-front">
          <img
            src={cover}
            alt={`${title} by ${author}`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Back - Description overlay */}
        <div className="fade-card-back">
          <div
            className={`h-full p-5 flex flex-col ${
              dark
                ? "bg-[#16a34a] text-white"
                : "bg-[#eab308] text-black"
            }`}
          >
            <h3 className={`text-[15px] font-bold mb-1 ${dark ? "text-white" : "text-black"}`}>{title} // {author}</h3>
            <p className={`text-[13px] leading-relaxed flex-1 overflow-y-auto ${dark ? "text-white/90" : "text-black/80"}`}>{description}</p>
          </div>
        </div>
      </div>
    </>
  );
}
