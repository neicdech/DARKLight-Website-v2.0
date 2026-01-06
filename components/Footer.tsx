import React from 'react';
import { Github, Twitter, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const handleSocialClick = (e: React.MouseEvent, platform: string) => {
    e.preventDefault();
    alert(`Redirecting to official ${platform} page...`);
  };

  return (
    <footer className="border-t border-gray-800 bg-gray-950 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold text-white mb-4">DarkLight</h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Empowering embedded engineers with high-performance, 3.3V logic microcontroller platforms.
              Designed for speed, precision, and ease of use.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/learn" className="hover:text-brand-400 transition-colors">Learn</Link></li>
              <li><Link to="/community" className="hover:text-brand-400 transition-colors">Downloads & Examples</Link></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); alert("API Reference available in Learn section."); }} className="hover:text-brand-400 transition-colors">API Reference</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); alert("Schematics download requires login."); }} className="hover:text-brand-400 transition-colors">Hardware Schematics</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Connect</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" onClick={(e) => handleSocialClick(e, "GitHub")} className="text-gray-400 hover:text-white transition-colors"><Github size={20} /></a>
              <a href="#" onClick={(e) => handleSocialClick(e, "Twitter")} className="text-gray-400 hover:text-white transition-colors"><Twitter size={20} /></a>
              <a href="mailto:contact@darklight.dev" className="text-gray-400 hover:text-white transition-colors"><Mail size={20} /></a>
            </div>
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} DarkLight Microcontrollers. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};