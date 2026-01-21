
import React, { useState, useEffect } from 'react';
import { queryBTGOG } from './services/geminiService';
import { 
  Menu, X, ChevronRight, Building2, Users, Briefcase, 
  GraduationCap, Laptop, ShieldCheck, PieChart, 
  Handshake, Phone, Mail, Send, Loader2, ArrowRight,
  Database, Sprout, HeartPulse, CheckCircle2, Home,
  Sun, Coffee, Heart
} from 'lucide-react';

type Page = 'home' | 'about' | 'campuses' | 'system' | 'outcomes' | 'partners' | 'contact';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState('');
  const [isQuerying, setIsQuerying] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage]);

  const handleQuery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsQuerying(true);
    try {
      const res = await queryBTGOG(query);
      setAnswer(res);
    } catch (err) {
      setAnswer("I'm sorry, I'm having a bit of trouble connecting to our systems. Please reach out to Seven Crawford directly.");
    } finally {
      setIsQuerying(false);
    }
  };

  const navLinks: { id: Page; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'campuses', label: 'The Campuses' },
    { id: 'system', label: 'Our Vision' },
    { id: 'outcomes', label: 'Impact' },
    { id: 'partners', label: 'Partners' },
    { id: 'contact', label: 'Contact' },
  ];

  // --- UI COMPONENTS ---

  const Navbar = () => (
    <nav className="fixed w-full z-50 px-4 pt-4">
      <div className="max-w-7xl mx-auto bg-white/80 backdrop-blur-xl border border-btgog-sage/10 soft-shadow rounded-full px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActivePage('home')}>
            <div className="w-10 h-10 bg-btgog-sage rounded-full flex items-center justify-center text-white soft-shadow">
              <Sprout size={20} />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-serif font-black text-btgog-sage leading-tight">BTGOG</span>
              <span className="text-[9px] font-bold text-btgog-clay uppercase tracking-[0.2em]">Build the Ground of Growth</span>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center space-x-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => setActivePage(link.id)}
                className={`px-4 py-2 text-sm font-medium transition-all rounded-full ${
                  activePage === link.id ? 'text-white bg-btgog-sage soft-shadow' : 'text-btgog-ink hover:text-btgog-sage hover:bg-btgog-sageLight'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="lg:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-btgog-sage">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden mt-4 bg-white/95 backdrop-blur-xl rounded-[2rem] border border-btgog-sage/10 p-6 space-y-2 soft-shadow animate-in fade-in slide-in-from-top-4">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => { setActivePage(link.id); setIsMenuOpen(false); }}
              className={`w-full text-left px-4 py-4 text-lg font-serif font-bold rounded-2xl ${
                activePage === link.id ? 'bg-btgog-sageLight text-btgog-sage' : 'text-btgog-ink hover:bg-slate-50'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );

  const Footer = () => (
    <footer className="bg-btgog-sand text-btgog-ink pt-24 pb-12 rounded-t-[4rem]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 md:col-span-2 space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-btgog-sage rounded-full flex items-center justify-center text-white">
                <Sprout size={20} />
              </div>
              <span className="text-3xl font-serif font-black text-btgog-sage">BTGOG</span>
            </div>
            <p className="text-btgog-sage/70 max-w-sm text-lg font-medium leading-relaxed italic">
              "Providing the roots for long-term stabilization and independent growth."
            </p>
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-4 text-btgog-ink font-bold">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-btgog-clay soft-shadow">
                  <Phone size={18} />
                </div>
                (442) 375-8487
              </div>
              <p className="text-sm font-medium text-btgog-sage/80 flex items-center gap-2">
                <Users size={16} /> Seven Crawford, Founder & CEO
              </p>
            </div>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-btgog-clay">Common Questions</h4>
            <form onSubmit={handleQuery} className="space-y-3">
              <div className="relative group">
                <input 
                  type="text" 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="How can we help?" 
                  className="w-full bg-white border border-btgog-sage/10 rounded-2xl px-5 py-4 text-sm soft-shadow focus:outline-none focus:ring-2 focus:ring-btgog-sage transition-all"
                />
                <button disabled={isQuerying} className="absolute right-3 top-1/2 -translate-y-1/2 text-btgog-sage hover:scale-110 transition-transform">
                  {isQuerying ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
                </button>
              </div>
              {answer && (
                <div className="p-4 bg-white/50 border border-btgog-sage/5 rounded-2xl text-[11px] font-medium leading-relaxed italic animate-in fade-in">
                  {answer}
                </div>
              )}
            </form>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-btgog-clay">Our Pathway</h4>
            <div className="flex flex-col gap-3 text-sm font-semibold text-btgog-sage/80">
              <button onClick={() => setActivePage('about')} className="text-left hover:text-btgog-clay transition-colors">Philosophy</button>
              <button onClick={() => setActivePage('campuses')} className="text-left hover:text-btgog-clay transition-colors">The Hubs</button>
              <button onClick={() => setActivePage('outcomes')} className="text-left hover:text-btgog-clay transition-colors">Our Impact</button>
              <button onClick={() => setActivePage('contact')} className="text-left hover:text-btgog-clay transition-colors">Say Hello</button>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-btgog-sage/40 font-bold tracking-[0.2em] uppercase pt-10 border-t border-btgog-sage/10">
          <span>&copy; 2025 BTGOG — Build the Ground of Growth</span>
          <div className="flex gap-10">
            <a href="#" className="hover:text-btgog-clay">Our Promise</a>
            <a href="#" className="hover:text-btgog-clay">Agency Portal</a>
            <a href="#" className="hover:text-btgog-clay">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );

  // --- PAGES ---

  const HomePage = () => (
    <div className="page-transition">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-32 pb-20">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-btgog-clay/10 organic-shape blur-3xl animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-btgog-sage/10 organic-shape blur-3xl"></div>
        
        <div className="max-w-4xl text-center relative z-10 space-y-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-btgog-sageLight text-btgog-sage rounded-full text-xs font-bold uppercase tracking-widest border border-btgog-sage/5">
            <Heart size={14} className="text-btgog-clay" fill="currentColor"/> Restoring Dignity & Growth
          </div>
          <h1 className="text-6xl md:text-8xl font-serif font-black text-btgog-ink tracking-tight leading-[1.1]">
            A Place to <span className="text-btgog-sage italic">Heal</span>, <br className="hidden md:block" /> 
            a Path to <span className="text-btgog-clay">Thrive</span>.
          </h1>
          <p className="text-xl md:text-2xl text-btgog-ink/70 font-medium max-w-2xl mx-auto leading-relaxed">
            Welcome to BTGOG. We aren't just building shelters; we are planting the seeds for long-term stability through housing, education, and community support.
          </p>
          <div className="flex flex-wrap justify-center gap-6 pt-4">
            <button onClick={() => setActivePage('campuses')} className="bg-btgog-sage text-white px-10 py-5 rounded-full font-bold text-base shadow-2xl shadow-btgog-sage/20 flex items-center gap-2 hover:scale-105 transition-all">
              Explore Our Campuses <ArrowRight size={20} />
            </button>
            <button onClick={() => setActivePage('partners')} className="bg-white text-btgog-sage border border-btgog-sage/10 px-10 py-5 rounded-full font-bold text-base soft-shadow hover:bg-btgog-sageLight transition-all">
              Partner With Us
            </button>
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-white rounded-[4rem] soft-shadow">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-8">
              <span className="text-xs font-black uppercase tracking-[0.4em] text-btgog-clay">Our Promise</span>
              <h2 className="text-5xl font-serif font-black text-btgog-ink leading-tight">Beyond Housing. <br/><span className="italic text-btgog-sage">Toward Wholeness.</span></h2>
              <p className="text-lg text-btgog-ink/60 leading-relaxed font-medium">
                Traditional models often focus on the immediate crisis, leaving people back where they started. At BTGOG, we offer a long-term (12-36 month) stabilization environment where the focus is on wholeness—not just a temporary bed.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-6">
                <div className="space-y-3 p-6 bg-btgog-sageLight rounded-[2rem]">
                  <Sun className="text-btgog-clay" size={28}/>
                  <h4 className="text-btgog-sage font-bold">Safe Surroundings</h4>
                  <p className="text-xs text-btgog-sage/70 font-medium">Secure, campus-based living environments tailored for families and individuals.</p>
                </div>
                <div className="space-y-3 p-6 bg-btgog-sand/50 rounded-[2rem]">
                  <Coffee className="text-btgog-sage" size={28}/>
                  <h4 className="text-btgog-clay font-bold">Real Support</h4>
                  <p className="text-xs text-btgog-clay/70 font-medium">On-site education, mental health support, and licensed childcare.</p>
                </div>
              </div>
            </div>
            <div className="relative p-12 lg:p-20">
               <div className="absolute inset-0 bg-btgog-sand/30 organic-shape -z-10 rotate-12"></div>
               <div className="bg-white p-10 rounded-[3rem] border border-btgog-sage/10 soft-shadow space-y-10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-btgog-sage/5 rounded-bl-[5rem]"></div>
                  <div className="flex gap-5">
                    <div className="shrink-0 w-14 h-14 bg-btgog-sageLight rounded-2xl flex items-center justify-center text-btgog-sage"><Home size={28}/></div>
                    <div>
                      <h4 className="font-serif font-bold text-xl text-btgog-ink">Integrated Care</h4>
                      <p className="text-sm text-btgog-ink/50 font-medium leading-relaxed">Housing, healthcare, and growth integrated into a single unified community.</p>
                    </div>
                  </div>
                  <div className="flex gap-5">
                    <div className="shrink-0 w-14 h-14 bg-btgog-sageLight rounded-2xl flex items-center justify-center text-btgog-sage"><Briefcase size={28}/></div>
                    <div>
                      <h4 className="font-serif font-bold text-xl text-btgog-ink">Career Pathways</h4>
                      <p className="text-sm text-btgog-ink/50 font-medium leading-relaxed">Direct links to trades, IT centers, and farming industry partners.</p>
                    </div>
                  </div>
                  <div className="flex gap-5">
                    <div className="shrink-0 w-14 h-14 bg-btgog-sageLight rounded-2xl flex items-center justify-center text-btgog-sage"><GraduationCap size={28}/></div>
                    <div>
                      <h4 className="font-serif font-bold text-xl text-btgog-ink">Rooted Education</h4>
                      <p className="text-sm text-btgog-ink/50 font-medium leading-relaxed">K-12 continuity for kids and career certifications for adults.</p>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const AboutPage = () => (
    <div className="page-transition py-40 px-6">
      <div className="max-w-4xl mx-auto space-y-24">
        <header className="space-y-6 text-center">
          <span className="text-xs font-black uppercase tracking-[0.4em] text-btgog-clay">Our Heart</span>
          <h2 className="text-6xl font-serif font-black text-btgog-ink tracking-tight">Roots for Stability.</h2>
          <p className="text-2xl text-btgog-sage italic font-medium">Stabilizing lives, one person at a time.</p>
        </header>

        <div className="prose prose-lg text-btgog-ink/70 space-y-12 max-w-none font-medium">
          <p className="text-2xl leading-relaxed text-btgog-ink/80 text-center px-4">
            BTGOG was born from a simple observation: compassion without structure is short-lived. To bridge the gap of growth, we provide the physical and emotional architecture for a new life.
          </p>
          
          <div className="grid md:grid-cols-2 gap-10 not-prose">
            <div className="p-10 bg-white border border-btgog-sage/10 rounded-[2.5rem] soft-shadow space-y-6">
              <h3 className="font-bold text-btgog-sage uppercase tracking-widest text-xs border-b border-btgog-sage/10 pb-4">Short-Term Relief</h3>
              <ul className="space-y-4 text-sm font-medium opacity-60">
                <li className="flex gap-3 items-center"><X size={18} className="text-btgog-clay"/> fragmented systems</li>
                <li className="flex gap-3 items-center"><X size={18} className="text-btgog-clay"/> temporary residency (90 days)</li>
                <li className="flex gap-3 items-center"><X size={18} className="text-btgog-clay"/> high stress & instability</li>
                <li className="flex gap-3 items-center"><X size={18} className="text-btgog-clay"/> lack of future-planning</li>
              </ul>
            </div>
            <div className="p-10 bg-btgog-sage text-white rounded-[2.5rem] soft-shadow space-y-6">
              <h3 className="font-bold text-btgog-sand uppercase tracking-widest text-xs border-b border-white/10 pb-4">The BTGOG Way</h3>
              <ul className="space-y-4 text-sm font-medium">
                <li className="flex gap-3 items-center"><CheckCircle2 size={18} className="text-btgog-sand"/> Unified Stabilization Hubs</li>
                <li className="flex gap-3 items-center"><CheckCircle2 size={18} className="text-btgog-sand"/> 12–36 Month Stay Commitment</li>
                <li className="flex gap-3 items-center"><CheckCircle2 size={18} className="text-btgog-sand"/> On-Site Holistic Services</li>
                <li className="flex gap-3 items-center"><CheckCircle2 size={18} className="text-btgog-sand"/> Self-Sustaining Economy</li>
              </ul>
            </div>
          </div>

          <div className="bg-btgog-sageLight p-12 rounded-[3rem] space-y-8 border border-btgog-sage/5">
            <h3 className="text-3xl font-serif font-black text-btgog-sage">Alignment with Community Goals</h3>
            <p className="text-lg leading-relaxed">
              We work hand-in-hand with public agencies to solve systemic issues. By moving people from "crisis managed" to "stabilized and contributing," we reduce the burden on public health and safety while enriching the local workforce.
            </p>
            <div className="flex items-center gap-4 text-btgog-clay font-black text-xs uppercase tracking-widest">
              <div className="w-12 h-px bg-btgog-clay"></div> Building for the common good
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const CampusPage = () => {
    const campusList = [
      {
        id: 1,
        title: "Family Hub",
        pop: "Families with kids seeking stability.",
        features: [
          "Private transitional housing",
          "Licensed on-site daycare",
          "K-12 educational continuity",
          "Healthcare & mental wellness",
          "On-campus farming jobs",
          "Warehouse training"
        ],
        outcomes: ["Stabilized Home Life", "Education Success", "Career Readiness"],
        icon: <Home />
      },
      {
        id: 2,
        title: "Youth Transition",
        pop: "Young adults (16–25) finding their way.",
        features: [
          "Supportive dorm housing",
          "Trade certifications",
          "Mentor-based life skills",
          "Apprenticeships",
          "Higher-ed placement"
        ],
        outcomes: ["Career Confidence", "Degree Achievement", "Self-Sufficiency"],
        icon: <Sun />
      },
      {
        id: 3,
        title: "Trade & Workforce",
        pop: "Adults ready for high-demand careers.",
        features: [
          "Workforce-centric housing",
          "Construction & HVAC training",
          "Union-partner programs",
          "Job retention support",
          "Manufacturing certs"
        ],
        outcomes: ["Stable Income", "Professional Licensure", "Retention Tracking"],
        icon: <Briefcase />
      },
      {
        id: 4,
        title: "Recovery & Support",
        pop: "Individuals on a journey of re-entry.",
        features: [
          "High-accountability housing",
          "Clinical health services",
          "Legal & documentation support",
          "Work-readiness training",
          "Integration pathways"
        ],
        outcomes: ["Reduced Recidivism", "Sustained Sobriety", "Civic Restoration"],
        icon: <ShieldCheck />
      },
      {
        id: 5,
        title: "Tech & Operations",
        pop: "Future leaders in digital infrastructure.",
        features: [
          "Tech-operator suites",
          "IT & Data center certs",
          "Regional logistics hubs",
          "Operations management",
          "Software literacy"
        ],
        outcomes: ["Tech Placement", "Operational Growth", "Digital Mastery"],
        icon: <Laptop />
      }
    ];

    return (
      <div className="page-transition py-40 px-6 bg-btgog-sand/20">
        <div className="max-w-7xl mx-auto space-y-24">
          <header className="text-center space-y-6 max-w-3xl mx-auto">
            <span className="text-xs font-black uppercase tracking-[0.4em] text-btgog-clay">Our Sanctuaries</span>
            <h2 className="text-6xl font-serif font-black text-btgog-ink tracking-tight leading-tight">Campuses Built for You</h2>
            <p className="text-xl text-btgog-ink/50 leading-relaxed font-medium">
              We offer specialized, high-structure campuses designed for specific stages of life and need.
            </p>
          </header>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {campusList.map((c) => (
              <div key={c.id} className="bg-white p-12 rounded-[3rem] soft-shadow border border-btgog-sage/5 hover:scale-[1.02] transition-transform group">
                <div className="w-16 h-16 bg-btgog-sageLight rounded-3xl flex items-center justify-center text-btgog-sage mb-10 group-hover:bg-btgog-sage group-hover:text-white transition-colors">
                  {React.cloneElement(c.icon as React.ReactElement, { size: 32 })}
                </div>
                <h3 className="text-3xl font-serif font-black text-btgog-ink mb-2">{c.title}</h3>
                <p className="text-sm font-bold text-btgog-clay mb-8 uppercase tracking-widest">{c.pop}</p>
                <div className="space-y-4 mb-10">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-btgog-sage">Core Services</span>
                  <ul className="text-xs space-y-3 text-btgog-ink/60 font-medium">
                    {c.features.map((f, i) => <li key={i} className="flex gap-3 items-center"><CheckCircle2 className="text-btgog-sage" size={14}/>{f}</li>)}
                  </ul>
                </div>
                <div className="pt-8 border-t border-btgog-sage/5 flex flex-wrap gap-2">
                   {c.outcomes.map((o, i) => (
                     <span key={i} className="px-4 py-1.5 bg-btgog-sageLight text-btgog-sage text-[10px] font-black rounded-full uppercase tracking-tighter">
                       {o}
                     </span>
                   ))}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-[4rem] p-12 md:p-20 soft-shadow overflow-x-auto border border-btgog-sage/5">
             <h3 className="text-4xl font-serif font-black text-btgog-ink mb-12 text-center">Comparing the Hubs</h3>
             <table className="w-full text-left min-w-[800px]">
                <thead>
                  <tr className="border-b border-btgog-sage/10 uppercase text-[10px] font-black tracking-widest text-btgog-clay">
                    <th className="pb-8">Asset Node</th>
                    <th className="pb-8">Housing Design</th>
                    <th className="pb-8">Primary Skillset</th>
                    <th className="pb-8">Target Outcome</th>
                  </tr>
                </thead>
                <tbody className="text-sm font-semibold text-btgog-ink">
                  {[
                    ["Family Hub", "Safe Transitional", "Agri-Industry", "Home Stability"],
                    ["Youth Base", "Dormitory", "Trade/Academic", "Independence"],
                    ["Workforce", "Residential Suite", "Trades/Logistics", "Career Retention"],
                    ["Recovery", "Supervised Site", "Retraining", "Reintegration"],
                    ["Tech Ops", "Digital Suite", "Network Ops", "Internal Mgmt"],
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-btgog-sage/5 hover:bg-btgog-sageLight/30 transition-colors">
                      <td className="py-8 font-serif font-bold text-lg text-btgog-sage">{row[0]}</td>
                      <td className="py-8 text-btgog-ink/60">{row[1]}</td>
                      <td className="py-8 text-btgog-ink/60">{row[2]}</td>
                      <td className="py-8 font-black text-btgog-clay uppercase text-xs tracking-widest">{row[3]}</td>
                    </tr>
                  ))}
                </tbody>
             </table>
          </div>
        </div>
      </div>
    );
  };

  const SystemsPage = () => (
    <div className="page-transition py-40 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
        <div className="space-y-10">
          <span className="text-xs font-black uppercase tracking-[0.4em] text-btgog-clay">Integrated Vision</span>
          <h2 className="text-6xl font-serif font-black text-btgog-ink tracking-tight">How the System Works</h2>
          <p className="text-xl text-btgog-ink/60 leading-relaxed font-medium">
            BTGOG is a regional network of campuses that support one another through shared services and a circular economy.
          </p>
          <div className="space-y-6">
            <div className="flex gap-6 p-8 bg-btgog-sageLight rounded-[3rem] border border-btgog-sage/5">
               <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-btgog-sage soft-shadow shrink-0"><Sprout size={32}/></div>
               <div>
                 <h4 className="font-serif font-bold text-xl text-btgog-ink">Self-Sustaining Growth</h4>
                 <p className="text-sm text-btgog-ink/50 leading-relaxed font-medium">Internal revenue from farmland and industrial production directly funds our education and care services.</p>
               </div>
            </div>
            <div className="flex gap-6 p-8 bg-btgog-clay/10 rounded-[3rem] border border-btgog-clay/5">
               <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-btgog-clay soft-shadow shrink-0"><Database size={32}/></div>
               <div>
                 <h4 className="font-serif font-bold text-xl text-btgog-ink">Shared Operations</h4>
                 <p className="text-sm text-btgog-ink/50 leading-relaxed font-medium">Logistics, technology hubs, and energy grids are managed across campuses for maximum efficiency.</p>
               </div>
            </div>
          </div>
        </div>
        <div className="bg-btgog-sage rounded-[4rem] p-12 md:p-20 text-white soft-shadow space-y-12">
          <h3 className="text-4xl font-serif font-bold italic">The Pathway Forward</h3>
          <div className="space-y-12">
            {[
              { id: '01', title: 'Rest & Recover', desc: 'Secure campus housing to stabilize immediate needs.' },
              { id: '02', title: 'Learn & Train', desc: 'Hands-on training in trades, tech, or agri-business.' },
              { id: '03', title: 'Work & Build', desc: 'Placement into apprenticeships and local job pipelines.' },
              { id: '04', title: 'Grow & Thrive', desc: 'A safe transition to a life of full independence.' }
            ].map((step) => (
              <div key={step.id} className="flex gap-8 group">
                <div className="text-5xl font-serif font-black text-white/20 group-hover:text-btgog-clay transition-colors">{step.id}</div>
                <div className="space-y-2 pt-2">
                  <h4 className="text-xl font-bold">{step.title}</h4>
                  <p className="text-sm text-white/60 font-medium leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const OutcomesPage = () => (
    <div className="page-transition py-40 px-6 text-center bg-white rounded-b-[4rem]">
      <div className="max-w-5xl mx-auto space-y-24">
        <header className="space-y-6">
          <span className="text-xs font-black uppercase tracking-[0.4em] text-btgog-clay">Our Accountability</span>
          <h2 className="text-6xl font-serif font-black text-btgog-ink tracking-tight">Rooted in Data.</h2>
          <p className="text-xl text-btgog-ink/50 leading-relaxed font-medium max-w-2xl mx-auto">
            We aren't just satisfied with beds filled—we are satisfied when lives are transformed. We track the outcomes that truly matter.
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-10">
           {[
             { label: "Long-Term Stability", desc: "Housing retention verified at the 24-month mark.", icon: <Home/> },
             { label: "Job Retention", desc: "Successful career placement and 1-year retention rates.", icon: <Briefcase/> },
             { label: "Graduation Rates", desc: "Achievement of GEDs and trade/tech certifications.", icon: <GraduationCap/> }
           ].map((m, i) => (
             <div key={i} className="p-12 bg-btgog-sageLight rounded-[3rem] border border-btgog-sage/5 text-left space-y-6 soft-shadow">
               <div className="text-btgog-sage">{m.icon}</div>
               <h4 className="text-2xl font-serif font-black text-btgog-sage">{m.label}</h4>
               <p className="text-sm text-btgog-sage/70 font-semibold leading-relaxed">{m.desc}</p>
             </div>
           ))}
        </div>

        <div className="p-12 md:p-20 bg-btgog-ink rounded-[4rem] text-left text-white soft-shadow space-y-12 overflow-hidden relative">
           <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/5 organic-shape blur-2xl"></div>
           <div className="flex justify-between items-baseline relative z-10 border-b border-white/10 pb-10">
              <h3 className="text-4xl font-serif font-bold italic">Reporting Our Impact</h3>
              <PieChart className="text-btgog-clay" size={32} />
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">
              <div className="space-y-4">
                 <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-btgog-clay">Public Trust</h4>
                 <p className="text-sm font-medium text-white/60 leading-relaxed">
                   BTGOG provides detailed performance reports to all municipal and community partners every quarter.
                 </p>
              </div>
              <div className="space-y-4">
                 <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-btgog-clay">Continuous Auditing</h4>
                 <p className="text-sm font-medium text-white/60 leading-relaxed">
                   Annual external audits ensure our financial and social impact remains high and transparent.
                 </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );

  const PartnersPage = () => (
    <div className="page-transition py-40 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
        <div className="space-y-10">
          <span className="text-xs font-black uppercase tracking-[0.4em] text-btgog-clay">Community Alliance</span>
          <h2 className="text-6xl font-serif font-black text-btgog-ink tracking-tight">Growing Together</h2>
          <p className="text-xl text-btgog-ink/60 leading-relaxed font-medium">
            We partner with cities, state agencies, and foundations to build stable futures.
          </p>
          <div className="space-y-6 pt-6">
             <div className="flex items-center gap-6 text-btgog-ink font-bold text-lg">
                <div className="w-4 h-4 bg-btgog-clay organic-shape shrink-0"></div> Municipal Infrastructure Support
             </div>
             <div className="flex items-center gap-6 text-btgog-ink font-bold text-lg">
                <div className="w-4 h-4 bg-btgog-clay organic-shape shrink-0"></div> State Workforce Pipeline Development
             </div>
             <div className="flex items-center gap-6 text-btgog-ink font-bold text-lg">
                <div className="w-4 h-4 bg-btgog-clay organic-shape shrink-0"></div> Foundation-Led Pilot Campuses
             </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6 p-6">
             <div className="bg-white p-10 rounded-[3rem] text-center space-y-6 soft-shadow border border-btgog-sage/5 group hover:bg-btgog-sage transition-all">
                <Handshake size={32} className="mx-auto text-btgog-clay group-hover:text-btgog-sand transition-colors"/>
                <h4 className="text-[10px] font-black uppercase tracking-widest group-hover:text-white">Public Safety</h4>
             </div>
             <div className="bg-white p-10 rounded-[3rem] text-center space-y-6 soft-shadow border border-btgog-sage/5 group hover:bg-btgog-sage transition-all">
                <Briefcase size={32} className="mx-auto text-btgog-clay group-hover:text-btgog-sand transition-colors"/>
                <h4 className="text-[10px] font-black uppercase tracking-widest group-hover:text-white">Workforce Hub</h4>
             </div>
             <div className="bg-white p-10 rounded-[3rem] text-center space-y-6 soft-shadow border border-btgog-sage/5 group hover:bg-btgog-sage transition-all">
                <Sprout size={32} className="mx-auto text-btgog-clay group-hover:text-btgog-sand transition-colors"/>
                <h4 className="text-[10px] font-black uppercase tracking-widest group-hover:text-white">Agri-Economy</h4>
             </div>
             <div className="bg-white p-10 rounded-[3rem] text-center space-y-6 soft-shadow border border-btgog-sage/5 group hover:bg-btgog-sage transition-all">
                <Database size={32} className="mx-auto text-btgog-clay group-hover:text-btgog-sand transition-colors"/>
                <h4 className="text-[10px] font-black uppercase tracking-widest group-hover:text-white">Ops Nodes</h4>
             </div>
        </div>
      </div>
    </div>
  );

  const ContactPage = () => (
    <div className="page-transition py-40 px-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-24">
        <div className="space-y-16">
          <header className="space-y-6">
            <span className="text-xs font-black uppercase tracking-[0.4em] text-btgog-clay">Reach Out</span>
            <h2 className="text-7xl font-serif font-black text-btgog-ink tracking-tight leading-none">Let's <br/><span className="italic text-btgog-sage">Connect.</span></h2>
          </header>
          
          <div className="space-y-10">
             <div className="space-y-3 group cursor-pointer">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-btgog-sage">Direct Line</h4>
                <p className="text-3xl font-serif font-bold text-btgog-ink group-hover:text-btgog-clay transition-colors">(442) 375-8487</p>
             </div>
             <div className="space-y-3">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-btgog-sage">Organization Lead</h4>
                <p className="text-2xl font-serif font-bold text-btgog-ink">Seven Crawford // Founder</p>
             </div>
          </div>
        </div>

        <form className="bg-white p-12 rounded-[3.5rem] soft-shadow border border-btgog-sage/5 space-y-8 relative">
           <div className="absolute top-10 right-10 w-24 h-24 bg-btgog-clay/5 organic-shape -z-10 rotate-45"></div>
           <div className="space-y-1 border-b border-btgog-sage/10 pb-2">
              <label className="text-[9px] font-black uppercase tracking-[0.3em] text-btgog-clay">Your Agency or Name</label>
              <input type="text" className="w-full bg-transparent py-2 text-sm font-semibold focus:outline-none focus:ring-0" placeholder="e.g. County Social Services" />
           </div>
           <div className="space-y-1 border-b border-btgog-sage/10 pb-2">
              <label className="text-[9px] font-black uppercase tracking-[0.3em] text-btgog-clay">How can we reach you?</label>
              <input type="email" className="w-full bg-transparent py-2 text-sm font-semibold focus:outline-none focus:ring-0" placeholder="hello@email.com" />
           </div>
           <div className="space-y-1">
              <label className="text-[9px] font-black uppercase tracking-[0.3em] text-btgog-clay">A few thoughts</label>
              <textarea rows={4} className="w-full bg-btgog-sageLight/50 rounded-2xl p-4 mt-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-btgog-sage transition-all resize-none" placeholder="How can we help?"></textarea>
           </div>
           <button type="button" className="w-full bg-btgog-sage text-white font-black uppercase tracking-[0.3em] text-xs py-6 rounded-full soft-shadow flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-95 transition-all">
             Send Message <ArrowRight size={18}/>
           </button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen selection:bg-btgog-clay selection:text-white">
      <Navbar />
      <main className="min-h-screen">
        {activePage === 'home' && <HomePage />}
        {activePage === 'about' && <AboutPage />}
        {activePage === 'campuses' && <CampusPage />}
        {activePage === 'system' && <SystemsPage />}
        {activePage === 'outcomes' && <OutcomesPage />}
        {activePage === 'partners' && <PartnersPage />}
        {activePage === 'contact' && <ContactPage />}
      </main>
      <Footer />
    </div>
  );
};

export default App;
