import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { Project, Category, ProjectStep } from '../types/project';

interface ProjectFormProps {
  project?: Project;
  categories: Category[];
  domains: string[];
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onAddCategory: (category: Omit<Category, 'id'>) => void;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({
  project,
  categories,
  domains,
  isOpen,
  onClose,
  onSave,
  onAddCategory,
}) => {
  const [formData, setFormData] = useState<Omit<Project, 'id' | 'createdAt' | 'updatedAt'>>({
    title: '',
    category: categories[0]?.id || '',
    domain: 'Général',
    description: '',
    objectives: [''],
    dataset: { name: '', source: '', url: '' },
    techniques: [''],
    skills: [''],
    duration: '',
    level: 'Débutant',
    deliverables: [''],
    resources: [''],
    steps: [{ id: Date.now().toString(), title: '', completed: false }],
    completed: false,
  });

  const [newCategoryName, setNewCategoryName] = useState('');
  const [showAddCategory, setShowAddCategory] = useState(false);

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title,
        category: project.category,
        domain: project.domain || 'Général',
        description: project.description,
        objectives: project.objectives,
        dataset: project.dataset,
        techniques: project.techniques,
        skills: project.skills,
        duration: project.duration,
        level: project.level,
        deliverables: project.deliverables,
        resources: project.resources || [''],
        steps: project.steps,
        completed: project.completed,
      });
    } else {
      setFormData({
        title: '',
        category: categories[0]?.id || '',
        domain: domains[0] || 'Général',
        description: '',
        objectives: [''],
        dataset: { name: '', source: '', url: '' },
        techniques: [''],
        skills: [''],
        duration: '',
        level: 'Débutant',
        deliverables: [''],
        resources: [''],
        steps: [{ id: Date.now().toString(), title: '', completed: false }],
        completed: false,
      });
    }
  }, [project, categories, domains]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedData = {
      ...formData,
      domain: formData.domain?.trim() || 'Général',
      objectives: formData.objectives.filter(obj => obj.trim() !== ''),
      techniques: formData.techniques.filter(tech => tech.trim() !== ''),
      skills: formData.skills.filter(skill => skill.trim() !== ''),
      deliverables: formData.deliverables.filter(del => del.trim() !== ''),
      resources: formData.resources?.filter(res => res.trim() !== '') || [],
      steps: formData.steps.filter(step => step.title.trim() !== ''),
    };
    onSave(cleanedData);
    onClose();
  };

  const addArrayItem = (field: keyof typeof formData, value: string = '') => {
    if (field === 'steps') {
      const newStep: ProjectStep = {
        id: Date.now().toString(),
        title: '',
        completed: false,
      };
      setFormData(prev => ({
        ...prev,
        steps: [...prev.steps, newStep],
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: [...(prev[field] as string[]), value],
      }));
    }
  };

  const removeArrayItem = (field: keyof typeof formData, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as any[]).filter((_, i) => i !== index),
    }));
  };

  const updateArrayItem = (field: keyof typeof formData, index: number, value: string) => {
    if (field === 'steps') {
      setFormData(prev => ({
        ...prev,
        steps: prev.steps.map((step, i) =>
          i === index ? { ...step, title: value } : step
        ),
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: (prev[field] as string[]).map((item, i) => i === index ? value : item),
      }));
    }
  };

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      const colors = ['bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-orange-500', 'bg-red-500', 'bg-indigo-500', 'bg-pink-500'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      
      const newCategory = onAddCategory({
        name: newCategoryName.trim(),
        color: randomColor,
      });
      
      setFormData(prev => ({ ...prev, category: newCategory.id }));
      setNewCategoryName('');
      setShowAddCategory(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            {project ? 'Modifier le projet' : 'Nouveau projet'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Titre du projet *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nom du projet"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Catégorie *
              </label>
              <div className="flex space-x-2">
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => setShowAddCategory(!showAddCategory)}
                  className="px-3 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              
              {showAddCategory && (
                <div className="mt-2 flex space-x-2">
                  <input
                    type="text"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    placeholder="Nouvelle catégorie"
                    className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={handleAddCategory}
                    className="px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Ajouter
                  </button>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Domaine (ex: Énergie, Santé, Analyse de données)
            </label>
            <input
              list="domain-options"
              type="text"
              value={formData.domain}
              onChange={(e) => setFormData(prev => ({ ...prev, domain: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Saisir ou choisir un domaine"
            />
            <datalist id="domain-options">
              {domains.map((d, i) => (
                <option key={i} value={d} />
              ))}
            </datalist>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              required
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Description du projet"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Durée estimée
              </label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="ex: 2 semaines"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Niveau de difficulté
              </label>
              <select
                value={formData.level}
                onChange={(e) => setFormData(prev => ({ ...prev, level: e.target.value as Project['level'] }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Débutant">Débutant</option>
                <option value="Intermédiaire">Intermédiaire</option>
                <option value="Avancé">Avancé</option>
              </select>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Dataset</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                <input
                  type="text"
                  value={formData.dataset.name}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    dataset: { ...prev.dataset, name: e.target.value }
                  }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nom du dataset"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Source</label>
                <input
                  type="text"
                  value={formData.dataset.source}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    dataset: { ...prev.dataset, source: e.target.value }
                  }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="ex: Kaggle, UCI"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">URL</label>
                <input
                  type="url"
                  value={formData.dataset.url}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    dataset: { ...prev.dataset, url: e.target.value }
                  }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://..."
                />
              </div>
            </div>
          </div>

          {/* Dynamic Arrays */}
          {[
            { field: 'objectives' as const, label: "Objectifs d'apprentissage" },
            { field: 'techniques' as const, label: 'Techniques & Algorithmes' },
            { field: 'skills' as const, label: 'Compétences acquises' },
            { field: 'deliverables' as const, label: 'Livrables attendus' },
          ].map(({ field, label }) => (
            <div key={field} className="border-t pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{label}</h3>
                <button
                  type="button"
                  onClick={() => addArrayItem(field)}
                  className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span className="text-sm">Ajouter</span>
                </button>
              </div>
              <div className="space-y-2">
                {(formData[field] as string[]).map((item, index) => (
                  <div key={index} className="flex space-x-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => updateArrayItem(field, index, e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={`${label.slice(0, -1)} ${index + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem(field, index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Steps */}
          <div className="border-t pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Étapes du projet</h3>
              <button
                type="button"
                onClick={() => addArrayItem('steps')}
                className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span className="text-sm">Ajouter étape</span>
              </button>
            </div>
            <div className="space-y-2">
              {formData.steps.map((step, index) => (
                <div key={step.id} className="flex space-x-2">
                  <input
                    type="text"
                    value={step.title}
                    onChange={(e) => updateArrayItem('steps', index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={`Étape ${index + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem('steps', index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {project ? 'Mettre à jour' : 'Créer le projet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};