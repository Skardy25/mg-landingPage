"use client";
import { useState, useEffect } from 'react';
import { Menu, X, Printer, FileText, Phone, Mail, Home } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [visible, setVisible] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
       const handleScroll = () => {
            if(window.scrollY > 10){
                setScrolled(true);
                setVisible(false);
            } else  {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(true);
        }, 300);
        return () => clearTimeout(timer);
    }, [])

    return (
        <header 
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-gray-900/90 backdrop-blur-sm py-2 shadow-lg' : 'bg-transparent py-4'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo con animación */}
            <div 
              className={`transition-all duration-1000 transform ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
              }`}
            >
                <div className="h-15 w-50 relative">
                    <Image
                        fill
                        alt="logo"
                        className="object-cover"
                        src="/logo.png" 
                    />
                </div>
             
            </div>
            
            {/* Enlaces de navegación - desktop */}
            <nav 
              className={`hidden md:flex space-x-8 transition-all duration-1000 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <Link href="/" className="flex items-center space-x-1 hover:text-blue-400 transition-colors">
                <Home size={18} />
                <span>Inicio</span>
              </Link>
              <Link href="/services" className="flex items-center space-x-1 hover:text-blue-400 transition-colors">
                <Printer size={18} />
                <span>Servicios</span>
              </Link>
              <Link href="#" className="flex items-center space-x-1 hover:text-blue-400 transition-colors">
                <FileText size={18} />
                <span>Portafolio</span>
              </Link>
              <Link href="#" className="flex items-center space-x-1 hover:text-blue-400 transition-colors">
                <Phone size={18} />
                <span>Contacto</span>
              </Link>
            </nav>
            
            {/* Botón de menú mobile */}
            <button 
              className={`md:hidden transition-all duration-1000 ${
                visible ? 'opacity-100' : 'opacity-0'
              }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Menú mobile */}
        <div 
          className={`md:hidden transition-all duration-300 mt-1 ${
            mobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className="bg-gray-800 py-4">
            <div className="container mx-auto px-4 flex flex-col space-y-4">
              <a href="#" className="flex items-center space-x-2 px-4 py-2 rounded hover:bg-gray-700">
                <Home size={18} />
                <span>Inicio</span>
              </a>
              <a href="#" className="flex items-center space-x-2 px-4 py-2 rounded hover:bg-gray-700">
                <Printer size={18} />
                <span>Servicios</span>
              </a>
              <a href="#" className="flex items-center space-x-2 px-4 py-2 rounded hover:bg-gray-700">
                <FileText size={18} />
                <span>Portafolio</span>
              </a>
              <a href="#" className="flex items-center space-x-2 px-4 py-2 rounded hover:bg-gray-700">
                <Phone size={18} />
                <span>Contacto</span>
              </a>
            </div>
          </div>
        </div>
      </header>
    );
}

export default Navbar;
