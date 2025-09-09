import React from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ProjectsSection } from './components/ProjectsSection';
import { RoadmapSection } from './components/RoadmapSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { useProjects } from './hooks/useProjects';

function App() {
  const {
    projects,
    categories,
    addProject,
    updateProject,
    deleteProject,
    addCategory,
    exportData,
    importData,
  } = useProjects();

  const toggleProjectCompletion = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      updateProject(projectId, { completed: !project.completed });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection projects={projects} />
      <ProjectsSection 
        projects={projects}
        categories={categories}
        onToggleComplete={toggleProjectCompletion}
        onAddProject={addProject}
        onUpdateProject={updateProject}
        onDeleteProject={deleteProject}
        onAddCategory={addCategory}
        onExportData={exportData}
        onImportData={importData}
      />
      <RoadmapSection projects={projects} />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;