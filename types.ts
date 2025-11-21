export interface Note {
  id: string;
  to: string;
  from: string;
  message: string;
  timestamp: number;
  color: string; // Hex code for the sticky note background
  isAiGenerated?: boolean;
  isAnonymous?: boolean;
}

export enum ViewMode {
  READ = 'READ',
  WRITE = 'WRITE',
  SEARCH = 'SEARCH',
  QUOTES = 'QUOTES'
}

export interface NoteFormData {
  to: string;
  from: string;
  message: string;
  isAnonymous: boolean;
}

export type Language = 'en' | 'zh-CN' | 'zh-TW' | 'ja';

export interface QuoteOrWallpaper {
  id: string;
  text: string;
  author?: string;
  imageUrl?: string; // If present, it's a wallpaper
  type: 'quote' | 'wallpaper';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}