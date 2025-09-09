import { Project, Category } from '../types/project';

export const defaultCategories: Category[] = [
  { id: 'ml', name: 'ML', color: 'bg-blue-500', description: 'Machine Learning classique' },
  { id: 'deep-learning', name: 'Deep Learning', color: 'bg-purple-500', description: 'Réseaux de neurones profonds' },
  { id: 'agent', name: 'Agent', color: 'bg-green-500', description: 'Reinforcement Learning et agents' },
  { id: 'rag', name: 'RAG', color: 'bg-orange-500', description: 'Retrieval-Augmented Generation' },
  { id: 'capstone', name: 'Capstone', color: 'bg-red-500', description: 'Projets finaux et intégration' },
];

export const defaultProjects: Project[] = [
  {
    id: '1',
    title: "Prédire la consommation énergétique d'un ménage",
    category: 'ml',
    description: "Construire un modèle qui prédit la consommation d'électricité à partir de variables (température, heure, appareils utilisés).",
    objectives: [
      "Maîtriser les techniques de régression",
      "Apprendre le feature engineering",
      "Optimiser les hyperparamètres",
      "Évaluer les performances avec MSE/RMSE"
    ],
    dataset: {
      name: "Individual household electric power consumption",
      source: "UCI Machine Learning Repository",
      url: "https://archive.ics.uci.edu/ml/datasets/individual+household+electric+power+consumption"
    },
    techniques: ["Régression linéaire", "Ridge Regression", "Random Forest", "XGBoost"],
    skills: ["Feature engineering", "Data preprocessing", "Model evaluation", "Time series analysis"],
    duration: "2 semaines",
    level: "Débutant",
    deliverables: ["Notebook Jupyter complet", "Visualisations des données", "Rapport d'analyse"],
    steps: [
      { id: 's1', title: 'Collecte et exploration du dataset', completed: false },
      { id: 's2', title: 'Nettoyage et preprocessing des données', completed: false },
      { id: 's3', title: 'Feature engineering', completed: false },
      { id: 's4', title: 'Entraînement des modèles', completed: false },
      { id: 's5', title: 'Évaluation et optimisation', completed: false },
      { id: 's6', title: 'Visualisations et rapport final', completed: false },
    ],
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: "Classification Titanic",
    category: 'ml',
    description: "Prédire la survie des passagers du Titanic en utilisant diverses techniques de classification.",
    objectives: [
      "Maîtriser les algorithmes de classification",
      "Apprendre le data cleaning",
      "Construire des pipelines ML",
      "Implémenter la cross-validation"
    ],
    dataset: {
      name: "Titanic - Machine Learning from Disaster",
      source: "Kaggle",
      url: "https://www.kaggle.com/c/titanic"
    },
    techniques: ["k-NN", "SVM", "Logistic Regression", "Random Forest"],
    skills: ["Data cleaning", "Pipeline ML", "Cross-validation", "Feature selection"],
    duration: "1 semaine",
    level: "Débutant",
    deliverables: ["Notebook avec analyse EDA", "Modèle optimisé", "Rapport PDF"],
    steps: [
      { id: 's1', title: 'Analyse exploratoire des données', completed: false },
      { id: 's2', title: 'Nettoyage et traitement des valeurs manquantes', completed: false },
      { id: 's3', title: 'Feature engineering et sélection', completed: false },
      { id: 's4', title: 'Entraînement et comparaison des modèles', completed: false },
      { id: 's5', title: 'Cross-validation et optimisation', completed: false },
      { id: 's6', title: 'Rapport final et soumission', completed: false },
    ],
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: "Détection de pneumonie via rayons X",
    category: 'deep-learning',
    description: "Classifier les radios thoraciques en 'Pneumonie' vs 'Normal' using deep learning.",
    objectives: [
      "Maîtriser les CNN pour l'imagerie médicale",
      "Appliquer le transfer learning",
      "Comprendre l'éthique en IA médicale",
      "Implémenter Grad-CAM pour l'explicabilité"
    ],
    dataset: {
      name: "Chest X-Ray Images (Pneumonia)",
      source: "Kaggle",
      url: "https://www.kaggle.com/datasets/paultimothymooney/chest-xray-pneumonia"
    },
    techniques: ["CNN", "Transfer Learning", "ResNet", "DenseNet", "Grad-CAM"],
    skills: ["Computer Vision", "Medical imaging", "Model interpretability", "Ethics in AI"],
    duration: "3 semaines",
    level: "Intermédiaire",
    deliverables: ["Modèle CNN optimisé", "Rapport médical avec métriques", "Interface de diagnostic"],
    steps: [
      { id: 's1', title: 'Préparation et augmentation des données', completed: false },
      { id: 's2', title: 'Architecture CNN de base', completed: false },
      { id: 's3', title: 'Transfer learning avec ResNet/DenseNet', completed: false },
      { id: 's4', title: 'Optimisation et régularisation', completed: false },
      { id: 's5', title: 'Implémentation Grad-CAM', completed: false },
      { id: 's6', title: 'Évaluation médicale et rapport éthique', completed: false },
    ],
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: "Chatbot RAG sur documents PDF",
    category: 'rag',
    description: "Construire un assistant qui répond à partir de documents PDF fournis par l'utilisateur.",
    objectives: [
      "Maîtriser les techniques RAG",
      "Implémenter la recherche vectorielle",
      "Intégrer des LLMs (GPT/Llama)",
      "Optimiser la pertinence des réponses"
    ],
    dataset: {
      name: "Documents PDF personnalisés",
      source: "Upload utilisateur",
      url: "#"
    },
    techniques: ["LangChain", "FAISS", "ChromaDB", "OpenAI API", "Llama 2"],
    skills: ["Document processing", "Vector embeddings", "Information retrieval", "LLM integration"],
    duration: "3 semaines",
    level: "Avancé",
    deliverables: ["Application web RAG", "API de chat", "Repository GitHub complet"],
    steps: [
      { id: 's1', title: 'Configuration LangChain et environnement', completed: false },
      { id: 's2', title: 'Ingestion et chunking des PDFs', completed: false },
      { id: 's3', title: 'Création des embeddings vectoriels', completed: false },
      { id: 's4', title: 'Configuration base vectorielle (FAISS/ChromaDB)', completed: false },
      { id: 's5', title: 'Intégration LLM et pipeline RAG', completed: false },
      { id: 's6', title: 'Interface web et déploiement', completed: false },
    ],
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];