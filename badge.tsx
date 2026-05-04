import { useState, useEffect } from "react";
import { Language, translations } from "@/lib/i18n";

// ============================================================
//   صورة اللوغو في شريط التنقل
//   لإضافة لوغوك: ضع رابط الصورة هنا
//   مثال: const LOGO_IMAGE = "https://رابط-لوغوك.png";
// ============================================================
const LOGO_IMAGE = ""; // ← ضع رابط صورة اللوغو هنا

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
}

export function Navbar({ lang, onToggleLang }: NavbarProps) {
  const t = translations[lang];
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isRtl = lang === "ar";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: t.nav.home, href: "#hero" },
    { label: t.nav.about, href: "#about" },
    { label: t.nav.products, href: "#products" },
    { label: t.nav.howToOrder, href: "#how-to-order" },
    { label: t.nav.contact, href: "#contact" },
  ];

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "navbar-blur shadow-sm border-b border-rose-100" : "bg-transparent"
      }`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); handleNavClick("#hero"); }}
            className="flex items-center gap-2 group"
          >
            {LOGO_IMAGE ? (
              <img src={LOGO_IMAGE} alt="Logo" className="h-10 w-auto object-contain" />
            ) : (
              <span className="text-2xl">🌹</span>
            )}
            <span className="font-bold text-lg md:text-xl text-rose-700 group-hover:text-rose-500 transition-colors">
              {t.hero.shopName}
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className="text-sm font-medium text-gray-700 hover:text-rose-600 transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-rose-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-center rounded-full" />
              </a>
            ))}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            {/* Language switcher */}
            <button
              onClick={onToggleLang}
              className="text-xs font-semibold px-3 py-1.5 rounded-full border border-rose-200 text-rose-700 hover:bg-rose-50 transition-all duration-200 hover:border-rose-300"
            >
              {t.langSwitch}
            </button>

            {/* Hamburger (mobile) */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-rose-50 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span className={`w-5 h-0.5 bg-rose-700 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`w-5 h-0.5 bg-rose-700 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`w-5 h-0.5 bg-rose-700 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="navbar-blur border-t border-rose-100 px-4 pb-4 pt-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
              className="block py-2.5 text-gray-700 hover:text-rose-600 font-medium transition-colors border-b border-rose-50 last:border-0"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
