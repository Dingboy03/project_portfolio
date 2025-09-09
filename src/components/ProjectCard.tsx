import React from 'react';
import { Clock, BarChart, ExternalLink, CheckCircle, Circle, Edit, Trash2 } from 'lucide-react';
import { Project, Category } from '../types/project';

interface ProjectCardProps {
  project: Project;
  category: Category;
  isCompleted: boolean;
  onToggleComplete: (id: string) => void;
  onShowDetails: (project: Project) => void;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  category,
  isCompleted,
  onToggleComplete,
  onShowDetails,
  onEdit,
  onDelete,
}) => {
  const getCategoryColor = (categoryColor: string) => {
    const colorMap: { [key: string]: string } = {
      'bg-blue-500': 'bg-blue-100 text-blue-800 border-blue-200',
      'bg-purple-500': 'bg-purple-100 text-purple-800 border-purple-200',
      'bg-green-500': 'bg-green-100 text-green-800 border-green-200',
      'bg-orange-500': 'bg-orange-100 text-orange-800 border-orange-200',
      'bg-red-500': 'bg-red-100 text-red-800 border-red-200',
      'bg-indigo-500': 'bg-indigo-100 text-indigo-800 border-indigo-200',
      'bg-pink-500': 'bg-pink-100 text-pink-800 border-pink-200',
    };
    return colorMap[categoryColor] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Débutant':
        return 'text-green-600';
      case 'Intermédiaire':
        return 'text-yellow-600';
      case 'Avancé':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const completedSteps = project.steps.filter(step => step.completed).length;
  const totalSteps = project.steps.length;
  const progressPercentage = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;

  return (
    <div className={`group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border-2 ${
      project.completed ? 'border-green-200 bg-green-50' : 'border-gray-200'
    }`}>
      {project.completed && (
        <div className="absolute -top-2 -right-2">
          <CheckCircle className="h-6 w-6 text-green-600 bg-white rounded-full" />
        </div>
      )}
      
      <div className="flex items-center justify-between mb-4">
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(category.color)}`}>
          {category.name}
        </span>
        <div className="flex items-center space-x-1">
          <button
            onClick={() => onEdit(project)}
            className="p-1 hover:bg-blue-100 text-blue-600 rounded-full transition-colors"
            title="Modifier"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(project.id)}
            className="p-1 hover:bg-red-100 text-red-600 rounded-full transition-colors"
            title="Supprimer"
          >
            <Trash2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => onToggleComplete(project.id)}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            title={project.completed ? "Marquer comme non terminé" : "Marquer comme terminé"}
          >
            {project.completed ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <Circle className="h-5 w-5 text-gray-400 hover:text-green-600 transition-colors" />
            )}
          </button>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
        {project.title}
      </h3>

      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
        {project.description}
      </p>

      <div className="flex items-center space-x-4 text-xs text-gray-500 mb-4">
        <div className="flex items-center space-x-1">
          <Clock className="h-4 w-4" />
          <span>{project.duration}</span>
        </div>
        <div className="flex items-center space-x-1">
          <BarChart className="h-4 w-4" />
          <span className={getLevelColor(project.level)}>{project.level}</span>
        </div>
      </div>

      {totalSteps > 0 && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-500">Progression</span>
            <span className="text-xs text-gray-600">{completedSteps}/{totalSteps} étapes</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      )}

      <div className="mb-4">
        <p className="text-xs text-gray-500 mb-2">Techniques:</p>
        <div className="flex flex-wrap gap-1">
          {project.techniques.slice(0, 3).map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
            >
              {tech}
            </span>
          ))}
          {project.techniques.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
              +{project.techniques.length - 3}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <ExternalLink className="h-4 w-4 text-gray-400" />
          <span className="text-xs text-gray-500">{project.dataset.source || 'Dataset'}</span>
        </div>
        <button
          onClick={() => onShowDetails(project)}
          className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
        >
          Détails
        </button>
      </div>
    </div>
  );
};