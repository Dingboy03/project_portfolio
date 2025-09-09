import React from 'react';
import { GraduationCap, Lightbulb, Zap, Globe } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">À propos de moi</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Parcours, passions et vision pour une IA utile à l’énergie et à la santé en Afrique
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <GraduationCap className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Formation Académique</h3>
                  <p className="text-gray-600 mt-1">
                    Étudiant en Génie Informatique, École Polytechnique de Ouagadougou (EPO). 
                    Ancien élève de classes préparatoires MPSI.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Lightbulb className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Expertise Technique</h3>
                  <p className="text-gray-600 mt-1">
                    Machine Learning (régression, classification, clustering), Deep Learning (CNN, LSTM, Transfer Learning),
                    RAG et systèmes multi‑agents, IoT et collecte de données temps réel, visualisation et dashboards (Power BI).
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Zap className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Passion: Énergie et Santé</h3>
                  <p className="text-gray-600 mt-1">
                    Développement de solutions IA pour l’optimisation énergétique et la santé. 
                    Création de systèmes intelligents adaptés au contexte africain.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Globe className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Vision & Mission</h3>
                  <p className="text-gray-600 mt-1">
                    Viser l’excellence technique et l’impact utile. Appliquer l’IA pour résoudre des 
                    problématiques concrètes liées à l’énergie et à la santé en Afrique.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ma Mission</h3>
            <blockquote className="text-lg text-gray-700 italic leading-relaxed">
              "Mettre l’IA au service de l’énergie et de la santé pour un impact concret en Afrique, 
              avec des solutions innovantes, responsables et adaptées au terrain."
            </blockquote>
            
            <div className="mt-6 pt-6 border-t border-blue-200">
              <h4 className="font-semibold text-gray-900 mb-3">Objectifs 2024-2025</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Maîtriser les dernières techniques d’IA et de ML</li>
                <li>• Développer un projet Capstone Énergie & Santé</li>
                <li>• Contribuer à des projets open‑source IA appliquée</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};