import React, { useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import confetti from 'canvas-confetti';
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import './App.css';

const Page = React.forwardRef((props, ref) => {
  return (
    // LA SOLUCIÓN: El color (bgClass) ahora está en la capa principal junto con el ref
    <div className={`page ${props.isCover ? 'page-cover' : ''} ${props.bgClass}`} ref={ref}>
      <div className="page-content" style={props.style}>
        {props.children}
      </div>
    </div>
  );
});

function App() {
  const bookRef = useRef(); 
  
  const fotos = [
    'frames/foto1.jpg', 
    'frames/foto2.jpg',
    'frames/foto3.jpg'
  ];

  const lanzarConfeti = () => {
    confetti({
      particleCount: 150, spread: 90, origin: { y: 0.6 },
      colors: ['#fb923c', '#a855f7', '#f472b6', '#ffffff']
    });
  };

  const nextButtonClick = () => bookRef.current.pageFlip().flipNext();
  const prevButtonClick = () => bookRef.current.pageFlip().flipPrev();

  return (
    <div style={{ 
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh',
      background: 'linear-gradient(135deg, #ffedd5 0%, #fdf2f8 50%, #f3e8ff 100%)',
      padding: '20px', fontFamily: 'sans-serif'
    }}>
      
      <div style={{ textAlign: 'center', marginBottom: '20px', color: '#a855f7' }}>
        <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 'normal', letterSpacing: '2px' }}>UN MES DE NOSOTROS</h2>
        <h1 style={{ margin: '5px 0 0 0', fontSize: '2.5rem', color: '#fb923c', fontFamily: 'serif' }}>Historia de Amor ✨</h1>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <button onClick={prevButtonClick} style={btnStyle}><ChevronLeft size={24} /></button>

        <div style={{ borderRadius: '16px', padding: '12px', background: 'rgba(255, 255, 255, 0.3)' }}>
          <HTMLFlipBook 
            width={350} height={480} 
            showCover={true}
            className="miranda-book"
            ref={bookRef}
            maxShadowOpacity={0.5} /* Restaurado para mejor efecto de sombra */
          >
            
            {/* PORTADA */}
            <Page isCover={true} bgClass="bg-mandarina" style={{ padding: '30px' }}>
              <div style={{ border: '2px solid rgba(255,255,255,0.7)', padding: '50px 20px', borderRadius: '15px', width: '90%', position: 'relative' }}>
                <Heart size={32} color="#f97316" fill="#f97316" style={{ position: 'absolute', top: '-15px', left: '-15px' }} />
                <Heart size={32} color="#f97316" fill="#f97316" style={{ position: 'absolute', bottom: '-15px', right: '-15px' }} />
                <h1 style={{ fontSize: '3.2rem', marginBottom: '5px', fontFamily: 'serif', color: 'white' }}>Mandarina</h1>
                <div style={{ borderTop: '2px solid rgba(255,255,255,0.3)', margin: '15px 0' }}></div>
                <div style={{ fontSize: '5rem', margin: '15px 0' }}>🍊</div>
                <p style={{ fontSize: '1.4rem', letterSpacing: '1px', color: 'white', fontWeight: 'bold' }}>Para Miranda</p>
                <Heart size={20} color="#f97316" fill="#f97316" style={{ display: 'inline', marginLeft: '5px' }} />
              </div>
            </Page>

            {/* PÁGINAS INTERNAS */}
            {fotos.map((ruta, index) => (
              <Page key={index} isCover={false} bgClass="bg-papel" style={{ padding: '15px' }}>
                <div style={{ width: '100%', height: '100%', border: '1px solid #fbcfe8', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <img src={ruta} alt={`Recuerdo ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.src = 'https://placehold.co/350x480/fdf2f8/ec4899?text=Tu+Foto+Aqui'; }} />
                </div>
              </Page>
            ))}

            {/* CONTRAPORTADA */}
            <Page isCover={true} bgClass="bg-lavanda" style={{ padding: '20px' }}>
              <div style={{ fontSize: '4rem', animation: 'pulse 2s infinite' }}>💜</div>
              <h2 style={{ fontSize: '2rem', fontFamily: 'serif', margin: '20px 0' }}>¡Te quiero muchísimo!</h2>
              <p style={{ marginBottom: '30px', fontSize: '1.1rem', opacity: 0.9 }}>Feliz primer mes, hermosa.</p>
              <button onClick={lanzarConfeti} style={confetiBtnStyle} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                Toca aquí ✨
              </button>
            </Page>

          </HTMLFlipBook>
        </div>

        <button onClick={nextButtonClick} style={btnStyle}><ChevronRight size={24} /></button>

      </div>
    </div>
  );
}

const btnStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.7)', border: 'none', borderRadius: '50%',
  width: '50px', height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center',
  cursor: 'pointer', color: '#a855f7', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', transition: 'all 0.2s'
};

const confetiBtnStyle = {
  padding: '12px 25px', fontSize: '1.1rem', backgroundColor: '#fb923c', color: 'white',
  border: 'none', borderRadius: '30px', cursor: 'pointer', fontWeight: 'bold',
  boxShadow: '0 4px 15px rgba(251, 146, 60, 0.4)', transition: 'transform 0.2s'
};

export default App;