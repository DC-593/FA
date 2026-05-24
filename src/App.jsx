import React, { useRef, useState, useEffect, useCallback } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { Heart, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import './App.css';

// ══════════════════════════════════════════════════════════════════════
// HOOK — Detecta si la pantalla es móvil (< 768 px)
// Escucha resize en tiempo real para adaptar el libro al girar el celular
// ══════════════════════════════════════════════════════════════════════
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < breakpoint);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < breakpoint);
    // ResizeObserver es más eficiente que el evento resize en móvil
    const ro = new ResizeObserver(handler);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [breakpoint]);

  return isMobile;
}

// ══════════════════════════════════════════════════════════════════════
// COMPONENTE PAGE — Arquitectura de dos capas anti-fantasma
//
//  Capa 1 → .page  (root del ref de la librería)
//    • Solo lleva: position:relative + overflow:hidden
//    • background-color se pone en inline style (← lo que captura el canvas)
//    • NUNCA display:flex aquí
//
//  Capa 2 → .page-content  (tu lienzo)
//    • position:absolute + inset:0
//    • Aquí viven flex, tipografía, imágenes, etc.
//    • La librería NO lo toca
// ══════════════════════════════════════════════════════════════════════
const Page = React.forwardRef(
  ({ bgColor, density = 'soft', className = '', children }, ref) => (
    <div
      ref={ref}
      className={`page ${className}`}
      style={{ backgroundColor: bgColor }}
      data-density={density}
    >
      <div className="page-content">{children}</div>
    </div>
  )
);
Page.displayName = 'Page';

// ══════════════════════════════════════════════════════════════════════
// CONSTANTES
// ══════════════════════════════════════════════════════════════════════
const TOTAL_PAGES = 6; // portada + 4 internas + contraportada

// ══════════════════════════════════════════════════════════════════════
// APP PRINCIPAL
// ══════════════════════════════════════════════════════════════════════
export default function App() {
  const bookRef  = useRef();
  const isMobile = useIsMobile();

  // currentPage = índice raw que devuelve onFlip (0-based, puede saltar de 2 en 2)
  const [currentPage, setCurrentPage] = useState(0);

  // ── Confeti al llegar a la contraportada ───────────────────────────
  const fireConfetti = useCallback(() => {
    confetti({
      particleCount: 140,
      spread: 90,
      origin: { y: 0.55 },
      colors: ['#fb923c', '#a855f7', '#f9a8d4', '#fde68a', '#86efac'],
    });
  }, []);

  const onFlip = useCallback(
    (e) => {
      const idx = e.data;
      setCurrentPage(idx);
      if (idx >= TOTAL_PAGES - 1) fireConfetti();
    },
    [fireConfetti]
  );

  // ── Lógica de navegación ────────────────────────────────────────────
  //   En landscape react-pageflip salta de 2 en 2 (0 → 2 → 4 → 5…)
  //   Usamos el índice raw para deshabilitar los botones y el label.
  const isFirst = currentPage === 0;
  const isLast  = currentPage >= TOTAL_PAGES - 1;

  // ── Etiqueta elegante de paginación ───────────────────────────────
  //   Elimina completamente el bug de los dots saltarines:
  //   en lugar de N puntos estáticos mostramos un texto calculado.
  const pageLabel = (() => {
    if (currentPage === 0)              return '📖 Portada';
    if (currentPage >= TOTAL_PAGES - 1) return '💜 Contraportada';

    if (isMobile) {
      // Portrait: una página a la vez → índice directo (1-4 de 4)
      return `Página ${currentPage} de ${TOTAL_PAGES - 2}`;
    }

    // Landscape: react-pageflip retorna el índice de la página izquierda
    // del spread. Con showCover=true y 6 páginas:
    //   e.data=1 → mostrando páginas 1-2
    //   e.data=3 → mostrando páginas 3-4
    // (Si la lib devuelve pares como 2/4, el +1/-1 sigue siendo legible)
    const right = Math.min(currentPage + 1, TOTAL_PAGES - 2);
    return `Páginas ${currentPage}–${right} de ${TOTAL_PAGES - 2}`;
  })();

  // ── Dimensiones responsivas del libro ──────────────────────────────
  //   • Móvil: 1 página visible, tamaño cómodo de pantalla
  //   • PC:    2 páginas visibles, más grande y airoso
  const bookWidth  = isMobile ? 300 : 430;
  const bookHeight = isMobile ? 460 : 590;

  return (
    <div className="app-container">

      {/* ══════════════════════════════════════════════════════════
          LIBRO INTERACTIVO
          key={isMobile ? 'p' : 'l'} fuerza re-montaje al cambiar
          orientación → evita estados internos corruptos de la lib
         ══════════════════════════════════════════════════════════ */}
      <HTMLFlipBook
        key={isMobile ? 'portrait' : 'landscape'}
        ref={bookRef}
        width={bookWidth}
        height={bookHeight}
        size="stretch"              /* escala dentro de sus límites */
        minWidth={240}
        maxWidth={isMobile ? 390 : 520}
        minHeight={360}
        maxHeight={isMobile ? 580 : 700}
        showCover={true}            /* portada/contraportada como tapa dura */
        drawShadow={true}
        flippingTime={760}
        usePortrait={isMobile}      /* 1 página en móvil, 2 en PC */
        startZIndex={0}
        maxShadowOpacity={0.45}
        mobileScrollSupport={true}
        onFlip={onFlip}
        className="flipbook"
      >

        {/* ── PORTADA (tapa dura naranja) ─────────────────────────── */}
        <Page bgColor="#fb923c" density="hard" className="page--cover-front">
          <div className="cover-deco cover-deco--tr" />
          <div className="cover-deco cover-deco--bl" />
          <Heart size={52} color="white" fill="white" strokeWidth={1.5} />
          <h1 className="cover-title">Mandarina</h1>
          <div className="cover-divider" />
          <p className="cover-subtitle">Para Miranda</p>
          <p className="cover-date">🍊 Un mes juntos · Junio 2025</p>
        </Page>

        {/* ── INTERIOR 1: Foto a sangre ────────────────────────────── */}
        <Page bgColor="#fffafb">
          <img
            src="/foto1.jpg"
            alt="Nuestro primer recuerdo"
            className="page-img-bleed"
          />
          <div className="page-caption">
            <p>El principio de todo 🌸</p>
          </div>
        </Page>

        {/* ── INTERIOR 2: Texto ────────────────────────────────────── */}
        <Page bgColor="#fff7f0">
          <Sparkles size={36} color="#fb923c" strokeWidth={1.5} />
          <h2 className="inner-title">Un mes que vale por mil</h2>
          <p className="inner-body">
            Desde que apareciste, cada día tiene un poco más de color.
            Gracias por ser tan tú.
          </p>
        </Page>

        {/* ── INTERIOR 3: Foto a sangre ────────────────────────────── */}
        <Page bgColor="#fffafb">
          <img
            src="/foto2.jpg"
            alt="Nuestra primera aventura"
            className="page-img-bleed"
          />
          <div className="page-caption">
            <p>Nuestra primera aventura ✨</p>
          </div>
        </Page>

        {/* ── INTERIOR 4: Texto cierre ─────────────────────────────── */}
        <Page bgColor="#fdf4ff">
          <Heart size={36} color="#a855f7" fill="#a855f7" strokeWidth={1.5} />
          <h2 className="inner-title inner-title--purple">Apenas empezamos</h2>
          <p className="inner-body">
            Hay infinitos momentos esperándonos. No puedo esperar
            a vivirlos todos contigo.
          </p>
        </Page>

        {/* ── CONTRAPORTADA (tapa dura morada) ────────────────────── */}
        <Page bgColor="#a855f7" density="hard" className="page--cover-back">
          <div className="cover-deco cover-deco--tr" />
          <div className="cover-deco cover-deco--bl" />
          <Heart size={52} color="white" fill="white" strokeWidth={1.5} />
          <h2 className="back-title">Te quiero</h2>
          <h2 className="back-title">muchísimo</h2>
          <div className="cover-divider" />
          <p className="back-subtitle">— Con amor, siempre —</p>
          <p className="back-date">💜 Miranda &amp; Yo</p>
        </Page>

      </HTMLFlipBook>

      {/* ══════════════════════════════════════════════════════════
          BARRA DE NAVEGACIÓN
          • Label dinámico reemplaza los dots problemáticos
          • Texto cambia según portrait/landscape y posición actual
         ══════════════════════════════════════════════════════════ */}
      <nav className="nav-bar" aria-label="Controles del libro">
        <button
          className="nav-btn"
          onClick={() => bookRef.current?.pageFlip().flipPrev()}
          disabled={isFirst}
          aria-label="Página anterior"
        >
          <ChevronLeft size={20} strokeWidth={2.5} />
        </button>

        <span className="nav-label" aria-live="polite">
          {pageLabel}
        </span>

        <button
          className="nav-btn"
          onClick={() => bookRef.current?.pageFlip().flipNext()}
          disabled={isLast}
          aria-label="Página siguiente"
        >
          <ChevronRight size={20} strokeWidth={2.5} />
        </button>
      </nav>

    </div>
  );
}
