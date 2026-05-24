import React from 'react';
import HTMLFlipBook from 'react-pageflip';
import confetti from 'canvas-confetti';

function App() {
  // Nombres de tus fotos reales en public/frames/
  const fotos = [
    'frames/foto1.jpg', 
    'frames/foto2.jpg',
    'frames/foto3.jpg'
  ];

  // Función para lanzar el confeti personalizado
  const lanzarConfeti = () => {
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#fb923c', '#a855f7', '#f472b6', '#ffffff'] // Naranja, Morado, Rosa y Blanco
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
        <h1 style={{ margin: '5px 0 0 0', fontSize: '2.8rem', color: '#fb923c', fontFamily: 'serif' }}>Historia de Amor</h1>
      </div>

      {/* Contenedor del Libro */}
      <div style={{ 
        boxShadow: '0 25px 50px -12px rgba(168, 85, 247, 0.25)', 
        borderRadius: '12px', padding: '10px', background: 'rgba(255, 255, 255, 0.4)' 
      }}>
        <HTMLFlipBook width={350} height={480} showCover={true} className="miranda-book">
          
          {/* PÁGINA 1: PORTADA */}
          <div className="page" style={{ 
            backgroundColor: '#fb923c', color: 'white', display: 'flex', flexDirection: 'column', 
            justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '30px',
            boxShadow: 'inset -5px 0 20px rgba(0,0,0,0.1)'
          }}>
            <div style={{ border: '2px solid rgba(255,255,255,0.5)', padding: '40px 20px', borderRadius: '10px' }}>
              <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', fontFamily: 'serif' }}>Mandarina</h1>
              <div style={{ fontSize: '4rem', margin: '20px 0' }}>🍊</div>
              <p style={{ fontSize: '1.2rem', letterSpacing: '1px' }}>Para Miranda ❤️</p>
            </div>
          </div>

          {/* PÁGINAS DE FOTOS INTERNAS */}
          {fotos.map((ruta, index) => (
            <div key={index} className="page" style={{ 
              backgroundColor: '#fffafb', padding: '15px',
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
          ))}

          {/* ÚLTIMA PÁGINA: CONTRAPORTADA INTERACTIVA */}
          <div className="page" style={{ 
            backgroundColor: '#a855f7', color: 'white', display: 'flex', flexDirection: 'column',
            justifyContent: 'center', alignItems: 'center', textAlign: 'center',
            boxShadow: 'inset 5px 0 20px rgba(0,0,0,0.1)'
          }}>
            <div style={{ padding: '20px' }}>
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

      {/* Pie de página */}
      <div style={{ marginTop: '30px', color: '#9333ea', fontSize: '0.9rem', opacity: 0.7 }}>
        Desliza para abrir el libro 📖
      </div>

    </div>
  );
}

export default App;