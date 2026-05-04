import { useState, useEffect } from "react";
import {
  ApiProduct,
  adminAuth,
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/lib/api";

interface AdminPanelProps {
  onClose: () => void;
}

const EMPTY_FORM = {
  nameAr: "",
  nameEn: "",
  price: 0,
  image: "",
  code: "",
};

export function AdminPanel({ onClose }: AdminPanelProps) {
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const storedPw = () => sessionStorage.getItem("admin_pw") || password;

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    const ok = await adminAuth(password);
    if (ok) {
      sessionStorage.setItem("admin_pw", password);
      setIsLoggedIn(true);
      loadProducts();
    } else {
      setLoginError("كلمة المرور غير صحيحة ❌");
    }
  }

  async function loadProducts() {
    setLoading(true);
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch {
      setError("خطأ في تحميل المنتجات");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const saved = sessionStorage.getItem("admin_pw");
    if (saved) {
      setPassword(saved);
      setIsLoggedIn(true);
      loadProducts();
    }
  }, []);

  function openAddForm() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setShowForm(true);
  }

  function openEditForm(p: ApiProduct) {
    setEditingId(p.id);
    setForm({
      nameAr: p.nameAr,
      nameEn: p.nameEn,
      price: p.price,
      image: p.image || "",
      code: p.code || "",
    });
    setShowForm(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const pw = storedPw();
      if (editingId !== null) {
        await updateProduct(editingId, form, pw);
      } else {
        await createProduct(form, pw);
      }
      setShowForm(false);
      loadProducts();
    } catch {
      setError("خطأ في الحفظ");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("هل أنت متأكد من حذف هذا المنتج؟")) return;
    try {
      await deleteProduct(id, storedPw());
      loadProducts();
    } catch {
      setError("خطأ في الحذف");
    }
  }

  function handleLogout() {
    sessionStorage.removeItem("admin_pw");
    setIsLoggedIn(false);
    setPassword("");
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl w-full sm:max-w-3xl max-h-[90dvh] overflow-hidden flex flex-col" dir="rtl">

        {/* Header */}
        <div className="bg-gradient-to-r from-rose-600 to-pink-500 text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🌹</span>
            <div>
              <div className="font-bold text-lg">لوحة إدارة وردي للزهور</div>
              <div className="text-xs text-rose-100 opacity-80">Wardi Zuhour — Admin Panel</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-xl transition-colors"
              >
                تسجيل الخروج
              </button>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors text-lg"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1">
          {!isLoggedIn ? (
            /* Login screen */
            <div className="flex flex-col items-center justify-center p-6 sm:p-10 gap-6">
              <div className="text-5xl">🔐</div>
              <h2 className="text-xl font-bold text-gray-800">دخول المشرف</h2>
              <form onSubmit={handleLogin} className="w-full max-w-xs flex flex-col gap-3">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="كلمة المرور"
                  className="border border-gray-200 rounded-xl px-4 py-3 text-center text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                  autoComplete="current-password"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                />
                {loginError && (
                  <div className="text-red-500 text-sm text-center">{loginError}</div>
                )}
                <button
                  type="submit"
                  className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 rounded-xl transition-colors"
                >
                  دخول
                </button>
              </form>
            </div>
          ) : showForm ? (
            /* Add / Edit Form */
            <form onSubmit={handleSave} className="p-6 flex flex-col gap-5">
              <h3 className="font-bold text-gray-800 text-lg">
                {editingId !== null ? "✏️ تعديل المنتج" : "➕ إضافة منتج جديد"}
              </h3>

              {error && <div className="text-red-500 text-sm bg-red-50 rounded-xl p-3">{error}</div>}

              <div className="grid sm:grid-cols-2 gap-4">
                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-semibold text-gray-600">اسم المنتج (عربي) *</span>
                  <input
                    value={form.nameAr}
                    onChange={(e) => setForm({ ...form, nameAr: e.target.value })}
                    required
                    placeholder="مثال: باقة ورود حمراء"
                    className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                  />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-semibold text-gray-600">Product Name (English)</span>
                  <input
                    value={form.nameEn}
                    onChange={(e) => setForm({ ...form, nameEn: e.target.value })}
                    placeholder="e.g. Red Roses Bouquet"
                    className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                    dir="ltr"
                  />
                </label>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-semibold text-gray-600">السعر (ريال) — اتركه 0 لـ"تواصل للسعر"</span>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                    min={0}
                    placeholder="0"
                    className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                  />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-semibold text-gray-600">كود المنتج</span>
                  <input
                    value={form.code}
                    onChange={(e) => setForm({ ...form, code: e.target.value })}
                    placeholder="مثال: WF-001"
                    className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                    dir="ltr"
                  />
                </label>
              </div>

              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-gray-600">رابط صورة المنتج (اتركه فارغاً لإخفاء الصورة)</span>
                <input
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  placeholder="https://i.ibb.co/xxx/image.jpg"
                  className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                  dir="ltr"
                />
                {/* تنبيه مهم لروابط imgbb */}
                <div className="flex items-start gap-2 bg-blue-50 border border-blue-200 rounded-xl px-3 py-2.5 text-xs text-blue-700">
                  <span className="text-base shrink-0">💡</span>
                  <div>
                    <strong>تنبيه لموقع imgbb.com:</strong> استخدم <strong>رابط مباشر (Direct Link)</strong> فقط — يبدأ بـ <span dir="ltr" className="font-mono bg-blue-100 px-1 rounded">https://i.ibb.co/...</span>
                    <br/>وليس رابط الصفحة <span dir="ltr" className="font-mono bg-red-100 px-1 rounded text-red-600">https://ibb.co/...</span>
                    <br/>عند الرفع اختر <strong>"Direct Link"</strong> من قائمة روابط المشاركة.
                  </div>
                </div>
                {form.image && (
                  <img
                    src={form.image}
                    alt="preview"
                    className="mt-1 h-24 w-full object-cover rounded-xl border border-gray-100"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                )}
              </label>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-rose-500 hover:bg-rose-600 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-colors"
                >
                  {saving ? "جاري الحفظ..." : "💾 حفظ"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-colors"
                >
                  إلغاء
                </button>
              </div>
            </form>
          ) : (
            /* Products list */
            <div className="p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-gray-800">
                  المنتجات ({products.length})
                </h3>
                <button
                  onClick={openAddForm}
                  className="inline-flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-colors"
                >
                  ➕ إضافة منتج
                </button>
              </div>

              {error && <div className="text-red-500 text-sm bg-red-50 rounded-xl p-3 mb-4">{error}</div>}

              {loading ? (
                <div className="text-center py-10 text-gray-400">جاري التحميل...</div>
              ) : products.length === 0 ? (
                <div className="text-center py-10 text-gray-400">
                  <div className="text-4xl mb-3">🌸</div>
                  <div>لا توجد منتجات حتى الآن</div>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {products.map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center gap-3 p-3 rounded-2xl border border-gray-100 hover:border-rose-200 transition-colors bg-gray-50"
                    >
                      {/* صورة أو placeholder */}
                      <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-rose-50 flex items-center justify-center border border-rose-100">
                        {p.image ? (
                          <img src={p.image} alt={p.nameAr} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-xl">🌹</span>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-gray-900 text-sm truncate">{p.nameAr}</div>
                        <div className="text-gray-400 text-xs truncate">{p.nameEn}</div>
                        <div className="flex items-center gap-3 mt-1">
                          {p.code && (
                            <span className="bg-rose-100 text-rose-600 text-xs font-mono px-2 py-0.5 rounded-full">
                              {p.code}
                            </span>
                          )}
                          <span className="text-gray-500 text-xs">
                            {p.price > 0 ? `${p.price} ريال` : "تواصل للسعر"}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => openEditForm(p)}
                          className="w-8 h-8 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 flex items-center justify-center transition-colors text-sm"
                          title="تعديل"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="w-8 h-8 rounded-xl bg-red-50 hover:bg-red-100 text-red-500 flex items-center justify-center transition-colors text-sm"
                          title="حذف"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
