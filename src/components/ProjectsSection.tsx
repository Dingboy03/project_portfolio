import React, { useState } from 'react';
import { Filter, Plus, Download, Upload } from 'lucide-react';
import { Project, Category } from '../types/project';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { ProjectForm } from './ProjectForm';

interface ProjectsSectionProps {
  projects: Project[];
  categories: Category[];
  onToggleComplete: (id: string) => void;
  onAddProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onUpdateProject: (id: string, updates: Partial<Project>) => void;
  onDeleteProject: (id: string) => void;
  onAddCategory: (category: Omit<Category, 'id'>) => Category;
  onExportData: () => void;
  onImportData: (file: File) => Promise<void>;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  categories,
  onToggleComplete,
  onAddProject,
  onUpdateProject,
  onDeleteProject,
  onAddCategory,
  onExportData,
  onImportData,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const allCategories = ['Tous', ...categories.map(cat => cat.name)];
  const domains = Array.from(new Set(projects.map(p => (p.domain || 'Général').trim())));

  const filteredProjects = selectedCategory === 'Tous' 
    ? projects 
    : projects.filter(project => {
        const category = categories.find(cat => cat.id === project.category);
        return category?.name === selectedCategory;
      });

  const showProjectDetails = (project: Project) => {
    setSelectedProjectId(project.id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProjectId(null);
  };

  const selectedProject = selectedProjectId
    ? projects.find(p => p.id === selectedProjectId) || null
    : null;

  const handleAddProject = () => {
    setEditingProject(null);
    setIsFormOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setIsFormOpen(true);
  };

  const handleSaveProject = (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingProject) {
      onUpdateProject(editingProject.id, projectData);
    } else {
      onAddProject(projectData);
    }
    setIsFormOpen(false);
    setEditingProject(null);
  };

  const handleDeleteProject = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      onDeleteProject(id);
    }
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImportData(file).catch(error => {
        alert(`Erreur lors de l'import: ${error.message}`);
      });
    }
    event.target.value = '';
  };

  return (
    <section id="projets" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12">
          <div className="text-center lg:text-left mb-6 lg:mb-0">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Mes Projets IA/ML</h2>
            <p className="text-xl text-gray-600 max-w-3xl">
              Gestionnaire interactif de projets d'intelligence artificielle
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center lg:justify-end gap-3">
            <button
              onClick={handleAddProject}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-5 w-5" />
              <span>Nouveau projet</span>
            </button>
            
            {/* Boutons Exporter/Importer retirés à la demande */}
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <div className="flex items-center space-x-2 text-gray-600">
            <Filter className="h-5 w-5" />
            <span className="text-sm font-medium">Filtrer par:</span>
          </div>
          {allCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => {
            const category = categories.find(cat => cat.id === project.category);
            return (
              <ProjectCard
                key={project.id}
                project={project}
                category={category || { id: 'unknown', name: 'Unknown', color: 'bg-gray-500' }}
                isCompleted={project.completed}
                onToggleComplete={() => onToggleComplete(project.id)}
                onShowDetails={showProjectDetails}
                onEdit={handleEditProject}
                onDelete={handleDeleteProject}
              />
            );
          })}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Aucun projet trouvé pour cette catégorie.
            </p>
          </div>
        )}
      </div>

      <ProjectModal
        project={selectedProject}
        category={selectedProject ? categories.find(cat => cat.id === selectedProject.category) || null : null}
        isOpen={isModalOpen}
        onClose={closeModal}
        onUpdateProject={onUpdateProject}
      />

      <ProjectForm
        project={editingProject}
        categories={categories}
        domains={domains}
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingProject(null);
        }}
        onSave={handleSaveProject}
        onAddCategory={onAddCategory}
      />
    </section>
  );
};