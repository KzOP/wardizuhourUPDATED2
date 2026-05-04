import { Language, translations, getWhatsAppLink, WHATSAPP_NUMBER, SHOP_EMAIL, BANK_INFO } from "@/lib/i18n";
import { useReveal } from "@/hooks/useReveal";

interface ContactProps {
  lang: Language;
}

function WhatsAppIcon({ size = 5 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={`w-${size} h-${size}`}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function Contact({ lang }: ContactProps) {
  const t = translations[lang];
  const isRtl = lang === "ar";
  const ref = useReveal();
  const cardRef = useReveal();

  const whatsappLink = getWhatsAppLink(t.whatsapp.support);

  const contactItems = [
    {
      icon: "📞",
      label: t.contact.phone,
      value: <span dir="ltr">{t.contact.phoneValue}</span>,
      href: `tel:+${WHATSAPP_NUMBER}`,
      color: "bg-blue-50 border-blue-100 text-blue-700",
    },
    {
      icon: "✉️",
      label: t.contact.email,
      value: <span dir="ltr">{SHOP_EMAIL}</span>,
      href: `mailto:${SHOP_EMAIL}`,
      color: "bg-purple-50 border-purple-100 text-purple-700",
    },
    {
      icon: "📍",
      label: t.contact.address,
      value: <span>{t.contact.addressValue}</span>,
      href: `https://maps.google.com/?q=${encodeURIComponent(t.contact.addressValue)}`,
      color: "bg-amber-50 border-amber-100 text-amber-700",
    },
  ];

  return (
    <section
      id="contact"
      dir={isRtl ? "rtl" : "ltr"}
      className="py-20 md:py-28 rose-gradient relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-200 to-transparent" />
      <div className="absolute top-10 right-10 w-40 h-40 rounded-full bg-rose-100 opacity-30 blur-2xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full bg-pink-100 opacity-30 blur-2xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className="reveal text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 text-rose-500 text-sm font-medium mb-3">
            <span className="w-8 h-px bg-rose-300 inline-block" />
            <span>💌</span>
            <span className="w-8 h-px bg-rose-300 inline-block" />
          </div>
          <h2 className="section-title text-gray-900 mb-3">{t.contact.title}</h2>
          <p className="text-gray-500 max-w-md mx-auto">{t.contact.subtitle}</p>
        </div>

        <div
          ref={cardRef as React.RefObject<HTMLDivElement>}
          className="reveal flex flex-col gap-4"
        >
          {/* WhatsApp banner */}
          <div className="bg-white rounded-3xl shadow-lg border border-rose-100 overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-green-400 p-8 text-center text-white">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center whatsapp-pulse">
                  <WhatsAppIcon size={8} />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-1">WhatsApp</h3>
              <p className="text-green-100 text-sm mb-5">
                {lang === "ar"
                  ? "نرد على رسائلك في أسرع وقت ممكن"
                  : "We reply to your messages as quickly as possible"}
              </p>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white text-green-600 hover:bg-green-50 font-bold px-7 py-3.5 rounded-2xl transition-all duration-300 hover:-translate-y-0.5 shadow-md hover:shadow-lg text-sm"
              >
                <WhatsAppIcon />
                {t.contact.whatsappBtn}
              </a>
            </div>

            {/* Contact info */}
            <div className="p-6 md:p-8 grid sm:grid-cols-3 gap-4">
              {contactItems.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 p-4 rounded-2xl border ${item.color} hover:opacity-90 transition-opacity group`}
                >
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-lg shadow-sm shrink-0 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold uppercase tracking-wider opacity-70 mb-0.5">
                      {item.label}
                    </div>
                    <div className="font-semibold text-gray-900 text-xs truncate">{item.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Bank Transfer Info — Al Ahli Bank */}
          <div className="bg-white rounded-3xl shadow-lg border border-green-100 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#006633] to-[#00954C] px-6 py-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* شعار البنك الأهلي (مبسّط) */}
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 40 40" className="w-7 h-7" fill="none">
                    <rect width="40" height="40" rx="8" fill="white"/>
                    <path d="M8 28 L20 10 L32 28" stroke="#006633" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                    <path d="M13 22 L27 22" stroke="#006633" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-base leading-tight">
                    {lang === "ar" ? BANK_INFO.bankName : BANK_INFO.bankNameEn}
                  </div>
                  <div className="text-green-200 text-xs">
                    {lang === "ar" ? "تحويل بنكي آمن" : "Secure Bank Transfer"}
                  </div>
                </div>
              </div>
              <div className="bg-white/15 text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/25">
                {t.contact.bankTitle}
              </div>
            </div>

            {/* تفاصيل الحساب */}
            <div className="p-5 flex flex-col sm:flex-row gap-3">
              <div className="flex-1 bg-green-50 rounded-2xl p-4 border border-green-100">
                <div className="text-xs font-semibold text-green-700 uppercase tracking-wider mb-1.5">
                  {t.contact.bankAccount}
                </div>
                <div className="font-mono font-bold text-gray-900 text-xl tracking-widest" dir="ltr">
                  {BANK_INFO.accountNumber}
                </div>
              </div>
              <div className="flex-1 bg-green-50 rounded-2xl p-4 border border-green-100">
                <div className="text-xs font-semibold text-green-700 uppercase tracking-wider mb-1.5">
                  {t.contact.bankHolder}
                </div>
                <div className="font-bold text-gray-900 text-sm leading-snug">
                  {lang === "ar" ? BANK_INFO.accountHolder : BANK_INFO.accountHolderEn}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
