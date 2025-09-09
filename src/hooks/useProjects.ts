import { Project, Category } from '../types/project';
import { defaultProjects, defaultCategories } from '../data/defaultProjects';
import { useLocalStorage } from './useLocalStorage';

export const useProjects = () => {
  const [projects, setProjects] = useLocalStorage<Project[]>('projects', defaultProjects);
  const [categories, setCategories] = useLocalStorage<Category[]>('categories', defaultCategories);

  const addProject = (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProject: Project = {
      ...project,
      domain: project.domain?.trim() || 'Général',
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as Project;
    const newProjects = [...projects, newProject];
    setProjects(newProjects);
    return newProject;
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    const newProjects = projects.map(project =>
      project.id === id
        ? { ...project, ...updates, updatedAt: new Date().toISOString() }
        : project
    );
    setProjects(newProjects);
  };

  const deleteProject = (id: string) => {
    const newProjects = projects.filter(project => project.id !== id);
    setProjects(newProjects);
  };

  const addCategory = (category: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      ...category,
      id: Date.now().toString(),
    };
    const newCategories = [...categories, newCategory];
    setCategories(newCategories);
    return newCategory;
  };

  const exportData = () => {
    const data = {
      projects,
      categories,
      exportDate: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-projects-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importData = (file: File) => {
    return new Promise<void>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          if (data.projects && data.categories) {
            setProjects(data.projects);
            setCategories(data.categories);
            resolve();
          } else {
            reject(new Error('Format de fichier invalide'));
          }
        } catch (error) {
          reject(new Error('Erreur lors de la lecture du fichier'));
        }
      };
      reader.readAsText(file);
    });
  };

  return {
    projects,
    categories,
    addProject,
    updateProject,
    deleteProject,
    addCategory,
    exportData,
    importData,
  };
};