import React, { useState, useEffect, useCallback } from 'react';
import { Note, ViewMode, NoteFormData, Language } from './types';
import { generateSampleNotes, generateHypotheticalNote } from './services/geminiService';
import { Navigation } from './components/Navigation';
import { NoteCard } from './components/NoteCard';
import { Loader } from './components/Loader';
import { ChatBot } from './components/ChatBot';
import { QuoteWall } from './components/QuoteWall';
import { translations } from './translations';

// Icons
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
);

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewMode>(ViewMode.READ);
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState<Language>('zh-CN'); // Default to Chinese per request
  
  const t = translations[lang];

  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<Note[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Form State
  const [formData, setFormData] = useState<NoteFormData>({ to: '', from: '', message: '', isAnonymous: false });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize Data
  useEffect(() => {
    const initializeApp = async () => {
      const savedNotes = localStorage.getItem('echoes_notes');
      
      let initialNotes: Note[] = [];
      
      if (savedNotes) {
        initialNotes = JSON.parse(savedNotes);
      }
      
      try {
        const freshNotes = await generateSampleNotes(lang);
        // Add fresh AI notes only if we don't have a lot already, or mix them in
        // Filter out old AI notes to replace with new language ones essentially
        const userNotes = initialNotes.filter(n => !n.isAiGenerated);
        initialNotes = [...userNotes, ...freshNotes];
      } catch (e) {
        console.error(e);
      }

      const uniqueNotes = Array.from(new Map(initialNotes.map(item => [item.id, item])).values());
      
      setNotes(uniqueNotes);
      setLoading(false);
    };

    initializeApp();
  }, [lang]); // Re-fetch samples when language changes

  const handleSearch = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    
    // 1. Local Search
    const localMatches = notes.filter(n => 
      n.to.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (localMatches.length > 0) {
      setSearchResult(localMatches);
      setIsSearching(false);
    } else {
      // 2. AI Hallucination
      const hypothetical = await generateHypotheticalNote(searchQuery, lang);
      setSearchResult([hypothetical]);
      setIsSearching(false);
    }
  }, [searchQuery, notes, lang]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const colors = ['#ffeded', '#e8f4f8', '#fdfcdc', '#f2f2f2', '#eafaf1', '#fbf4ec'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const newNote: Note = {
      id: `user-${Date.now()}`,
      to: formData.to,
      from: formData.from,
      message: formData.message,
      timestamp: Date.now(),
      color: randomColor,
      isAiGenerated: false,
      isAnonymous: formData.isAnonymous
    };

    const updatedNotes = [newNote, ...notes];
    setNotes(updatedNotes);
    localStorage.setItem('echoes_notes', JSON.stringify(updatedNotes.filter(n => !n.isAiGenerated))); 
    
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ to: '', from: '', message: '', isAnonymous: false });
      setCurrentView(ViewMode.READ);
    }, 800);
  };

  const renderContent = () => {
    if (loading) return <Loader />;

    switch (currentView) {
      case ViewMode.READ:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-700">
            {notes.map((note) => (
              <NoteCard key={note.id} note={note} lang={lang} />
            ))}
          </div>
        );

      case ViewMode.QUOTES:
        return <QuoteWall lang={lang} />;

      case ViewMode.SEARCH:
        return (
          <div className="max-w-2xl mx-auto mt-10 min-h-[60vh]">
            <div className="text-center mb-12">
              <h2 className="serif text-4xl mb-4">{t.search_title}</h2>
              <p className="text-gray-500 font-light">{t.search_desc}</p>
            </div>
            
            <form onSubmit={handleSearch} className="relative mb-16">
              <input
                type="text"
                placeholder={t.search_placeholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-center text-3xl md:text-5xl font-serif bg-transparent border-b-2 border-gray-200 focus:border-black outline-none py-4 placeholder:text-gray-200 transition-colors"
              />
              <button 
                type="submit"
                className="absolute right-0 bottom-4 text-gray-400 hover:text-black transition-colors"
              >
                <SearchIcon />
              </button>
            </form>

            {isSearching ? (
               <Loader />
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {searchResult.length > 0 && (
                   <div className="mb-4 text-center text-sm text-gray-400 uppercase tracking-widest">
                     {searchResult[0].isAiGenerated ? t.search_no_match : t.search_found(searchResult.length)}
                   </div>
                )}
                {searchResult.map((note) => (
                  <NoteCard key={note.id} note={note} lang={lang} className="max-w-md mx-auto w-full" />
                ))}
              </div>
            )}
          </div>
        );

      case ViewMode.WRITE:
        return (
          <div className="max-w-xl mx-auto mt-10 animate-in slide-in-from-bottom-4 duration-500">
             <div className="text-center mb-12">
              <h2 className="serif text-4xl mb-4">{t.write_title}</h2>
              <p className="text-gray-500 font-light">{t.write_desc}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 md:p-12 rounded-lg shadow-sm border border-gray-100">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">{t.label_to}</label>
                  <input
                    required
                    type="text"
                    maxLength={20}
                    value={formData.to}
                    onChange={(e) => setFormData({...formData, to: e.target.value})}
                    className="w-full border-b border-gray-200 py-2 focus:border-black outline-none font-serif text-xl"
                    placeholder={t.placeholder_to}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">{t.label_from}</label>
                  <input
                    required
                    type="text"
                    maxLength={20}
                    value={formData.from}
                    onChange={(e) => setFormData({...formData, from: e.target.value})}
                    className="w-full border-b border-gray-200 py-2 focus:border-black outline-none font-serif text-xl"
                    placeholder={t.placeholder_from}
                  />
                </div>
              </div>

              <div className="space-y-2">
                 <label className="text-xs font-bold uppercase tracking-widest text-gray-400">{t.label_message}</label>
                <textarea
                  required
                  maxLength={140}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full h-40 resize-none border-b border-gray-200 py-2 focus:border-black outline-none font-serif text-2xl leading-relaxed placeholder:text-gray-200"
                  placeholder={t.placeholder_message}
                />
                <div className="flex justify-between items-center">
                   <label className="flex items-center cursor-pointer group">
                      <input 
                        type="checkbox" 
                        checked={formData.isAnonymous}
                        onChange={(e) => setFormData({...formData, isAnonymous: e.target.checked})}
                        className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black accent-black" 
                      />
                      <span className="ml-2 text-xs text-gray-400 group-hover:text-gray-600 transition-colors">{t.anonymous_toggle}</span>
                   </label>
                   <div className="text-xs text-gray-300">
                    {formData.message.length}/140
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black text-white py-4 rounded-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isSubmitting ? <span>{t.btn_sending}</span> : <span>{t.btn_submit}</span>}
              </button>
            </form>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfbf9] text-[#2a2a2a] selection:bg-red-100 selection:text-red-900 pb-20">
      <Navigation currentView={currentView} setView={setCurrentView} lang={lang} setLang={setLang} />
      
      <main className="max-w-6xl mx-auto px-4 md:px-8 pt-8">
        {currentView === ViewMode.READ && (
          <div className="text-center py-12 md:py-20 max-w-2xl mx-auto animate-in fade-in duration-700">
            <h1 className="text-5xl md:text-7xl font-serif mb-6 tracking-tight">
              {t.hero_title}
            </h1>
            <p className="text-gray-500 text-lg font-light leading-relaxed">
              {t.hero_desc}
            </p>
          </div>
        )}

        {renderContent()}
      </main>

      <ChatBot lang={lang} />

      <footer className="fixed bottom-0 left-0 right-0 p-4 text-center text-xs text-gray-400 bg-gradient-to-t from-[#fcfbf9] to-transparent pointer-events-none z-10">
        <span className="pointer-events-auto">{t.footer} &copy; {new Date().getFullYear()}</span>
      </footer>
    </div>
  );
};

export default App;
