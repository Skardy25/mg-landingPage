"use client";
import { useEffect, useRef } from 'react';
import Script from 'next/script';

// Esta declaración permite que TypeScript reconozca two-up como un elemento válido
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'two-up': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

const DesignToRealitySection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Esta función se ejecuta solo en el cliente después de que el componente se monte
    const loadTwoUpElement = async () => {
      // Solo cargamos el script si two-up no está ya definido como elemento personalizado
      if (!customElements.get('two-up')) {
        try {
          // Importa dinámicamente el script
          //await import('https://unpkg.com/two-up-element@1.0.1/dist/two-up.js');
        } catch (error) {
          console.error('Error loading two-up-element:', error);
        }
      }
    };

    loadTwoUpElement();
  }, []);

  return (
    <section className="bg-gray-900 py-20 px-4 md:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-blue-500 text-lg font-semibold uppercase mb-2">Del concepto a la realidad</h2>
          <h3 className="text-white text-4xl font-bold">Transformamos ideas en productos</h3>
          <div className="w-20 h-1 bg-blue-600 mx-auto mt-4"></div>
        </div>
        
        <div className="max-w-5xl mx-auto" ref={containerRef}>
          {/* Contenedor del two-up */}
          <div className="relative rounded-lg overflow-hidden shadow-2xl">
            {/* Two-Up Element */}
            <div id="two-up-container" className="w-full h-full"></div>
            
            {/* Instrucciones de uso */}
            <div className="absolute top-4 left-0 right-0 flex justify-center">
              <div className="bg-blue-600/80 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm">
                Desliza para comparar diseño y resultado final
              </div>
            </div>
          </div>
          
          {/* Información adicional */}
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h4 className="text-blue-400 text-xl font-bold mb-3">Proceso de diseño</h4>
              <p className="text-gray-300">
                Nuestro equipo trabaja estrechamente contigo para entender tu visión 
                y convertirla en un diseño profesional que cumpla con tus expectativas.
                Utilizamos las herramientas más avanzadas para crear prototipos digitales
                que te permitirán visualizar el producto final.
              </p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg">
              <h4 className="text-blue-400 text-xl font-bold mb-3">Producción de calidad</h4>
              <p className="text-gray-300">
                Una vez aprobado el diseño, nuestros especialistas lo transforman
                en un producto tangible con los más altos estándares de calidad.
                Cada detalle es cuidadosamente supervisado para garantizar un
                resultado final que supere tus expectativas.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Script para cargar y configurar two-up-element */}
      <Script id="two-up-script">
        {`
          // Esperamos a que el DOM esté completamente cargado
          document.addEventListener('DOMContentLoaded', function() {
            // Importamos two-up-element
            import('https://unpkg.com/two-up-element@1.0.1/dist/two-up.js')
              .then(() => {
                // Creamos el elemento two-up
                const twoUpElement = document.createElement('two-up');
                twoUpElement.style.height = '600px';
                
                // Crear primer contenedor (diseño)
                const firstDiv = document.createElement('div');
                firstDiv.className = 'relative';
                firstDiv.innerHTML = \`
                  <img 
                    src="/api/placeholder/1200/800" 
                    alt="Diseño del producto" 
                    class="w-full object-cover"
                    style="height: 600px;"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-center p-8">
                    <div class="text-center">
                      <div class="text-blue-400 text-2xl font-semibold mb-2">
                        Creamos tu diseño
                      </div>
                      <p class="text-white text-lg max-w-md mx-auto">
                        Conceptualización profesional para cada proyecto
                      </p>
                    </div>
                  </div>
                \`;
                
                // Crear segundo contenedor (realidad)
                const secondDiv = document.createElement('div');
                secondDiv.className = 'relative';
                secondDiv.innerHTML = \`
                  <img 
                    src="/api/placeholder/1200/800" 
                    alt="Producto terminado" 
                    class="w-full object-cover"
                    style="height: 600px;"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-center p-8">
                    <div class="text-center">
                      <div class="text-blue-400 text-2xl font-semibold mb-2">
                        Lo hacemos realidad
                      </div>
                      <p class="text-white text-lg max-w-md mx-auto">
                        Producción de alta calidad con atención al detalle
                      </p>
                    </div>
                  </div>
                \`;
                
                // Añadir los divs al elemento two-up
                twoUpElement.appendChild(firstDiv);
                twoUpElement.appendChild(secondDiv);
                
                // Añadir el elemento two-up al contenedor
                const container = document.getElementById('two-up-container');
                if (container) {
                  container.appendChild(twoUpElement);
                  
                  // Aplicar estilos personalizados
                  const styleSheet = document.createElement('style');
                  styleSheet.textContent = \`
                    two-up {
                      --divider-width: 2px;
                      --divider-color: #2563eb; /* blue-600 */
                      touch-action: pan-y pinch-zoom;
                    }
                    
                    two-up::part(divider) {
                      width: var(--divider-width);
                      background-color: var(--divider-color);
                    }
                    
                    two-up::part(handle) {
                      width: 44px;
                      height: 44px;
                      background-color: #2563eb;
                      border-radius: 50%;
                      box-shadow: 0 0 0 6px rgba(37, 99, 235, 0.2);
                      position: relative;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      transform: translateX(calc(var(--divider-width) / -2));
                    }
                    
                    two-up::part(handle)::after,
                    two-up::part(handle)::before {
                      content: '';
                      position: absolute;
                      width: 12px;
                      height: 2px;
                      background-color: white;
                    }
                    
                    two-up::part(handle)::after {
                      transform: rotate(45deg);
                    }
                    
                    two-up::part(handle)::before {
                      transform: rotate(-45deg);
                    }
                  \`;
                  document.head.appendChild(styleSheet);
                }
              })
              .catch(error => {
                console.error('Error al cargar two-up-element:', error);
              });
          });
          
          // En caso de que el evento DOMContentLoaded ya haya pasado
          if (document.readyState === 'complete' || document.readyState === 'interactive') {
            // Intentamos importar two-up-element de nuevo
            import('https://unpkg.com/two-up-element@1.0.1/dist/two-up.js')
              .catch(error => console.error('Error al cargar two-up-element:', error));
          }
        `}
      </Script>
    </section>
  );
};

export default DesignToRealitySection;