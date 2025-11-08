// app/components/SearchBar.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface SearchResult {
  name: string;
  industry: string;
  rank?: number;
  score?: number;
}

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Закрытие при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Поиск с задержкой (debounce)
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setIsLoading(true);
    const timer = setTimeout(async () => {
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        setResults(data.results || []);
        setIsOpen(true);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleClear = () => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
  };

  const formatIndustry = (slug: string) => {
    return slug.charAt(0).toUpperCase() + slug.slice(1);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search companies..."
          className="w-full px-4 py-2 pr-10 bg-white/10 text-white placeholder-white/50 rounded-lg border border-white/20 focus:outline-none focus:border-[#EDBF4A] transition-colors"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
          >
            ✕
          </button>
        )}
      </div>

      {/* Результаты поиска */}
      {isOpen && (
        <div className="absolute top-full mt-2 w-full bg-white text-black rounded-lg shadow-xl max-h-96 overflow-y-auto z-50">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">Searching...</div>
          ) : results.length > 0 ? (
            <div className="py-2">
              {results.map((result, index) => (
                <Link
                  key={`${result.industry}-${result.name}-${index}`}
                  href={`/industries/${result.industry}#${encodeURIComponent(result.name)}`}
                  className="block px-4 py-3 hover:bg-[#EDBF4A] hover:text-white transition-colors border-b border-gray-100 last:border-b-0"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="font-semibold">{result.name}</div>
                  <div className="text-sm opacity-70">
                    {formatIndustry(result.industry)} Industry
                    {result.rank && ` • Rank #${result.rank}`}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-gray-500">
              No results found for "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}
