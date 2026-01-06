import React, { useState, useEffect, useRef } from 'react';
import { Search as SearchIcon, X, ChevronRight } from 'lucide-react';
import { DOC_DATA } from '../constants';
import { SearchResult } from '../types';
import { useNavigate } from 'react-router-dom';

interface SearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Search: React.FC<SearchProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered: SearchResult[] = DOC_DATA.flatMap(doc => {
      // Very basic relevance scoring could be added here
      if (
        doc.title.toLowerCase().includes(lowerQuery) ||
        doc.keywords.some(k => k.toLowerCase().includes(lowerQuery))
      ) {
        return [{
          id: doc.id,
          title: doc.title,
          category: doc.category,
          snippet: `Found in ${doc.category}`
        }];
      }
      return [];
    });
    setResults(filtered);
  }, [query]);

  const handleSelect = (id: string) => {
    navigate(`/learn#${id}`);
    onClose();
    setQuery('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl bg-gray-900 border border-gray-700 rounded-xl shadow-2xl flex flex-col max-h-[70vh]">
        <div className="flex items-center border-b border-gray-700 p-4">
          <SearchIcon className="text-gray-400 mr-3" size={20} />
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent border-none outline-none text-white text-lg placeholder-gray-500"
            placeholder="Search API, functions, terminology..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={onClose} className="text-gray-500 hover:text-white">
            <X size={20} />
          </button>
        </div>
        
        <div className="overflow-y-auto p-2">
          {results.length === 0 && query && (
            <div className="p-8 text-center text-gray-500">
              No results found for "{query}"
            </div>
          )}
          {results.map((result) => (
            <button
              key={result.id}
              onClick={() => handleSelect(result.id)}
              className="w-full flex items-center justify-between p-3 hover:bg-gray-800 rounded-lg group transition-colors text-left"
            >
              <div>
                <h4 className="text-brand-400 font-semibold group-hover:text-brand-300">
                  {result.title}
                </h4>
                <span className="text-xs text-gray-500 uppercase tracking-wider">
                  {result.category}
                </span>
              </div>
              <ChevronRight className="text-gray-600 group-hover:text-brand-400" size={16} />
            </button>
          ))}
          {!query && (
            <div className="p-4 text-sm text-gray-500 text-center">
              Type to search API methods, pins, or concepts.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};