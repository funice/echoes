import React from 'react';
import { Note, Language } from '../types';
import { translations } from '../translations';

interface NoteCardProps {
  note: Note;
  lang: Language;
  className?: string;
}

export const NoteCard: React.FC<NoteCardProps> = ({ note, lang, className = '' }) => {
  const t = translations[lang];
  
  const fromDisplay = note.isAnonymous ? t.anonymous : note.from;

  return (
    <div 
      className={`p-6 rounded-sm shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between min-h-[200px] break-words ${className}`}
      style={{ backgroundColor: note.color }}
    >
      <div>
        <div className="flex justify-between items-start mb-4 border-b border-black/5 pb-2">
          <span className="font-bold text-xs uppercase tracking-widest text-gray-500 opacity-70">{t.label_to}: <span className="text-black font-serif text-lg normal-case tracking-normal opacity-100 ml-1">{note.to}</span></span>
        </div>
        
        <p className="font-serif text-xl leading-relaxed text-gray-800 whitespace-pre-wrap">
          "{note.message}"
        </p>
      </div>

      <div className="mt-6 flex justify-between items-end">
        <span className="font-bold text-xs uppercase tracking-widest text-gray-500 opacity-70">{t.label_from}: <span className="text-black ml-1">{fromDisplay}</span></span>
        {note.isAiGenerated && (
          <span className="text-[10px] text-gray-400 opacity-50 uppercase tracking-widest">
            Echo
          </span>
        )}
      </div>
    </div>
  );
};
