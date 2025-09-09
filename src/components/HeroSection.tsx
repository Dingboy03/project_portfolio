import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Project } from '../types/project';

interface HeroSectionProps {
  projects: Project[];
}

export const HeroSection: React.FC<HeroSectionProps> = ({ projects }) => {
  const completedProjects = projects.filter(p => p.completed).length;
  const totalProjects = projects.length;
  const progressPercentage = totalProjects > 0 ? (completedProjects / totalProjects) * 100 : 0;

  const scrollToProjects = () => {
    const element = document.getElementById('projets');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="accueil" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Yanogo Azania
          </span>
        </h1>
        
        <p className="text-xl sm:text-2xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
          Étudiant en génie informatique, spécialisé en Intelligence Artificielle et IoT. 
          Passionné par l’application de l’IA aux secteurs de l’énergie et de la santé pour créer un impact concret.
        </p>

        <div className="mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Progression Globale</h3>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Projets complétés</span>
              <span className="text-sm font-medium text-gray-900">
                {completedProjects}/{totalProjects}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-2">{progressPercentage.toFixed(1)}% terminé</p>
          </div>
        </div>

        <button
          onClick={scrollToProjects}
          className="group animate-bounce hover:animate-none transition-all duration-300"
        >
          <div className="flex flex-col items-center space-y-2">
            <span className="text-sm text-gray-600 group-hover:text-blue-600 transition-colors">
              Découvrir mes projets
            </span>
            <ChevronDown className="h-6 w-6 text-gray-400 group-hover:text-blue-600 transition-colors" />
          </div>
        </button>
      </div>
    </section>
  );
};