import { useState, useEffect } from 'react'

/* ─────────────────────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────────────────────── */

const PROJECTS = [
  {
    id: 1,
    title: 'Obsesyon Teaser Ad',
    category: 'Ad',
    desc: 'A commissioned teaser ad for Obsesyon Clothing Brand. Cut to build brand identity, tension, and excitement through sharp, rhythmic pacing.',
    photo: '1536240478700-b869ad10a2eb',
    videoId: 'a8N2J-FZ9mQ' as string | undefined,
  },
  {
    id: 2,
    title: 'Obsesyon VFX Ad',
    category: 'VFX',
    desc: 'A commissioned promotional clip for Obsesyon, featuring seamless Spider-Man VFX integration.',
    tools: ['Premiere Pro', 'After Effects'],
    photo: '1489599849927-2ee91cede3ba',
    videoId: 'pM2_9rGoh_k' as string | undefined,
  },
  {
    id: 3,
    title: 'KitKat Ad (School Project)',
    category: 'Ad',
    desc: 'A dynamic school project showcasing advanced VFX and compositing skills to deliver an energetic, high-impact commercial concept for KitKat.',
    tools: ['Premiere Pro', 'After Effects'],
    photo: '1574717024653-61fd2cf4d44d',
    videoId: 'Fz_5uuO5CVw' as string | undefined,
  },
  {
    id: 4,
    title: '2024 Sample Reel',
    category: 'Motion Graphics',
    desc: 'A curated compilation of creative cuts and random cinematic clips demonstrating versatility in pacing, transitions, and style throughout 2024.',
    tools: ['Premiere Pro', 'After Effects'],
    photo: '1558618666-fcd25c85cd64',
    videoId: 'u7s--nNa7QE' as string | undefined,
  },
  {
    id: 5,
    title: 'Day Vlog',
    category: 'Vlog',
    desc: 'A casual, lifestyle-focused day vlog edited for clean continuity, engaging pacing, and a natural, relatable storytelling flow.',
    tools: ['Premiere Pro'],
    photo: '1511671001595-f2e4d7d19e12',
    videoId: '-_fSOsLHBBw' as string | undefined,
  },
  {
    id: 6,
    title: 'My STI Odyssey',
    category: 'Interview',
    desc: 'A school project documentary-style video featuring structured interviews with senior students. Focused on crisp audio balancing, multi-cam editing, and clear narrative structure.',
    tools: ['Premiere Pro', 'After Effects'],
    photo: '1611532736597-de2d4265fba3',
    videoId: 'eXJIzCRvBFM' as string | undefined,
  },
]

const SOCIALS = [
  {
    label: 'YouTube',
    handle: '@Makyuka',
    href: 'https://www.youtube.com/@Makyuka',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    handle: '@wwcrng',
    href: 'https://www.instagram.com/wwcrng/?hl=en',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    handle: '@cmrold',
    href: 'https://www.facebook.com/cmrold',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: 'Gmail',
    handle: 'jeffmatthewmolina@gmail.com',
    href: 'mailto:jeffmatthewmolina@gmail.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    handle: '@coderold',
    href: 'https://github.com/coderold',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
]

const TICKER_ITEMS = [
  'VIDEO EDITING', 'COLOR GRADING', 'MOTION GRAPHICS', 'SOUND DESIGN',
  'PREMIERE PRO', 'DAVINCI RESOLVE', 'AFTER EFFECTS', 'CINEMA 4D',
  'NARRATIVE EDITING', 'BRAND FILMS', 'SOCIAL CONTENT', 'FASHION FILMS',
]

/* ─────────────────────────────────────────────────────────────────────────────
   ICON PRIMITIVES
───────────────────────────────────────────────────────────────────────────── */

const IconSun = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4" />
    <line x1="12" y1="2" x2="12" y2="5" /><line x1="12" y1="19" x2="12" y2="22" />
    <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" /><line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
    <line x1="2" y1="12" x2="5" y2="12" /><line x1="19" y1="12" x2="22" y2="12" />
    <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" /><line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
  </svg>
)

const IconMoon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
)

const IconPlay = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 3.7l14.4 8.3L6 20.3V3.7z" />
  </svg>
)

const IconArrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
)

const IconExternal = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
  </svg>
)

/* ─────────────────────────────────────────────────────────────────────────────
   SHARED STYLE HELPERS
───────────────────────────────────────────────────────────────────────────── */

const S = {
  overline: {
    display: 'flex' as const,
    alignItems: 'center' as const,
    gap: 12,
    marginBottom: 24,
  },
  overlineBar: {
    width: 32,
    height: 2,
    background: 'var(--accent)',
    flexShrink: 0,
  },
  overlineText: {
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: '0.22em',
    textTransform: 'uppercase' as const,
    color: 'var(--accent)',
  },
  container: {
    maxWidth: 1440,
    margin: '0 auto',
    width: '100%',
  },
}

/* ─────────────────────────────────────────────────────────────────────────────
   NAV
───────────────────────────────────────────────────────────────────────────── */

function Nav({ dark, toggle }: { dark: boolean; toggle: () => void }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 32)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <header
      style={{
        position: 'fixed',
        inset: '0 0 auto 0',
        zIndex: 200,
        background: scrolled ? 'var(--nav-blur)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'background 0.4s ease, border-color 0.4s ease',
      }}
    >
      <div
        className="nav-wrap"
        style={{
          ...S.container,
          height: 72,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 48px',
        }}
      >
        {/* Logo */}
        <a href="#top" style={{ textDecoration: 'none', display: 'flex', alignItems: 'baseline', gap: 1 }}>
          <span
            className="font-display"
            style={{ fontSize: 20, fontWeight: 900, letterSpacing: '0.06em', color: 'var(--text)' }}
          >
            JMM
          </span>
          <span style={{ fontSize: 24, fontWeight: 900, color: 'var(--accent)', lineHeight: 1 }}>.</span>
        </a>

        {/* Links + toggle */}
        <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
          {['Works', 'About', 'Contact'].map((lnk) => (
            <NavLink key={lnk} href={`#${lnk.toLowerCase()}`} label={lnk} />
          ))}
          <ThemeToggle dark={dark} toggle={toggle} compact />
        </div>
      </div>
    </header>
  )
}

function NavLink({ href, label }: { href: string; label: string }) {
  const [hov, setHov] = useState(false)
  return (
    <a
      href={href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        textDecoration: 'none',
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: hov ? 'var(--text)' : 'var(--muted)',
        transition: 'color 0.2s ease',
      }}
    >
      {label}
    </a>
  )
}

function ThemeToggle({ dark, toggle, compact }: { dark: boolean; toggle: () => void; compact?: boolean }) {
  const [hov, setHov] = useState(false)
  return (
    <button
      onClick={toggle}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: compact ? 38 : 48,
        height: compact ? 38 : 48,
        borderRadius: compact ? 8 : 12,
        background: hov ? 'var(--accent-dim)' : 'var(--card)',
        border: `1px solid ${hov ? 'var(--accent)' : 'var(--border)'}`,
        color: hov ? 'var(--accent)' : 'var(--muted)',
        cursor: 'pointer',
        transition: 'all 0.22s ease',
        flexShrink: 0,
      }}
    >
      {dark ? <IconSun /> : <IconMoon />}
    </button>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   HERO
───────────────────────────────────────────────────────────────────────────── */

function Hero() {
  const [loaded, setLoaded] = useState(false)

  return (
    <section
      id="top"
      className="hero-section"
      style={{
        minHeight: '100svh',
        background: 'var(--bg)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        padding: '112px 48px 80px',
      }}
    >
      {/* Portrait bled into the background — absolutely positioned, right half */}
      <div
        aria-hidden={!loaded}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '52%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        <img
          src="https://i.ibb.co/1YnqBmDf/profile-pfp.jpg"
          alt="Jeff Matthew Molina"
          onLoad={() => setLoaded(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.8s ease',
            display: 'block',
          }}
        />
        {/* Left-side fade — blends photo into page background */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, var(--bg) 0%, var(--bg) 8%, transparent 42%)',
          }}
        />
        {/* Top fade */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, var(--bg) 0%, transparent 18%, transparent 72%, var(--bg) 100%)',
          }}
        />
        {/* Subtle dark tint over the photo for contrast */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.18)',
          }}
        />
      </div>

      {/* Content — sits on top of the blended photo */}
      <div
        className="hero-grid"
        style={{
          ...S.container,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 64,
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* ── Left: Text ── */}
        <div className="hero-text" style={{ paddingTop: 32 }}>
          {/* Overline */}
          <div style={S.overline}>
            <div style={S.overlineBar} />
            <span style={S.overlineText}>Video Editor & Visual Storyteller</span>
          </div>

          {/* Main headline — stacked with outline/fill alternation */}
          <h1
            className="font-display hero-headline"
            style={{
              fontSize: 'clamp(60px, 6.8vw, 104px)',
              fontWeight: 900,
              lineHeight: 0.9,
              letterSpacing: '-0.025em',
              marginBottom: 36,
              color: 'var(--text)',
            }}
          >
            <span style={{ display: 'block' }}>JEFF</span>
            <span
              style={{
                display: 'block',
                WebkitTextStroke: '2px var(--text)',
                color: 'transparent',
              }}
            >
              MATTHEW
            </span>
            <span style={{ display: 'block' }}>MOLINA</span>
          </h1>

          {/* Tagline */}
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.75,
              color: 'var(--muted)',
              maxWidth: 400,
              marginBottom: 48,
              fontWeight: 300,
            }}
          >
            Crafting visual stories through high-impact, rhythmic video editing.
            Every frame is intentional — every cut tells the story.
          </p>

          {/* CTAs */}
          <div className="hero-cta-row" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <BtnPrimary href="#works" label="View Works" icon={<IconArrow />} />
            <BtnOutline href="#contact" label="Contact" />
          </div>
        </div>

        {/* Right column intentionally empty — portrait fills it via absolute positioning */}
        <div className="hero-frame" />
      </div>
    </section>
  )
}

/* ── Button primitives ────────────────────────────────────────────────────── */

function BtnPrimary({ href, label, icon }: { href: string; label: string; icon?: React.ReactNode }) {
  const [hov, setHov] = useState(false)
  return (
    <a
      href={href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        padding: '14px 28px',
        background: 'var(--accent)',
        color: '#fff',
        borderRadius: 4,
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        textDecoration: 'none',
        transition: 'transform 0.22s ease, box-shadow 0.22s ease',
        transform: hov ? 'translateY(-2px)' : 'none',
        boxShadow: hov ? '0 12px 36px var(--accent-glow)' : '0 4px 16px var(--accent-dim)',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
      {icon}
    </a>
  )
}

function BtnOutline({ href, label }: { href: string; label: string }) {
  const [hov, setHov] = useState(false)
  return (
    <a
      href={href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '14px 28px',
        background: 'transparent',
        color: 'var(--text)',
        border: `1px solid ${hov ? 'var(--text)' : 'var(--border)'}`,
        borderRadius: 4,
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        textDecoration: 'none',
        transition: 'border-color 0.2s ease',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </a>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   TICKER STRIP
───────────────────────────────────────────────────────────────────────────── */

function Ticker() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS]
  return (
    <div
      style={{
        background: 'var(--accent)',
        overflow: 'hidden',
        padding: '14px 0',
        userSelect: 'none',
      }}
    >
      <div className="ticker-track">
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 24,
              paddingRight: 48,
              whiteSpace: 'nowrap',
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#fff',
            }}
          >
            {item}
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,0.5)', flexShrink: 0 }} />
          </span>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   VIDEO MODAL
───────────────────────────────────────────────────────────────────────────── */

function VideoModal({ videoId, onClose }: { videoId: string; onClose: () => void }) {
  // Lock body scroll while modal is open
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    /* Backdrop — click outside player to close */
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Video player"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 500,
        background: 'rgba(0,0,0,0.88)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Player container — stop clicks propagating to backdrop */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '90vw',
          maxWidth: 960,
          aspectRatio: '16/9',
          borderRadius: 8,
          overflow: 'hidden',
          boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
          background: '#000',
        }}
      >
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title="Video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            border: 'none',
          }}
        />
      </div>

      {/* X close button */}
      <button
        onClick={onClose}
        aria-label="Close video"
        style={{
          position: 'fixed',
          top: 20,
          right: 20,
          width: 44,
          height: 44,
          borderRadius: 8,
          background: 'var(--card)',
          border: '1px solid var(--border)',
          color: 'var(--muted)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.2s ease, border-color 0.2s ease, color 0.2s ease',
          zIndex: 501,
        }}
        onMouseEnter={(e) => {
          const btn = e.currentTarget
          btn.style.background = 'var(--accent-dim)'
          btn.style.borderColor = 'var(--accent)'
          btn.style.color = 'var(--accent)'
        }}
        onMouseLeave={(e) => {
          const btn = e.currentTarget
          btn.style.background = 'var(--card)'
          btn.style.borderColor = 'var(--border)'
          btn.style.color = 'var(--muted)'
        }}
      >
        {/* X icon */}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   WORKS SECTION
───────────────────────────────────────────────────────────────────────────── */

function Works() {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null)

  return (
    <section
      id="works"
      className="works-section"
      style={{ background: 'var(--bg2)', padding: '112px 48px' }}
    >
      <div style={S.container}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: 56,
            gap: 24,
            flexWrap: 'wrap',
          }}
        >
          <div>
            <div style={S.overline}>
              <div style={S.overlineBar} />
              <span style={S.overlineText}>Selected Work</span>
            </div>
            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(40px, 5vw, 72px)',
                fontWeight: 900,
                letterSpacing: '-0.025em',
                lineHeight: 0.95,
                color: 'var(--text)',
              }}
            >
              THE REEL
            </h2>
          </div>
          <p
            style={{
              maxWidth: 340,
              fontSize: 14,
              lineHeight: 1.75,
              color: 'var(--muted)',
            }}
          >
            A curated selection spanning commercial, narrative, and digital work.
            Each project is a story told through careful cuts, color, and rhythm.
          </p>
        </div>

        {/* Grid */}
        <div
          className="works-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 24,
          }}
        >
          {PROJECTS.map((p) => (
            <VideoCard key={p.id} project={p} onPlay={setActiveVideoId} />
          ))}
        </div>
      </div>

      {/* Video modal — renders when a card with a videoId is clicked */}
      {activeVideoId && (
        <VideoModal videoId={activeVideoId} onClose={() => setActiveVideoId(null)} />
      )}
    </section>
  )
}

function VideoCard({ project, onPlay }: { project: typeof PROJECTS[number]; onPlay?: (videoId: string) => void }) {
  const [hov, setHov] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const hasVideo = Boolean(project.videoId)

  const handleClick = () => {
    if (hasVideo && project.videoId) {
      onPlay?.(project.videoId)
    }
  }

  return (
    <article
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={handleClick}
      style={{
        background: 'var(--card)',
        border: `1px solid ${hov && hasVideo ? 'var(--accent)' : 'var(--border)'}`,
        borderRadius: 6,
        overflow: 'hidden',
        cursor: hasVideo ? 'pointer' : 'default',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.25s ease',
        transform: hov && hasVideo ? 'translateY(-5px)' : 'none',
        boxShadow: hov && hasVideo ? 'var(--shadow-lift)' : 'var(--shadow-card)',
      }}
    >
      {/* Thumbnail */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16/9',
          background: '#080808',
          overflow: 'hidden',
        }}
      >
        <img
          src={
            project.videoId
              ? `https://img.youtube.com/vi/${project.videoId}/maxresdefault.jpg`
              : `https://images.unsplash.com/photo-${project.photo}?w=640&h=360&fit=crop&auto=format`
          }
          alt={project.title}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={(e) => {
            // maxresdefault isn't always available — fall back to hqdefault
            if (project.videoId && e.currentTarget.src.includes('maxresdefault')) {
              e.currentTarget.src = `https://img.youtube.com/vi/${project.videoId}/hqdefault.jpg`
            }
          }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            opacity: loaded ? (hov ? 0.55 : 0.78) : 0,
            transform: hov ? 'scale(1.05)' : 'scale(1)',
            transition: 'opacity 0.35s ease, transform 0.55s ease',
          }}
        />

        {/* Gradient */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, transparent 35%, rgba(0,0,0,0.65) 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* Category badge */}
        <div
          style={{
            position: 'absolute',
            top: 12,
            left: 12,
            padding: '4px 10px',
            background: 'rgba(0,0,0,0.55)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 3,
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.65)',
          }}
        >
          {project.category}
        </div>

        {/* Play button */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: `translate(-50%, -50%) scale(${hov && hasVideo ? 1 : 0.8})`,
            width: 52,
            height: 52,
            borderRadius: '50%',
            background: hasVideo
              ? hov ? 'var(--accent)' : 'rgba(255,255,255,0.12)'
              : 'rgba(255,255,255,0.06)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            border: `2px solid ${hasVideo
              ? hov ? 'var(--accent)' : 'rgba(255,255,255,0.25)'
              : 'rgba(255,255,255,0.12)'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: hasVideo ? '#fff' : 'rgba(255,255,255,0.3)',
            opacity: hasVideo ? 1 : 0.35,
            cursor: hasVideo ? 'pointer' : 'not-allowed',
            transition: 'all 0.3s ease',
            boxShadow: hasVideo && hov ? '0 0 32px var(--accent-glow)' : 'none',
          }}
        >
          <IconPlay />
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '20px 22px 24px' }}>
        <h3
          className="font-display"
          style={{
            fontSize: 17,
            fontWeight: 800,
            letterSpacing: '-0.01em',
            lineHeight: 1.3,
            color: 'var(--text)',
            marginBottom: 8,
          }}
        >
          {project.title}
        </h3>
        <p
          style={{
            fontSize: 13,
            lineHeight: 1.7,
            color: 'var(--muted)',
            marginBottom: 16,
          }}
        >
          {project.desc}
        </p>
        {/* Tool tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {project.tools?.map((t) => (
            <span
              key={t}
              style={{
                padding: '3px 10px',
                background: 'var(--accent-dim)',
                border: '1px solid rgba(255,62,62,0.18)',
                borderRadius: 3,
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: '0.06em',
                color: 'var(--accent)',
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   ABOUT + CONTACT
───────────────────────────────────────────────────────────────────────────── */

function AboutContact() {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText('jeffmatthewmolina@gmail.com').catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  return (
    <section
      id="about"
      className="about-section"
      style={{ background: 'var(--bg)', padding: '112px 48px' }}
    >
      <div
        className="about-grid"
        style={{
          ...S.container,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 88,
          alignItems: 'start',
        }}
      >
        {/* ── Left: About ── */}
        <div>
          <div style={S.overline}>
            <div style={S.overlineBar} />
            <span style={S.overlineText}>About Me</span>
          </div>

          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(36px, 4vw, 60px)',
              fontWeight: 900,
              lineHeight: 1.0,
              letterSpacing: '-0.025em',
              color: 'var(--text)',
              marginBottom: 36,
            }}
          >
            Editing is not<br />
            <span
              style={{
                WebkitTextStroke: '1.5px var(--text)',
                color: 'transparent',
              }}
            >
              assembly.
            </span>
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {[
              "I’m Matthew, a 21-year-old Manila-based video editor and Computer Science undergraduate obsessed with the invisible architecture of a great cut. My passion for directing and filmmaking started back in the 6th grade, evolving into a decade-long journey of turning raw footage into high-impact visual stories.",
              "My editorial philosophy centers on precision, rhythm, and intention. With storytelling and VFX as my main fortes, I don't just cut to fill time, I cut to direct attention and elevate the visual scale of a project. Whether it’s a fast-paced ad or a narrative short, every single frame is engineered to serve the story.",
              "I’ve been refining my craft in Premiere Pro and After Effects since the 7th grade, balancing my technical background with years of contract-based freelance commissions. I deliver fast without sacrificing the art, handling everything from complex VFX compositing to color-graded, sound-designed final deliverables."
            ].map((text, i) => (
              <p key={i} style={{ fontSize: 15, lineHeight: 1.85, color: 'var(--muted)', fontWeight: 300 }}>
                {text}
              </p>
            ))}
          </div>

          {/* Skill pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 40 }}>
            {[
              'Narrative Editing', 'Color Grading', 'Motion Graphics',
              'Sound Design', 'VFX Integration', 'Format Delivery',
              'Storytelling'
            ].map((s) => (
              <span
                key={s}
                style={{
                  padding: '7px 14px',
                  border: '1px solid var(--border)',
                  borderRadius: 3,
                  fontSize: 11,
                  fontWeight: 500,
                  color: 'var(--muted)',
                  letterSpacing: '0.04em',
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* ── Right: Contact ── */}
        <div id="contact">
          <div style={S.overline}>
            <div style={S.overlineBar} />
            <span style={S.overlineText}>Get In Touch</span>
          </div>

          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(30px, 3.2vw, 48px)',
              fontWeight: 900,
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              color: 'var(--text)',
              marginBottom: 40,
            }}
          >
            Let's create something<br />unforgettable.
          </h2>

          {/* Email block */}
          <EmailBlock copied={copied} onCopy={copy} />

          {/* Divider */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              margin: '36px 0',
              color: 'var(--muted)',
              fontSize: 11,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
            <span>Find me on</span>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          </div>

          {/* Socials */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {SOCIALS.map((s) => (
              <SocialRow key={s.label} icon={s.icon} label={s.label} handle={s.handle} href={s.href} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function EmailBlock({ copied, onCopy }: { copied: boolean; onCopy: () => void }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onClick={onCopy}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onCopy()}
      aria-label="Copy email address"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px 24px',
        background: hov ? 'var(--accent-dim)' : 'var(--card)',
        border: `1px solid ${hov ? 'var(--accent)' : 'var(--border)'}`,
        borderRadius: 6,
        cursor: 'pointer',
        transition: 'all 0.22s ease',
        outline: 'none',
      }}
    >
      <div>
        <div style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 5 }}>
          Email
        </div>
        <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--text)', letterSpacing: '-0.01em' }}>
          jeffmatthewmolina@gmail.com
        </div>
      </div>
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: copied ? '#22c55e' : 'var(--accent)',
          transition: 'color 0.2s ease',
        }}
      >
        {copied ? '✓ Copied' : 'Copy'}
      </div>
    </div>
  )
}

function SocialRow({ icon, label, handle, href }: { icon: React.ReactNode; label: string; handle: string; href: string }) {
  const [hov, setHov] = useState(false)
  return (
    <a
      href={href}
      target={href.startsWith('mailto:') ? undefined : '_blank'}
      rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        padding: '14px 0',
        borderBottom: '1px solid var(--border)',
        textDecoration: 'none',
        transition: 'all 0.2s ease',
      }}
    >
      <span
        style={{
          width: 36,
          height: 36,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: hov ? 'var(--accent-dim)' : 'var(--card)',
          border: `1px solid ${hov ? 'var(--accent)' : 'var(--border)'}`,
          borderRadius: 8,
          color: hov ? 'var(--accent)' : 'var(--muted)',
          transition: 'all 0.2s ease',
          flexShrink: 0,
        }}
      >
        {icon}
      </span>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', lineHeight: 1.2 }}>{label}</div>
        <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>{handle}</div>
      </div>
      <span
        style={{
          color: hov ? 'var(--accent)' : 'var(--border)',
          transition: 'color 0.2s ease',
        }}
      >
        <IconExternal />
      </span>
    </a>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────────────────────────────────────── */

function Footer() {
  return (
    <footer style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)' }}>
      <div
        className="footer-wrap"
        style={{ ...S.container, padding: '36px 48px' }}
      >
        <div
          className="footer-inner"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
            flexWrap: 'wrap',
          }}
        >
          <span className="font-display" style={{ fontSize: 18, fontWeight: 900, letterSpacing: '0.06em', color: 'var(--text)' }}>
            JMM<span style={{ color: 'var(--accent)' }}>.</span>
          </span>
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>
            © 2026 Jeff Matthew Molina · All Rights Reserved
          </span>
          <span style={{ fontSize: 12, color: 'var(--muted)', letterSpacing: '0.04em' }}>
            Manila, PH · Available Globally
          </span>
        </div>
      </div>
    </footer>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   FLOATING THEME WIDGET
───────────────────────────────────────────────────────────────────────────── */

function FloatingWidget({ dark, toggle }: { dark: boolean; toggle: () => void }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: 'fixed',
        bottom: 32,
        right: 32,
        zIndex: 300,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        background: dark ? 'rgba(26,26,26,0.92)' : 'rgba(255,255,255,0.92)',
        border: '1px solid var(--border)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderRadius: 100,
        padding: hov ? '10px 18px 10px 10px' : '10px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
        cursor: 'pointer',
        transition: 'padding 0.3s ease, box-shadow 0.25s ease',
        overflow: 'hidden',
      }}
      onClick={toggle}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && toggle()}
      aria-label="Toggle theme"
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          background: dark ? '#FFFFFF' : '#0D0D0D',
          color: dark ? '#0D0D0D' : '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          transition: 'all 0.3s ease',
        }}
      >
        {dark ? <IconSun /> : <IconMoon />}
      </div>
      <span
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--text)',
          whiteSpace: 'nowrap',
          maxWidth: hov ? 120 : 0,
          opacity: hov ? 1 : 0,
          overflow: 'hidden',
          transition: 'max-width 0.3s ease, opacity 0.25s ease',
        }}
      >
        {dark ? 'Light Mode' : 'Dark Mode'}
      </span>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   ROOT
───────────────────────────────────────────────────────────────────────────── */

export default function App() {
  const [dark, setDark] = useState(true)
  const toggle = () => setDark((d) => !d)

  return (
    <div className={`grain-wrap ${dark ? 'dark' : ''}`}>
      <Nav dark={dark} toggle={toggle} />
      <main>
        <Hero />
        <Ticker />
        <Works />
        <AboutContact />
      </main>
      <Footer />
      <FloatingWidget dark={dark} toggle={toggle} />
    </div>
  )
}
