import { Language, translations, getWhatsAppLink } from "@/lib/i18n";
import { useReveal } from "@/hooks/useReveal";
import { useRef, useEffect } from "react";

interface HowToOrderProps {
  lang: Language;
}

const STEP_ICONS = ["🛍️", "💬", "🏦", "📨"];
const STEP_COLORS = [
  "from-rose-100 to-pink-50 border-rose-200",
  "from-pink-100 to-rose-50 border-pink-200",
  "from-rose-100 to-pink-50 border-rose-200",
  "from-pink-100 to-rose-50 border-pink-200",
];

function StepCard({
  step,
  icon,
  colors,
  index,
  isRtl,
}: {
  step: { number: string; title: string; description: string };
  icon: string;
  colors: string;
  index: number;
  isRtl: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add("visible"), index * 150);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={ref}
      className={`reveal relative bg-gradient-to-br ${colors} border rounded-3xl p-6 md:p-7 group hover:-translate-y-1 transition-transform duration-300`}
    >
      {/* Step number */}
      <div className="absolute -top-4 right-6 w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center text-sm font-bold shadow-md">
        {step.number}
      </div>

      {/* Icon */}
      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">
        {icon}
      </div>

      {/* Content */}
      <h3 className="font-bold text-gray-900 text-base md:text-lg mb-2">{step.title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>

      {/* Connector arrow (not on last) */}
      {index < 3 && (
        <div
          className={`hidden md:flex absolute -bottom-5 left-1/2 -translate-x-1/2 z-10 w-8 h-8 rounded-full bg-white shadow border border-rose-100 items-center justify-center text-rose-400 text-base`}
        >
          ↓
        </div>
      )}
    </div>
  );
}

export function HowToOrder({ lang }: HowToOrderProps) {
  const t = translations[lang];
  const isRtl = lang === "ar";
  const headerRef = useReveal();

  const whatsappLink = getWhatsAppLink(t.whatsapp.support);

  return (
    <section
      id="how-to-order"
      dir={isRtl ? "rtl" : "ltr"}
      className="py-20 md:py-28 bg-white relative overflow-hidden"
    >
      {/* Decorative */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,228,236,0.4)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div
          ref={headerRef as React.RefObject<HTMLDivElement>}
          className="reveal text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 text-rose-500 text-sm font-medium mb-3">
            <span className="w-8 h-px bg-rose-300 inline-block" />
            <span>📦</span>
            <span className="w-8 h-px bg-rose-300 inline-block" />
          </div>
          <h2 className="section-title text-gray-900 mb-3">{t.howToOrder.title}</h2>
          <p className="text-gray-500 max-w-md mx-auto">{t.howToOrder.subtitle}</p>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {t.howToOrder.steps.map((step, i) => (
            <StepCard
              key={i}
              step={step}
              icon={STEP_ICONS[i]}
              colors={STEP_COLORS[i]}
              index={i}
              isRtl={isRtl}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 text-base"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {lang === "ar" ? "ابدأ طلبك الآن" : "Start Your Order Now"}
          </a>
        </div>
      </div>
    </section>
  );
}
