import React from 'react';
import HTMLFlipBook from 'react-pageflip';
import confetti from 'canvas-confetti';
// 1. IMPORTA EL ICONO DE CORAZÓN DE LUCIDE-REACT
import { Heart } from 'lucide-react'; 
import './App.css';

function App() {
  const fotos = [
    'frames/foto1.jpg', 
    'frames/foto2.jpg',
    'frames/foto3.jpg'
  ];

  const lanzarConfeti = () => {
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#fb923c', '#a855f7', '#f472b6', '#ffffff']
    });
  };

  return (
    <div style={{ 
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh',
      background: 'linear-gradient(135deg, #ffedd5 0%, #fdf2f8 50%, #f3e8ff 100%)',
      padding: '20px', fontFamily: 'sans-serif'
    }}>
      
      {/* Encabezado Superior */}
      <div style={{ textAlign: 'center', marginBottom: '30px', color: '#a855f7' }}>
        <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'normal', letterSpacing: '2px' }}>UN MES DE NOSOTROS</h2>
        <h1 style={{ margin: '5px 0 0 0', fontSize: '2.8rem', color: '#fb923c', fontFamily: 'serif' }}>Historia de Amor ✨</h1>
      </div>

      {/* Contenedor del Libro con borde mejorado */}
      <div style={{ 
        boxShadow: '0 25px 50px -12px rgba(168, 85, 247, 0.25)', 
        borderRadius: '16px', padding: '12px', background: 'rgba(255, 255, 255, 0.5)' 
      }}>
        <HTMLFlipBook width={350} height={480} showCover={true} className="miranda-book">
          
          {/* ------------------------------------------------------------ */}
          {/* PÁGINA 1: PORTADA MEJORADA CON ICONOS DE REACT */}
          {/* ------------------------------------------------------------ */}
          <div className="page">
            <div className="page-content bg-mandarina" style={{ padding: '30px', boxShadow: 'inset -5px 0 20px rgba(0,0,0,0.1)' }}>
              {/* Borde decorativo interno */}
              <div style={{ border: '2px solid rgba(255,255,255,0.7)', padding: '50px 20px', borderRadius: '15px', width: '90%', position: 'relative' }}>
                
                {/* ICONOS DE CORAZÓN DE REACT DECORATIVOS EN LAS ESQUINAS */}
                {/* Corazón arriba a la izquierda */}
                <Heart size={32} color="#f97316" fill="#f97316" style={{ position: 'absolute', top: '-15px', left: '-15px' }} />
                {/* Corazón abajo a la derecha */}
                <Heart size={32} color="#f97316" fill="#f97316" style={{ position: 'absolute', bottom: '-15px', right: '-15px' }} />

                <h1 style={{ fontSize: '3.2rem', marginBottom: '5px', fontFamily: 'serif', color: 'white' }}>Mandarina</h1>
                
                <div style={{ borderTop: '2px solid rgba(255,255,255,0.3)', margin: '15px 0' }}></div>
                
                {/* EMOJI ORIGINAL */}
                <div style={{ fontSize: '5rem', margin: '15px 0' }}>🍊</div>
                
                <p style={{ fontSize: '1.4rem', letterSpacing: '1px', color: 'white', fontWeight: 'bold' }}>
                   Para Miranda
                </p>
                
                {/* ICONO DE CORAZÓN MÁS PEQUEÑO JUNTO AL TEXTO FINAL */}
                <Heart size={20} color="#f97316" fill="#f97316" style={{ display: 'inline', marginLeft: '5px' }} />

              </div>
            </div>
          </div>

          {/* PÁGINAS DE FOTOS INTERNAS (SIN CAMBIOS) */}
          {fotos.map((ruta, index) => (
            <div key={index} className="page">
              <div className="page-content bg-papel" style={{ 
                padding: '15px',
                boxShadow: index % 2 === 0 ? 'inset -5px 0 20px rgba(0,0,0,0.05)' : 'inset 5px 0 20px rgba(0,0,0,0.05)' 
              }}>
                <div style={{ 
                  width: '100%', height: '100%', border: '1px solid #fbcfe8', 
                  borderRadius: '8px', overflow: 'hidden', backgroundColor: '#fff',
                  display: 'flex', justifyContent: 'center', alignItems: 'center'
                }}>
                  <img 
                    src={ruta} 
                    alt={`Recuerdo ${index + 1}`} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => { e.target.src = 'https://placehold.co/350x480/fdf2f8/ec4899?text=Tu+Foto+Aqui'; }}
                  />
                </div>
              </div>
            </div>
          ))}

          {/* ÚLTIMA PÁGINA (SIN CAMBIOS) */}
          <div className="page">
            <div className="page-content bg-lavanda" style={{ padding: '20px', boxShadow: 'inset 5px 0 20px rgba(0,0,0,0.1)' }}>
              <div style={{ fontSize: '4rem', animation: 'pulse 2s infinite' }}>💜</div>
              <h2 style={{ fontSize: '2rem', fontFamily: 'serif', margin: '20px 0' }}>¡Te quiero muchísimo!</h2>
              <p style={{ marginBottom: '30px', fontSize: '1.1rem', opacity: 0.9 }}>Feliz primer mes, hermosa.</p>
              
              <button 
                onClick={lanzarConfeti}
                style={{
                  padding: '12px 25px', fontSize: '1.1rem', backgroundColor: '#fb923c', color: 'white',
                  border: 'none', borderRadius: '30px', cursor: 'pointer', fontWeight: 'bold',
                  boxShadow: '0 4px 15px rgba(251, 146, 60, 0.4)', transition: 'transform 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                Toca aquí ✨
              </button>
            </div>
          </div>

        </HTMLFlipBook>
      </div>

      <div style={{ marginTop: '30px', color: '#9333ea', fontSize: '0.9rem', opacity: 0.7 }}>
        Desliza para abrir el libro
      </div>

    </div>
  );
}

export default App;