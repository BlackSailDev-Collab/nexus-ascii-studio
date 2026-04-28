import figlet from 'figlet';
import { FIG_FONTS, type FigFontName } from './asciiFonts';

// Cache for loaded fonts to avoid redundant network requests
const fontCache: Record<string, string> = {};

/**
 * Service to handle ASCII art generation offline
 */
export const asciiService = {
  /**
   * Generates ASCII art for a given text and font
   */
  generate: async (text: string, fontName: FigFontName = 'standard'): Promise<string> => {
    if (!text.trim()) return '';

    try {
      // 1. Get font data (fetch if not cached)
      let fontData = fontCache[fontName];
      if (!fontData) {
        const response = await fetch(FIG_FONTS[fontName]);
        if (!response.ok) throw new Error(`Failed to load font: ${fontName}`);
        fontData = await response.text();
        fontCache[fontName] = fontData;
      }

      // 2. Parse and generate
      return new Promise((resolve, reject) => {
        try {
          figlet.parseFont(fontName, fontData);
          
          figlet.text(text, {
            font: fontName,
            horizontalLayout: 'default',
            verticalLayout: 'default',
            width: 80,
            whitespaceBreak: true
          }, (err, data) => {
            if (err) {
              reject(err);
              return;
            }
            resolve(data || '');
          });
        } catch (error) {
          reject(error);
        }
      });
    } catch (error) {
      console.error('ASCII Generation Error:', error);
      throw error;
    }
  },

  /**
   * Preloads essential fonts into the cache
   */
  preloadAll: async (): Promise<void> => {
    const coreFonts: FigFontName[] = ['standard', 'slant', 'banner', 'big', 'graffiti', 'digital', 'script', 'shadow', 'bold'];
    await Promise.all(
      coreFonts.map(async (name) => {
        if (!fontCache[name] && FIG_FONTS[name]) {
          try {
            const response = await fetch(FIG_FONTS[name]);
            if (response.ok) {
              fontCache[name] = await response.text();
            }
          } catch (err) {
            console.error(`Failed to preload font: ${name}`, err);
          }
        }
      })
    );
  }
};
