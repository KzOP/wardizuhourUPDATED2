import { Language, translations } from "@/lib/i18n";
import { useReveal } from "@/hooks/useReveal";

interface AboutProps {
  lang: Language;
}

// ============================================================
//   صورة قسم "من نحن"
//   لتغيير الصورة: ضع رابط صورتك هنا
//   لإخفاء الصورة: اتركها فارغة ""
// const ABOUT_IMAGE = "https://رابط-صورتك.jpg";
// ============================================================
const ABOUT_IMAGE = "https://i.ibb.co/TDtqnNVf/webimg1.jpg";

// رابط موقعك على قوقل ماب
const GOOGLE_MAPS_LINK = "https://maps.app.goo.gl/b6f9PjkHiESD6b3b6";

// رابط تضمين الخريطة
const GOOGLE_MAPS_EMBED =
  "https://maps.google.com/maps?q=وردي+للزهور+المدينة+المنورة&output=embed&hl=ar&z=15";

export function About({ lang }: AboutProps) {
  const t = translations[lang];
  const isRtl = lang === "ar";
  const ref1 = useReveal();
  const ref2 = useReveal();

  return (
    <section
      id="about"
      dir={isRtl ? "rtl" : "ltr"}
      className="py-20 md:py-28 bg-white relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-rose-50 opacity-60 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-pink-50 opacity-50 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-rose-500 text-sm font-medium mb-3">
            <span className="w-8 h-px bg-rose-300 inline-block" />
            <span>🌺</span>
            <span className="w-8 h-px bg-rose-300 inline-block" />
          </div>
          <h2 className="section-title text-gray-900">{t.about.title}</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* صورة المحل أو placeholder */}
          <div
            ref={ref1 as React.RefObject<HTMLDivElement>}
            className={`reveal${isRtl ? "-right" : "-left"} relative`}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-xl">
              {ABOUT_IMAGE ? (
                <>
                  <img
                    src={ABOUT_IMAGE}
                    alt={lang === "ar" ? "محل ورد في المدينة المنورة — وردي للزهور، متجر زهور وهدايا" : "Flower Shop in Madinah — Wardi Zuhour"}
                    className="w-full h-80 md:h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-rose-900/20 to-transparent" />
                </>
              ) : (
                /* Placeholder جميل بدل الصورة */
                <div className="w-full h-80 md:h-96 bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100 flex flex-col items-center justify-center gap-4">
                  <div className="text-7xl">🌹</div>
                  <div className="text-center px-6">
                    <div className="text-rose-500 font-bold text-lg mb-1">
                      {lang === "ar" ? "وردي للزهور" : "Wordi Flowers"}
                    </div>
                    <div className="text-rose-400 text-xs">
                      {lang === "ar"
                        ? "← ضع رابط صورة المحل في ملف About.tsx"
                        : "← Add shop image URL in About.tsx"}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* بطاقة الإحصائيات */}
            <div
              className="absolute -bottom-6 bg-white rounded-2xl shadow-lg px-6 py-4 flex gap-8 border border-rose-100"
              style={{ [isRtl ? "right" : "left"]: "1.5rem" }}
            >
              {[
                { num: "+٢٠", label: lang === "ar" ? "سنة خبرة" : "Years Experience", numEn: "+20" },
                { num: "+٥٠,٠٠٠", label: lang === "ar" ? "باقة مباعة" : "Bouquets Sold", numEn: "+50,000" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-xl font-bold text-rose-600">
                    {lang === "ar" ? stat.num : stat.numEn}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* المحتوى النصي */}
          <div
            ref={ref2 as React.RefObject<HTMLDivElement>}
            className={`reveal${isRtl ? "-left" : "-right"} pt-6 md:pt-0`}
          >
            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-5">
              {t.about.description}
            </p>

            {/* قسم منطقة الخدمة — SEO */}
            <div className="bg-rose-50 border border-rose-100 rounded-2xl px-5 py-4 mb-6">
              <p className="text-gray-700 text-sm leading-relaxed font-medium">
                {lang === "ar"
                  ? "🚚 نقدم خدمة توصيل الورد في المدينة المنورة ونوفر باقات زهور مميزة تناسب جميع المناسبات — الأفراح، التخرج، الهدايا العاطفية، والعقود."
                  : "🚚 We provide flower delivery in Madinah and offer premium rose bouquets for all occasions — weddings, graduations, heartfelt gifts, and special events."}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-rose-50 border border-rose-100">
                <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center shrink-0 text-xl">
                  📍
                </div>
                <div>
                  <div className="text-xs font-semibold text-rose-600 uppercase tracking-wider mb-0.5">
                    {t.about.location}
                  </div>
                  <div className="text-gray-800 font-medium">{t.about.locationValue}</div>
                </div>
              </div>

              {/* ساعات العمل: 24 ساعة */}
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-rose-50 border border-rose-100">
                <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center shrink-0 text-xl">
                  🕐
                </div>
                <div>
                  <div className="text-xs font-semibold text-rose-600 uppercase tracking-wider mb-0.5">
                    {lang === "ar" ? "ساعات العمل" : "Working Hours"}
                  </div>
                  <div className="text-gray-800 font-bold text-sm flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-semibold">
                      ● {lang === "ar" ? "متاح الآن" : "Available Now"}
                    </span>
                    {lang === "ar" ? "٢٤ ساعة، ٧ أيام" : "24 Hours, 7 Days"}
                  </div>
                </div>
              </div>
            </div>

            {/* خريطة قوقل ماب */}
            <div className="mt-6 rounded-2xl overflow-hidden border border-rose-100 shadow-sm">
              <iframe
                src={GOOGLE_MAPS_EMBED}
                width="100%"
                height="220"
                style={{ border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={lang === "ar" ? "موقع وردي للزهور" : "Wordi Flowers Location"}
              />
              <a
                href={GOOGLE_MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-rose-50 hover:bg-rose-100 text-rose-600 text-sm font-semibold py-2.5 transition-colors border-t border-rose-100"
              >
                <span>📍</span>
                {lang === "ar" ? "افتح في خرائط قوقل" : "Open in Google Maps"}
                <span className="text-xs opacity-60">↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
