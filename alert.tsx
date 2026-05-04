import { Language, translations, getWhatsAppLink, SHOP_EMAIL } from "@/lib/i18n";

interface FooterProps {
  lang: Language;
  onAdminClick: () => void;
}

export function Footer({ lang, onAdminClick }: FooterProps) {
  const t = translations[lang];
  const isRtl = lang === "ar";
  const year = new Date().getFullYear();

  const whatsappLink = getWhatsAppLink(t.whatsapp.support);

  const navLinks = [
    { label: t.nav.home, href: "#hero" },
    { label: t.nav.about, href: "#about" },
    { label: t.nav.products, href: "#products" },
    { label: t.nav.howToOrder, href: "#how-to-order" },
    { label: t.nav.contact, href: "#contact" },
  ];

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      dir={isRtl ? "rtl" : "ltr"}
      className="bg-gray-950 text-white relative overflow-hidden"
    >
      <div className="h-1 bg-gradient-to-r from-rose-400 via-pink-400 to-rose-300" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🌹</span>
              <span className="text-xl font-bold text-white">{t.footer.shopName}</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">{t.footer.tagline}</p>

            {/* WhatsApp */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-green-400 hover:text-green-300 text-sm font-medium transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span dir="ltr">+966 053 100 2292</span>
            </a>

            {/* Email */}
            <a
              href={`mailto:${SHOP_EMAIL}`}
              className="flex items-center gap-2 mt-2 text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors"
            >
              <span>✉️</span>
              <span dir="ltr">{SHOP_EMAIL}</span>
            </a>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-rose-400 mb-4">
              {lang === "ar" ? "روابط سريعة" : "Quick Links"}
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                    className="text-gray-400 hover:text-rose-300 text-sm transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-rose-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-rose-400 mb-4">
              {lang === "ar" ? "معلومات" : "Information"}
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <span className="mt-0.5">📍</span>
                <span>{t.contact.addressValue}</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📞</span>
                <span dir="ltr">{t.contact.phoneValue}</span>
              </li>
              <li className="flex items-center gap-2">
                <span>✉️</span>
                <span dir="ltr">{SHOP_EMAIL}</span>
              </li>
              <li className="flex items-center gap-2">
                <span>🕐</span>
                <span>{lang === "ar" ? "٢٤ ساعة، ٧ أيام" : "24 Hours, 7 Days"}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>
            © {year} {t.footer.shopName}. {t.footer.rights}.
          </p>
          <p className="flex items-center gap-1">
            {lang === "ar" ? "صُنع بكل" : "Made with"}
            <span className="text-rose-400 text-base mx-0.5">❤</span>
            {lang === "ar" ? "لإسعادكم" : "to make you happy"}
          </p>
          {/* زر المشرف */}
          <button
            onClick={onAdminClick}
            className="flex items-center gap-1.5 text-gray-500 hover:text-rose-400 text-xs transition-colors px-3 py-1.5 rounded-lg border border-gray-800 hover:border-rose-800 opacity-50 hover:opacity-100"
            title="دخول المشرف"
          >
            <span>⚙</span>
            <span>إدارة</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
