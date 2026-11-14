/**
 * Réponses recalculées à la main, sans passer par js/generate.js.
 * Si une règle du générateur se trompe, elle ne peut pas être d'accord avec elle-même ici.
 */

/** 3e personne du singulier, écrite verbe par verbe comme dans le cahier. */
export const THIRD = {
  brush: 'brushes', wash: 'washes', watch: 'watches', fix: 'fixes', go: 'goes', do: 'does', have: 'has',
  play: 'plays', get: 'gets', read: 'reads', pack: 'packs', take: 'takes', check: 'checks', make: 'makes',
  drink: 'drinks', eat: 'eats', wake: 'wakes', like: 'likes', love: 'loves', call: 'calls', stop: 'stops', write: 'writes'
};

/** Sujets à la 3e personne du singulier. */
export const SINGULAR = new Set(['He', 'She', 'It', 'Tom', 'Hannah', 'My sister', 'My brother', 'Peter', 'Emma', 'Kate', 'The dog']);

/** Possessif attendu pour un sujet. */
export const OWNER_DET = {
  I: 'my', You: 'your', We: 'our', They: 'their', He: 'his', She: 'her', Tom: 'his', Peter: 'his', 'My brother': 'his',
  Hannah: 'her', 'My sister': 'her', Kate: 'her', 'Kate and William': 'their', 'My parents': 'their',
  'My sister and I': 'our', 'The dog': 'its'
};

const N = ['twelve', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven'];
const M = { 5: 'five', 10: 'ten', 20: 'twenty', 25: 'twenty-five' };
const D = { 5: 'five', 10: 'ten', 15: 'fifteen', 20: 'twenty', 25: 'twenty-five', 30: 'thirty', 35: 'thirty-five', 40: 'forty', 45: 'forty-five', 50: 'fifty', 55: 'fifty-five' };

/** Méthode 1 du cahier : minutes d'abord, 1–30 past, 31–59 to (l'heure suivante). */
export function expectedMethod1(h, m) {
  const name = (x) => N[x % 12];
  if (m === 0) return name(h) + " o'clock";
  if (m === 30) return 'half past ' + name(h);
  if (m <= 30) return (m === 15 ? 'a quarter' : M[m]) + ' past ' + name(h);
  const left = 60 - m;
  return (left === 15 ? 'a quarter' : M[left]) + ' to ' + name(h + 1);
}

/** Méthode 2 : heure puis minutes, « O » sous 10 minutes. */
export function expectedMethod2(h, m) {
  const name = N[h % 12];
  if (m === 0) return name + " o'clock";
  return name + ' ' + (m < 10 ? 'O ' : '') + D[m];
}

/** Lit « 7:15 » ou « 11:05 ». */
export function parseClock(s) {
  const r = /(\d{1,2}):(\d{2})/.exec(s);
  return r ? { h: +r[1], m: +r[2] } : null;
}
