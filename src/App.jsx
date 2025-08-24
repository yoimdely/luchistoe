import React, { useEffect, useState, useCallback } from "react";
import {
  Home, MapPin, Menu, X,
  Waves, Building2, Bath, ParkingSquare, Ruler,
  FileText, CircuitBoard, ShieldCheck, Hammer,
  School, HeartHandshake, Store, Bike, Baby, Trees,
  Dumbbell, FileSignature, Handshake, KeyRound, Banknote, ArrowUp, Sun, Calendar
} from "lucide-react";
import { motion } from "framer-motion";

/* ================= SEO + ФОНТЫ ================= */
function injectSEO() {
  if (typeof document === "undefined") return;

  document.title = "ЖК «Лучистое» — Алушта, пос. Семидворье, Пограничный 6";

  const meta = [
    { name: "description", content: "ЖК «Лучистое» (Алушта, Семидворье): квартиры у моря с курортной инфраструктурой — открытый и крытый бассейны, SPA, ресторан, йога и спорт-зоны, верёвочный парк, детсад. Поэтапный ввод до III кв. 2027. 214‑ФЗ, эскроу." },
    { property: "og:title", content: "ЖК «Лучистое» — курортный комплекс у моря, Алушта" },
    { property: "og:description", content: "~250 м по прямой до моря (пешком ~800 м), до 17 этажей, паркинги, террасы, семейные и видовые планировки." },
    { property: "og:type", content: "website" },
    { property: "og:image", content: "/og-image-luchistoe.jpg" },
    { property: "og:url", content: typeof location !== "undefined" ? location.href : "https://example.com/" }
  ];

  meta.forEach((m) => {
    const key = m.name ? "name" : "property";
    let el = document.querySelector(`meta[${key}="${m.name || m.property}"]`);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute(key, m.name || m.property);
      document.head.appendChild(el);
    }
    el.setAttribute("content", m.content);
  });

  // canonical
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }
  link.href = typeof location !== "undefined" ? location.href : "https://example.com/";

  // preload hero
  let pl = document.querySelector('link[rel="preload"][as="image"]');
  if (!pl) {
    pl = document.createElement("link");
    pl.rel = "preload";
    pl.as = "image";
    pl.href = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop"; // морской пейзаж-заглушка
    document.head.appendChild(pl);
  }
}

function injectFonts() {
  if (typeof document === "undefined") return;
  const links = [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
    { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&family=Prata&display=swap" }
  ];
  links.forEach(cfg => {
    const l = document.createElement("link");
    Object.entries(cfg).forEach(([k, v]) => v !== undefined && l.setAttribute(k, v as string));
    document.head.appendChild(l);
  });
}

/* ================= ВСПОМОГАТЕЛЬНЫЕ UI ================= */
function Stat({ value, label, sub, icon }) {
  return (
    <div className="p-5 rounded-2xl border h-full relative overflow-hidden"
      style={{ borderColor: "#C7F0DB", backgroundColor: "#FFFFFF", color: "#052E2B" }}>
      <div className="absolute -top-8 -right-8 opacity-10 pointer-events-none">
        <div className="w-28 h-28 rounded-full" style={{ background: "radial-gradient(closest-side, #10B981 30%, transparent 70%)" }} />
      </div>
      <div className="text-sm mb-2 flex items-center gap-2">{icon}{label}</div>
      <div className="text-xl font-semibold">{value}</div>
      {sub && <div className="text-xs mt-1" style={{ color: "#355E57" }}>{sub}</div>}
    </div>
  );
}

function IconWrap({ children }) {
  return (
    <div
      className="w-10 h-10 rounded-xl grid place-items-center border shadow-sm"
      style={{ borderColor: "#C7F0DB", backgroundColor: "#F0FFF7", color: "#052E2B" }}
    >
      {children}
    </div>
  );
}

function FireIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 2s4 4 0 8c3 0 6 2 6 6a6 6 0 0 1-12 0c0-2.5 1.5-4.5 3.5-5.5C9 8 10 5 12 2z" />
    </svg>
  );
}

/* ================= ПРИЛОЖЕНИЕ ================= */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [showUp, setShowUp] = useState(false);

  useEffect(() => {
    injectFonts();
    injectSEO();
    document.documentElement.style.overflowX = "hidden";
    document.body.style.overflowX = "hidden";
    const onScroll = () => setShowUp(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onSubmit = useCallback(async (e) => {
    e.preventDefault();
    try {
      setSending(true);
      const form = e.currentTarget;
      const data = new FormData(form);
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data
      });
      if (!res.ok) throw new Error("Network error");
      setSent(true);
      form.reset();
    } catch (err) {
      console.error(err);
      alert("Не удалось отправить форму. Попробуйте ещё раз или напишите в WhatsApp.");
    } finally {
      setSending(false);
    }
  }, []);

  return (
    <div className="min-h-screen relative"
      style={{ backgroundColor: "#F7FFFB", color: "#052E2B", fontFamily: "Montserrat, sans-serif" }}>

      {/* ДЕКОР: зелёная волна */}
      <div className="pointer-events-none select-none absolute inset-0 -z-10">
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #E6FFF2 0%, #F7FFFB 45%, #F7FFFB 100%)" }} />
        <motion.svg
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="absolute top-0 left-1/2 -translate-x-1/2"
          width="1200" height="240" viewBox="0 0 1200 240" fill="none">
          <path d="M0,120 C200,180 300,40 500,80 C700,120 800,200 1200,120 L1200,0 L0,0 Z" fill="#C7F0DB" opacity="0.8" />
          <path d="M0,160 C200,220 300,80 520,120 C740,160 820,220 1200,160 L1200,0 L0,0 Z" fill="#D7FBE8" opacity="0.8" />
        </motion.svg>
      </div>

      {/* NAVIGATION (переработано: сетка + свободное пространство + flex-wrap) */}
      <header className="sticky top-0 z-30 border-b backdrop-blur"
        style={{ backgroundColor: "rgba(247,255,251,0.9)", borderColor: "#C7F0DB" }}>
        <div className="max-w-6xl mx-auto px-5 py-3 grid grid-cols-12 items-center gap-3">
          {/* Лого и название */}
          <a href="#" className="col-span-8 sm:col-span-6 md:col-span-4 flex items-center gap-3 shrink-0 min-w-0">
            <div className="w-9 h-9 rounded-2xl grid place-items-center font-semibold shadow flex-none"
              style={{ backgroundColor: "#052E2B", color: "#D7FBE8" }}>Л</div>
            <div className="leading-tight truncate">
              <div className="font-extrabold flex items-center gap-2 truncate" style={{ fontFamily: "Prata, serif", fontSize: 18 }}>
                <Home size={18} className="flex-none" /> <span className="truncate">ЖК «Лучистое»</span>
              </div>
              <div className="text-[11px] truncate" style={{ color: "#355E57" }}>
                <MapPin size={12} className="inline mr-1" /> Алушта, пос. Семидворье, пер. Пограничный, 6
              </div>
            </div>
          </a>

          {/* Меню для ПК: центр, перенос строк при нехватке места */}
          <nav className="hidden lg:flex col-span-4 md:col-span-5 justify-center items-center text-[13px]"
               aria-label="Главное меню">
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {[
                ["О комплексе", "#about"],
                ["Курорт внутри дома", "#resort"],
                ["Планировки", "#plans"],
                ["Локация", "#location"],
                ["Очереди и сроки", "#phases"],
                ["FAQ", "#faq"]
              ].map(([t, href]) => (
                <a key={href} href={href} className="hover:text-emerald-700 whitespace-nowrap transition-colors" style={{ color: "#355E57" }}>{t}</a>
              ))}
            </div>
          </nav>

          {/* Кнопки действий: всегда справа, с переносом и увеличенным отступом */}
          <div className="col-span-4 sm:col-span-6 md:col-span-3 flex justify-end">
            <div className="hidden sm:flex flex-wrap gap-2 md:gap-3 justify-end">
              <a href="https://wa.me/79124530205" target="_blank" rel="noopener noreferrer"
                 className="px-3 md:px-4 py-2 rounded-2xl border hover:shadow-md"
                 style={{ borderColor: "#8FE3C0", color: "#052E2B" }}>WhatsApp</a>
              <a href="#cta" className="px-3 md:px-4 py-2 rounded-2xl hover:shadow-md"
                 style={{ backgroundColor: "#10B981", color: "#F7FFFB" }}>Подбор квартиры</a>
            </div>

            {/* Бургер для мобилки */}
            <button onClick={() => setMenuOpen(!menuOpen)} className="sm:hidden ml-2" aria-label="Меню">
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Мобильное меню: крупные интервалы между пунктами и кнопками */}
        {menuOpen && (
          <div className="sm:hidden bg-white shadow-md border-t" style={{ borderColor: '#C7F0DB' }}>
            <div className="px-4 py-3 flex flex-col gap-2">
              {[
                ["О комплексе", "#about"],
                ["Курорт внутри дома", "#resort"],
                ["Планировки", "#plans"],
                ["Локация", "#location"],
                ["Очереди и сроки", "#phases"],
                ["FAQ", "#faq"],
                ["Контакты", "#cta"],
              ].map(([t, href]) => (
                <a key={href} href={href} onClick={() => setMenuOpen(false)}
                   className="block px-3 py-2 rounded-lg hover:bg-emerald-50" style={{ color: '#355E57' }}>{t}</a>
              ))}

              <div className="mt-2 grid grid-cols-2 gap-2">
                <a href="https://wa.me/79124530205" target="_blank" rel="noopener noreferrer"
                   className="px-3 py-2 rounded-xl border text-center"
                   style={{ borderColor: '#8FE3C0', color: '#052E2B' }}>WhatsApp</a>
                <a href="#cta" className="px-3 py-2 rounded-xl text-center"
                   style={{ backgroundColor: '#10B981', color: '#F7FFFB' }}>Подбор</a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-4 pt-10 pb-16 md:pb-24 grid md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="font-extrabold tracking-tight" style={{ fontFamily: "Prata, serif", color: "#052E2B", fontSize: "clamp(28px, 5vw, 56px)", lineHeight: 1.1, maxWidth: "18ch" }}>
              «Лучистое» — квартиры у моря в Семидворье (Алушта)
            </h1>
            <p className="mt-5 text-base md:text-lg" style={{ color: "#355E57", maxWidth: 640 }}>
              Курортный жилой комплекс на южном берегу Крыма: жилой фонд и собственная инфраструктура — открытый и крытый бассейны, SPA‑центр, ресторан, спорт‑ и детские зоны. По прямой до моря ~250 м, пешком ~800 м.
            </p>

            <ul className="mt-6 grid grid-cols-2 gap-3 text-sm">
              {[
                ["~250 м по прямой до моря", <Waves size={18} key="w" />],
                ["До 17 этажей", <Building2 size={18} key="b" />],
                ["Квартиры с террасами", <Ruler size={18} key="r" />],
                ["Паркинг: наземный + многоуровневый", <ParkingSquare size={18} key="p" />],
              ].map(([t, icon], i) => (
                <li key={i} className="p-3 rounded-xl shadow flex items-center gap-2 border bg-white" style={{ borderColor: "#C7F0DB", color: "#052E2B" }}>
                  {icon} {t}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#cta" className="px-5 py-3 rounded-2xl hover:shadow-md" style={{ backgroundColor: "#10B981", color: "#F7FFFB" }}>Получить подборку</a>
              <a href="https://wa.me/79124530205" target="_blank" rel="noopener noreferrer" className="px-5 py-3 rounded-2xl border hover:shadow-md" style={{ borderColor: "#8FE3C0", color: "#052E2B" }}>Связаться в WhatsApp</a>
            </div>
          </motion.div>

          {/* КАРТИНКА */}
          <motion.div className="rounded-3xl overflow-hidden shadow-lg border relative" style={{ height: 520, borderColor: "#C7F0DB" }} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
            <div className="absolute -top-1 left-0 right-0 h-10 pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(199,240,219,0.7), transparent)" }} />
            <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop" alt="Вид на море и побережье" className="w-full h-full object-cover" loading="eager" fetchpriority="high" width={1600} height={1040} />
          </motion.div>
        </div>
      </section>

      {/* КЛЮЧЕВЫЕ ЧИСЛА */}
      <section id="benefits" className="py-10">
        <div className="max-w-6xl mx-auto px-4 grid sm:grid-cols-2 md:grid-cols-4 gap-5 items-stretch">
          <div className="h-full"><Stat value="~250 м" label="До моря (по прямой)" sub="пешком ~800 м" icon={<Waves size={18} />} /></div>
          <div className="h-full"><Stat value="до 17" label="Этажей" sub="монолит‑кирпич" icon={<Building2 size={18} />} /></div>
          <div className="h-full"><Stat value="Комфорт" label="Класс" sub="214‑ФЗ, эскроу" icon={<ShieldCheck size={18} />} /></div>
          <div className="h-full"><Stat value="SPA + бассейны" label="Инфраструктура" sub="ресторан, спорт, детзоны" icon={<Store size={18} />} /></div>
        </div>
      </section>

      {/* О КОМПЛЕКСЕ */}
      <section id="about" className="py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2">
            <h2 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'Prata, serif' }}>О проекте</h2>
            <p className="mt-4" style={{ color: '#355E57' }}>
              «Лучистое» — курортный жилой комплекс на южном берегу Крыма, в посёлке Семидворье. Проект сочетает квартиры для жизни и отдыха с полноценной курортной инфраструктурой на территории. Продажи ведутся по ДДУ (214‑ФЗ) с расчётами через эскроу‑счета.
            </p>
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              {[
                { h: 'Сроки', t: 'Часть корпусов уже введена, поэтапный ввод продолжается до III кв. 2027 года.', icon: <Calendar size={18} /> },
                { h: 'Конструктив', t: 'Монолит‑кирпич, панорамное остекление, энергоэффективные решения.', icon: <CircuitBoard size={18} /> },
                { h: 'Правовой статус', t: 'ДДУ по 214‑ФЗ, расчёты через эскроу‑счета.', icon: <ShieldCheck size={18} /> },
                { h: 'Инфраструктура', t: 'Крытый и открытый бассейны, SPA‑центр, ресторан, спорт‑ и детские зоны, террасы.', icon: <Hammer size={18} /> },
              ].map((c, i) => (
                <div key={i} className="p-5 rounded-2xl border flex items-start gap-3" style={{ borderColor: '#C7F0DB', backgroundColor: '#FFFFFF' }}>
                  <IconWrap>{c.icon}</IconWrap>
                  <div>
                    <div className="font-semibold" style={{ color: '#052E2B' }}>{c.h}</div>
                    <div className="text-sm mt-1" style={{ color: '#355E57' }}>{c.t}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <aside className="p-6 rounded-2xl border" style={{ backgroundColor: '#D7FBE8', borderColor: '#C7F0DB' }}>
            <div className="font-semibold flex items-center gap-2" style={{ color: '#052E2B' }}>
              <Store size={18} /> Ключевые факты
            </div>
            <ul className="mt-3 space-y-2 text-sm" style={{ color: '#355E57' }}>
              <li><MapPin size={14} className="inline mr-2" /> Алушта, пос. Семидворье, пер. Пограничный, 6</li>
              <li><Waves size={14} className="inline mr-2" /> По прямой ~250 м до моря (пешком ~800 м)</li>
              <li><Building2 size={14} className="inline mr-2" /> Этажность до 17</li>
              <li><ParkingSquare size={14} className="inline mr-2" /> Парковки: наземные и многоуровневые</li>
            </ul>
            <a href="#cta" className="mt-5 inline-block w-full text-center px-4 py-2 rounded-xl hover:shadow-md" style={{ backgroundColor: '#10B981', color: '#F7FFFB' }}>Запросить подборку</a>
          </aside>
        </div>
      </section>

      {/* КУРОРТ ВНУТРИ ДОМА (новый блок) */}
      <section id="resort" className="py-14 md:py-20" style={{ backgroundColor: '#E6FFF2' }}>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{ fontFamily: 'Prata, serif' }}>
            <Sun size={22} /> Курорт внутри дома
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            {[
              { t: "Оздоровление", points: [[Bath, "SPA‑центр с крытым бассейном"], [Waves, "Открытый бассейн + детская аквазона"], [Sun, "Террасы и зоны релакса"]] },
              { t: "Семьям", points: [[Baby, "Детский сад (заявлен) и площадки"], [School, "Йога‑центр, верёвочный парк"], [Trees, "Озеленённые дворы без машин"]] },
              { t: "Сервис", points: [[Store, "Ресторан и lounge‑пространства"], [Handshake, "Холлы и ресепшен"], [ParkingSquare, "Паркинги и гостевые места"]] }
            ].map((b, i) => (
              <div key={i} className="p-6 rounded-2xl border" style={{ backgroundColor: '#FFFFFF', borderColor: '#C7F0DB' }}>
                <div className="font-semibold" style={{ color: '#052E2B' }}>{b.t}</div>
                <ul className="mt-3 space-y-2 text-sm" style={{ color: '#355E57' }}>
                  {b.points.map(([Ic, txt], j) => (
                    <li key={j} className="flex gap-3 items-start"><Ic size={16} /> {txt}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ПЛАНИРОВКИ */}
      <section id="plans" className="py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{ fontFamily: 'Prata, serif' }}><Ruler size={22} /> Планировочные решения</h2>
          <p className="mt-3" style={{ color: '#355E57' }}>
            Студии, 1‑ и 2‑комнатные квартиры, а также видовые варианты с террасами. Актуальные планировки и цены пришлём в PDF‑подборке.
          </p>
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            {[
              { t: "Студии", d: "Компактные метражи, удобная эргономика", icon: <Home size={18} /> },
              { t: "1‑комнатные", d: "Кухни‑гостиные, балконы/террасы", icon: <Home size={18} /> },
              { t: "2‑комнатные", d: "Семейные сценарии и видовые этажи", icon: <Home size={18} /> },
            ].map((c, i) => (
              <div key={i} className="p-5 rounded-2xl border flex items-start gap-3" style={{ backgroundColor: '#FFFFFF', borderColor: '#C7F0DB' }}>
                <IconWrap>{c.icon}</IconWrap>
                <div>
                  <div className="font-semibold" style={{ color: '#052E2B' }}>{c.t}</div>
                  <div className="text-sm mt-1" style={{ color: '#355E57' }}>{c.d}</div>
                  <a href="#cta" className="mt-3 inline-block text-sm hover:underline" style={{ color: '#0B9E74' }}>Запросить PDF‑подборку планировок</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ЛОКАЦИЯ */}
      <section id="location" className="py-14 md:py-20" style={{ backgroundColor: '#F0FFF7' }}>
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{ fontFamily: 'Prata, serif' }}><MapPin size={22} /> Локация и окружение</h2>
            <p className="mt-4" style={{ color: '#355E57' }}>
              Комплекс находится в курортной части Алушты — посёлке Семидворье — рядом с побережьем, на фоне крымских сосен и гор. Поблизости набережная, прогулочные маршруты, парки и курортные сервисы.
            </p>
            <ul className="mt-6 grid grid-cols-2 gap-3 text-sm">
              {[{ t: "Прогулочные и видовые маршруты", icon: <Bike size={16} /> }, { t: "Курортная инфраструктура поблизости", icon: <Store size={16} /> }, { t: "Медицинские и бытовые сервисы в радиусе поездки", icon: <HeartHandshake size={16} /> }, { t: "Озеленённые дворы и зоны отдыха", icon: <Trees size={16} /> }].map((i, idx) => (
                <li key={idx} className="p-3 rounded-xl border flex items-center gap-2" style={{ borderColor: '#C7F0DB', backgroundColor: '#FFFFFF', color: '#052E2B' }}>
                  {i.icon} {i.t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl overflow-hidden shadow border" style={{ borderColor: '#C7F0DB' }}>
            <iframe title="map" src="https://yandex.ru/map-widget/v1/?ll=34.4213%2C44.6809&z=16" className="w-full h-[360px]" loading="lazy" />
          </div>
        </div>
      </section>

      {/* ОЧЕРЕДИ И СРОКИ (новый блок) */}
      <section id="phases" className="py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{ fontFamily: 'Prata, serif' }}><Calendar size={22} /> Очереди и сроки</h2>
          <div className="grid md:grid-cols-4 gap-4 mt-6">
            {[
              { t: "1 очередь", d: "сдана (по данным маркетплейсов) — ориентир 1 кв. 2023", icon: <FileText size={18} /> },
              { t: "2 очередь", d: "ожидание ввода — ориентир 4 кв. 2024", icon: <FileText size={18} /> },
              { t: "Дальнейшие этапы", d: "поэтапный ввод до III кв. 2027", icon: <FileText size={18} /> },
              { t: "Формат сделки", d: "ДДУ по 214‑ФЗ, эскроу‑счета", icon: <ShieldCheck size={18} /> },
            ].map((s, i) => (
              <div key={i} className="p-5 rounded-2xl border flex items-start gap-3" style={{ backgroundColor: '#FFFFFF', borderColor: '#C7F0DB' }}>
                <IconWrap>{s.icon}</IconWrap>
                <div>
                  <div className="text-lg font-semibold" style={{ color: '#052E2B' }}>{s.t}</div>
                  <div className="text-sm mt-1" style={{ color: '#355E57' }}>{s.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-14 md:py-20" style={{ backgroundColor: '#E6FFF2' }}>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'Prata, serif' }}>Вопросы и ответы</h2>
          <div className="mt-6 grid md:grid-cols-2 gap-4">
            {[
              { q: "Где расположен комплекс?", a: "Республика Крым, Алушта, пос. Семидворье, пер. Пограничный, 6." },
              { q: "Насколько близко море?", a: "По прямой порядка 250 метров, пешком примерно 800 метров." },
              { q: "Какая этажность и конструктив?", a: "Монолит‑кирпич, заявлена этажность до 17." },
              { q: "Что входит в инфраструктуру?", a: "Крытый/открытый бассейны, SPA‑центр, ресторан, спорт‑ и детские зоны, озеленённые дворы, террасы." },
              { q: "Какой правовой формат?", a: "Заключение ДДУ по 214‑ФЗ с расчётами через эскроу‑счета." },
              { q: "Есть ли паркинг?", a: "Да, предусмотрены наземные и многоуровневые парковки." }
            ].map((i, idx) => (
              <details key={idx} className="p-5 rounded-2xl border bg-white" style={{ borderColor: '#C7F0DB' }}>
                <summary className="font-semibold cursor-pointer" style={{ color: '#052E2B' }}>{i.q}</summary>
                <p className="mt-2 text-sm" style={{ color: '#355E57' }}>{i.a}</p>
              </details>
            ))}
          </div>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "Где расположен комплекс?", "acceptedAnswer": { "@type": "Answer", "text": "Республика Крым, Алушта, пос. Семидворье, пер. Пограничный, 6." } },
            { "@type": "Question", "name": "Насколько близко море?", "acceptedAnswer": { "@type": "Answer", "text": "По прямой порядка 250 метров, пешком примерно 800 метров." } },
            { "@type": "Question", "name": "Какая этажность и конструктив?", "acceptedAnswer": { "@type": "Answer", "text": "Монолит‑кирпич, заявлена этажность до 17." } },
            { "@type": "Question", "name": "Что входит в инфраструктуру?", "acceptedAnswer": { "@type": "Answer", "text": "Крытый/открытый бассейны, SPA‑центр, ресторан, спорт‑ и детские зоны, озеленённые дворы, террасы." } },
            { "@type": "Question", "name": "Какой правовой формат?", "acceptedAnswer": { "@type": "Answer", "text": "ДДУ по 214‑ФЗ, расчёты через эскроу‑счета." } },
            { "@type": "Question", "name": "Есть ли паркинг?", "acceptedAnswer": { "@type": "Answer", "text": "Наземные и многоуровневые парковки." } }
          ]
        }) }} />
      </section>

      {/* CTA + ФОРМА */}
      <section id="cta" className="py-20">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-start">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{ fontFamily: 'Prata, serif' }}><Handshake size={22} /> Оставьте заявку на подбор</h2>
            <p style={{ color: '#355E57' }}>
              Пришлём актуальные планировки, этажи и виды, информацию о сроках по очередям и спецпредложениях. Поможем выбрать квартиру для жизни или инвестиций.
            </p>
            <a href="https://wa.me/79124530205" target="_blank" rel="noopener noreferrer" className="inline-block px-5 py-3 rounded-2xl border hover:shadow-md" style={{ borderColor: '#8FE3C0', color: '#052E2B' }}>Связаться в WhatsApp</a>
          </div>
          <div className="p-6 rounded-2xl border shadow" style={{ backgroundColor: '#FFFFFF', borderColor: '#C7F0DB' }}>
            {sent ? (
              <div className="text-center">
                <div className="text-xl font-semibold" style={{ color: '#052E2B' }}>Спасибо! Заявка отправлена.</div>
                <p className="mt-2" style={{ color: '#355E57' }}>Мы свяжемся с вами в ближайшее время.</p>
              </div>
            ) : (
              <>
                <div className="text-xl font-semibold" style={{ color: '#052E2B' }}>Получить подборку</div>
                <p className="text-sm mt-1" style={{ color: '#355E57' }}>
                  Оставьте контакты — вышлем PDF с планировками и условиями по ЖК «Лучистое».
                </p>
                <form onSubmit={onSubmit} className="mt-4 space-y-3">
                  <input type="hidden" name="access_key" value="af90736e-9a82-429d-9943-30b5852e908a" />
                  <input className="w-full px-4 py-3 rounded-xl border" style={{ borderColor: '#C7F0DB' }} name="name" placeholder="Ваше имя" required />
                  <input className="w-full px-4 py-3 rounded-xl border" style={{ borderColor: '#C7F0DB' }} name="phone" placeholder="Телефон" required />
                  <input className="w-full px-4 py-3 rounded-xl border" style={{ borderColor: '#C7F0DB' }} name="email" placeholder="Email (по желанию)" />
                  <textarea className="w-full px-4 py-3 rounded-xl border" style={{ borderColor: '#C7F0DB' }} name="message" placeholder="Комментарий" rows={3} />
                  <button type="submit" disabled={sending} className="w-full px-4 py-3 rounded-xl hover:shadow-md disabled:opacity-70" style={{ backgroundColor: '#10B981', color: '#F7FFFB' }}>
                    {sending ? "Отправляем..." : "Отправить"}
                  </button>
                </form>
                <a href="/policy.html" className="block text-xs mt-3 underline" style={{ color: '#5C8F86' }}>Политика конфиденциальности</a>
                <a href="/consent.html" className="block text-xs underline" style={{ color: '#5C8F86' }}>Согласие на обработку ПДн</a>
              </>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t" style={{ borderColor: '#C7F0DB' }}>
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-6 text-sm" style={{ color: '#355E57' }}>
          <div className="md:col-span-2">
            <div className="font-semibold flex items-center gap-2" style={{ color: '#052E2B' }}>
              <Home size={16} /> ЖК «Лучистое»
            </div>
            <p className="mt-2">Республика Крым, Алушта, пос. Семидворье, пер. Пограничный, 6</p>
            <p className="mt-1">ДДУ по 214‑ФЗ, расчёты через эскроу‑счета.</p>
          </div>
          <div className="md:text-right">
            <a href="/policy.html" className="underline">Политика конфиденциальности</a>
            <span className="mx-2">•</span>
            <a href="/consent.html" className="underline">Согласие на обработку ПДн</a>
          </div>
        </div>
      </footer>

      {/* JSON-LD Residence + Place */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Residence",
        "name": "ЖК «Лучистое»",
        "url": typeof location !== "undefined" ? location.href : "https://example.com/",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "пер. Пограничный, 6",
          "addressLocality": "Алушта",
          "addressRegion": "Республика Крым",
          "addressCountry": "RU"
        },
        "geo": { "@type": "GeoCoordinates", "latitude": 44.6809, "longitude": 34.4213 }
      }) }} />

      {/* Scroll to top */}
      {showUp && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="fixed bottom-5 right-5 rounded-full shadow-lg" style={{ backgroundColor: "#10B981", color: "#F7FFFB", padding: 12 }} aria-label="Наверх">
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
}
