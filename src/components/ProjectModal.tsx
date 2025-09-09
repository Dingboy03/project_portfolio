import React from 'react';
import { X, ExternalLink, Target, Database, Wrench, Award, Package, Clock, BarChart, CheckCircle, Circle } from 'lucide-react';
import { Project, Category } from '../types/project';

interface ProjectModalProps {
  project: Project | null;
  category: Category | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateProject: (id: string, updates: Partial<Project>) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ 
  project, 
  category, 
  isOpen, 
  onClose, 
  onUpdateProject 
}) => {
  if (!isOpen || !project) return null;

  const toggleStepCompletion = (stepId: string) => {
    const updatedSteps = project.steps.map(step =>
      step.id === stepId ? { ...step, completed: !step.completed } : step
    );
    onUpdateProject(project.id, { steps: updatedSteps });
  };

  const completedSteps = project.steps.filter(step => step.completed).length;
  const totalSteps = project.steps.length;
  const progressPercentage = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">{project.title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          <div className="flex flex-wrap gap-4">
            {category && (
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                category.color === 'bg-blue-500' ? 'bg-blue-100 text-blue-800' :
                category.color === 'bg-purple-500' ? 'bg-purple-100 text-purple-800' :
                category.color === 'bg-green-500' ? 'bg-green-100 text-green-800' :
                category.color === 'bg-orange-500' ? 'bg-orange-100 text-orange-800' :
                category.color === 'bg-red-500' ? 'bg-red-100 text-red-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {category.name}
              </span>
            )}
            <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
              <Clock className="h-4 w-4 inline mr-1" />
              {project.duration}
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
              <BarChart className="h-4 w-4 inline mr-1" />
              {project.level}
            </span>
          </div>

          <div>
            <p className="text-gray-700 leading-relaxed">{project.description}</p>
          </div>

          {project.steps.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Étapes du projet</h3>
                </div>
                <div className="text-sm text-gray-600">
                  {completedSteps}/{totalSteps} terminées ({progressPercentage.toFixed(0)}%)
                </div>
              </div>
              
              <div className="mb-4">
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="space-y-3">
                {project.steps.map((step) => (
                  <div
                    key={step.id}
                    className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 ${
                      step.completed 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <button
                      onClick={() => toggleStepCompletion(step.id)}
                      className="flex-shrink-0 transition-colors"
                    >
                      {step.completed ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <Circle className="h-5 w-5 text-gray-400 hover:text-green-600" />
                      )}
                    </button>
                    <span className={`flex-1 ${
                      step.completed 
                        ? 'text-green-800 font-medium line-through' 
                        : 'text-gray-700'
                    }`}>
                      {step.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Target className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Objectifs d'apprentissage</h3>
              </div>
              <ul className="space-y-2">
                {project.objectives.map((objective, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700 text-sm">{objective}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Database className="h-5 w-5 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-900">Dataset</h3>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900">{project.dataset.name}</h4>
                {project.dataset.source && (
                  <p className="text-sm text-gray-600 mb-2">Source: {project.dataset.source}</p>
                )}
                {project.dataset.url !== '#' && (
                  <a
                    href={project.dataset.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>Accéder au dataset</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Wrench className="h-5 w-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">Techniques & Algorithmes</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.techniques.map((technique, index) => (
                <span
                  key={index}
                  className="px-3 py-2 bg-purple-100 text-purple-800 rounded-lg text-sm font-medium"
                >
                  {technique}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Award className="h-5 w-5 text-orange-600" />
              <h3 className="text-lg font-semibold text-gray-900">Compétences acquises</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-2 bg-orange-100 text-orange-800 rounded-lg text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Package className="h-5 w-5 text-red-600" />
              <h3 className="text-lg font-semibold text-gray-900">Livrables attendus</h3>
            </div>
            <ul className="space-y-2">
              {project.deliverables.map((deliverable, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-gray-700 text-sm">{deliverable}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};