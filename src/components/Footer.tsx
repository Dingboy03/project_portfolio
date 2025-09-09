import React from 'react';
import { Brain, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Brain className="h-6 w-6 text-blue-400" />
            <span className="text-lg font-bold">Yanogo Azania</span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <span>Fait avec</span>
            <Heart className="h-4 w-4 text-red-400" />
            <span>pour l'avenir de l'IA en Afrique</span>
          </div>
          
          <div className="text-sm text-gray-400 mt-4 md:mt-0">
            © 2024 Yanogo Azania. Tous droits réservés.
          </div>
        </div>
      </div>
    </footer>
  );
};