import { Language, translations, getWhatsAppLink } from "@/lib/i18n";
import { ApiProduct, fetchProducts } from "@/lib/api";
import { useEffect, useState } from "react";

interface ProductsProps {
  lang: Language;
  refreshTrigger?: number;
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function ProductCard({ product, lang }: { product: ApiProduct; lang: Language }) {
  const t = translations[lang];
  const isRtl = lang === "ar";
  const name = lang === "ar" ? product.nameAr : product.nameEn;
  const code = product.code || "";
  const hasImage = Boolean(product.image);

  const codeText = code ? ` — ${t.whatsapp.orderCode}${code}` : "";
  const whatsappMsg = `${t.whatsapp.orderPrefix}${name}${codeText}${t.whatsapp.orderSuffix}`;
  const whatsappLink = getWhatsAppLink(whatsappMsg);

  return (
    <div
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-rose-50 group transition-all duration-300 hover:-translate-y-1 flex flex-col"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* الصورة */}
      <div className="relative overflow-hidden" style={{ paddingBottom: "100%" }}>
        <div className="absolute inset-0">
          {hasImage ? (
            <img
              src={product.image!}
              alt={lang === "ar" ? `باقة ورد فاخرة للمناسبات — توصيل زهور في المدينة المنورة (${code})` : `Luxury Rose Bouquet — Flower Delivery in Madinah (${code})`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-rose-50 to-pink-100 flex items-center justify-center">
              <span className="text-5xl opacity-50">🌹</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        {code && (
          <div className={`absolute top-2 ${isRtl ? "right-2" : "left-2"} bg-white/95 text-rose-600 text-[10px] font-bold font-mono px-2 py-0.5 rounded-lg shadow-sm border border-rose-100`}>
            {code}
          </div>
        )}
      </div>

      {/* المعلومات */}
      <div className="p-3 flex flex-col gap-2 flex-1">
        <h3 className="font-bold text-gray-900 text-sm leading-snug line-clamp-1">
          {name}
        </h3>
        <div className="text-rose-500 font-semibold text-xs">
          {product.price > 0
            ? `${product.price} ${t.products.currency}`
            : isRtl ? "تواصل للسعر" : "Ask for price"}
        </div>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center justify-center gap-1.5 bg-green-500 hover:bg-green-600 text-white text-xs font-bold px-3 py-2 rounded-xl transition-all duration-200 w-full"
        >
          <WhatsAppIcon />
          {t.products.orderBtn}
        </a>
      </div>
    </div>
  );
}

export function Products({ lang, refreshTrigger }: ProductsProps) {
  const t = translations[lang];
  const isRtl = lang === "ar";
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchProducts()
      .then(setProducts)
      .finally(() => setLoading(false));
  }, [refreshTrigger]);

  return (
    <section
      id="products"
      dir={isRtl ? "rtl" : "ltr"}
      className="py-10 md:py-14 bg-rose-50/60"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-rose-500 text-xs font-semibold mb-2">
            <span className="w-6 h-px bg-rose-300 inline-block" />
            <span>🌹</span>
            <span className="w-6 h-px bg-rose-300 inline-block" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{t.products.title}</h2>
          <p className="text-gray-500 text-sm max-w-md mx-auto">{t.products.subtitle}</p>
          {!loading && (
            <div className="mt-2 text-xs text-rose-400 font-medium">
              {isRtl ? `${products.length} باقة متاحة` : `${products.length} bouquets available`}
            </div>
          )}
        </div>

        {/* الشبكة */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-rose-50 animate-pulse">
                <div className="bg-rose-100" style={{ paddingBottom: "100%" }} />
                <div className="p-3 space-y-2">
                  <div className="h-3 bg-rose-100 rounded w-3/4" />
                  <div className="h-3 bg-rose-50 rounded w-1/2" />
                  <div className="h-8 bg-rose-100 rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} lang={lang} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
