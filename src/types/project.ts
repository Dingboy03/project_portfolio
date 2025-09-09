export interface ProjectStep {
  id: string;
  title: string;
  completed: boolean;
  description?: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  domain: string;
  description: string;
  objectives: string[];
  dataset: {
    name: string;
    source: string;
    url: string;
  };
  techniques: string[];
  skills: string[];
  duration: string;
  level: 'Débutant' | 'Intermédiaire' | 'Avancé';
  deliverables: string[];
  resources?: string[];
  steps: ProjectStep[];
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  description?: string;
}