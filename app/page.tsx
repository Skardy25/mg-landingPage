"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev == slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  
  const slides = [
    {
      image: "/carrousel/carrousell01.jpg",
      title: "Impresión Digital de Alta Calidad",
      description: "Producimos impresiones nítidas y coloridas que harán destacar tu negocio"
    },
    {
      image: "/carrousel/carrousell02.jpg",
      title: "Diseño Gráfico Profesional",
      description: "Nuestro equipo creativo dará vida a tus ideas con diseños impactantes"
    },
    {
      image: "/carrousel/carrousell03.png",
      title: "Entrega Rápida y Puntual",
      description: "Cumplimos con los plazos establecidos sin comprometer la calidad"
    }
  ];

  return (
    <section className="relative h-screen overflow-hidden">
    {/* Slides */}
    {slides.map((slide, index) => (
      <div 
        key={index}
        className={`absolute inset-0 transition-opacity duration-1000 ${
          index === activeSlide ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Imagen con overlay usando Next.js Image */}
        <div className="absolute inset-0">
          <div className="relative w-full h-full">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              sizes="100vw"
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
              }}
            />
            {/* Overlay para texto */}
            <div className="absolute inset-0 bg-black/70 z-10" />
          </div>
        </div>
        
        {/* Contenido del slide con animación */}
        <div className="relative h-full flex items-center z-20">
          <div className="container mx-auto px-4">
            <div className={`max-w-2xl transition-all duration-1000 ${
              index === activeSlide ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
            }`}>
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-blue-400">{slide.title}</h1>
              <p className="text-xl md:text-2xl mb-8 text-white">{slide.description}</p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200">
                  Cotizar Ahora
                </button>
                <button className="border border-white hover:bg-white hover:text-gray-900 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200">
                  Ver Portafolio
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))}
    
    {/* Indicadores del carrusel */}
    <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-3 z-30">
      {slides.map((_, index) => (
        <button
          key={index}
          onClick={() => setActiveSlide(index)}
          className={`w-3 h-3 rounded-full transition-all ${
            index === activeSlide 
              ? 'bg-blue-500 w-10' 
              : 'bg-gray-400 hover:bg-gray-300'
          }`}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  </section>
  );
}
