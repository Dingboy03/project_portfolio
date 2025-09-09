import React, { useState } from 'react';
import { Mail, Github, Linkedin, Send } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setSuccess(null);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const subject = String(formData.get('subject') || '').trim();
    const message = String(formData.get('message') || '').trim();

    const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT as string | undefined;

    try {
      if (endpoint) {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, subject, message })
        });
        if (!res.ok) throw new Error('Échec de lenvoi');
        setSuccess('Message envoyé avec succès. Merci pour votre contact !');
        e.currentTarget.reset();
      } else {
        const mailto = `mailto:yanogoazania2003@gmail.com?subject=${encodeURIComponent(subject || 'Contact portfolio')}&body=${encodeURIComponent(`De: ${name} <${email}>

${message}`)}`;
        window.location.href = mailto;
        setSuccess('Ouverture de votre client mail...');
      }
    } catch (err) {
      setError("Une erreur s'est produite. Réessayez plus tard.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Contactez-moi</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Intéressé par une collaboration, un stage ou simplement échanger sur l'IA ? 
            N'hésitez pas à me contacter !
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-8 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
                <h3 className="text-2xl font-bold mb-6">Restons connectés</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-white/20 rounded-lg">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <a 
                        href="mailto:yanogoazania2003@gmail.com" 
                        className="text-blue-100 hover:text-white transition-colors"
                      >
                        yanogoazania2003@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-white/20 rounded-lg">
                      <Github className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-medium">GitHub</p>
                      <a 
                        href="https://github.com/Dingboy03" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-100 hover:text-white transition-colors"
                      >
                        github.com/Dingboy03
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-white/20 rounded-lg">
                      <Linkedin className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-medium">LinkedIn</p>
                      <a 
                        href="https://www.linkedin.com/in/yanogo-azania-74625224b" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-100 hover:text-white transition-colors"
                      >
                        linkedin.com/in/yanogo-azania-74625224b
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-white/20 rounded-lg">
                      <Send className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-medium">Téléphone</p>
                      <a 
                        href="tel:+22657908787" 
                        className="text-blue-100 hover:text-white transition-colors"
                      >
                        +226 57 90 87 87
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/20">
                  <p className="text-blue-100 text-sm">
                    Disponible pour des stages, projets collaboratifs, ou discussions 
                    sur l'intelligence artificielle et l'optimisation énergétique.
                  </p>
                </div>
              </div>

              <div className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Envoyez un message</h3>
                
                {success && (
                  <div className="mb-4 p-3 rounded-md bg-green-50 text-green-700 border border-green-200 text-sm">{success}</div>
                )}
                {error && (
                  <div className="mb-4 p-3 rounded-md bg-red-50 text-red-700 border border-red-200 text-sm">{error}</div>
                )}

                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Nom complet
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Votre nom"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="votre@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Sujet
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Sujet de votre message"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Votre message..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className={`w-full ${sending ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} text-white py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2`}
                  >
                    <Send className="h-5 w-5" />
                    <span>{sending ? 'Envoi...' : 'Envoyer le message'}</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};