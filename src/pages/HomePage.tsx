import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Mail, Linkedin, Instagram, MessageCircle, Menu, X, ChevronDown, ExternalLink, Plus, Minus } from "lucide-react";
import { PhotoGallery, CaptionedPhotoGallery } from "@/components/PhotoGallery";
import type { GalleryImage, CaptionedImage } from "@/components/PhotoGallery";

// ============================================================================
// HOME PAGE - About Jason Jones
// Full page with all sections from content brief
// ============================================================================

// Navigation structure with dropdowns
type NavItem = {
  id: string;
  label: string;
  type: 'section' | 'page' | 'dropdown';
  href?: string;
  external?: boolean;
  children?: NavItem[];
};

const NAV_STRUCTURE: NavItem[] = [
  { id: "home", label: "Home", type: "section" },
  { id: "WhoIAm", label: "Introduction", type: "section" },
  {
    id: "what-i-do",
    label: "What I Do",
    type: "dropdown",
    children: [
      { id: "LetItFlow", label: "Let it FLOW", type: "section" },
      { id: "StrategyToDone", label: "From Strategy to Done", type: "section" },
      { id: "ChangeThatSticks", label: "Change that STICKS", type: "section" },
      { id: "CoachingTransformation", label: "Coaching & Transformation", type: "section" },
    ]
  },
  { id: "ai-with-control", label: "AI with Control", type: "page", href: "/ai" },
  { id: "WhatIDontDo", label: "What I Don't Do", type: "section" },
  {
    id: "doing-now",
    label: "What I'm Doing Now",
    type: "dropdown",
    children: [
      { id: "flowency-link", label: "Flowency", type: "page", href: "https://www.flowency.co.uk", external: true },
      { id: "opstack-link", label: "OpStack", type: "page", href: "https://www.opstack.uk", external: true },
    ]
  },
  { id: "what-inspires", label: "What Inspires Me", type: "page", href: "/what-shapes-me" },
  { id: "Highlights", label: "Highlights", type: "section" },
  { id: "GigList", label: "The Gig List", type: "section" },
  { id: "SayHello", label: "Say Hello", type: "section" },
];

// Legacy flat nav for scroll tracking
const NAV_ITEMS = [
  { id: "home", label: "home" },
  { id: "WhoIAm", label: "introduction" },
  { id: "WhatIDo", label: "what I do" },
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
  { src: "/assets/images/about/highlights/James.jpg", title: "Adaptavis Project Partner", description: "I work as a project partner with James Enock, CEO of Adaptavis. We've been peers, mentors, colleagues and friends for over ten years. We all need those people who challenge and support in equal measure.", url: "https://www.adaptavis.com/" },
  { src: "/assets/images/about/highlights/friends.jpg", title: "When a Plan Comes Together", description: "Sometimes the right group of people get together at the right time. This was one of those times." },
];

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [gigListVisible, setGigListVisible] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({});
  const gigListRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = (id: string) => {
    setOpenDropdowns(prev => ({ ...prev, [id]: !prev[id] }));
  };

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
    <div className="min-h-screen bg-[#1e2936] text-[#f8f7f5] font-['Montserrat',sans-serif]">

      {/* ================================================================ */}
      {/* LEFT SIDEBAR NAV - Desktop */}
      {/* Bold, clean, bright - sliding line hover animations */}
      {/* Slate blue theme with orange accents */}
      {/* ================================================================ */}

      {/* CSS for sliding underline animation with gradient fade + mobile drawer animations */}
      <style>{`
        /* Mobile drawer animations */
        @keyframes slideDown {
          from { opacity: 0; max-height: 0; }
          to { opacity: 1; max-height: 2000px; }
        }
        @keyframes slideUp {
          from { opacity: 1; max-height: 2000px; }
          to { opacity: 0; max-height: 0; }
        }
        .mobile-drawer-content {
          overflow: hidden;
          transition: max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease;
        }
        .mobile-drawer-content.collapsed {
          max-height: 0;
          opacity: 0;
        }
        .mobile-drawer-content.expanded {
          max-height: 2000px;
          opacity: 1;
        }
        .mobile-drawer-trigger {
          transition: all 0.3s ease;
        }
        .mobile-drawer-trigger:active {
          transform: scale(0.98);
        }
        .mobile-drawer-icon {
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .mobile-drawer-icon.rotated {
          transform: rotate(180deg);
        }
        /* Staggered animation for list items */
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .stagger-item {
          animation: fadeSlideIn 0.4s ease forwards;
          opacity: 0;
        }
        .stagger-item:nth-child(1) { animation-delay: 0.05s; }
        .stagger-item:nth-child(2) { animation-delay: 0.1s; }
        .stagger-item:nth-child(3) { animation-delay: 0.15s; }
        .stagger-item:nth-child(4) { animation-delay: 0.2s; }
        .stagger-item:nth-child(5) { animation-delay: 0.25s; }
        .stagger-item:nth-child(6) { animation-delay: 0.3s; }
        /* Mobile card pulse on tap */
        @keyframes cardPulse {
          0% { box-shadow: 0 0 0 0 rgba(234, 88, 12, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(234, 88, 12, 0); }
          100% { box-shadow: 0 0 0 0 rgba(234, 88, 12, 0); }
        }
        .mobile-card-tap:active {
          animation: cardPulse 0.4s ease;
        }
        .nav-link {
          position: relative;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          left: 16px;
          bottom: 8px;
          height: 2px;
          width: 0;
          background: linear-gradient(90deg, #c2410c 0%, #ea580c 30%, #1e2936 100%);
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .nav-link:hover::after {
          width: calc(100% - 32px);
        }
        .nav-link.active::after {
          width: 24px;
          background: linear-gradient(90deg, #c2410c 0%, #1e2936 100%);
        }
        .nav-link.active:hover::after {
          width: calc(100% - 32px);
          background: linear-gradient(90deg, #c2410c 0%, #ea580c 30%, #1e2936 100%);
        }
        .dropdown-child {
          position: relative;
        }
        .dropdown-child::after {
          content: '';
          position: absolute;
          left: 16px;
          bottom: 8px;
          height: 2px;
          width: 0;
          background: linear-gradient(90deg, #c2410c 0%, #ea580c 30%, #1e2936 100%);
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .dropdown-child:hover::after {
          width: calc(100% - 32px);
        }
        .dropdown-child.active::after {
          width: 24px;
          background: linear-gradient(90deg, #c2410c 0%, #1e2936 100%);
        }
        .dropdown-child.active:hover::after {
          width: calc(100% - 32px);
          background: linear-gradient(90deg, #c2410c 0%, #ea580c 30%, #1e2936 100%);
        }
        /* Dropdown hover behavior */
        .nav-dropdown-wrapper {
          position: relative;
        }
        .nav-dropdown-content {
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transition: max-height 0.35s ease-out, opacity 0.25s ease-out;
        }
        .nav-dropdown-wrapper:hover .nav-dropdown-content {
          max-height: 500px;
          opacity: 1;
        }
        .nav-dropdown-wrapper:hover .nav-dropdown-chevron {
          transform: rotate(180deg);
        }
        .nav-dropdown-wrapper:hover .nav-dropdown-trigger {
          color: #ea580c;
        }
      `}</style>

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
          {NAV_STRUCTURE.map((item) => (
            <div key={item.id}>
              {item.type === 'dropdown' ? (
                <div className="nav-dropdown-wrapper">
                  {/* Dropdown trigger */}
                  <button
                    className="nav-dropdown-trigger nav-link w-full flex items-center justify-between px-4 py-2 text-[17px] font-normal lowercase tracking-[0.1em] transition-all duration-200 group text-white"
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      size={14}
                      className="nav-dropdown-chevron transition-transform duration-300 text-white/50 group-hover:text-white"
                    />
                  </button>
                  {/* Dropdown children */}
                  <div className="nav-dropdown-content">
                    <div className="ml-4 pl-4 border-l border-[#c2410c]/40 py-1">
                      {item.children?.map((child) => (
                        child.external ? (
                          <a
                            key={child.id}
                            href={child.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="dropdown-child flex items-center gap-2 px-4 py-2 text-[14px] font-normal text-white/80 hover:text-white transition-colors"
                          >
                            <span className="lowercase">{child.label}</span>
                            <ExternalLink size={11} className="opacity-60" />
                          </a>
                        ) : (
                          <button
                            key={child.id}
                            onClick={() => scrollTo(child.id)}
                            className={`dropdown-child w-full text-left px-4 py-2 text-[14px] font-normal lowercase tracking-[0.1em] transition-colors
                              ${activeSection === child.id
                                ? 'active text-[#ea580c]'
                                : 'text-white/80 hover:text-white'}`}
                          >
                            {child.label}
                          </button>
                        )
                      ))}
                    </div>
                  </div>
                </div>
              ) : item.type === 'page' ? (
                <Link
                  to={item.href || '/'}
                  className="nav-link block px-4 py-2 text-[17px] font-normal lowercase tracking-[0.1em] text-white hover:text-[#ea580c] transition-all duration-200"
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  onClick={() => scrollTo(item.id)}
                  className={`nav-link w-full text-left px-4 py-2 text-[17px] font-normal lowercase tracking-[0.1em] transition-all duration-200
                    ${activeSection === item.id
                      ? 'active text-[#ea580c]'
                      : 'text-white hover:text-[#ea580c]'}`}
                >
                  {item.label}
                </button>
              )}
            </div>
          ))}
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

      {/* Mobile menu button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-[100] p-3 bg-[#1e2936]/95 backdrop-blur-sm rounded-lg border border-[#3d4d5f]/30 text-[#f8f7f5]"
      >
        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-[#1e2936] overflow-y-auto">
          <div className="min-h-full flex flex-col pt-20 pb-8 px-6">
            {/* Mobile Logo */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold">
                <span className="text-[#c2410c]">Jason</span>
                <span className="text-[#f8f7f5] ml-1">Jones</span>
              </h1>
            </div>

            {/* Mobile Nav */}
            <nav className="flex-1 space-y-1">
              {NAV_STRUCTURE.map((item) => (
                <div key={item.id}>
                  {item.type === 'dropdown' ? (
                    <>
                      <button
                        onClick={() => toggleDropdown(item.id)}
                        className="w-full flex items-center justify-between px-4 py-3 text-[15px] font-medium text-[#f8f7f5]/80"
                      >
                        <span>{item.label}</span>
                        <ChevronDown size={16} className={`transition-transform ${openDropdowns[item.id] ? 'rotate-180' : ''}`} />
                      </button>
                      {openDropdowns[item.id] && (
                        <div className="ml-4 pl-4 border-l border-[#3d4d5f]/40 space-y-1">
                          {item.children?.map((child) => (
                            child.external ? (
                              <a
                                key={child.id}
                                href={child.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2.5 text-[14px] text-[#f8f7f5]/60"
                              >
                                {child.label}
                                <ExternalLink size={12} />
                              </a>
                            ) : (
                              <button
                                key={child.id}
                                onClick={() => scrollTo(child.id)}
                                className={`w-full text-left px-4 py-2.5 text-[14px] ${activeSection === child.id ? 'text-[#c2410c]' : 'text-[#f8f7f5]/60'}`}
                              >
                                {child.label}
                              </button>
                            )
                          ))}
                        </div>
                      )}
                    </>
                  ) : item.type === 'page' ? (
                    <Link
                      to={item.href || '/'}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-4 py-3 text-[15px] font-medium text-[#f8f7f5]/80"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      onClick={() => scrollTo(item.id)}
                      className={`w-full text-left px-4 py-3 text-[15px] font-medium ${activeSection === item.id ? 'text-[#c2410c]' : 'text-[#f8f7f5]/80'}`}
                    >
                      {item.label}
                    </button>
                  )}
                </div>
              ))}
            </nav>

            {/* Mobile Social Links */}
            <div className="mt-8 pt-6 border-t border-[#3d4d5f]/40 grid grid-cols-2 gap-3">
              <a href="mailto:jason@flowency.co.uk" className="flex items-center gap-2 px-4 py-3 bg-[#2d3a4a] rounded-lg">
                <Mail size={18} className="text-[#c2410c]" />
                <span className="text-[13px] text-[#f8f7f5]/80">Email</span>
              </a>
              <a href="https://www.linkedin.com/in/jjonesuk" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-3 bg-[#2d3a4a] rounded-lg">
                <Linkedin size={18} className="text-[#0077b5]" />
                <span className="text-[13px] text-[#f8f7f5]/80">LinkedIn</span>
              </a>
              <a href="https://www.instagram.com/jayjonesy73" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-3 bg-[#2d3a4a] rounded-lg">
                <Instagram size={18} className="text-[#E4405F]" />
                <span className="text-[13px] text-[#f8f7f5]/80">Instagram</span>
              </a>
              <a href="https://wa.me/447758240770" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-3 bg-[#2d3a4a] rounded-lg">
                <MessageCircle size={18} className="text-[#25D366]" />
                <span className="text-[13px] text-[#f8f7f5]/80">WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* MAIN CONTENT */}
      {/* ================================================================ */}
      <main className="lg:ml-[clamp(280px,20vw,360px)]">

        {/* ============================================================ */}
        {/* HERO */}
        {/* ============================================================ */}
        <section id="home" className="min-h-[60vh] flex items-center px-8 lg:px-16 py-20 relative overflow-hidden bg-gradient-to-br from-[#1e2936] via-[#243242] to-[#2d3a4a]">
          <div className="absolute inset-0 bg-cover bg-center opacity-15" style={{ backgroundImage: "url('/assets/images/about/hero/workshop.jpg')" }} />
          {/* Subtle texture overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
          }} />

          <div className="relative z-10 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Text */}
            <div className="text-center lg:text-left">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight mb-6 text-[#f8f7f5]">
                Helping people see what's possible
                <br />
                <span className="text-[#ea580c] font-normal">then delivering it with them</span>
              </h1>
              <p className="text-[#d0d8e0] text-lg font-medium">Tenacity. Radical candour. Getting shit done.</p>
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
                  background: 'linear-gradient(to right, #1e2936 0%, transparent 15%, transparent 85%, #1e2936 100%), linear-gradient(to bottom, #1e2936 0%, transparent 15%, transparent 85%, #1e2936 100%)'
                }} />
              </div>
            </div>
          </div>
        </section>

        {/* TAGLINE BAR */}
        <section className="py-8 bg-gradient-to-r from-[#c2410c] to-[#ea580c]">
          <p className="text-center text-white font-semibold text-lg md:text-xl px-8">
            See it clearly. Say it plainly. Deliver what actually matters.
          </p>
        </section>

        {/* ============================================================ */}
        {/* WHO I AM - Book Spread */}
        {/* ============================================================ */}
        <section id="WhoIAm" className="px-8 lg:px-12 xl:px-16 py-16 bg-[#f5f3f0] text-[#1e2936]">
          <div className="max-w-7xl mx-auto">
            <p className="text-[#c2410c] text-xs font-bold uppercase tracking-[0.15em] mb-8">Who I Am</p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Bio */}
              <div className="text-[14px] leading-relaxed text-[#1e2936]/80 space-y-5">
                <p className="text-[#1e2936] font-semibold text-[17px] leading-snug">
                  Technology, timing, and an instinct for the simpler, better way.
                </p>
                <p>I learned to code on a BBC Micro and picked up my first pair of drumsticks at the same time. Both have stayed with me. Technology and timing; they're more connected than people think.</p>
                <p>From a dyehouse where you only processed what you could actually ship, to the Airbus A350 XWB in Toulouse, from early-2000s training rooms to coaching forty-five agile teams at Capital One - I was working in genuinely complex systems long before anyone handed me an agile framework.</p>
                <p>Now I'm building AI-powered products and helping organisations navigate AI strategy, implementation and execution. Different tools, same instincts: see the system clearly, find the constraint, do the simplest thing that works.</p>
                <p>What keeps me here? The sheer possibility of working with people who can genuinely make a dent.</p>
                <p className="text-[#c2410c] font-bold text-xl pt-3">Jason Jones</p>
              </div>

              {/* What I Believe - Combined for mobile drawer control */}
              <BeliefsSection />
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* FLOW ORIGIN STORY */}
        {/* ============================================================ */}
        <section id="FlowOrigin" className="py-16 bg-gradient-to-br from-[#1e2936] to-[#2d3a4a]">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Text - left side with padding */}
            <div className="px-8 lg:pl-16 lg:pr-12">
              <p className="text-[#ea580c] text-xs font-bold uppercase tracking-[0.1em]st mb-4">Origins</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#f8f7f5]">Flow, before anyone called it that</h2>

              <FlowOriginContent />
            </div>

            {/* Image gallery - right side, full bleed to edge */}
            <PhotoGallery
              images={flowOriginImages}
              gridClassName="grid grid-cols-2"
            />
          </div>
        </section>

        {/* ============================================================ */}
        {/* WHAT I DO - Compact Card Grid */}
        {/* ============================================================ */}
        <WhatIDoSection />

        {/* ============================================================ */}
        {/* WHAT I DON'T DO - Editorial Swiss Grid */}
        {/* ============================================================ */}
        <section id="WhatIDontDo" className="relative bg-[#0a0a0a] text-white overflow-hidden">
          {/* Diagonal accent line */}
          <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-[#ea580c]/0 via-[#ea580c]/20 to-[#ea580c]/0 transform -rotate-12 origin-top" />

          <div className="max-w-7xl mx-auto relative">
            {/* Header */}
            <div className="px-8 lg:px-16 pt-20 pb-12 lg:pt-28 lg:pb-16">
              <div className="max-w-3xl">
                <p className="text-[#ea580c] text-[11px] font-bold uppercase tracking-[0.3em] mb-4">Boundaries</p>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-['Poppins',sans-serif] leading-[1.1] mb-6">
                  What I don't do
                </h2>
                <p className="text-[#8a99a8] text-lg lg:text-xl leading-relaxed">
                  I've seen enough to know what works, and what doesn't.
                </p>
              </div>
            </div>

            {/* 2x2 Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Item 1 - Force change (Orange highlight) */}
              <div className="group relative p-8 lg:p-12 border-t border-r border-white/[0.06] bg-gradient-to-br from-[#c2410c] to-[#b83a09] overflow-hidden transition-all duration-500 hover:from-[#d44a10] hover:to-[#c2410c]">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.03] rounded-full blur-2xl transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700" />
                <span className="block text-[72px] lg:text-[96px] font-bold text-white/[0.15] font-['Poppins',sans-serif] leading-none mb-2 select-none">01</span>
                <h3 className="text-xl lg:text-2xl font-bold text-white mb-4 -mt-8 lg:-mt-12 relative">
                  Force change on your people
                </h3>
                <p className="text-white/80 text-[15px] lg:text-base leading-relaxed relative">
                  Real change sticks when it's done by your people, not to them. I meet you where you are and build momentum through incremental change and visible results. Not fear, disruption, or top-down mandates.
                </p>
              </div>

              {/* Item 2 - Solve wrong problem */}
              <div className="group relative p-8 lg:p-12 border-t border-white/[0.06] bg-[#0f0f0f] overflow-hidden transition-all duration-300 hover:bg-[#141414]">
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#ea580c]/[0.03] rounded-full blur-xl transform -translate-x-12 translate-y-12 group-hover:scale-150 transition-transform duration-700" />
                <span className="block text-[72px] lg:text-[96px] font-bold text-white/[0.06] font-['Poppins',sans-serif] leading-none mb-2 select-none group-hover:text-[#ea580c]/10 transition-colors duration-500">02</span>
                <h3 className="text-xl lg:text-2xl font-bold text-white mb-4 -mt-8 lg:-mt-12 relative">
                  Solve the wrong problem
                </h3>
                <p className="text-[#8a99a8] text-[15px] lg:text-base leading-relaxed relative">
                  Sometimes the most valuable thing I do is ask "why are you doing this at all?" The room didn't need a transformation programme. It needed someone to ask the right question.
                </p>
              </div>

              {/* Item 3 - Install a recipe */}
              <div className="group relative p-8 lg:p-12 border-t border-r border-white/[0.06] bg-[#0c0c0c] overflow-hidden transition-all duration-300 hover:bg-[#111]">
                <div className="absolute top-0 left-1/2 w-20 h-20 bg-[#ea580c]/[0.02] rounded-full blur-xl group-hover:scale-150 transition-transform duration-700" />
                <span className="block text-[72px] lg:text-[96px] font-bold text-white/[0.06] font-['Poppins',sans-serif] leading-none mb-2 select-none group-hover:text-[#ea580c]/10 transition-colors duration-500">03</span>
                <h3 className="text-xl lg:text-2xl font-bold text-white mb-4 -mt-8 lg:-mt-12 relative">
                  Install a recipe and call it transformation
                </h3>
                <p className="text-[#8a99a8] text-[15px] lg:text-base leading-relaxed relative">
                  Outcomes follow Practices. Practices follow Culture. Culture follows Values. If you start anywhere other than values, you'll end up with a load of busy people fire-fighting and calling it change.
                </p>
              </div>

              {/* Item 4 - Make myself indispensable (Special closing item) */}
              <div className="group relative p-8 lg:p-12 border-t border-white/[0.06] bg-[#0a0a0a] overflow-hidden transition-all duration-300">
                {/* Accent border that reveals on hover */}
                <div className="absolute inset-0 border-2 border-[#ea580c]/0 group-hover:border-[#ea580c]/20 transition-all duration-500" />
                <div className="absolute right-8 bottom-8 w-16 h-16 border border-[#ea580c]/10 rounded-full group-hover:scale-[3] group-hover:border-[#ea580c]/5 transition-all duration-700" />

                <span className="block text-[72px] lg:text-[96px] font-bold text-white/[0.06] font-['Poppins',sans-serif] leading-none mb-2 select-none group-hover:text-[#ea580c]/10 transition-colors duration-500">04</span>
                <h3 className="text-xl lg:text-2xl font-bold text-white mb-4 -mt-8 lg:-mt-12 relative">
                  Make myself indispensable
                </h3>
                <p className="text-[#8a99a8] text-[15px] lg:text-base leading-relaxed relative mb-4">
                  I'm not here to become a permanent fixture. I build capability, not dependency — mentoring your people, embedding good habits, configuring your tools so your teams can see and improve things for themselves.
                </p>
                <p className="text-[#ea580c] text-[14px] font-medium relative">
                  The goal is that you don't need me anymore. That's how I know it worked.
                </p>
              </div>
            </div>

            {/* Bottom accent line */}
            <div className="h-px bg-gradient-to-r from-transparent via-[#ea580c]/30 to-transparent" />
          </div>
        </section>

        {/* ============================================================ */}
        {/* HIGHLIGHTS */}
        {/* ============================================================ */}
        <section id="Highlights" className="py-16 bg-[#1e2936]">
          <div className="px-8 lg:px-16 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-[#f8f7f5]">Highlights</h2>
            <p className="text-[#d0d8e0] text-center">Everyone has their favourites. Places I've enjoyed. Friends made. Peers learned from. Outcomes realised.</p>
          </div>

          <CaptionedPhotoGallery images={highlightImages} />
        </section>

        {/* ============================================================ */}
        {/* THE GIG LIST - Logo Grid */}
        {/* ============================================================ */}
        <section id="GigList" ref={gigListRef} className="relative py-16 lg:py-20 overflow-hidden">
          {/* Textured background with subtle warmth */}
          <div className="absolute inset-0 bg-[#e8eaed]" />
          <div
            className="absolute inset-0 opacity-[0.04]"
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
              <h2 className="text-4xl md:text-5xl font-bold text-[#1e2936] mb-4">
                The Gig List
              </h2>
              <p className="text-[#5a6a7a] text-lg">
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
        <section id="SayHello" className="relative bg-[#0a0a0a] overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[700px]">

              {/* Left Side - Book a Call */}
              <div className="relative px-8 lg:px-16 py-16 lg:py-20 flex flex-col justify-center">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#ea580c] font-['Poppins',sans-serif] mb-4">
                  Let's talk
                </h2>
                <p className="text-[#a8b5c4] text-lg mb-8 max-w-md">
                  Book a call or fill in the form. No pitch decks. No jargon. Just a conversation about what you're trying to achieve.
                </p>

                {/* Cal.com Embed */}
                <div className="bg-[#1e2936] rounded-lg overflow-hidden" style={{ minHeight: '400px' }}>
                  <iframe
                    src="https://cal.com/flowamplified?embed=true&theme=dark"
                    className="w-full h-[400px] border-0"
                    title="Book a call"
                  />
                </div>

                {/* Contact info */}
                <div className="mt-8 flex flex-wrap gap-6 text-[14px]">
                  <a href="tel:+447758240770" className="text-[#d0d8e0] hover:text-[#ea580c] transition-colors">
                    +44 7758 240770
                  </a>
                  <a href="mailto:jason@flowency.co.uk" className="text-[#d0d8e0] hover:text-[#ea580c] transition-colors">
                    jason@flowency.co.uk
                  </a>
                </div>

                {/* Diagonal line */}
                <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-[80%] bg-gradient-to-b from-transparent via-[#3d4d5f] to-transparent origin-center rotate-12" />
              </div>

              {/* Right Side - Contact Form */}
              <div className="px-8 lg:px-16 py-16 lg:py-20 flex flex-col justify-center bg-[#111]">
                <p className="text-[#ea580c] text-xs font-bold uppercase tracking-[0.15em] mb-6">Or send a message</p>

                <form className="space-y-5">
                  <div>
                    <input
                      type="text"
                      placeholder="Full name"
                      className="w-full bg-transparent border-b border-[#3d4d5f] px-0 py-3 text-white text-[15px] focus:border-[#ea580c] focus:outline-none transition-colors placeholder:text-[#5a6a7a]"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Phone number"
                      className="w-full bg-transparent border-b border-[#3d4d5f] px-0 py-3 text-white text-[15px] focus:border-[#ea580c] focus:outline-none transition-colors placeholder:text-[#5a6a7a]"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full bg-transparent border-b border-[#3d4d5f] px-0 py-3 text-white text-[15px] focus:border-[#ea580c] focus:outline-none transition-colors placeholder:text-[#5a6a7a]"
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Message"
                      rows={3}
                      className="w-full bg-transparent border-b border-[#3d4d5f] px-0 py-3 text-white text-[15px] focus:border-[#ea580c] focus:outline-none transition-colors resize-none placeholder:text-[#5a6a7a]"
                    />
                  </div>
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="px-8 py-4 bg-gradient-to-r from-[#ea580c] to-[#c2410c] text-white text-[14px] font-semibold rounded-full hover:from-[#c2410c] hover:to-[#ea580c] transition-all duration-300 shadow-lg shadow-[#ea580c]/20"
                    >
                      Send message
                    </button>
                  </div>
                </form>
              </div>

            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-8 lg:px-16 py-8 bg-[#1e2936] border-t border-[#3d4d5f]/30">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#a8b5c4] text-[11px]">&copy; {new Date().getFullYear()} Jason Jones</p>
            <div className="flex items-center gap-6 text-[#a8b5c4] text-[11px]">
              <Link to="/what-shapes-me" className="hover:text-[#f8f7f5] transition-colors">What Shapes Me</Link>
              <a href="https://flowency.co.uk" target="_blank" rel="noopener noreferrer" className="hover:text-[#f8f7f5] transition-colors">Flowency</a>
            </div>
          </div>
        </footer>

      </main>
    </div>
  );
}

// ============================================================================
// WHAT I DO - SERVICE OFFERINGS DATA
// ============================================================================

interface ServiceOffering {
  id: string;
  title: string;
  subtitle: string;
  teaser: string;
  fullContent: string[];
  clients: string;
}

const SERVICE_OFFERINGS: ServiceOffering[] = [
  {
    id: "LetItFlow",
    title: "Let it FLOW",
    subtitle: "Delivery Leadership & Flow Metrics",
    teaser: "Making flow of value visible and predictable. Start where you are, bring clarity, then optimise for flow.",
    fullContent: [
      "I've spent the best part of 20 years helping organisations stop firefighting and start delivering with real, predictable flow. My approach? Framework-agnostic. I'll draw from Agile, Waterfall, Kanban, systems thinking, JFDI - whatever actually fits the problem, not the textbook.",
      "What I really care about is making the work visible - seeing the actual system, finding the bottlenecks, and improving things with evidence, not opinions. Lead time, cycle time, the metrics that matter. Not vanity dashboards that make everyone feel busy. I configure the tooling and instrument the workflow so teams can see how their delivery system is actually performing - and improve it themselves.",
      "When flow works, value follows. That bit never gets old."
    ],
    clients: "HSBC · Capital One UK · CDL · Manchester Airports Group"
  },
  {
    id: "StrategyToDone",
    title: "From Strategy to Done",
    subtitle: "Boardroom to Delivery Alignment",
    teaser: "Closing the gap between what the boardroom decides and what teams actually deliver.",
    fullContent: [
      "Here's the thing - ambitious strategic goals have a habit of dying somewhere between the boardroom and the delivery layer. I specialise in making sure they don't.",
      "My journey includes partnering with C-suite leaders to structure organisations around outcome-led value streams, translating big commercial commitments into delivery plans that are realistic, risk-aware and actually executable. OKRs, lean portfolio leadership, making trade-offs visible - connecting the why to the what to the how.",
      "Not another layer of process. A clearer line of sight - so the conversation in the boardroom and the work on the board are finally telling the same story.",
      "I've done this greenfield - starting with a plan and building global delivery capability from scratch - and across live operational portfolios of 40+ teams. Messy, complex, rewarding."
    ],
    clients: "HSBC Investment Bank · Capital One UK · Co-operative Bank"
  },
  {
    id: "ChangeThatSticks",
    title: "Change that STICKS",
    subtitle: "Building Teams & Capability",
    teaser: "Experienced practitioners give your teams the skills to own and evolve their practices.",
    fullContent: [
      "The fundamentals of great delivery haven't changed - curious people, learning together, building trust, improving as they go. That predates any framework. Agile didn't invent good human behaviour, it just gave it some structure.",
      "My journey includes coaching at every level - from individual squads through to Release Train Engineers and Divisional CTOs. I'm a big believer in showing, not telling, which means working alongside teams as a servant-leader, modelling the practices, not just presenting slides about them.",
      "The bit I'm most proud of? Building Communities of Practice and mentoring internal champions so that the change outlasts my engagement. Good habits, shared learning, continuous improvement - baked into the DNA, not bolted on. That's the goal.",
      "Done this across transformations spanning 45 teams and three continents. Challenging. And brilliant."
    ],
    clients: "British Airways · Capital One UK (45 teams) · Barclaycard UK"
  },
  {
    id: "CoachingTransformation",
    title: "Coaching & Transformation",
    subtitle: "Culture & Values Work",
    teaser: "Outcomes follow Practices. Practices follow Culture. Culture follows Values.",
    fullContent: [
      "You know the saying - culture eats strategy for breakfast. It's a cliché because it's true.",
      "But here's what I've learned: culture doesn't change because someone puts new posters on the wall or renames the weekly status meeting a \"stand-up.\" Culture follows practices. And practices follow values. That's the chain.",
      "If people still fundamentally value a plan and certainty over the discomfort of exploring the unknown - if the real belief is \"just tell me what to do and when it'll be done\" - then no amount of ceremonies or transformation programmes will shift the culture. The values show through in what people actually do, every single day.",
      "My journey includes helping organisations get honest about this. Not with blame, but with curiosity. What do we really value here? What are the practices telling us? And are we genuinely willing to sit with a bit of uncertainty in exchange for learning, adapting and building something better?",
      "That's where the real transformation happens. Not in the framework. Not in the tooling. In the conversations people have when things get uncomfortable.",
      "It's hard work. It's also the most rewarding work there is."
    ],
    clients: "Co-operative Bank · Shaw Trust · SSE"
  }
];

// ============================================================================
// WHAT I DO SECTION COMPONENT - Full Width Editorial Layout
// ============================================================================

function WhatIDoSection() {
  return (
    <div id="WhatIDo">
      {/* Section Header - Bold editorial style */}
      <section className="relative py-20 lg:py-28 bg-[#1e2936] overflow-hidden">
        {/* Subtle diagonal accent */}
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-[#ea580c]/0 via-[#ea580c]/15 to-[#ea580c]/0 transform rotate-12 origin-top" />

        <div className="relative z-10 px-8 lg:px-16 max-w-5xl mx-auto">
          <p className="text-[#ea580c] text-[11px] font-bold uppercase tracking-[0.3em] mb-6">What I Do</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#f8f7f5] font-['Poppins',sans-serif] leading-[1.1] mb-6">
            Delivery. Flow.<br />
            <span className="text-[#ea580c]">Transformation.</span>
          </h2>
          <p className="text-[#a8b5c4] text-lg lg:text-xl max-w-2xl leading-relaxed">
            Twenty years of helping organisations see their systems clearly and deliver what actually matters.
          </p>
        </div>
      </section>

      {/* Full-width alternating sections with index for numbering */}
      {SERVICE_OFFERINGS.map((offering, index) => (
        <ServiceSection
          key={offering.id}
          offering={offering}
          index={index}
          imageOnRight={index % 2 === 0}
        />
      ))}
    </div>
  );
}

// ============================================================================
// SERVICE SECTION COMPONENT - Full Width Editorial with Bold Numbers
// ============================================================================

interface ServiceSectionProps {
  offering: ServiceOffering;
  index: number;
  imageOnRight: boolean;
}

function ServiceSection({ offering, index, imageOnRight }: ServiceSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const sectionNum = String(index + 1).padStart(2, '0');

  // Alternating color schemes for visual variety
  const schemes = [
    { bg: 'bg-[#0a0a0a]', text: 'text-white', muted: 'text-[#8a99a8]', accent: 'text-[#ea580c]', numberColor: 'text-white/[0.04]', imageBg: 'from-[#c2410c] to-[#1e2936]', border: 'border-white/10' },
    { bg: 'bg-[#f5f3f0]', text: 'text-[#1e2936]', muted: 'text-[#5a6a7a]', accent: 'text-[#c2410c]', numberColor: 'text-[#1e2936]/[0.04]', imageBg: 'from-[#1e2936] to-[#3d4d5f]', border: 'border-[#1e2936]/10' },
    { bg: 'bg-[#1e2936]', text: 'text-white', muted: 'text-[#a8b5c4]', accent: 'text-[#ea580c]', numberColor: 'text-white/[0.04]', imageBg: 'from-[#ea580c] to-[#c2410c]', border: 'border-white/10' },
    { bg: 'bg-white', text: 'text-[#1e2936]', muted: 'text-[#5a6a7a]', accent: 'text-[#c2410c]', numberColor: 'text-[#1e2936]/[0.04]', imageBg: 'from-[#2d3a4a] to-[#1e2936]', border: 'border-[#1e2936]/10' },
  ];
  const scheme = schemes[index % schemes.length];

  return (
    <section id={offering.id} className={`${scheme.bg} relative overflow-hidden`}>
      {/* ========== MOBILE VIEW - Compact Expandable Card ========== */}
      <div className="lg:hidden">
        {/* Compact header bar - always visible */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`mobile-drawer-trigger mobile-card-tap w-full text-left px-6 py-5 flex items-center justify-between gap-4 ${scheme.border} border-b`}
        >
          {/* Left: Number + Title */}
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <span className={`${scheme.accent} text-2xl font-bold font-['Poppins',sans-serif] flex-shrink-0`}>
              {sectionNum}
            </span>
            <div className="min-w-0">
              <h3 className={`text-lg font-bold ${scheme.text} font-['Poppins',sans-serif] truncate`}>
                {offering.title}
              </h3>
              <p className={`text-xs ${scheme.muted} uppercase tracking-wider mt-0.5`}>
                {offering.subtitle}
              </p>
            </div>
          </div>

          {/* Right: Expand icon */}
          <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${isExpanded ? 'bg-[#ea580c]' : scheme.bg === 'bg-white' || scheme.bg === 'bg-[#f5f3f0]' ? 'bg-[#1e2936]/10' : 'bg-white/10'} transition-colors duration-300`}>
            {isExpanded ? (
              <Minus size={18} className="text-white" />
            ) : (
              <Plus size={18} className={scheme.text} />
            )}
          </div>
        </button>

        {/* Expandable content drawer */}
        <div className={`mobile-drawer-content ${isExpanded ? 'expanded' : 'collapsed'}`}>
          {/* Gradient visual strip */}
          <div className={`h-24 bg-gradient-to-br ${scheme.imageBg} relative overflow-hidden`}>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white/20 text-6xl font-bold font-['Poppins',sans-serif]">{sectionNum}</span>
            </div>
            {/* Decorative circles */}
            <div className="absolute top-2 right-4 w-8 h-8 border border-white/20 rounded-full" />
            <div className="absolute bottom-3 left-6 w-6 h-6 border border-white/10 rotate-45" />
          </div>

          {/* Content */}
          <div className="px-6 py-6">
            {/* Teaser with accent border */}
            <div className={`pl-4 border-l-3 ${scheme.accent === 'text-[#ea580c]' ? 'border-[#ea580c]' : 'border-[#c2410c]'} mb-5`}>
              <p className={`text-[15px] ${scheme.text} font-medium leading-relaxed`}>
                {offering.teaser}
              </p>
            </div>

            {/* Full content - staggered animation */}
            <div className="space-y-3 mb-6">
              {offering.fullContent.map((paragraph, i) => (
                <p key={i} className={`stagger-item text-[14px] ${scheme.muted} leading-relaxed`}>
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Clients pill */}
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${scheme.bg === 'bg-white' || scheme.bg === 'bg-[#f5f3f0]' ? 'bg-[#1e2936]/5' : 'bg-white/5'}`}>
              <span className={`text-[10px] ${scheme.muted} uppercase tracking-wider font-semibold`}>Clients:</span>
              <span className={`text-[12px] ${scheme.muted}`}>{offering.clients}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========== DESKTOP VIEW - Full Editorial Layout (unchanged) ========== */}
      <div className="hidden lg:block">
        {/* Background number - massive editorial typography */}
        <div className={`absolute ${imageOnRight ? 'right-8 lg:right-16' : 'left-8 lg:left-16'} top-1/2 -translate-y-1/2 pointer-events-none select-none`}>
          <span className={`block text-[180px] md:text-[280px] lg:text-[400px] font-bold ${scheme.numberColor} font-['Poppins',sans-serif] leading-none`}>
            {sectionNum}
          </span>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 min-h-[600px] lg:min-h-[700px]">

            {/* Image Side - dynamic gradient placeholder */}
            <div className={`lg:col-span-2 ${imageOnRight ? 'lg:order-2' : 'lg:order-1'}`}>
              <div className={`h-full min-h-[300px] lg:min-h-full bg-gradient-to-br ${scheme.imageBg} flex items-center justify-center relative overflow-hidden group`}>
                {/* Decorative elements */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-8 left-8 w-32 h-32 border border-white/20 rounded-full" />
                  <div className="absolute bottom-12 right-12 w-24 h-24 border border-white/10" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-white/10 rotate-45" />
                </div>

                {/* Large number overlay */}
                <span className="text-white/10 text-[120px] md:text-[180px] font-bold font-['Poppins',sans-serif] leading-none select-none group-hover:scale-110 transition-transform duration-700">
                  {sectionNum}
                </span>

                {/* Label */}
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-white/60 text-[11px] font-bold uppercase tracking-[0.2em]">
                    {offering.subtitle}
                  </span>
                </div>
              </div>
            </div>

            {/* Content Side */}
            <div className={`lg:col-span-3 ${imageOnRight ? 'lg:order-1' : 'lg:order-2'} flex items-center`}>
              <div className="px-8 lg:px-16 xl:px-20 py-16 lg:py-20">
                {/* Section number + subtitle */}
                <div className="flex items-center gap-4 mb-6">
                  <span className={`${scheme.accent} text-[13px] font-bold`}>{sectionNum}</span>
                  <div className={`h-px flex-1 max-w-[60px] ${scheme.accent === 'text-[#ea580c]' ? 'bg-[#ea580c]/40' : 'bg-[#c2410c]/40'}`} />
                  <span className={`${scheme.accent} text-[11px] font-bold uppercase tracking-[0.2em]`}>
                    {offering.subtitle}
                  </span>
                </div>

                {/* Title - bigger, bolder */}
                <h3 className={`text-3xl md:text-4xl lg:text-5xl font-bold ${scheme.text} font-['Poppins',sans-serif] leading-[1.1] mb-8`}>
                  {offering.title}
                </h3>

                {/* Teaser - emphasized with left border */}
                <div className={`pl-6 border-l-4 ${scheme.accent === 'text-[#ea580c]' ? 'border-[#ea580c]' : 'border-[#c2410c]'} mb-8`}>
                  <p className={`text-lg lg:text-xl ${scheme.text} font-medium leading-relaxed`}>
                    {offering.teaser}
                  </p>
                </div>

                {/* Full content */}
                <div className="space-y-4 mb-10">
                  {offering.fullContent.map((paragraph, i) => (
                    <p key={i} className={`text-[15px] ${scheme.muted} leading-relaxed`}>
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Clients - subtle treatment */}
                <div className={`pt-6 border-t ${scheme.accent === 'text-[#ea580c]' ? 'border-white/10' : 'border-[#1e2936]/10'}`}>
                  <p className={`text-[10px] ${scheme.muted} uppercase tracking-[0.2em] font-semibold mb-2`}>Selected Clients</p>
                  <p className={`text-[13px] ${scheme.muted}`}>{offering.clients}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom accent line */}
        <div className={`h-px ${scheme.accent === 'text-[#ea580c]' ? 'bg-gradient-to-r from-transparent via-[#ea580c]/20 to-transparent' : 'bg-gradient-to-r from-transparent via-[#c2410c]/20 to-transparent'}`} />
      </div>
    </section>
  );
}

// ============================================================================
// OTHER COMPONENTS
// ============================================================================

// ============================================================================
// FLOW ORIGIN CONTENT - Mobile-optimized with read more
// ============================================================================

function FlowOriginContent() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="space-y-5 text-[16px] leading-relaxed text-[#d0d8e0]">
      {/* Always visible on both mobile and desktop */}
      <p>My first job was in a dyehouse. I was managing production planning for a fabric manufacturer: upstream constraints in yarn sourcing and knitting, finite dye capacity, a single stenter machine as the bottleneck downstream. One batch at a time. You only dyed what you could actually dry. You only processed real orders, never speculative work. If you got the timing wrong, fabric sat wet, went mouldy, became rework.</p>
      <p>I was visualising work, managing flow, limiting WIP and responding to the constraint, before I had any of those words. I saw Kanban cards on that shop floor before I knew what they were called.</p>

      {/* Desktop: always show all */}
      <div className="hidden lg:block space-y-5">
        <p>My first business trip was to M&S at Baker Street. Ten swatches of navy cotton jersey fabric on the table, all ostensibly the same. Each subtly different. One flatter, one redder, one with a metamerism you couldn't see until you placed it in a light box replicating the exact lighting of the shop floor. Same fabric. Different context. Completely different outcome. That lesson, that the environment in which something is used changes everything, has never left me.</p>
        <p>When I later encountered the Kanban Method as articulated by David Anderson, building on lean manufacturing and the Toyota Production System - it felt less like learning something new and more like finally having language for what I'd already been doing in that dyehouse.</p>
        <p>I've attended the global Kanban University Learnship conferences in Miami and Bilbao, where the people who are genuinely serious about this come together. The thought leadership coming out of that community continues to inform how I work. I use the <a href="https://kanban.plus/blogs/blog/what-is-the-kanban-maturity-model" target="_blank" rel="noopener noreferrer" className="text-[#ea580c] hover:underline">Kanban Maturity Model</a> to help organisations understand where they are and plot a realistic path forward.</p>
        <p className="text-[#a8b5c4]">Most organisations jump to SAFe or Scrum before they can even see their own system clearly. The Kanban Method starts where you are. It doesn't ask you to install a recipe. It asks you to look honestly at how work flows, or doesn't, and improve from there. It is, in my view, the most powerful and most underused tool in the Lean/Agile toolkit.</p>
      </div>

      {/* Mobile: collapsible with smooth animation */}
      <div className="lg:hidden">
        <div className={`mobile-drawer-content ${expanded ? 'expanded' : 'collapsed'}`}>
          <div className="space-y-5">
            <p>My first business trip was to M&S at Baker Street. Ten swatches of navy cotton jersey fabric on the table, all ostensibly the same. Each subtly different. One flatter, one redder, one with a metamerism you couldn't see until you placed it in a light box replicating the exact lighting of the shop floor. Same fabric. Different context. Completely different outcome. That lesson, that the environment in which something is used changes everything, has never left me.</p>
            <p>When I later encountered the Kanban Method as articulated by David Anderson, building on lean manufacturing and the Toyota Production System - it felt less like learning something new and more like finally having language for what I'd already been doing in that dyehouse.</p>
            <p>I've attended the global Kanban University Learnship conferences in Miami and Bilbao, where the people who are genuinely serious about this come together. The thought leadership coming out of that community continues to inform how I work. I use the <a href="https://kanban.plus/blogs/blog/what-is-the-kanban-maturity-model" target="_blank" rel="noopener noreferrer" className="text-[#ea580c] hover:underline">Kanban Maturity Model</a> to help organisations understand where they are and plot a realistic path forward.</p>
            <p className="text-[#a8b5c4]">Most organisations jump to SAFe or Scrum before they can even see their own system clearly. The Kanban Method starts where you are. It doesn't ask you to install a recipe. It asks you to look honestly at how work flows, or doesn't, and improve from there. It is, in my view, the most powerful and most underused tool in the Lean/Agile toolkit.</p>
          </div>
        </div>

        {/* Read more/less toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="mobile-card-tap mt-4 flex items-center gap-2 text-[#ea580c] text-sm font-semibold transition-all duration-300"
        >
          {expanded ? (
            <>
              <span>Read less</span>
              <ChevronDown size={16} className="rotate-180 transition-transform" />
            </>
          ) : (
            <>
              <span>Read more</span>
              <ChevronDown size={16} className="transition-transform" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// BELIEFS SECTION - Mobile-optimized with show more/less
// ============================================================================

const BELIEFS = [
  { number: "#1", title: "Context always wins", text: "A latin groove in Silent Night is technically impressive. It's also completely wrong. I'm not an agile evangelist. Framework agnostic. The right method for the right moment." },
  { number: "#2", title: "Simplicity: Occam's Razor, every time", text: "Complexity is almost always a symptom, not a feature. The simplest explanation is usually right. The simplest solution usually works." },
  { number: "#3", title: "Ask why. Relentlessly.", text: "A leadership team gave me 85 Post-Its - all mandatory, critical, urgent. We asked why about every one. Fourteen survived. Ten shipped as working digital products." },
  { number: "#4", title: "Outcomes follow Practices. Practices follow Culture. Culture follows Values.", text: "If you don't start with values, you'll end up with busy people firefighting and calling it change." },
  { number: "#5", title: "Listening before you play", text: "In music I learned that following the beat precisely can put you completely out of time with everyone else. The people in the room usually already know the answer. My job is to step back and help them hear it." },
  { number: "#6", title: "The space between the beats", text: "The notes you don't play matter as much as the ones you do. The work you remove is often more valuable than the work you add." },
  { number: "#7", title: "Building capability, not dependency", text: "I'm here to make myself unnecessary. The goal is that the team doesn't need me anymore, because they've got it. That's the win." },
  { number: "#8", title: "Delivering real things, not activity", text: "Ten working digital products from fourteen Post-Its. Shipped things, in the hands of real users. Nothing builds belief faster than showing people something that actually works." },
];

function BeliefsSection() {
  const [showAll, setShowAll] = useState(false);

  return (
    <>
      {/* Desktop: 2-column layout */}
      <div className="hidden lg:contents">
        <div className="space-y-6">
          <p className="text-[11px] text-[#c2410c] uppercase tracking-[0.15em] font-bold mb-2">What I Believe</p>
          {BELIEFS.slice(0, 4).map((belief) => (
            <BeliefPoint key={belief.number} {...belief} />
          ))}
        </div>
        <div className="space-y-6 lg:pt-[29px]">
          {BELIEFS.slice(4).map((belief) => (
            <BeliefPoint key={belief.number} {...belief} />
          ))}
        </div>
      </div>

      {/* Mobile: Single column with show more */}
      <div className="lg:hidden col-span-full">
        <p className="text-[11px] text-[#c2410c] uppercase tracking-[0.15em] font-bold mb-4">What I Believe</p>

        {/* Always show first 4 */}
        <div className="space-y-3">
          {BELIEFS.slice(0, 4).map((belief) => (
            <BeliefPoint key={belief.number} {...belief} />
          ))}
        </div>

        {/* Show more toggle */}
        <button
          onClick={() => setShowAll(!showAll)}
          className="mobile-card-tap mt-4 w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-[#c2410c]/10 text-[#c2410c] text-sm font-semibold transition-all duration-300"
        >
          {showAll ? (
            <>
              <span>Show less</span>
              <Minus size={16} />
            </>
          ) : (
            <>
              <span>Show 4 more beliefs</span>
              <Plus size={16} />
            </>
          )}
        </button>

        {/* Additional beliefs - animated */}
        <div className={`mobile-drawer-content ${showAll ? 'expanded' : 'collapsed'}`}>
          <div className="space-y-3 pt-4">
            {BELIEFS.slice(4).map((belief) => (
              <BeliefPoint key={belief.number} {...belief} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function BeliefPoint({ number, title, text }: { number: string; title: string; text: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="pb-1">
      {/* Desktop - always expanded */}
      <div className="hidden md:block">
        <h3 className="text-[15px] font-bold text-[#1e2936] leading-snug mb-2">
          <span className="text-[#c2410c] font-semibold">{number}</span>
          <span className="text-[#c2410c]/40 mx-1.5">//</span>
          {title}
        </h3>
        <p className="text-[13px] text-[#3d4d5f]/90 leading-relaxed pl-0">{text}</p>
      </div>

      {/* Mobile - collapsible accordion */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="mobile-card-tap w-full text-left flex items-center justify-between gap-3 py-2"
        >
          <h3 className="text-[14px] font-bold text-[#1e2936] leading-snug flex-1">
            <span className="text-[#c2410c] font-semibold">{number}</span>
            <span className="text-[#c2410c]/40 mx-1.5">//</span>
            {title}
          </h3>
          <div className={`w-6 h-6 rounded-full flex items-center justify-center bg-[#c2410c]/10 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
            <ChevronDown size={14} className="text-[#c2410c]" />
          </div>
        </button>
        <div className={`mobile-drawer-content ${isOpen ? 'expanded' : 'collapsed'}`}>
          <p className="text-[13px] text-[#3d4d5f]/90 leading-relaxed pb-3">{text}</p>
        </div>
      </div>
    </div>
  );
}
