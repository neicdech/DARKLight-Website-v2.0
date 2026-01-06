import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { DOC_DATA } from '../constants';
import { BookOpen, ChevronRight } from 'lucide-react';

export const Learn: React.FC = () => {
  const { hash } = useLocation();

  // Scroll to hash on load/change
  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0,0);
    }
  }, [hash]);

  const categories = Array.from(new Set(DOC_DATA.map(d => d.category)));

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
      {/* Sidebar Navigation */}
      <aside className="lg:w-64 flex-shrink-0">
        <div className="sticky top-24 space-y-8">
          {categories.map(category => (
            <div key={category}>
              <h5 className="font-bold text-white mb-3 flex items-center gap-2">
                <BookOpen size={16} className="text-brand-500" />
                {category}
              </h5>
              <ul className="space-y-1 border-l border-gray-800 ml-2">
                {DOC_DATA.filter(d => d.category === category).map(doc => (
                  <li key={doc.id}>
                    <a 
                      href={`#/learn#${doc.id}`}
                      className={`block pl-4 py-1 text-sm border-l-2 transition-colors ${
                        hash === `#${doc.id}` 
                        ? 'border-brand-500 text-brand-400' 
                        : 'border-transparent text-gray-400 hover:text-white hover:border-gray-600'
                      }`}
                    >
                      {doc.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0">
        <div className="max-w-4xl">
          <h1 className="text-4xl font-bold text-white mb-6">Learn</h1>
          <p className="text-xl text-gray-400 mb-12 border-b border-gray-800 pb-8">
            Complete technical reference and tutorials for the DarkLight microcontroller ecosystem.
          </p>

          <div className="space-y-20">
            {DOC_DATA.map((doc) => (
              <section key={doc.id} id={doc.id} className="scroll-mt-24">
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-brand-500 text-sm font-mono uppercase tracking-wider">{doc.category}</span>
                  <ChevronRight size={14} className="text-gray-600" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-6">{doc.title}</h2>
                <div className="prose prose-invert prose-brand max-w-none">
                  {doc.content}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};