import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Mail, Linkedin, Instagram, MessageCircle, Menu, X } from "lucide-react";
import { PhotoGallery, CaptionedPhotoGallery } from "@/components/PhotoGallery";
import type { GalleryImage, CaptionedImage } from "@/components/PhotoGallery";

// ============================================================================
// HOME PAGE - About Jason Jones
// Full page with all sections from content brief
// ============================================================================

const NAV_ITEMS = [
  { id: "home", label: "home" },
  { id: "WhoIAm", label: "who I am" },
  { id: "FlowOrigin", label: "flow origins" },
  { id: "AcceleratedDelivery", label: "getting shit done" },
  { id: "InnovationAI", label: "AI with control" },
  { id: "Alignment", label: "alignment" },
  { id: "Flowency", label: "flowency" },
  { id: "VibeCoding", label: "vibe coding" },
  { id: "WhatIDontDo", label: "what I don't do" },
  { id: "Highlights", label: "highlights" },
  { id: "GigList", label: "the gig list" },
  { id: "SayHello", label: "say hello" },
];

// Flow Origin section images
const flowOriginImages: GalleryImage[] = [
  { src: "/assets/images/about/flow-origin/dyehouse.jpg", alt: "Dyehouse / Manufacturing", className: "aspect-square" },
  { src: "/assets/images/about/flow-origin/Bilbao.png", alt: "Learnship Bilbao", className: "aspect-square" },
  { src: "/assets/images/about/flow-origin/KMUPoster.png", alt: "Kanban University", className: "aspect-square" },
  { src: "/assets/images/about/flow-origin/20241112_103736.jpg", alt: "Learnship Miami", className: "aspect-square" },
  { src: "/assets/images/about/flow-origin/statik.png", alt: "STATIK Framework", className: "col-span-2 aspect-[2/1]", objectFit: "contain", bgColor: "#ffffff" },
];

// Client logos for the Gig List section
const clientLogos = [
  { name: "British Airways", src: "/assets/images/ClientLogos/britishairways_logo.png", size: "xl", delay: 150, url: "https://www.britishairways.com/" },
  { name: "CDL", src: "/assets/images/ClientLogos/cdl.png", size: "lg", delay: 420, url: "https://www.cdl.co.uk/" },
  { name: "HSBC", src: "/assets/images/ClientLogos/hsbc_logo.png", size: "lg", delay: 80, url: "https://www.hsbc.co.uk/" },
  { name: "IAG", src: "/assets/images/ClientLogos/iag.png", size: "lg", delay: 350, url: "https://www.iairgroup.com/" },
  { name: "Co-operative Bank", src: "/assets/images/ClientLogos/coopbank_logo.png", size: "xl", delay: 520, url: "https://www.co-operativebank.co.uk/" },
  { name: "Morgan Sindall", src: "/assets/images/ClientLogos/morgansindallgroup_logo.png", size: "lg", delay: 200, url: "https://www.morgansindall.com/" },
  { name: "Dassault Systems", src: "/assets/images/ClientLogos/dassaultsystems_logo.png", size: "xxl", delay: 600, url: "https://www.3ds.com/" },
  { name: "Airbus", src: "/assets/images/ClientLogos/airbus.png", size: "lg", delay: 50, url: "https://www.airbus.com/" },
  { name: "Capital One", src: "/assets/images/ClientLogos/capitalone_logo.png", size: "xxl", delay: 480, url: "https://www.capitalone.co.uk/" },
  { name: "Barclaycard", src: "/assets/images/ClientLogos/barclaycard_logo.png", size: "xl", delay: 280, url: "https://www.barclaycard.co.uk/" },
  { name: "NashTech", src: "/assets/images/ClientLogos/nashtech.png", size: "lg", delay: 100, url: "https://www.nashtechglobal.com/" },
  { name: "Bentley", src: "/assets/images/ClientLogos/bentley.png", size: "lg", delay: 380, url: "https://www.bentleymotors.com/" },
  { name: "Manchester Airports", src: "/assets/images/ClientLogos/mag_logo.png", size: "xl", delay: 550, url: "https://www.magairports.com/" },
  { name: "Shaw Trust", src: "/assets/images/ClientLogos/shawtrust_logo.png", size: "lg", delay: 250, url: "https://shawtrust.org.uk/" },
  { name: "SSE", src: "/assets/images/ClientLogos/sse_logo.png", size: "lg", delay: 320, url: "https://www.sse.com/" },
  { name: "BAE Systems", src: "/assets/images/ClientLogos/bae-systems.png", size: "lg", delay: 450, url: "https://www.baesystems.com/en" },
  { name: "Landmark Information", src: "/assets/images/ClientLogos/landmarkinformation_logo.png", size: "xl", delay: 180, url: "https://www.landmark.co.uk/" },
];

// Highlights section images with captions
const highlightImages: CaptionedImage[] = [
  { src: "/assets/images/about/highlights/ba.webp", title: "British Airways / Cabin Crew App", description: "Fifteen thousand cabin crew. One small team. Deployed MVP and stopped at 95% of the value, five things still on the backlog. Knowing when to stop is as important as knowing when to start.", url: "https://www.linkedin.com/posts/peter-strauss-34701112_it-was-an-honour-to-join-bas-management-activity-7241418311605829634-m0wo" },
  { src: "/assets/images/about/highlights/CDL.webp", title: "CDL / Cheshire Data Systems", description: "Two years transforming the delivery function, aligning it with strategic initiatives and challenging perceptions of priority. When COVID hit, that groundwork ensured service continuity and team stability.", url: "https://www.cdl.co.uk/" },
  { src: "/assets/images/about/highlights/Cap1.webp", title: "Capital One UK", description: "Forty-five teams. Four SAFe Release Trains. Coached squad to programme leadership. Established a Community of Practice that kept running long after I'd gone." },
  { src: "/assets/images/about/highlights/RadicalTeam.jpg", title: "Co-op Bank / Radical Company", description: "Three product-focused teams. An island of freedom from traditional process. Recruited A-players, the best at their craft. Delivered digital product, fast. Some of my best memories." },
  { src: "/assets/images/about/highlights/PostIts.webp", title: "Wall of Work", description: "85 initiatives, all mandatory, critical and urgent. Asked why about every one. 14 survived. 10 shipped as working digital products." },
  { src: "/assets/images/about/highlights/Courtaulds.webp", title: "Courtaulds Dyehouse", description: "My first job. Where I learned systems thinking, flow and constraints before I knew those words. Every lean principle I use today came from a fabric manufacturer in the 1990s." },
  { src: "/assets/images/about/highlights/1a350_xwb_in_flight.webp", title: "Dassault / Airbus A350 XWB", description: "Before agile delivery was my world, I was living in Toulouse coding translation engines for electrical harness manufacturing. Complex, high-stakes systems." },
  { src: "/assets/images/about/highlights/Hanoi.webp", title: "Offshore Coaching", description: "Vietnam, India, Poland. Some of my most formative work happened furthest from home. Culture isn't a soft variable. It is the system." },
  { src: "/assets/images/about/highlights/Kanban.webp", title: "Kanban University", description: "Being part of the global Kanban community at Learnship is one of the things I'm most proud of professionally. Miami and Bilbao.", url: "https://kanban.university/" },
  { src: "/assets/images/about/highlights/lego.webp", title: "Lego SIM City in FS", description: "I've stood on a desk with a room full of Lego watching senior bank leaders get it in real time. Theory of Constraints, Cost of Delay, all of it landing at once. That's what all of this is for." },
  { src: "/assets/images/about/highlights/James.jpg", title: "Adaptavis Project Partner", description: "James Enock, CEO of Adaptavis. Peer, colleague, friend and mentor for over ten years. We all have those people who guide and support. A true legend in this space.", url: "https://www.adaptavis.com/" },
  { src: "/assets/images/about/highlights/friends.jpg", title: "When a Plan Comes Together", description: "Sometimes the right group of people get together at the right time. This was one of those times." },
];

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [gigListVisible, setGigListVisible] = useState(false);
  const gigListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV_ITEMS[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(NAV_ITEMS[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for Gig List animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setGigListVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (gigListRef.current) {
      observer.observe(gigListRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-['Montserrat',sans-serif]">

      {/* ================================================================ */}
      {/* LEFT SIDEBAR NAV - Desktop */}
      {/* ================================================================ */}
      <aside className="fixed left-0 top-0 h-full w-52 z-50 bg-[#0a0a0a] border-r border-white/10 hidden lg:flex flex-col">
        <Link to="/" className="p-6 border-b border-white/10">
          <span className="text-lg font-bold"><span className="text-[#c2410c]">jason</span>jones</span>
        </Link>

        <nav className="flex-1 py-4 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`w-full text-left px-6 py-2 text-[12px] uppercase tracking-wider transition-colors ${
                activeSection === item.id
                  ? "text-[#c2410c] border-l-2 border-[#c2410c] bg-white/5"
                  : "text-white/40 hover:text-white/70 border-l-2 border-transparent"
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="my-2 mx-6 border-t border-white/10" />
          <Link
            to="/what-shapes-me"
            className="w-full text-left px-6 py-2 text-[12px] uppercase tracking-wider text-white/40 hover:text-white/70 border-l-2 border-transparent block"
          >
            what shapes me
          </Link>
        </nav>

        <div className="p-6 border-t border-white/10 space-y-2">
          <a href="mailto:jason@flowency.co.uk" className="flex items-center gap-2 text-white/30 hover:text-[#c2410c] text-[11px]">
            <Mail size={12} /> Email
          </a>
          <a href="https://www.linkedin.com/in/jjonesuk" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/30 hover:text-[#c2410c] text-[11px]">
            <Linkedin size={12} /> LinkedIn
          </a>
          <a href="https://www.instagram.com/jayjonesy73" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/30 hover:text-[#c2410c] text-[11px]">
            <Instagram size={12} /> Instagram
          </a>
          <a href="https://wa.me/447758240770" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/30 hover:text-[#c2410c] text-[11px]">
            <MessageCircle size={12} /> WhatsApp
          </a>
        </div>
      </aside>

      {/* Mobile menu button */}
      <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden fixed top-4 left-4 z-[100] p-2 text-white">
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-[#0a0a0a] flex flex-col justify-center items-center">
          <nav className="space-y-4 text-center">
            {NAV_ITEMS.map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)} className={`block text-lg ${activeSection === item.id ? "text-[#c2410c]" : "text-white/60"}`}>
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}

      {/* ================================================================ */}
      {/* MAIN CONTENT */}
      {/* ================================================================ */}
      <main className="lg:ml-52">

        {/* ============================================================ */}
        {/* HERO */}
        {/* ============================================================ */}
        <section id="home" className="min-h-[60vh] flex items-center px-8 lg:px-16 py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('/assets/images/about/hero/workshop.jpg')" }} />

          <div className="relative z-10 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Text */}
            <div className="text-center lg:text-left">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight mb-6">
                Helping people see what's possible
                <br />
                <span className="text-[#c2410c] font-normal">then delivering it with them</span>
              </h1>
              <p className="text-white/50 text-lg">Tenacity. Radical candour. Getting shit done.</p>
            </div>

            {/* Photo with faded edges */}
            <div className="relative hidden lg:block">
              <div className="relative w-full max-w-md mx-auto">
                <img
                  src="/assets/images/about/jason/jason.webp"
                  alt="Jason Jones"
                  className="w-full h-auto rounded-lg"
                />
                {/* Faded edge overlays */}
                <div className="absolute inset-0 pointer-events-none rounded-lg" style={{
                  background: 'linear-gradient(to right, #0a0a0a 0%, transparent 15%, transparent 85%, #0a0a0a 100%), linear-gradient(to bottom, #0a0a0a 0%, transparent 15%, transparent 85%, #0a0a0a 100%)'
                }} />
              </div>
            </div>
          </div>
        </section>

        {/* TAGLINE BAR */}
        <section className="py-8 bg-[#c2410c]">
          <p className="text-center text-black font-semibold text-lg md:text-xl px-8">
            See it clearly. Say it plainly. Deliver what actually matters.
          </p>
        </section>

        {/* ============================================================ */}
        {/* WHO I AM - Book Spread */}
        {/* ============================================================ */}
        <section id="WhoIAm" className="px-8 lg:px-12 xl:px-16 py-16 bg-white text-black">
          <div className="max-w-7xl mx-auto">
            <p className="text-[#c2410c] text-xs font-bold uppercase tracking-widest mb-8">Who I Am</p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
              {/* Bio */}
              <div className="text-[13px] leading-relaxed text-black/80 space-y-4">
                <p className="text-black font-medium text-[15px] leading-snug mb-4">
                  A love of tech. A feel for rhythm. An instinct for the simpler, better way.
                </p>
                <p>Given I'm old enough to have learned to code on a BBC Micro and picked up my first pair of drumsticks at the same time, I can safely say both technology and timing have been with me a while. Neither has let go.</p>
                <p>From a dyehouse, managing yarn sourcing, dye capacity and a single-machine bottleneck where you only processed what you could actually ship, to the Airbus A350 XWB in Toulouse, from early-2000s training rooms to coaching forty-five agile teams at Capital One, it's been quite a journey. I was working in genuinely complex systems long before anyone handed me an agile framework.</p>
                <p>And whilst I've had success, I've had failure too. We built a construction tech product that was runner-up at InterBuild 2007. Then the recession hit. The learning was, as they say, brutal. I doff the proverbial to anyone who's built something real and watched the market move. I know exactly how that goes.</p>
                <p>Now I do what I've always loved: coaching, facilitating and helping people, teams and organisations deliver things that genuinely matter. Lean, agile, flow, DevOps; applied honestly, because I've seen what works and what doesn't. It goes way beyond being a job.</p>
                <p>Flow of value, systems thinking, the Kanban Method, AI: the sheer possibility of working with people who can genuinely make a dent. That's what keeps me here.</p>
                <p className="text-[#c2410c] font-bold text-xl pt-4">Jason Jones</p>
              </div>

              {/* Philosophy 1-4 */}
              <div className="space-y-5">
                <PhilosophyPoint number="#1" title="It's about listening before you play" text="In music I learned that following the beat precisely can put you completely out of time with everyone else. The people in the room usually already know the answer. My job is to step back and help them hear it." />
                <PhilosophyPoint number="#2" title="It's about asking why, relentlessly" text="A leadership team gave me 85 Post-Its, all mandatory, critical, urgent. We asked why about every one. Fourteen survived. Ten shipped as working digital products." />
                <PhilosophyPoint number="#3" title="Outcomes follow Practices. Practices follow Culture. Culture follows Values." text="If you don't start with values, you'll end up with busy people fire-fighting and calling it change." />
                <PhilosophyPoint number="#4" title="It's about simplicity: Occam's Razor, every time" text="Complexity is almost always a symptom, not a feature. The simplest explanation is usually right. The simplest solution usually works." />
              </div>

              {/* Philosophy 5-8 */}
              <div className="space-y-5">
                <PhilosophyPoint number="#5" title="It's about context: the right method for the right moment" text="A latin groove in Silent Night is technically impressive. It's also completely wrong. I'm not an agile evangelist. Framework agnostic. Context always wins." />
                <PhilosophyPoint number="#6" title="It's about the space between the beats" text="The notes you don't play matter as much as the ones you do. The work you remove is often more valuable than the work you add." />
                <PhilosophyPoint number="#7" title="It's about building capability, not dependency" text="I'm here to make myself unnecessary. The goal is that the team doesn't need me anymore, because they've got it." />
                <PhilosophyPoint number="#8" title="It's about delivering real things, not activity" text="Ten working digital products from fourteen Post-Its. Shipped things, in the hands of real users. Nothing builds belief faster than showing people something that actually works." />
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* FLOW ORIGIN STORY */}
        {/* ============================================================ */}
        <section id="FlowOrigin" className="py-16 bg-[#0a0a0a]">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Text - left side with padding */}
            <div className="px-8 lg:pl-16 lg:pr-12">
              <p className="text-[#c2410c] text-xs font-bold uppercase tracking-widest mb-4">Origins</p>
              <h2 className="text-2xl md:text-3xl font-bold mb-8">Flow, before anyone called it that</h2>

              <div className="space-y-5 text-[14px] leading-relaxed text-white/70">
                <p>My first job was in a dyehouse. I was managing production planning for a fabric manufacturer: upstream constraints in yarn sourcing and knitting, finite dye capacity, a single stenter machine as the bottleneck downstream. One batch at a time. You only dyed what you could actually dry. You only processed real orders, never speculative work. If you got the timing wrong, fabric sat wet, went mouldy, became rework.</p>
                <p>I was visualising work, managing flow, limiting WIP and responding to the constraint, before I had any of those words. I saw Kanban cards on that shop floor before I knew what they were called.</p>
                <p>My first business trip was to M&S at Baker Street. Ten swatches of navy cotton jersey fabric on the table, all ostensibly the same. Each subtly different. One flatter, one redder, one with a metamerism you couldn't see until you placed it in a light box replicating the exact lighting of the shop floor. Same fabric. Different context. Completely different outcome. That lesson, that the environment in which something is used changes everything, has never left me.</p>
                <p>Years later, when I encountered the Kanban Method, it felt less like learning something new and more like finding the name for something I'd already been doing. David Anderson's work, rooted in lean manufacturing and the Toyota Production System, mapped directly onto everything I'd learned in that dyehouse.</p>
                <p>I'm a Kanban Management Professional through Kanban University, and I've attended the global Learnship conferences in Miami and Bilbao, where the people who are genuinely serious about this come together. I use the Kanban Maturity Model to help organisations understand where they are and plot a realistic path forward.</p>
                <p className="text-white/50">Most organisations jump to SAFe or Scrum before they can even see their own system clearly. The Kanban Method starts where you are. It doesn't ask you to install a recipe. It asks you to look honestly at how work flows, or doesn't, and improve from there. It is, in my view, the most powerful and most underused tool in the Lean/Agile toolkit.</p>
              </div>
            </div>

            {/* Image gallery - right side, full bleed to edge */}
            <PhotoGallery
              images={flowOriginImages}
              gridClassName="grid grid-cols-2"
            />
          </div>
        </section>

        {/* ============================================================ */}
        {/* GETTING SHIT DONE - Accelerated Delivery */}
        {/* ============================================================ */}
        <section id="AcceleratedDelivery" className="py-16 bg-[#111]">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Text - left side with padding */}
            <div className="px-8 lg:pl-16 lg:pr-12">
              <p className="text-[#c2410c] text-xs font-bold uppercase tracking-widest mb-4">What I Do</p>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Getting Shit Done</h2>
              <p className="text-white/40 mb-8">Accelerated Delivery</p>

              <div className="space-y-4 text-[14px] leading-relaxed text-white/70">
                <p>Deliver value faster. Reduce delays, multitasking and bottlenecks. Visualise work, limit WIP, continuously improve using data. Smoother, more predictable delivery that your teams can see and trust.</p>
                <p>Make the invisible visible. Visualise your work, configure your tooling, instrument your workflow so you can see how your delivery system is actually performing and identify improvements you can make yourselves.</p>
                <p>Deliver change that sticks. Experienced practitioners give your teams the skills and confidence to own and evolve their practices. Continuous improvement becomes part of the DNA, not a project with an end date.</p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-[10px] text-white/30 uppercase tracking-widest mb-2">Clients</p>
                <p className="text-white/50 text-[13px]">British Airways / IAG · HSBC · Shell Recharge · Co-operative Bank · Cheshire Data Systems · Manchester Airports Group</p>
              </div>
            </div>

            {/* Images - right side, full bleed */}
            <div className="grid grid-cols-2">
              <ImagePlaceholder label="Workshop 1" path="/assets/images/about/accelerated-delivery/1.jpg" />
              <ImagePlaceholder label="Workshop 2" path="/assets/images/about/accelerated-delivery/2.jpg" />
              <ImagePlaceholder label="Workshop 3" path="/assets/images/about/accelerated-delivery/3.jpg" />
              <ImagePlaceholder label="Workshop 4" path="/assets/images/about/accelerated-delivery/4.jpg" />
              <div className="col-span-2">
                <ImagePlaceholder label="Workshop wide" path="/assets/images/about/accelerated-delivery/wide.jpg" wide />
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* AI WITH CONTROL */}
        {/* ============================================================ */}
        <section id="InnovationAI" className="py-16 bg-white text-black">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Images - left side, full bleed */}
            <div className="grid grid-cols-2 order-2 lg:order-1">
              <div className="col-span-2">
                <ImagePlaceholder label="AI Tool" path="/assets/images/about/ai/wide.jpg" wide light />
              </div>
              <ImagePlaceholder label="AI 1" path="/assets/images/about/ai/1.jpg" light />
              <ImagePlaceholder label="AI 2" path="/assets/images/about/ai/2.jpg" light />
              <ImagePlaceholder label="AI 3" path="/assets/images/about/ai/3.jpg" light />
              <ImagePlaceholder label="AI 4" path="/assets/images/about/ai/4.jpg" light />
            </div>

            {/* Text - right side with padding */}
            <div className="order-1 lg:order-2 px-8 lg:pl-12 lg:pr-16">
              <p className="text-[#c2410c] text-xs font-bold uppercase tracking-widest mb-4">What I Do</p>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">AI with Control</h2>
              <p className="text-black/40 mb-8">From strategy to implementation to execution</p>

              <div className="space-y-4 text-[14px] leading-relaxed text-black/70">
                <p>Actively building AI products and helping clients navigate AI strategy, implementation and execution. Not theory. Working systems.</p>
                <p>Building AI-powered SaaS tools using LLMs including Claude, Gemini and Grok. Practical experience in prompt engineering, context orchestration and agentic workflow design.</p>
                <p>Vibe coding done properly: right-sized, right-timed solutions that actually get used. Build what's needed, nothing more, ship it, learn, iterate.</p>
                <p>Contributor to British Airways Operational Decision Intelligence. Bridges strategy, delivery and technical implementation credibly.</p>
              </div>

              <div className="mt-8 pt-6 border-t border-black/10">
                <p className="text-[10px] text-black/30 uppercase tracking-widest mb-2">Clients</p>
                <p className="text-black/50 text-[13px]">British Airways / IAG · Cheshire Data Systems · Intrapay / Sappaya</p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* ALIGNMENT */}
        {/* ============================================================ */}
        <section id="Alignment" className="py-16 bg-[#0a0a0a]">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Text - left side with padding */}
            <div className="px-8 lg:pl-16 lg:pr-12">
              <p className="text-[#c2410c] text-xs font-bold uppercase tracking-widest mb-4">What I Do</p>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Strategy to Execution Alignment</h2>

              <div className="space-y-4 text-[14px] leading-relaxed text-white/70">
                <p>Helping organisations close the gap between what the boardroom decides and what the teams actually deliver. OKRs, value streams, lean portfolio leadership: connecting the why to the what to the how.</p>
                <p>Not another layer of process. A clearer line of sight. Working with leadership and delivery teams simultaneously, so the conversation in the boardroom and the work on the board are finally telling the same story.</p>
              </div>

              {/* Key story */}
              <div className="mt-8 p-6 bg-[#c2410c]/10 border-l-4 border-[#c2410c]">
                <p className="text-[14px] leading-relaxed text-white/80">
                  A leadership team. 85 Post-Its on the wall, every one labelled mandatory, critical and urgent. I asked "Why? Show me the money." and started pulling tickets down. The consultancy owner who'd placed me panicked. Then the leadership started doing it themselves. "Dave, do we really need that?" "Nah, probably not." 14 survived. 10 shipped as working digital products. That room didn't need a transformation programme. It needed someone to ask the right question.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-[10px] text-white/30 uppercase tracking-widest mb-2">Clients</p>
                <p className="text-white/50 text-[13px]">Shell Recharge · HSBC Investment Bank · Capital One UK · Co-operative Bank · Intrapay / Sappaya</p>
              </div>
            </div>

            {/* Images - right side, full bleed */}
            <div className="grid grid-cols-2">
              <ImagePlaceholder label="Strategy 1" path="/assets/images/about/alignment/1.jpg" />
              <ImagePlaceholder label="Strategy 2" path="/assets/images/about/alignment/2.jpg" />
              <ImagePlaceholder label="Strategy 3" path="/assets/images/about/alignment/3.jpg" />
              <ImagePlaceholder label="Strategy 4" path="/assets/images/about/alignment/4.jpg" />
              <div className="col-span-2">
                <ImagePlaceholder label="Post-It Wall" path="/assets/images/about/alignment/postit-wall.jpg" wide />
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* FLOWENCY */}
        {/* ============================================================ */}
        <section id="Flowency" className="py-16 bg-white text-black">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Images - left side, full bleed */}
            <div className="grid grid-cols-2 order-2 lg:order-1">
              <ImagePlaceholder label="Flow 1" path="/assets/images/about/flowency/1.jpg" light />
              <ImagePlaceholder label="Flow 2" path="/assets/images/about/flowency/2.jpg" light />
              <div className="col-span-2">
                <ImagePlaceholder label="Flow wide" path="/assets/images/about/flowency/wide.jpg" wide light />
              </div>
              <ImagePlaceholder label="Flow 3" path="/assets/images/about/flowency/3.jpg" light />
              <ImagePlaceholder label="Flow 4" path="/assets/images/about/flowency/4.jpg" light />
            </div>

            {/* Text - right side with padding */}
            <div className="order-1 lg:order-2 px-8 lg:pl-12 lg:pr-16">
              <p className="text-[#c2410c] text-xs font-bold uppercase tracking-widest mb-4">What I Do</p>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Flowency</h2>
              <p className="text-black/40 mb-8">Making flow of value visible and predictable</p>

              <div className="space-y-4 text-[14px] leading-relaxed text-black/70">
                <p>Start where you are. Bring clarity, focus and stability. Then optimise for flow. Evolutionary, continuous improvement: building internal capability so the changes stick long after the engagement ends.</p>
                <p>Uses STATIK (a Systems Thinking Approach to implementing Kanban) to diagnose structural friction and design fit-for-purpose delivery systems. Uncovers invisible and stalled work, establishes pull-based systems, and surfaces cycle time, lead time, flow efficiency and blocker trends. Makes the system legible before trying to change it.</p>
                <p>Framework agnostic, method diverse. Scrum, Kanban, SAFe, Spotify: applied contextually for each organisation's maturity. Not installed. Grown. Holds the Kanban Management Professional (KMP) credential through Kanban University.</p>
                <p>I've consulted, coached, led and co-sourced lean, Agile and DevOps teams and scaled them, using SAFe, LeSS and Spotify, with success and without. The failures taught me as much as the wins. That honesty is part of how I work.</p>
              </div>

              <div className="mt-8 pt-6 border-t border-black/10">
                <p className="text-[10px] text-black/30 uppercase tracking-widest mb-2">Clients</p>
                <p className="text-black/50 text-[13px]">HSBC (x2) · Capital One UK (40-45 teams, 4 SAFe Release Trains) · Modix / Cox Automotive · Manchester Airports Group · Barclaycard UK</p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* VIBE CODING */}
        {/* ============================================================ */}
        <section id="VibeCoding" className="py-16 bg-[#0a0a0a]">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Text - left side with padding */}
            <div className="px-8 lg:pl-16 lg:pr-12">
              <p className="text-[#c2410c] text-xs font-bold uppercase tracking-widest mb-4">What I Do</p>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Vibe Coding</h2>
              <p className="text-white/40 mb-8">Fit 4 Purpose</p>

              <div className="space-y-4 text-[14px] leading-relaxed text-white/70">
                <p>Making solutions and products that are right-sized, right-timed and actually get used. Not over-engineered. Not under-thought. Fit for purpose, which requires understanding what purpose actually is.</p>
                <p>Building AI-powered SaaS applications using modern LLM ecosystems. Practical, deployable, real. The kind of thing that exists in production, not in a pitch deck.</p>
                <p>The same instinct that strips 85 initiatives down to 14 applies here: build what's needed, nothing more, ship it, learn, iterate. Speed without recklessness. Simplicity without corners cut.</p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-[10px] text-white/30 uppercase tracking-widest mb-2">Projects</p>
                <p className="text-white/50 text-[13px]">Internal Flowency tools · BA Operational Intelligence · Client prototypes</p>
              </div>
            </div>

            {/* Images - right side, full bleed */}
            <div className="grid grid-cols-2">
              <ImagePlaceholder label="Screenshot 1" path="/assets/images/about/vibe-coding/1.jpg" />
              <ImagePlaceholder label="Screenshot 2" path="/assets/images/about/vibe-coding/2.jpg" />
              <div className="col-span-2">
                <ImagePlaceholder label="App screenshot" path="/assets/images/about/vibe-coding/wide.jpg" wide />
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* WHAT I DON'T DO */}
        {/* ============================================================ */}
        <section id="WhatIDontDo" className="px-8 lg:px-16 py-16 bg-[#c2410c] text-black">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">What I don't do</h2>
            <p className="text-black/60 text-center mb-12">I've seen enough to know what works, and what doesn't.</p>

            <div className="space-y-8">
              <DontDoItem title="Force change upon you" text="Real change sticks when it's done by your people, not to them. I meet you where you are and build momentum through incremental change and visible results. Not fear, disruption, or top-down mandates." />
              <DontDoItem title="Arrive with a framework and tell you to install it" text="You can't install someone else's recipe into your organisation. Never works. I'm not an agile theory evangelist. There's more than one way to solve most problems. I help you find the way that works for you." />
              <DontDoItem title="Beat around the bush" text="I listen first. Once I truly understand the challenge, I give straight-talking, pragmatic, actionable advice. If something doesn't need doing, I'll tell you." />
              <DontDoItem title="Fix something that shouldn't exist" text="Sometimes the most valuable thing I do is ask 'why are you doing this at all?' The room didn't need a transformation programme. It needed someone to ask the right question." />
              <DontDoItem title="Install a recipe and call it transformation" text="Outcomes follow Practices. Practices follow Culture. Culture follows Values. If you start anywhere other than values, you'll end up with a load of busy people fire-fighting and calling it change." />
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* HIGHLIGHTS */}
        {/* ============================================================ */}
        <section id="Highlights" className="py-16 bg-[#1a1a1a]">
          <div className="px-8 lg:px-16 mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center text-white">Highlights</h2>
            <p className="text-white/50 text-center">Everyone has their favourites. Places I've enjoyed. Friends made. Peers learned from. Outcomes realised.</p>
          </div>

          <CaptionedPhotoGallery images={highlightImages} />
        </section>

        {/* ============================================================ */}
        {/* THE GIG LIST - Logo Grid */}
        {/* ============================================================ */}
        <section id="GigList" ref={gigListRef} className="relative py-16 lg:py-20 overflow-hidden">
          {/* Textured background with subtle warmth */}
          <div className="absolute inset-0 bg-[#faf9f7]" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
            }}
          />

          {/* Keyframe animation for zoom in */}
          <style>{`
            @keyframes zoomIn {
              0% {
                opacity: 0;
                transform: scale(0);
              }
              50% {
                opacity: 0.7;
              }
              100% {
                opacity: 1;
                transform: scale(1);
              }
            }
          `}</style>

          {/* Content */}
          <div className="relative z-10">
            {/* Header */}
            <div className="text-center mb-12 px-8">
              <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-4">
                The Gig List
              </h2>
              <p className="text-[#666] text-lg">
                Just some of the great organisations I've worked with over the years.
              </p>
            </div>

            {/* Logo cloud - organic varied sizes */}
            <div className="max-w-6xl mx-auto px-8">
              <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-8 md:gap-x-14 md:gap-y-10">
                {clientLogos.map((logo) => {
                  // Use inline styles to ensure sizes work
                  const heights: Record<string, { mobile: string; desktop: string }> = {
                    xxxl: { mobile: '7rem', desktop: '11rem' },
                    xxl: { mobile: '6rem', desktop: '9rem' },
                    xl: { mobile: '5rem', desktop: '7rem' },
                    lg: { mobile: '3.5rem', desktop: '5rem' },
                    md: { mobile: '2.5rem', desktop: '3.5rem' },
                    sm: { mobile: '2rem', desktop: '3rem' },
                  };
                  const sizeConfig = heights[logo.size] || heights.lg;
                  return (
                    <a
                      key={logo.name}
                      href={logo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center group"
                      style={{
                        height: sizeConfig.desktop,
                        opacity: 0,
                        transform: 'scale(0)',
                        ...(gigListVisible && {
                          animation: `zoomIn 2.2s cubic-bezier(0.22, 1, 0.36, 1) forwards`,
                          animationDelay: `${logo.delay}ms`,
                        }),
                      }}
                    >
                      <img
                        src={logo.src}
                        alt={logo.name}
                        className="h-full w-auto object-contain transition-transform duration-300 group-hover:scale-110"
                        loading="lazy"
                      />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Subtle footer line */}
            <div className="max-w-3xl mx-auto px-8 pt-8">
              <div className="h-px bg-gradient-to-r from-transparent via-[#c2410c]/20 to-transparent" />
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SAY HELLO */}
        {/* ============================================================ */}
        <section id="SayHello" className="px-8 lg:px-16 py-16 bg-white text-black">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">Let's talk</h2>
            <p className="text-black/50 text-center mb-12">Fill in the form or drop me a line. No pitch decks. No jargon. Just a conversation about what you're trying to achieve.</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <div className="space-y-3 text-[14px]">
                  <p><a href="tel:+447758240770" className="text-black hover:text-[#c2410c] transition-colors">+44 7758 240770</a></p>
                  <p><a href="mailto:jason@flowency.co.uk" className="text-black hover:text-[#c2410c] transition-colors">jason@flowency.co.uk</a></p>
                </div>
              </div>

              <form className="space-y-4">
                <input type="text" placeholder="Name" className="w-full bg-black/5 border border-black/10 px-4 py-3 text-black text-[13px] focus:border-[#c2410c] focus:outline-none transition-colors placeholder:text-black/30" />
                <input type="email" placeholder="Email" className="w-full bg-black/5 border border-black/10 px-4 py-3 text-black text-[13px] focus:border-[#c2410c] focus:outline-none transition-colors placeholder:text-black/30" />
                <input type="tel" placeholder="Phone" className="w-full bg-black/5 border border-black/10 px-4 py-3 text-black text-[13px] focus:border-[#c2410c] focus:outline-none transition-colors placeholder:text-black/30" />
                <textarea placeholder="Message" rows={4} className="w-full bg-black/5 border border-black/10 px-4 py-3 text-black text-[13px] focus:border-[#c2410c] focus:outline-none transition-colors resize-none placeholder:text-black/30" />
                <button type="submit" className="px-6 py-3 bg-[#c2410c] text-white text-[13px] font-medium hover:bg-[#9a3409] transition-colors">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-8 lg:px-16 py-8 bg-[#0a0a0a] border-t border-white/10">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/30 text-[11px]">&copy; {new Date().getFullYear()} Jason Jones</p>
            <div className="flex items-center gap-6 text-white/30 text-[11px]">
              <Link to="/what-shapes-me" className="hover:text-white transition-colors">What Shapes Me</Link>
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

function PhilosophyPoint({ number, title, text }: { number: string; title: string; text: string }) {
  return (
    <div>
      <h3 className="text-[14px] font-bold text-black leading-snug mb-1">
        <span className="text-[#c2410c]">{number} //</span> {title}
      </h3>
      <p className="text-[12px] text-black/60 leading-relaxed">{text}</p>
    </div>
  );
}

function ImagePlaceholder({ label, path, wide = false, light = false }: { label: string; path: string; wide?: boolean; light?: boolean }) {
  return (
    <div className={`${wide ? "aspect-[2/1]" : "aspect-square"} ${light ? "bg-black/5" : "bg-white/5"} flex items-center justify-center`}>
      <span className={`text-[10px] ${light ? "text-black/20" : "text-white/20"} text-center px-2`}>[{label}]<br /><span className="text-[8px] opacity-50">{path}</span></span>
    </div>
  );
}

function DontDoItem({ title, text }: { title: string; text: string }) {
  return (
    <div>
      <h3 className="text-lg font-bold text-black mb-2">{title}</h3>
      <p className="text-black/70 text-[14px] leading-relaxed">{text}</p>
    </div>
  );
}
