/**
 * A utility to estimate syllable counts for Czech and English text.
 */

export function countSyllables(text: string): number {
  if (!text || text.trim() === '') return 0;
  
  // Clean the text: remove punctuation, lowercase
  const cleanText = text.toLowerCase().replace(/[^a-z\u00C0-\u017F\s]/g, '');
  const words = cleanText.split(/\s+/).filter(w => w.length > 0);
  
  let totalSyllables = 0;
  
  for (const word of words) {
    totalSyllables += countWordSyllables(word);
  }
  
  return totalSyllables;
}

function countWordSyllables(word: string): number {
  // Check if it's likely Czech (contains Czech-specific characters)
  const isCzech = /[áéíóúůýčďěňřšťž]/.test(word);
  
  if (isCzech) {
    return countCzechSyllables(word);
  } else {
    return countEnglishSyllables(word);
  }
}

function countCzechSyllables(word: string): number {
  // Vowels and diphthongs
  const vowels = /[aeiouyáéíóúůýě]/g;
  const diphthongs = /(au|ou|eu)/g;
  
  let count = 0;
  
  // Count vowels
  const vowelMatches = word.match(vowels);
  if (vowelMatches) count += vowelMatches.length;
  
  // Subtract one for each diphthong (since we counted two vowels)
  const diphthongMatches = word.match(diphthongs);
  if (diphthongMatches) count -= diphthongMatches.length;
  
  // Syllabic r and l (simplified: if no vowel in word, or if r/l is between consonants)
  // This is a heuristic.
  if (count === 0) {
    if (/[rl]/.test(word)) return 1;
  }
  
  // Handle cases like "vlk", "krk", "smrt" - r/l between consonants
  const syllabicConsonants = /[^aeiouyáéíóúůýě][rl][^aeiouyáéíóúůýě]/g;
  const syllabicMatches = word.match(syllabicConsonants);
  // If we found a syllabic consonant but no vowels were counted yet
  // Or if it's a specific pattern. This is tricky.
  // Let's just ensure at least 1 syllable if word has length.
  
  return Math.max(1, count);
}

function countEnglishSyllables(word: string): number {
  word = word.toLowerCase();
  if (word.length <= 3) return 1;
  
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  word = word.replace(/^y/, '');
  
  const syllables = word.match(/[aeiouy]{1,2}/g);
  return syllables ? syllables.length : 1;
}
