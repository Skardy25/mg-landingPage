"use client";
import { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, X, Printer, Layers, Layout, Image as ImageIcon, Package, FileText, Info } from 'lucide-react';

interface IGalleryItem {
    id: number,
    title: string,
    category: string,
    description: string,
    specs: string,
    price: string,
    isVertical: false,
    image: string
}
const Services = () => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<IGalleryItem>({} as  IGalleryItem);
    const [fadeIn, setFadeIn] = useState(false);
    const [filteredItems, setFilteredItems] = useState<IGalleryItem[]>([]);

    const galleryItems = [
        {
          id: 1,
          title: "Brochure Corporativo",
          category: "folletos",
          description: "Brochure tríptico con diseño moderno para presentación de servicios empresariales.",
          specs: "Papel couché 150g, impresión full color, tamaño A4 extendido",
          price: "Desde S/. 250 x 100 unidades",
          isVertical: true,
          image: "/services/brochure01.jpg"
        },
        {
          id: 2,
          title: "Folleto Promocional",
          category: "folletos",
          description: "Folleto informativo para promociones temporales y eventos especiales.",
          specs: "Papel bond 90g, impresión a doble cara, tamaño A5",
          price: "Desde S/. 180 x 100 unidades",
          isVertical: true,
          image: "/services/folleto01.jpg"
        },
        {
          id: 3,
          title: "Banner Roll-Up",
          category: "banners",
          description: "Banner retráctil de aluminio para ferias y eventos corporativos.",
          specs: "Lona front 13oz, impresión eco-solvente, 0.85 x 2m",
          price: "Desde S/. 120 por unidad",
          isVertical: true,
          image: "/api/placeholder/400/600"
        },
        {
          id: 4,
          title: "Banner Publicitario",
          category: "banners",
          description: "Banner horizontal para exteriores con ojales reforzados.",
          specs: "Lona banner 13oz, impresión eco-solvente, 2 x 1m",
          price: "Desde S/. 90 por unidad",
          isVertical: false,
          image: "/api/placeholder/600/400"
        },
        {
          id: 5,
          title: "Tazas Personalizadas",
          category: "merchandising",
          description: "Tazas cerámicas con logo corporativo para regalo empresarial.",
          specs: "Taza cerámica blanca 11oz, impresión por sublimación",
          price: "Desde S/. 15 por unidad (mín. 20 unidades)",
          isVertical: false,
          image: "/api/placeholder/600/400"
        },
        {
          id: 6,
          title: "Lapiceros Corporativos",
          category: "merchandising",
          description: "Lapiceros personalizados con logo de empresa para promociones.",
          specs: "Lapicero plástico, impresión tampográfica 1 color",
          price: "Desde S/. 1.50 por unidad (mín. 100 unidades)",
          isVertical: true,
          image: "/api/placeholder/400/600"
        },
        {
          id: 7,
          title: "Carpeta Corporativa",
          category: "folders",
          description: "Carpeta con bolsillo interior y troquel para tarjeta de presentación.",
          specs: "Cartulina couché 300g, impresión full color, plastificado mate",
          price: "Desde S/. 350 x 100 unidades",
          isVertical: false,
          image: "/api/placeholder/600/400"
        },
        {
          id: 8,
          title: "Tarjetas de Presentación",
          category: "papeleria",
          description: "Tarjetas elegantes con acabados premium para contactos profesionales.",
          specs: "Papel couché 300g, impresión full color, plastificado mate",
          price: "Desde S/. 120 x 1000 unidades",
          isVertical: true,
          image: "/api/placeholder/400/600"
        },
        {
          id: 9,
          title: "Tríptico Informativo",
          category: "folletos",
          description: "Tríptico con información detallada de productos o servicios.",
          specs: "Papel couché 115g, impresión full color ambas caras",
          price: "Desde S/. 220 x 100 unidades",
          isVertical: false,
          image: "/api/placeholder/600/400"
        },
        {
          id: 10,
          title: "Afiche Publicitario",
          category: "afiches",
          description: "Afiche de gran formato para promoción de eventos y ofertas.",
          specs: "Papel couché 150g, impresión full color, tamaño A2",
          price: "Desde S/. 280 x 50 unidades",
          isVertical: true,
          image: "/services/afiche01.jpg"
        },
        {
          id: 11,
          title: "Calendario de Escritorio",
          category: "papeleria",
          description: "Calendario personalizado con base triangular para escritorio.",
          specs: "Base en cartulina 300g, hojas en couché 150g, espiral metálico",
          price: "Desde S/. 8 por unidad (mín. 50 unidades)",
          isVertical: false,
          image: "/api/placeholder/600/400"
        },
        {
          id: 12,
          title: "Banner Mesh",
          category: "banners",
          description: "Banner microperforado para fachadas y estructuras exteriores.",
          specs: "Lona mesh 9oz, impresión eco-solvente, tamaño personalizado",
          price: "Desde S/. 28 por m²",
          isVertical: false,
          image: "/api/placeholder/600/400"
        }
      ];
    
    const categories = [
        { id: 'all', name: 'Todos', icon: <Layout className="w-5 h-5" /> },
        { id: 'folletos', name: 'Folletos', icon: <FileText className="w-5 h-5" /> },
        { id: 'banners', name: 'Banners', icon: <ImageIcon className="w-5 h-5" /> },
        { id: 'merchandising', name: 'Merchandising', icon: <Package className="w-5 h-5" /> },
        { id: 'folders', name: 'Folders', icon: <Layers className="w-5 h-5" /> },
        { id: 'papeleria', name: 'Papelería', icon: <Printer className="w-5 h-5" /> },
        { id: 'afiches', name: 'Afiches', icon: <ImageIcon className="w-5 h-5" /> }
      ];

    useEffect(() => {
        const filtered = activeCategory === 'all'
        ? galleryItems
        : galleryItems.filter(item => item.category === activeCategory);
        
        setFilteredItems([]);
        setTimeout(() => {
            setFilteredItems(filtered as []);
            setFadeIn(true);
        }, 300);

    }, [activeCategory]);

    const handleCategoryChange = (categoryId: string) => {
        setFadeIn(false);
        setTimeout(() => {
            setActiveCategory(categoryId);
            //setFadeIn(true);
        }, 300);
    };

    const openModal = (item: any) => {
        setSelectedItem(item);
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setIsModalOpen(false);
        document.body.style.overflow = 'auto';
    };

    const navigateItem = (direction: 'left' | 'right') => {
        const currentIndex = filteredItems.findIndex((item: { id: number }) => item.id === selectedItem?.id);
        let newIndex;
        if(direction === 'left') {
            newIndex = (currentIndex - 1) % filteredItems.length; 
        } else {
            newIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
        }

        setSelectedItem(filteredItems[newIndex]);
    };



    return (
        <div className="bg-gray-900 py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-blue-500 text-lg font-semibold uppercase mb-2">Nuestros Servicios</h2>
          <h3 className="text-white text-4xl font-bold">Catálogo de Productos</h3>
          <div className="w-20 h-1 bg-blue-600 mx-auto mt-4"></div>
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-blue-700'
              }`}
            >
              {category.icon}
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-xl bg-gray-800 transform hover:-translate-y-1 transition-all duration-300 shadow-lg cursor-pointer"
              onClick={() => openModal(item)}
            >
              <div className={`relative ${item.isVertical ? 'pt-[150%]' : 'pt-[75%]'}`}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform transition-transform duration-300">
                  <h4 className="text-lg font-bold mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{item.description}</p>
                  <div className="mt-3 flex items-center gap-1 text-xs text-blue-400">
                    <Info className="w-4 h-4" />
                    <span>Ver detalles</span>
                  </div>
                </div>
              </div>
              <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-full capitalize">
                {item.category}
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredItems.length === 0 && fadeIn && (
          <div className="text-center py-20 text-gray-400">
            <Layout className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <h4 className="text-xl font-medium">No se encontraron productos</h4>
            <p className="mt-2">Intenta con otra categoría</p>
          </div>
        )}

        {/* Modal */}
        {isModalOpen && selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75 backdrop-blur-sm">
            <div 
              className="relative bg-gray-900 rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="absolute top-4 right-4 z-10 bg-gray-800 hover:bg-gray-700 p-2 rounded-full text-white transition-colors duration-200"
                onClick={closeModal}
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col md:flex-row h-full">
                {/* Image container - adaptive to orientation */}
                <div className={`md:w-1/2 ${selectedItem.isVertical ? 'h-[60vh] md:h-auto' : 'h-[40vh] md:h-auto'}`}>
                  <img 
                    src={selectedItem.image} 
                    alt={selectedItem.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="md:w-1/2 p-6 overflow-y-auto">
                  <span className="text-blue-500 text-sm font-semibold uppercase">{selectedItem.category}</span>
                  <h3 className="text-white text-2xl font-bold mt-1">{selectedItem.title}</h3>
                  
                  <p className="text-gray-300 mt-4">{selectedItem.description}</p>
                  
                  <div className="mt-6 space-y-4">
                    <div className="bg-gray-800 rounded-lg p-4">
                      <h4 className="text-blue-400 font-medium mb-2">Especificaciones</h4>
                      <p className="text-gray-300 text-sm">{selectedItem.specs}</p>
                    </div>
                    
                    <div className="bg-gray-800 rounded-lg p-4">
                      <h4 className="text-blue-400 font-medium mb-2">Precio Referencial</h4>
                      <p className="text-gray-300 text-sm">{selectedItem.price}</p>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg w-full transition-colors duration-300">
                      Solicitar Cotización
                    </button>
                  </div>
                </div>
              </div>

              {/* Navigation arrows */}
              <button 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full text-white transition-colors duration-200"
                onClick={() => navigateItem("left")}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <button 
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full text-white transition-colors duration-200"
                onClick={() => navigateItem("right")}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
    );
}

export default Services;
