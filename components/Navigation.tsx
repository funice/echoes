import React from 'react';
import { ViewMode, Language } from '../types';
import { translations } from '../translations';

interface NavigationProps {
  currentView: ViewMode;
  setView: (view: ViewMode) => void;
  lang: Language;
  setLang: (lang: Language) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentView, setView, lang, setLang }) => {
  const t = translations[lang];

  const navItems = [
    { id: ViewMode.READ, label: t.nav_read },
    { id: ViewMode.QUOTES, label: t.nav_quotes },
    { id: ViewMode.SEARCH, label: t.nav_search },
    { id: ViewMode.WRITE, label: t.nav_submit },
  ];

  const languages: { code: Language; label: string }[] = [
    { code: 'zh-CN', label: '简' },
    { code: 'zh-TW', label: '繁' },
    { code: 'en', label: 'EN' },
    { code: 'ja', label: '日' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#fcfbf9]/90 backdrop-blur-sm border-b border-gray-100 py-4 px-4 md:px-8 transition-all">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
        <div 
          className="font-serif text-2xl md:text-3xl font-bold cursor-pointer tracking-tight flex items-center"
          onClick={() => setView(ViewMode.READ)}
        >
          Echoes<span className="text-red-400">.</span>
        </div>

        <div className="flex items-center gap-4 md:gap-6">
           <div className="flex space-x-1 md:space-x-2 bg-gray-100/50 p-1 rounded-full">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                className={`
                  px-3 md:px-4 py-1.5 rounded-full text-xs md:text-sm font-medium transition-all duration-300
                  ${currentView === item.id 
                    ? 'bg-black text-white shadow-sm' 
                    : 'bg-transparent text-gray-500 hover:text-black hover:bg-white'}
                `}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="h-6 w-[1px] bg-gray-200 mx-1 hidden md:block"></div>

          <div className="flex space-x-1">
             {languages.map((l) => (
               <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`
                  text-xs font-bold uppercase px-2 py-1 rounded hover:bg-gray-200 transition-colors
                  ${lang === l.code ? 'text-black underline decoration-red-400 decoration-2 underline-offset-4' : 'text-gray-400'}
                `}
               >
                 {l.label}
               </button>
             ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
