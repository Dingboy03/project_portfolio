import React from 'react';
import { CheckCircle, Cpu, HeartPulse, Zap, Database } from 'lucide-react';
import { Project } from '../types/project';

interface RoadmapSectionProps {
  projects: Project[];
}

export const RoadmapSection: React.FC<RoadmapSectionProps> = ({ projects }) => {
  const hasCategory = (catId: string) => projects.some(p => p.category === catId);
  const isAnyCompleted = (catId: string) => projects.some(p => p.category === catId && p.completed);

  const Item = ({ done, label }: { done: boolean; label: string }) => (
    <li className="flex items-center space-x-2">
      {done ? (
        <CheckCircle className="h-4 w-4 text-green-600" />
      ) : (
        <div className="h-4 w-4 border-2 border-gray-300 rounded-full"></div>
      )}
      <span>{label}</span>
    </li>
  );

  // Extraire compétences acquises depuis projets terminés (techniques + skills), dédupliquées
  const acquiredSkills: string[] = Array.from(
    new Set(
      projects
        .filter(p => p.completed)
        .flatMap(p => [
          ...(p.techniques || []),
          ...(p.skills || []),
        ])
        .map(s => s?.trim())
        .filter(Boolean) as string[]
    )
  );

  // Liste de base toujours visible
  const baseSkills: string[] = [
    'Python',
    'java',
    'Html, css',
    'NumPy',
    'Pandas',
    'Scikit-learn',
    'TensorFlow / Keras',
    'PyTorch',
    'Matplotlib / Seaborn',
    'SQL',
    'CNN',
    'Power BI',
    'IoT (MQTT, capteurs)',
    'Jupyter Notebook',
    'Google Colab',
    'Git / GitHub',
  ];

  // Ajouter seulement les compétences acquises qui ne sont pas déjà dans la base (insensible à la casse)
  const baseSet = new Set(baseSkills.map(s => s.toLowerCase()));
  const extraAcquired = acquiredSkills.filter(s => !baseSet.has(s.toLowerCase()));

  return (
    <section id="domains" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Projets par domaine et compétences</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Énergie, santé, analyse de données et agentique — avec un focus sur la valeur métier et l’impact mesurable.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Zap className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Énergie</h3>
            </div>
            <ul className="space-y-2 text-gray-700 text-sm">
              <Item done={isAnyCompleted('ml')} label="Prédiction consommation énergétique" />
              <Item done={hasCategory('capstone') || hasCategory('ml')} label="Optimisation smart grid" />
              <Item done={hasCategory('agent') || hasCategory('ml')} label="Détection d’anomalies IoT" />
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center space-x-2 mb-4">
              <HeartPulse className="h-5 w-5 text-rose-600" />
              <h3 className="text-lg font-semibold text-gray-900">Santé</h3>
            </div>
            <ul className="space-y-2 text-gray-700 text-sm">
              <Item done={isAnyCompleted('deep-learning')} label="Détection pneumonie via rayons X" />
              <Item done={isAnyCompleted('rag')} label="Chatbot médical (RAG)" />
            </ul>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Database className="h-5 w-5 text-indigo-600" />
              <h3 className="text-lg font-semibold text-gray-900">Analyse de données & business</h3>
            </div>
            <ul className="space-y-2 text-gray-700 text-sm">
              <Item done={isAnyCompleted('ml')} label="Classification Titanic" />
              <Item done={hasCategory('ml')} label="Segmentation clients" />
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Cpu className="h-5 w-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">ML, DL, Agents & RAG</h3>
            </div>
            <ul className="space-y-2 text-gray-700 text-sm">
              <Item done={hasCategory('ml')} label="Régression, classification, clustering" />
              <Item done={hasCategory('deep-learning')} label="CNN, LSTM, Transfer Learning" />
              <Item done={hasCategory('agent')} label="Agents et renforcement (RL)" />
              <Item done={hasCategory('rag')} label="RAG et recherche vectorielle" />
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Compétences techniques et outils</h3>
          <div className="flex flex-wrap gap-2 mb-3">
            {baseSkills.map((label, i) => (
              <span key={`base-${i}`} className="px-3 py-1 bg-gray-50 text-gray-800 border border-gray-200 rounded-full text-sm">
                {label}
              </span>
            ))}
          </div>
          {extraAcquired.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {extraAcquired.map((label, i) => (
                <span key={`extra-${i}`} className="px-3 py-1 bg-green-50 text-green-800 border border-green-200 rounded-full text-sm">
                  {label}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}