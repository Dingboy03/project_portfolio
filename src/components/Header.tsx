import React, { useState } from 'react';
import { Menu, X, Brain } from 'lucide-react';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">Yanogo Azania</span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => scrollToSection('accueil')}
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Accueil
            </button>
            <button
              onClick={() => scrollToSection('projets')}
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Projets
            </button>
            <button
              onClick={() => scrollToSection('domains')}
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Domaines & Compétences
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              À propos
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Contact
            </button>
          </nav>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection('accueil')}
                className="text-left text-gray-600 hover:text-blue-600 transition-colors"
              >
                Accueil
              </button>
              <button
                onClick={() => scrollToSection('projets')}
                className="text-left text-gray-600 hover:text-blue-600 transition-colors"
              >
                Projets
              </button>
              <button
                onClick={() => scrollToSection('domains')}
                className="text-left text-gray-600 hover:text-blue-600 transition-colors"
              >
                Domaines & Compétences
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-left text-gray-600 hover:text-blue-600 transition-colors"
              >
                À propos
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-left text-gray-600 hover:text-blue-600 transition-colors"
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};