/**
 * Déblocage des niveaux. Pur, sans DOM : la borne lit et écrit l'objet dans localStorage.
 * Le niveau n+1 s'ouvre quand une manche d'au moins MIN_QUESTIONS questions du niveau n
 * atteint UNLOCK_PCT % de réussite. Le niveau 1 est toujours ouvert.
 */
export const UNLOCK_PCT = 85;
export const MIN_QUESTIONS = 10;

/** Meilleure réussite (en %) par niveau, pour un joueur. */
export function record(best, stage, good, total) {
  const out = { ...(best || {}) };
  if (total < MIN_QUESTIONS) return out;
  const pct = Math.round((good / total) * 100);
  out[stage] = Math.max(out[stage] || 0, pct);
  return out;
}

export function isUnlocked(best, stage, free = false) {
  if (free || stage <= 1) return true;
  return ((best || {})[stage - 1] || 0) >= UNLOCK_PCT;
}
