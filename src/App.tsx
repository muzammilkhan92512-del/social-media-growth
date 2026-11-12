import { FormEvent, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUp,
  AtSign,
  BarChart3,
  BriefcaseBusiness,
  Camera,
  Check,
  ChevronRight,
  Database,
  ExternalLink,
  FileSearch,
  Globe2,
  Mail,
  Menu,
  MessageCircle,
  MousePointer2,
  Network,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  UsersRound,
  X,
  Zap,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
];

const services = [
  {
    icon: TrendingUp,
    title: "Twitter/X Growth",
    description:
      "Targeted organic growth strategies to improve visibility, audience engagement, and brand presence.",
    benefits: ["Audience positioning", "Organic engagement", "Profile optimization"],
  },
  {
    icon: BriefcaseBusiness,
    title: "LinkedIn Growth",
    description:
      "Professional profile optimization, targeted networking, audience growth, and engagement strategies.",
    benefits: ["Professional reach", "Targeted networking", "Authority building"],
  },
  {
    icon: Camera,
    title: "Instagram Growth",
    description:
      "Strategic Instagram growth, profile optimization, content engagement, and audience development.",
    benefits: ["Profile strategy", "Audience development", "Content engagement"],
  },
  {
    icon: UsersRound,
    title: "Facebook Growth",
    description: "Facebook page growth, targeted engagement, and brand visibility strategies.",
    benefits: ["Page optimization", "Relevant engagement", "Brand visibility"],
  },
  {
    icon: Database,
    title: "Web Scraping",
    description:
      "Professional solutions for extracting publicly accessible website data where permitted.",
    benefits: ["Structured outputs", "Reliable extraction", "Purpose-built workflows"],
  },
  {
    icon: FileSearch,
    title: "Data Extraction & Research",
    description:
      "Structured data collection, competitor research, market research, and data organization.",
    benefits: ["Targeted collection", "Competitor research", "Clean data delivery"],
  },
];

const reasons = [
  {
    icon: Target,
    title: "Strategic & Targeted Growth",
    text: "Focused strategies built around your audience, platform, and business priorities.",
  },
  {
    icon: Database,
    title: "Professional Data Extraction",
    text: "Organized, relevant public data delivered in a format that supports better decisions.",
  },
  {
    icon: Sparkles,
    title: "Customized Solutions",
    text: "Every engagement is shaped around your scope instead of a one-size-fits-all package.",
  },
  {
    icon: MessageCircle,
    title: "Transparent Communication",
    text: "Clear expectations, practical updates, and direct communication throughout the project.",
  },
  {
    icon: ShieldCheck,
    title: "Real Work Portfolio",
    text: "Portfolio evidence is presented honestly, without fabricated claims or borrowed results.",
  },
  {
    icon: UsersRound,
    title: "Client-Focused Approach",
    text: "An attentive process focused on your goals, timeline, and expected deliverables.",
  },
];

const categories = [
  "All Projects",
  "Twitter/X Growth",
  "LinkedIn Growth",
  "Instagram Growth",
  "Facebook Growth",
  "Web Scraping",
  "Data Extraction",
];

type PortfolioItem = {
  src: string;
  title: string;
  category: string;
  description: string;
  alt: string;
};

// Add verified screenshots here as they become available. The gallery, filters,
// and lightbox will pick them up automatically without changing the UI.
const portfolioItems: PortfolioItem[] = [];

const whatsappHref =
  "https://wa.me/923201292512?text=" +
  encodeURIComponent(
    "Hello Muzammil, I visited your Social Media Growth website and I'm interested in your services. I'd like to discuss a project with you.",
  );

function Logo() {
  return (
    <a href="#home" className="logo" aria-label="Social Media Growth home">
      <span className="logo-mark">
        <TrendingUp size={18} />
      </span>
      <span>
        Social Media <strong>Growth</strong>
      </span>
    </a>
  );
}

function SectionHeading({
  eyebrow,
  title,
  copy,
  center = false,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  center?: boolean;
}) {
  return (
    <div className={`section-heading reveal ${center ? "center" : ""}`}>
      <span className="eyebrow">
        <span />
        {eyebrow}
      </span>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  );
}

export default function App() {
  const root = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [category, setCategory] = useState("All Projects");
  const [lightbox, setLightbox] = useState<PortfolioItem | null>(null);
  const [formState, setFormState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formMessage, setFormMessage] = useState("");

  const filteredPortfolio = portfolioItems.filter(
    (item) => category === "All Projects" || item.category === category,
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => entry.isIntersecting && setActiveSection(entry.target.id)),
      { rootMargin: "-35% 0px -55% 0px" },
    );
    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!root.current) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".hero-copy > *", {
        opacity: 0,
        y: 30,
        duration: 0.85,
        stagger: 0.1,
        ease: "power3.out",
      });
      gsap.from(".dashboard-wrap", {
        opacity: 0,
        y: 35,
        scale: 0.96,
        duration: 1,
        delay: 0.25,
        ease: "power3.out",
      });
      gsap.to(".float-icon", {
        y: -12,
        duration: 2.3,
        stagger: 0.25,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((element) => {
        gsap.from(element, {
          opacity: 0,
          y: 26,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 88%", once: true },
        });
      });
      gsap.utils.toArray<HTMLElement>(".stagger-grid").forEach((grid) => {
        gsap.from(grid.children, {
          opacity: 0,
          y: 30,
          duration: 0.65,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: grid, start: "top 85%", once: true },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    document.body.style.overflow = lightbox || menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightbox, menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    if (import.meta.env.DEV) {
      setFormState("error");
      setFormMessage(
        "Form delivery activates on the deployed Netlify site. For now, please use WhatsApp or email below.",
      );
      return;
    }
    setFormState("loading");
    setFormMessage("");
    const data = new FormData(form);
    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      });
      if (!response.ok) throw new Error("Submission failed");
      form.reset();
      setFormState("success");
      setFormMessage("Thank you. Your project inquiry was sent successfully.");
    } catch {
      setFormState("error");
      setFormMessage(
        "Your inquiry could not be sent. Please use WhatsApp or email and I’ll respond directly.",
      );
    }
  };

  return (
    <div ref={root} className="site-shell">
      <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="container nav-inner">
          <Logo />
          <nav className="desktop-nav" aria-label="Main navigation">
            {navItems.map((item) => (
              <a
                key={item.href}
                className={activeSection === item.href.slice(1) ? "active" : ""}
                href={item.href}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a className="button button-sm nav-cta" href="#contact">
            Let&apos;s Work Together <ArrowRight size={16} />
          </a>
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
        <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
          {navItems.map((item) => (
            <a key={item.href} onClick={closeMenu} href={item.href}>
              {item.label}
            </a>
          ))}
          <a onClick={closeMenu} className="button" href="#contact">
            Let&apos;s Work Together
          </a>
        </div>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="hero-orb orb-one" />
          <div className="hero-orb orb-two" />
          <div className="grid-lines" />
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="status-pill">
                <span />
                <Zap size={13} /> Growth strategy meets data intelligence
              </div>
              <h1>
                Social Media Growth That Builds Your <span>Digital Presence.</span>
              </h1>
              <p>
                I help businesses, creators, and professionals build a stronger online presence
                through strategic social media growth and professional web scraping solutions.
              </p>
              <div className="hero-actions">
                <a className="button" href="#contact">
                  Hire Me <ArrowRight size={18} />
                </a>
                <a className="button button-secondary" href="#portfolio">
                  Explore My Work <ChevronRight size={18} />
                </a>
              </div>
              <div className="trust-row">
                <div>
                  <Check size={15} />
                  <span>Customized strategies</span>
                </div>
                <div>
                  <Check size={15} />
                  <span>Transparent process</span>
                </div>
                <div>
                  <Check size={15} />
                  <span>3+ years experience</span>
                </div>
              </div>
            </div>

            <div className="dashboard-wrap" aria-label="Illustrative analytics dashboard">
              <div className="float-icon float-x">𝕏</div>
              <div className="float-icon float-linkedin">
                <BriefcaseBusiness size={20} />
              </div>
              <div className="float-icon float-instagram">
                <Camera size={20} />
              </div>
              <div className="float-icon float-facebook">
                <AtSign size={20} />
              </div>
              <div className="dashboard-glow" />
              <div className="dashboard">
                <div className="dash-top">
                  <div className="dash-title">
                    <span className="mini-logo">
                      <BarChart3 size={15} />
                    </span>
                    <div>
                      <strong>Growth Overview</strong>
                      <small>Illustrative dashboard preview</small>
                    </div>
                  </div>
                  <span className="live-tag">
                    <i /> Sample
                  </span>
                </div>
                <div className="metric-row">
                  <div className="metric">
                    <span>Audience reach</span>
                    <strong>24.8K</strong>
                    <small>Illustrative data</small>
                  </div>
                  <div className="metric">
                    <span>Engagement</span>
                    <strong>8.4%</strong>
                    <small>Illustrative data</small>
                  </div>
                  <div className="metric">
                    <span>Profiles</span>
                    <strong>04</strong>
                    <small>Sample channels</small>
                  </div>
                </div>
                <div className="chart-card">
                  <div className="chart-head">
                    <div>
                      <strong>Digital presence</strong>
                      <span>Sample 8-week visualization</span>
                    </div>
                    <span>Overview</span>
                  </div>
                  <div className="chart">
                    <div className="chart-grid">
                      <i />
                      <i />
                      <i />
                      <i />
                    </div>
                    <svg
                      viewBox="0 0 600 180"
                      preserveAspectRatio="none"
                      role="img"
                      aria-label="Illustrative rising line chart"
                    >
                      <defs>
                        <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#3B82F6" stopOpacity=".35" />
                          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path
                        className="area"
                        d="M0 145 C70 130 65 115 130 120 S205 82 270 95 S360 62 410 72 S510 28 600 25 L600 180 L0 180 Z"
                      />
                      <path
                        className="line"
                        d="M0 145 C70 130 65 115 130 120 S205 82 270 95 S360 62 410 72 S510 28 600 25"
                      />
                    </svg>
                  </div>
                </div>
                <div className="channel-row">
                  {[
                    ["𝕏", "Twitter / X"],
                    ["in", "LinkedIn"],
                    ["◎", "Instagram"],
                  ].map(([icon, name], index) => (
                    <div className="channel" key={name}>
                      <span>{icon}</span>
                      <div>
                        <strong>{name}</strong>
                        <small>Channel {index + 1}</small>
                      </div>
                      <i style={{ width: `${76 - index * 9}%` }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <a href="#services" className="scroll-cue" aria-label="Scroll to services">
            <MousePointer2 size={15} /> Scroll to explore
          </a>
        </section>

        <section id="services" className="section services-section">
          <div className="container">
            <SectionHeading
              eyebrow="What I do"
              title="Professional Services That Drive Digital Growth"
              copy="Focused social media and data solutions built to strengthen your presence, support smarter decisions, and move your business forward."
              center
            />
            <div className="service-grid stagger-grid">
              {services.map(({ icon: Icon, title, description, benefits }, index) => (
                <article className="service-card" key={title}>
                  <div className="card-number">0{index + 1}</div>
                  <div className="icon-box">
                    <Icon size={23} />
                  </div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <ul>
                    {benefits.map((benefit) => (
                      <li key={benefit}>
                        <Check size={14} />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  <a href="#contact">
                    Contact Me <ArrowRight size={16} />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="section about-section">
          <div className="container about-grid">
            <div className="about-visual reveal">
              <div className="visual-frame">
                <div className="visual-top">
                  <span>MS</span>
                  <div>
                    <strong>Muzammil Sajjad</strong>
                    <small>Growth & Data Specialist</small>
                  </div>
                </div>
                <div className="expertise-map">
                  <div className="center-node">
                    <Sparkles size={24} />
                    <span>Strategy</span>
                  </div>
                  <div className="map-node node-a">
                    <TrendingUp size={18} />
                    Growth
                  </div>
                  <div className="map-node node-b">
                    <Database size={18} />
                    Data
                  </div>
                  <div className="map-node node-c">
                    <Search size={18} />
                    Research
                  </div>
                  <div className="map-node node-d">
                    <Network size={18} />
                    Reach
                  </div>
                </div>
                <div className="experience-strip">
                  <strong>3+</strong>
                  <span>
                    Years of social media
                    <br />
                    growth experience
                  </span>
                </div>
              </div>
            </div>
            <div className="about-copy reveal">
              <SectionHeading eyebrow="About me" title="Meet Your Growth & Data Specialist" />
              <p className="lead">
                I&apos;m <strong>Muzammil Sajjad</strong>, a Social Media Growth Expert and Web
                Scraping Specialist.
              </p>
              <p>
                I help businesses and professionals improve their digital presence through targeted
                growth strategies and data-driven solutions. My focus is on professional service
                delivery, transparent communication, customized strategies, and helping clients
                achieve their business goals.
              </p>
              <div className="approach-grid">
                <div>
                  <span>
                    <Target size={19} />
                  </span>
                  <div>
                    <strong>My expertise</strong>
                    <small>Platform growth, public data extraction, and focused research.</small>
                  </div>
                </div>
                <div>
                  <span>
                    <Sparkles size={19} />
                  </span>
                  <div>
                    <strong>My approach</strong>
                    <small>Understand the goal, tailor the solution, communicate clearly.</small>
                  </div>
                </div>
              </div>
              <div className="skill-row">
                <span>Social Strategy</span>
                <span>Audience Growth</span>
                <span>Web Scraping</span>
                <span>Data Research</span>
              </div>
              <a className="text-link" href="#contact">
                Let&apos;s discuss your project <ArrowRight size={17} />
              </a>
            </div>
          </div>
        </section>

        <section id="portfolio" className="section portfolio-section">
          <div className="container">
            <SectionHeading
              eyebrow="Selected work"
              title="Real Work. Real Experience. Real Proof."
              copy="Explore selected projects that demonstrate my expertise in social media growth and data extraction."
              center
            />
            <div className="filter-bar reveal" role="tablist" aria-label="Portfolio categories">
              {categories.map((item) => (
                <button
                  key={item}
                  role="tab"
                  aria-selected={category === item}
                  className={category === item ? "active" : ""}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            {filteredPortfolio.length ? (
              <div className="portfolio-grid stagger-grid">
                {filteredPortfolio.map((item) => (
                  <button
                    className="portfolio-card"
                    key={item.src}
                    onClick={() => setLightbox(item)}
                  >
                    <img src={item.src} alt={item.alt} loading="lazy" />
                    <span className="portfolio-overlay">
                      <small>{item.category}</small>
                      <strong>{item.title}</strong>
                      <em>
                        <ExternalLink size={18} />
                      </em>
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="portfolio-empty reveal">
                <div className="empty-icon">
                  <ShieldCheck size={30} />
                </div>
                <span>Portfolio integrity</span>
                <h3>Verified project screenshots coming soon</h3>
                <p>
                  No portfolio media was included with this build. Rather than show stock imagery or
                  invented results, this gallery is ready for verified work screenshots when
                  provided.
                </p>
                <a href="#contact" className="button button-secondary">
                  Request relevant work samples <ArrowRight size={17} />
                </a>
              </div>
            )}
          </div>
        </section>

        <section className="section reasons-section">
          <div className="container">
            <div className="reasons-top">
              <SectionHeading
                eyebrow="The difference"
                title="Why Clients Choose Social Media Growth"
                copy="A practical, thoughtful approach to digital growth and data services—built around clarity, relevance, and your goals."
              />
              <a className="button button-secondary" href="#contact">
                Start a conversation <ArrowRight size={17} />
              </a>
            </div>
            <div className="reasons-grid stagger-grid">
              {reasons.map(({ icon: Icon, title, text }) => (
                <article key={title}>
                  <span>
                    <Icon size={21} />
                  </span>
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <div className="contact-orb" />
          <div className="container contact-grid">
            <div className="contact-copy reveal">
              <SectionHeading
                eyebrow="Start a project"
                title="Ready to Grow Your Business?"
                copy="Have a project in mind? Let's discuss your goals and build the right solution for your business."
              />
              <div className="contact-person">
                <span>MS</span>
                <div>
                  <strong>Muzammil Sajjad</strong>
                  <small>Social Media Growth Expert & Web Scraping Specialist</small>
                </div>
              </div>
              <div className="contact-links">
                <a href={whatsappHref} target="_blank" rel="noreferrer">
                  <span>
                    <MessageCircle />
                  </span>
                  <div>
                    <small>WhatsApp</small>
                    <strong>+92 320 1292512</strong>
                  </div>
                  <ExternalLink size={16} />
                </a>
                <a href="mailto:muzammilexprt@gmail.com">
                  <span>
                    <Mail />
                  </span>
                  <div>
                    <small>Email</small>
                    <strong>muzammilexprt@gmail.com</strong>
                  </div>
                  <ExternalLink size={16} />
                </a>
                <a href="https://www.fiverr.com/s/YLoB5YK" target="_blank" rel="noreferrer">
                  <span>
                    <Globe2 />
                  </span>
                  <div>
                    <small>Fiverr</small>
                    <strong>View my Fiverr profile</strong>
                  </div>
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
            <div className="form-card reveal">
              <div className="form-head">
                <div>
                  <span>
                    <Mail size={19} />
                  </span>
                  <div>
                    <strong>Project inquiry</strong>
                    <small>Tell me what you&apos;re working on</small>
                  </div>
                </div>
                <i>Typically replies directly</i>
              </div>
              <form name="project-inquiry" method="POST" data-netlify="true" onSubmit={submitForm}>
                <input type="hidden" name="form-name" value="project-inquiry" />
                <div className="form-row">
                  <label>
                    Full Name
                    <input
                      required
                      name="full-name"
                      type="text"
                      autoComplete="name"
                      placeholder="Your full name"
                    />
                  </label>
                  <label>
                    Email Address
                    <input
                      required
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@company.com"
                    />
                  </label>
                </div>
                <div className="form-row">
                  <label>
                    Service Required
                    <select required name="service" defaultValue="">
                      <option value="" disabled>
                        Select a service
                      </option>
                      {services.map((service) => (
                        <option key={service.title}>{service.title}</option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Project Budget
                    <select required name="budget" defaultValue="">
                      <option value="" disabled>
                        Select a range
                      </option>
                      <option>Under $250</option>
                      <option>$250 – $500</option>
                      <option>$500 – $1,000</option>
                      <option>$1,000+</option>
                      <option>Not sure yet</option>
                    </select>
                  </label>
                </div>
                <label>
                  Project Details
                  <textarea
                    required
                    name="project-details"
                    rows={5}
                    placeholder="Share your goals, scope, and ideal timeline..."
                  />
                </label>
                <button
                  className="button submit-button"
                  disabled={formState === "loading"}
                  type="submit"
                >
                  {formState === "loading" ? "Sending inquiry…" : "Send Project Inquiry"}{" "}
                  <ArrowRight size={18} />
                </button>
                {formMessage && (
                  <div role="status" className={`form-status ${formState}`}>
                    {formState === "success" ? <Check size={17} /> : <X size={17} />}
                    {formMessage}
                  </div>
                )}
                <p className="form-note">
                  <ShieldCheck size={14} /> Your details are used only to respond to this inquiry.
                </p>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-line" />
        <div className="container footer-main">
          <div className="footer-brand">
            <Logo />
            <p>
              Helping businesses grow their digital presence through professional social media
              growth and data solutions.
            </p>
            <span>Muzammil Sajjad</span>
          </div>
          <div>
            <h4>Navigate</h4>
            {navItems.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </div>
          <div>
            <h4>Services</h4>
            <a href="#services">Social Media Growth</a>
            <a href="#services">Web Scraping</a>
            <a href="#services">Data Extraction</a>
            <a href="#services">Competitor Research</a>
          </div>
          <div>
            <h4>Connect</h4>
            <a href={whatsappHref} target="_blank" rel="noreferrer">
              WhatsApp <ExternalLink size={12} />
            </a>
            <a href="mailto:muzammilexprt@gmail.com">
              Email <ExternalLink size={12} />
            </a>
            <a href="https://www.fiverr.com/s/YLoB5YK" target="_blank" rel="noreferrer">
              Fiverr <ExternalLink size={12} />
            </a>
          </div>
        </div>
        <div className="container footer-bottom">
          <p>© 2026 Social Media Growth. All Rights Reserved.</p>
          <p>Built around strategy, clarity, and real work.</p>
          <a href="#home" aria-label="Back to top">
            <ArrowUp size={17} />
          </a>
        </div>
      </footer>

      {lightbox && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.title}
          onClick={() => setLightbox(null)}
        >
          <button onClick={() => setLightbox(null)} aria-label="Close preview">
            <X />
          </button>
          <div onClick={(event) => event.stopPropagation()}>
            <img src={lightbox.src} alt={lightbox.alt} />
            <div>
              <span>{lightbox.category}</span>
              <h3>{lightbox.title}</h3>
              <p>{lightbox.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
