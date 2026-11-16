import { Bebas_Neue, Lora, PT_Serif_Caption } from 'next/font/google';

export const galleryDisplay = Bebas_Neue({ subsets: ['latin'], weight: '400', variable: '--gallery-display' });
export const gallerySerif = Lora({ subsets: ['latin'], weight: ['400', '500'], variable: '--gallery-serif' });
export const galleryCaption = PT_Serif_Caption({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], variable: '--gallery-caption' });

export const galleryFonts = `${galleryDisplay.variable} ${gallerySerif.variable} ${galleryCaption.variable}`;
