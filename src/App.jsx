import React, { useRef, useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { Heart, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import './App.css';

// ─────────────────────────────────────────────────────────
// COMPONENTE PAGE — Arquitectura de dos capas anti-fantasma
// ─────────────────────────────────────────────────────────
const Page = React.forwardRef(({ bgColor, density = 'soft', className = '', children }, ref) => {
  return (
    /**
     * CAPA 1 — Root (capturado por el canvas de react-pageflip)
     * - Recibe el ref de la librería (NO mover)
     * - Solo lleva: background-color (inline), position:relative y overflow:hidden
     * - NUNCA pongas display:flex aquí → la librería lo sobrescribirá
     */
    <div
      ref={ref}
      className={`page ${className}`}
      style={{ backgroundColor: bgColor }}
      data-density={density}  // 'hard' para tapas duras, 'soft' para páginas internas
    >
      {/**
       * CAPA 2 — Content (tu lienzo de diseño, libre de la librería)
       * - position:absolute + inset:0 lo ancla al padre sin romper su fondo
       * - Aquí vive TODO tu layout: flex, padding, tipografía, imágenes
       */}
      <div className="page-content">
        {children}
      </div>
    </div>
  );
});

Page.displayName = 'Page';

// ─────────────────────────────────────────────────────────
// APP PRINCIPAL
// ─────────────────────────────────────────────────────────
function App() {
  const bookRef = useRef();
  const [currentPage, setCurrentPage] = useState(0);
  const TOTAL_PAGES = 6; // Incluye portada y contraportada

  const onFlip = (e) => {
    setCurrentPage(e.data);

    // Sorpresa de confeti al llegar a la contraportada (última página)
    if (e.data >= TOTAL_PAGES - 1) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#fb923c', '#a855f7', '#f9a8d4', '#fde68a'],
      });
    }
  };

  return (
    <div className="app-container">

      <HTMLFlipBook
        ref={bookRef}
        width={340}
        height={480}
        size="fixed"
        minWidth={280}
        maxWidth={400}
        minHeight={400}
        maxHeight={560}
        showCover={true}         // Activa el modo tapa dura para primera y última página
        drawShadow={true}
        flippingTime={750}
        usePortrait={false}      // Modo libro (dos páginas visibles)
        startZIndex={0}
        maxShadowOpacity={0.4}
        mobileScrollSupport={true}
        onFlip={onFlip}
        className="flipbook"
      >

        {/* ── PORTADA (tapa dura naranja) ─────────────────── */}
        <Page bgColor="#fb923c" density="hard" className="page--cover-front">
          <div className="cover-decoration cover-decoration--top" />
          <Heart size={52} color="white" fill="white" strokeWidth={1.5} />
          <h1 className="cover-title">Mandarina</h1>
          <div className="cover-divider" />
          <p className="cover-subtitle">Para Miranda</p>
          <p className="cover-date">🍊 Un mes juntos · Junio 2025</p>
          <div className="cover-decoration cover-decoration--bottom" />
        </Page>

        {/* ── PÁGINA INTERIOR 1 (foto a sangre) ──────────── */}
        <Page bgColor="#fffafb">
          <img
            src="/foto1.jpg"
            alt="Nuestro primer recuerdo"
            className="page-image-bleed"
          />
          <div className="page-caption">
            <p>El principio de todo 🌸</p>
          </div>
        </Page>

        {/* ── PÁGINA INTERIOR 2 (texto + ícono) ──────────── */}
        <Page bgColor="#fff7f0">
          <Sparkles size={36} color="#fb923c" strokeWidth={1.5} />
          <h2 className="inner-title">Un mes que vale por mil</h2>
          <p className="inner-body">
            Desde que apareciste, cada día tiene un poco más de color.
            Gracias por ser tan tú.
          </p>
        </Page>

        {/* ── PÁGINA INTERIOR 3 (foto a sangre) ──────────── */}
        <Page bgColor="#fffafb">
          <img
            src="/foto2.jpg"
            alt="Nuestra aventura"
            className="page-image-bleed"
          />
          <div className="page-caption">
            <p>Nuestra primera aventura ✨</p>
          </div>
        </Page>

        {/* ── PÁGINA INTERIOR 4 (texto cierre) ───────────── */}
        <Page bgColor="#fdf4ff">
          <Heart size={36} color="#a855f7" fill="#a855f7" strokeWidth={1.5} />
          <h2 className="inner-title inner-title--purple">Apenas empezamos</h2>
          <p className="inner-body">
            Hay infinitos momentos esperándonos. No puedo esperar a vivirlos todos contigo.
          </p>
        </Page>

        {/* ── CONTRAPORTADA (tapa dura morada) ───────────── */}
        <Page bgColor="#a855f7" density="hard" className="page--cover-back">
          <div className="cover-decoration cover-decoration--top" />
          <Heart size={52} color="white" fill="white" strokeWidth={1.5} />
          <h2 className="back-title">Te quiero</h2>
          <h2 className="back-title">muchísimo</h2>
          <div className="cover-divider cover-divider--white" />
          <p className="back-subtitle">— Con amor, siempre —</p>
          <p className="back-date">💜 Miranda &amp; Yo</p>
          <div className="cover-decoration cover-decoration--bottom" />
        </Page>

      </HTMLFlipBook>

      {/* ── CONTROLES DE NAVEGACIÓN ─────────────────────── */}
      <nav className="nav-controls" aria-label="Controles del libro">
        <button
          className="nav-btn"
          onClick={() => bookRef.current?.pageFlip().flipPrev()}
          disabled={currentPage === 0}
          aria-label="Página anterior"
        >
          <ChevronLeft size={22} />
        </button>

        <div className="nav-dots">
          {Array.from({ length: TOTAL_PAGES }).map((_, i) => (
            <button
              key={i}
              className={`nav-dot ${i === currentPage ? 'nav-dot--active' : ''}`}
              onClick={() => bookRef.current?.pageFlip().flip(i)}
              aria-label={`Ir a página ${i + 1}`}
            />
          ))}
        </div>

        <button
          className="nav-btn"
          onClick={() => bookRef.current?.pageFlip().flipNext()}
          disabled={currentPage >= TOTAL_PAGES - 1}
          aria-label="Página siguiente"
        >
          <ChevronRight size={22} />
        </button>
      </nav>

    </div>
  );
}

export default App;