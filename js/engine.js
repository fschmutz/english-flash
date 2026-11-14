/**
 * Un seul distributeur pour toute la borne : le niveau 1 passe par generate.js (inchangé),
 * les niveaux 2 à 5 et les modes transversaux par levels.js.
 */
import { generateQuestion } from './generate.js';
import { stageQuestion, handles } from './levels.js';

export function question(level, opt = {}) {
  const stage = opt.stage || 1;
  if (handles(stage, opt.mode)) return stageQuestion(level, { ...opt, stage });
  return generateQuestion(level, opt);
}

/** Distribue des questions sans répéter un énoncé (ou une dictée) vu récemment. */
export function createDealer(opt = {}) {
  const memory = Math.max(1, opt.memory || 10);
  const seen = [];
  const key = (q) => q.say || q.t;
  return {
    seen,
    next(level) {
      let q = question(level, opt);
      for (let i = 0; i < 60 && seen.indexOf(key(q)) !== -1; i++) q = question(level, opt);
      seen.push(key(q));
      while (seen.length > memory) seen.shift();
      return q;
    }
  };
}
