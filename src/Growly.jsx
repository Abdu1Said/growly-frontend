// src/Growly.jsx
import { useMemo, useState } from "react";
import { sendContact } from "./lib/api";

// واتساب ثابت
const WHATSAPP =
  "https://wa.me/13605080797?text=%D8%A3%D8%B1%D9%8A%D8%AF%20%D8%A7%D8%B3%D8%AA%D8%B4%D8%A7%D8%B1%D8%A9%20%D9%85%D8%B9%20Growly%20Agency";

// روابط السوشيال
const socials = [
  { name: "Instagram", href: "https://www.instagram.com/growlyagency.llc?igsh=MWxoOHd4Y2NobG5wcQ==" },
  { name: "Facebook",  href: "https://www.facebook.com/share/1AXb7A3G3T/" },
  { name: "TikTok",    href: "https://www.tiktok.com/@growly.agency?_t=ZT-8z2keBCvH4w&_r=1" },
  { name: "Snapchat",  href: "https://www.snapchat.com/add/growlyagency?share_id=xDumSVXlP2s&locale=en-US" },
];

// خدمات
const services = [
  "الاستراتيجيات التسويقية الشاملة",
  "إدارة الحسابات الرقمية",
  "التصميم والهوية البصرية",
  "كتابة محتوى إبداعي",
  "تصوير المحتوى",
  "إدارة الحملات الممولة",
  "تصميم المواقع",
  "تصميم تطبيقات جوال",
  "تحرير فيديوهات Reels",
  "تقارير أداء",
  "تحسين محركات البحث",
  "موشن جرافيك 3D",
];

// FAQ
const faq = [
  { q: "كم مدة الالتزام بالباقات؟", a: "حسب العقد الموقّع بين الطرفين." },
  { q: "هل الأسعار تشمل الإعلانات الممولة؟", a: "تكلفة الإعلانات تُدفع للمنصّة مباشرة — إدارتها ضمن الباقات." },
  { q: "كيف أبدأ؟", a: "تواصل معنا عبر واتساب أو النموذج وسنرتّب مكالمة تعريفية مجانية." },
];

/* ---------- باقات شهرية (AED أساس) ---------- */
const aed = [
  { name: "Starter",    price: 2500, features: ["خطة محتوى أساسية","إدارة حسابين","10 كتابة محتوى","2 سكربت","8 تصاميم","2 ريل","تقرير شهري"] },
  { name: "Business",   price: 3500, features: ["خطة محتوى أساسية","إدارة حسابين","15 كتابة محتوى","3 سكربت","12 تصاميم","3 ريل","تقرير شهري"], popular: true },
  { name: "Enterprise", price: 7500, features: ["خطة محتوى أساسية","إدارة 3 حسابات","30 كتابة محتوى","10 سكربت","20 تصاميم","10 ريل","تقرير شهري"] },
];

/* ---------- ثوابت تحويل تقريبية ---------- */
const USD_TO_AED = 3.67;
const USD_TO_SAR = 3.75;
const USD_TO_JOD = 0.709;

const AED_TO_SAR = 1.02;
const AED_TO_JOD = USD_TO_JOD / USD_TO_AED; // ≈ 0.1932
const fmt = (n) => n.toLocaleString("en-US");

/* ---------- عروض الهوية (بالدرهم أساس) ---------- */
const brandingAED = [
  { name: "تصميم شعار (Logo)",      price: 1200 },
  { name: "هوية بصرية كاملة",       price: 2500 },
  { name: "هوية + 3D Logo Motion",  price: 4000 },
  { name: "فيديو 3D Motion (لوجو)", price: 1000 },
];

/* ---------- جدول الريلز بالدولار ---------- */
const reelsUSDTable = [
  {
    tier: 1, perVideo: 20,
    prices: { "4": { now: 80 }, "8": { now: 152, orig: 160 }, "16": { now: 288, orig: 320 }, "32": { now: 544, orig: 640 } },
  },
  {
    tier: 2, perVideo: 30,
    prices: { "4": { now: 120 }, "8": { now: 228, orig: 240 }, "16": { now: 432, orig: 480 }, "32": { now: 816, orig: 960 } },
  },
  {
    tier: 3, perVideo: 50,
    prices: { "4": { now: 200 }, "8": { now: 380, orig: 400 }, "16": { now: 720, orig: 800 }, "32": { now: 1360, orig: 1600 } },
  },
];

const approxLine = (usd) =>
  `≈ ${fmt(Math.round((usd * USD_TO_AED) / 10) * 10)} AED | ${fmt(Math.round((usd * USD_TO_SAR) / 10) * 10)} SAR | ${fmt(Math.round(usd * USD_TO_JOD))} JOD`;

/* ===================== Contact Form ===================== */
function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [status, setStatus] = useState({ loading: false, ok: null, error: "" });

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ loading: true, ok: null, error: "" });
    try {
      await sendContact(form);               // يرسل لـ /api/v1/contact
      setStatus({ loading: false, ok: true, error: "" });
      setForm({ name: "", email: "", company: "", message: "" });
    } catch (err) {
      setStatus({ loading: false, ok: false, error: err.message });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-3">
      <div className="grid sm:grid-cols-2 gap-3">
        <input
          className="input !bg-white/5 !border-white/20 !text-white placeholder-white/60"
          placeholder="اسمك"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          className="input !bg-white/5 !border-white/20 !text-white placeholder-white/60"
          placeholder="بريدك الإلكتروني"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>

      <input
        className="input !bg-white/5 !border-white/20 !text-white placeholder-white/60"
        placeholder="اسم المتجر/الشركة"
        value={form.company}
        onChange={(e) => setForm({ ...form, company: e.target.value })}
      />

      <textarea
        rows={5}
        className="textarea !bg-white/5 !border-white/20 !text-white placeholder-white/60"
        placeholder="اشرح لنا احتياجك بإيجاز…"
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
      />

      <div className="flex flex-wrap gap-3">
        <button type="submit" className="btn btn-primary" disabled={status.loading}>
          {status.loading ? "جاري الإرسال…" : "إرسال"}
        </button>
        <a href={WHATSAPP} target="_blank" rel="noreferrer" className="btn btn-ghost">
          إرسال عبر واتساب
        </a>
      </div>

      {status.ok && <p className="text-green-500">✅ تم إرسال الرسالة بنجاح</p>}
      {status.ok === false && <p className="text-red-500">❌ خطأ: {status.error}</p>}
    </form>
  );
}

/* ===================== الصفحة الرئيسية ===================== */
export default function Growly() {
  const [currency, setCurrency] = useState("AED");

  // باقات شهرية (تحويل العملة)
  const pkgs = useMemo(() => {
    return aed.map((p) => {
      if (currency === "AED") return { ...p, priceLabel: `AED ${fmt(p.price)}` };
      if (currency === "SAR") {
        const sar = Math.round((p.price * AED_TO_SAR) / 10) * 10;
        return { ...p, priceLabel: `SAR ${fmt(sar)}`, popular: p.popular };
      }
      const jod = Math.round(p.price * AED_TO_JOD);
      return { ...p, priceLabel: `JOD ${fmt(jod)}`, popular: p.popular };
    });
  }, [currency]);

  // عروض الهوية (تحويل العملة)
  const branding = useMemo(() => {
    return brandingAED.map((x) => {
      if (currency === "AED") return { ...x, priceLabel: `${fmt(x.price)} AED` };
      if (currency === "SAR") {
        const sar = Math.round((x.price * AED_TO_SAR) / 10) * 10;
        return { ...x, priceLabel: `${fmt(sar)} SAR` };
      }
      const jod = Math.round(x.price * AED_TO_JOD);
      return { ...x, priceLabel: `${fmt(jod)} JOD` };
    });
  }, [currency]);

  return (
    <div dir="rtl" className="min-h-screen">
      {/* ===== Navbar ===== */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0f1014]/85 backdrop-blur">
        <div className="container max-w-7xl flex items-center justify-between py-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-brand-accent text-black font-extrabold">G</span>
            <span className="text-sm sm:text-base">Growly Agency</span>
          </div>
          <nav className="hidden md:flex items-center gap-1 text-sm text-white/80">
            <a href="#about" className="btn btn-ghost">من نحن</a>
            <a href="#services" className="btn btn-ghost">خدماتنا</a>
            <a href="#pricing" className="btn btn-ghost">الأسعار</a>
            <a href="#reels" className="btn btn-ghost">باقات الريلز</a>
            <a href="#branding" className="btn btn-ghost">عروض الهوية</a>
            <a href="#faq" className="btn btn-ghost">الأسئلة</a>
            <a href="#contact" className="btn btn-ghost">تواصل</a>
          </nav>
          <a href={WHATSAPP} target="_blank" rel="noreferrer" className="btn btn-accent">احجز استشارة</a>
        </div>
      </header>

      {/* ===== Hero ===== */}
      <section className="hero-grad relative border-b border-white/10">
        <div className="container max-w-6xl py-20 sm:py-28 text-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold">
            <span className="text-brand-accent drop-shadow-[0_4px_16px_rgba(210,255,90,.25)]">منطلق نمو لكل فكرة</span>
          </h1>
          <p className="prose-ar mt-5 max-w-3xl mx-auto text-base sm:text-lg">
            في عالم مليء بالضوضاء الرقمية، نصنع لك خريطة تسويقية مختلفة بخطة محكمة تُوصلك لأهدافك بأقل تكلفة وأكبر أثر.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={WHATSAPP} target="_blank" rel="noreferrer" className="btn btn-accent btn-ripple">تواصل واتساب</a>
            <a href="#services" className="btn btn-primary btn-ripple">تعرّف على الخدمات</a>
          </div>
        </div>
      </section>

      {/* ===== About ===== */}
      <section id="about" className="container max-w-6xl py-14">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* LEFT: cards */}
          <div className="grid gap-4">
            <div className="glass rounded-2xl p-4 prose-ar">
              <span className="badge mb-2 inline-block">نبذة</span>
              <p>
                نحن وكالة <b>Growly Agency LLC</b> مسجّلة في ولاية وايومنغ (USA)،
                ونخدم السوق الخليجي بتنفيذ إبداعي وتجربة احترافية.
              </p>
            </div>

            <div className="glass rounded-2xl p-4 prose-ar">
              <span className="badge mb-2 inline-block">رؤيتنا</span>
              <p>أن نكون الخيار الأول للعلامات التجارية الخليجية والعالمية الباحثة عن شريك نمو رقمي متميز.</p>
            </div>

            <div className="glass rounded-2xl p-4 prose-ar">
              <span className="badge mb-2 inline-block">رسالتنا</span>
              <p>استراتيجيات تسويقية مدروسة، محتوى إبداعي يصل للهدف، متابعة دقيقة وتقارير واضحة.</p>
            </div>

            <div className="glass rounded-2xl p-4 prose-ar">
              <span className="badge mb-2 inline-block">قيمنا</span>
              <p>الشفافية • الإبداع • الشراكة</p>
            </div>
          </div>

          {/* RIGHT panel */}
          <div className="glass relative overflow-hidden rounded-2xl min-h-[20rem] p-6 md:p-8">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -left-10 -top-10 h-64 w-64 rounded-full bg-brand-primary/35 blur-3xl" />
              <div className="absolute -right-10 -bottom-10 h-64 w-64 rounded-full bg-brand-accent/25 blur-3xl" />
            </div>
            <div className="relative max-w-prose mx-auto prose-ar text-center">
              <h3 className="text-2xl md:text-3xl font-extrabold">نصنع وجودًا رقميًا يُشبه علامتك</h3>
              <p className="mt-3">نركز على أثر حقيقي يقاس بالأرقام، بأسلوب يناسب السوق الخليجي مع جودة تنفيذ أمريكية.</p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <a href={WHATSAPP} target="_blank" rel="noreferrer" className="btn btn-accent">احجز استشارة</a>
                <a href="#services" className="btn btn-ghost">شاهد خدماتنا</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Why + Social ===== */}
      <section className="container max-w-6xl py-6">
        <div className="grid lg:grid-cols-2 gap-6 items-start">
          <div className="prose-ar">
            <h2 className="text-2xl font-bold text-white">لماذا جرولي؟</h2>
            <ul className="mt-4 grid gap-2 text-white/90 leading-8">
              <li>خطة تسويق مؤدّاة تقيس التنفيذ لا الوعود.</li>
              <li>إبداع عملي يترجم الرسائل إلى تجربة مميزة.</li>
              <li>أسلوب يناسب السوق الخليجي مع جودة تنفيذ أمريكية.</li>
              <li>تتبّع وأتمتة وتقارير واضحة.</li>
            </ul>
          </div>
          <div className="glass p-4 rounded-2xl text-center">
            <div className="font-semibold mb-2">روابط السوشيال ميديا</div>
            <div className="flex flex-wrap justify-center gap-2">
              {socials.map((s) => (
                <a key={s.name} href={s.href} target="_blank" rel="noreferrer" className="btn btn-ghost text-sm">
                  {s.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Services ===== */}
      <section id="services" className="container max-w-6xl py-14">
        <h2 className="text-2xl font-bold text-white">خدماتنا</h2>
        <p className="prose-ar mt-1 text-white/70">تغطية شاملة من الاستراتيجية وحتى التنفيذ والقياس.</p>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((title, i) => (
            <div key={i} className="glass p-4 rounded-2xl">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-semibold leading-7">{title}</h3>
                <span className="mt-0.5 inline-flex h-6 min-w-6 items-center justify-center rounded-md bg-brand-primary/30 text-xs px-2">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="prose-ar mt-2 text-sm leading-7 text-white/80">تفاصيل تنفيذ مرنة، ومؤشرات متابعة واضحة، وتقارير دورية.</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Pricing ===== */}
      <section id="pricing" className="container max-w-6xl py-14">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-2xl font-bold text-white">الأسعار</h2>
          <div className="ml-auto flex items-center gap-2 text-xs bg-white/5 border border-white/10 rounded-xl p-1">
            {["AED", "SAR", "JOD"].map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCurrency(c)}
                className={`px-3 py-1 rounded-lg ${currency === c ? "bg-brand-accent text-black" : "hover:bg-white/10"}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 grid md:grid-cols-3 gap-4">
          {pkgs.map((p) => (
            <div key={p.name} className="glass p-6 bg-gradient-to-b from-white/10 to-white/5 rounded-2xl">
              <div className="flex items-center justify-between">
                <span className="text-sm uppercase tracking-widest text-white/60">{p.name}</span>
                {p.popular && <span className="badge">الأكثر طلبًا</span>}
              </div>
              <div className="mt-4 text-3xl font-extrabold">{p.priceLabel}</div>
              <ul className="mt-4 space-y-2 text-sm text-white/80 prose-ar">
                {p.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-brand-accent" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a href={WHATSAPP} target="_blank" rel="noreferrer" className="mt-6 inline-block btn btn-primary">
                اطلب العرض
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Reels ===== */}
      <section id="reels" className="container max-w-6xl py-14">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">باقات الريلز – بالدولار (مع الخصم)</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reelsUSDTable.map((row) => (
            <div key={row.tier} className="glass p-6 rounded-2xl flex flex-col gap-4">
              <h3 className="text-xl font-bold text-center">
                المستوى {row.tier}
                <div className="text-xs text-white/60 mt-1">({`$${row.perVideo}/فيديو`})</div>
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {Object.entries(row.prices).map(([count, cell]) => (
                  <div key={count} className="p-3 rounded-xl bg-white/5 text-center">
                    <div className="text-sm text-white/70">{count} فيديو</div>
                    <div className="mt-1 text-lg font-extrabold">${fmt(cell.now)}</div>
                    {cell.orig && <div className="text-xs text-white/50 line-through">${fmt(cell.orig)}</div>}
                    <div className="text-[11px] text-white/60 mt-1">{approxLine(cell.now)}</div>
                  </div>
                ))}
              </div>
              <a href={WHATSAPP} target="_blank" rel="noreferrer" className="btn btn-primary mt-4">
                اطلب الآن
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Branding ===== */}
      <section id="branding" className="container max-w-6xl py-14">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-2xl font-bold text-white">عروض الهوية</h2>
          <div className="ml-auto flex items-center gap-2 text-xs bg-white/5 border border-white/10 rounded-xl p-1">
            {["AED", "SAR", "JOD"].map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCurrency(c)}
                className={`px-3 py-1 rounded-lg ${currency === c ? "bg-brand-accent text-black" : "hover:bg-white/10"}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {branding.map((pkg) => (
            <div key={pkg.name} className="glass p-5 rounded-2xl">
              <div className="text-sm text-white/70">{pkg.name}</div>
              <div className="mt-2 text-2xl font-extrabold">{pkg.priceLabel}</div>
              <a href={WHATSAPP} target="_blank" rel="noreferrer" className="mt-4 inline-block btn btn-primary">
                اطلب العرض
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq" className="container max-w-6xl py-14">
        <h2 className="text-2xl font-bold text-white">الأسئلة الشائعة</h2>
        <div className="mt-4 grid gap-3">
          {faq.map((f, i) => (
            <details key={i} className="glass p-4 rounded-2xl prose-ar">
              <summary className="cursor-pointer font-semibold">{f.q}</summary>
              <div className="mt-2 text-sm text-white/80">{f.a}</div>
            </details>
          ))}
        </div>
      </section>

      {/* ===== Contact ===== */}
      <section id="contact" className="container max-w-6xl py-16">
        <div className="grid lg:grid-cols-2 gap-10 glass p-6 rounded-2xl">
          <ContactForm />
          <div className="self-center prose-ar text-center">
            <h3 className="text-2xl font-extrabold text-white">تواصل معنا</h3>
            <p className="mt-2 text-white/80">ابدأ أول خطوة نحو نجاحك الرقمي الآن.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {socials.map((s) => (
                <a key={s.name} href={s.href} target="_blank" rel="noreferrer" className="btn btn-ghost text-sm">
                  {s.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="border-t border-white/10">
        <div className="container max-w-6xl py-8 flex flex-col sm:flex-row gap-3 items-center justify-between text-xs text-white/60 prose-ar">
          <div>© {new Date().getFullYear()} Growly Agency LLC — جميع الحقوق محفوظة • مسجلة رسميًا في Wyoming, USA</div>
          <div className="flex items-center gap-2">
            {socials.map((s) => (
              <a key={s.name} href={s.href} target="_blank" rel="noreferrer" className="hover:text-brand-accent">
                {s.name}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* واتساب عائم */}
      <a href={WHATSAPP} target="_blank" rel="noreferrer" className="fixed bottom-4 left-4 z-50 btn btn-accent" aria-label="WhatsApp">
        راسلنا الآن
      </a>
    </div>
  );
}
