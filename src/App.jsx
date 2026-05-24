import React from 'react';
import HTMLFlipBook from 'react-pageflip';

function App() {
  // Nombres de tus imágenes dentro de public/frames/
  // Fíjate que NO llevan un '/' al inicio.
  const fotos = [
    'frames/foto1.jpg',
    'frames/foto2.jpg',
    'frames/foto3.jpg'
  ];

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#1a1a1a' }}>
      <HTMLFlipBook width={350} height={450} showCover={true}>
        
        {/* PÁGINA 1: PORTADA */}
        <div className="page" style={{ backgroundColor: '#bc84ee', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
          <h1 style={{ color: 'white', fontFamily: 'sans-serif', textAlign: 'center' }}>Para Miranda</h1>
          <p style={{ color: 'white', fontSize: '1.2rem', marginTop: '10px' }}>Feliz Primer Mes ❤️</p>
        </div>

        {/* PÁGINAS INTERNAS CON TUS DIBUJOS/FOTOS */}
        {fotos.map((ruta, index) => (
          <div key={index} className="page" style={{ backgroundColor: 'white' }}>
            <img 
              src={ruta} 
              alt={`Página ${index + 1}`} 
              style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
            />
          </div>
        ))}

        {/* ÚLTIMA PÁGINA: CONTRAPORTADA */}
        <div className="page" style={{ backgroundColor: '#bc84ee', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <h2 style={{ color: 'white', fontFamily: 'sans-serif' }}>Te quiero</h2>
        </div>

      </HTMLFlipBook>
    </div>
  );
}

export default App;