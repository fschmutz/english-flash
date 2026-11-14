/**
 * Niveaux 2 à 5 et modes transversaux. Le niveau 1 (Unit 4, 6ème) reste dans generate.js, intact.
 * Navigateur + Node. Pas de DOM, pas de réseau.
 */
import { mcq, typed, nOpt, pick, shuffle } from './generate.js';
import * as B from './bank.js';

/** Les niveaux, dans l'ordre du sélecteur. */
export const STAGES = [
  { n: 1, name: 'Collège 6e', sub: 'Unit 4 — My daily routine' },
  { n: 2, name: 'UK Year 7-8', sub: 'temps, irréguliers, comparatifs, question tags' },
  { n: 3, name: 'UK Year 9', sub: 'conditionnels, passif, discours indirect, modaux, phrasal verbs' },
  { n: 4, name: 'GCSE', sub: 'figures de style, ton, registre, classes de mots, phrases' },
  { n: 5, name: 'Native stretch', sub: 'confusables, vocabulaire, UK/US, ponctuation' }
];

/** Modes transversaux, présents à chaque niveau. */
const CROSS = [
  { key: 'spot', name: "Repère l'erreur", sub: 'le mot faux, puis sa correction' },
  { key: 'listen', name: 'Dictée', sub: 'écoute, puis écris la phrase' }
];

/** Les modes de chaque niveau. Le niveau 1 garde ses sept modes, dans le même ordre. */
export const STAGE_MODES = {
  1: [
    { key: 'routine', name: 'Ma routine', sub: 'Morning + Daily routine, EN ↔ FR' },
    { key: 'free', name: 'Free time', sub: 'do, go ou play ? Around the world' },
    { key: 'present', name: 'Présent simple', sub: "-s, don't / doesn't, do / does" },
    { key: 'poss', name: 'Possessifs', sub: 'my, your, his, her, its, our, their' },
    { key: 'time', name: "L'heure", sub: 'past / to, heure digitale, am / pm' },
    { key: 'spell', name: 'Orthographe', sub: 'écris le mot au clavier' },
    ...CROSS,
    { key: 'mix', name: "Mélange — l'évaluation", sub: "tout, sans prévenir, plus de présent simple et d'heure", wide: true }
  ],
  2: [
    { key: 'tenses', name: 'Les temps', sub: 'present / past perfect, continuous' },
    { key: 'irregular', name: 'Verbes irréguliers', sub: 'prétérit et participe passé' },
    { key: 'compare', name: 'Comparatifs', sub: 'taller, the most famous, better' },
    { key: 'tags', name: 'Question tags', sub: "…, aren't you? …, did they?" },
    { key: 'spell', name: 'Orthographe', sub: 'mots pièges et orthographe UK' },
    ...CROSS,
    { key: 'mix', name: 'Mélange', sub: 'tout le niveau', wide: true }
  ],
  3: [
    { key: 'cond', name: 'Conditionnels', sub: 'types 0, 1, 2, 3' },
    { key: 'passive', name: 'Passif', sub: 'is spoken, was built, has been stolen' },
    { key: 'reported', name: 'Discours indirect', sub: 'She said that she was…' },
    { key: 'modals', name: 'Modaux', sub: 'must, might, should, must have' },
    { key: 'phrasal', name: 'Phrasal verbs + idioms', sub: 'give up, a piece of cake' },
    { key: 'spell', name: 'Orthographe', sub: 'mots pièges et orthographe UK' },
    ...CROSS,
    { key: 'mix', name: 'Mélange', sub: 'tout le niveau', wide: true }
  ],
  4: [
    { key: 'devices', name: 'Figures de style', sub: 'metaphor, simile, personification…' },
    { key: 'tone', name: 'Ton et registre', sub: 'formal / informal, tone' },
    { key: 'wordclass', name: 'Classes de mots', sub: 'noun, adverb, determiner…' },
    { key: 'sentences', name: 'Types de phrases', sub: "simple, complex, minor — et l'effet" },
    { key: 'spell', name: 'Orthographe', sub: 'mots pièges et orthographe UK' },
    ...CROSS,
    { key: 'mix', name: 'Mélange', sub: 'tout le niveau', wide: true }
  ],
  5: [
    { key: 'confusables', name: 'Confusables', sub: 'affect / effect, fewer / less…' },
    { key: 'vocab', name: 'Vocabulaire', sub: 'mots rares et collocations' },
    { key: 'ukus', name: 'UK ou US ?', sub: 'flat, lorry, colour' },
    { key: 'punct', name: 'Ponctuation', sub: "; : ' ," },
    { key: 'spell', name: 'Orthographe', sub: 'mots pièges et orthographe UK' },
    ...CROSS,
    { key: 'mix', name: 'Mélange', sub: 'tout le niveau', wide: true }
  ]
};

export const STAGE_FAM = {};
for (const list of Object.values(STAGE_MODES)) for (const m of list) STAGE_FAM[m.key] = m.name;

/** Un QCM tiré d'une ligne de banque [énoncé, bonne, mauvaises…]. */
function fromRow(row, level, meta, rnd, prompt) {
  const [q, ok, ...ko] = row;
  return mcq(prompt ? prompt(q) : q, ok, shuffle(ko, rnd).slice(0, nOpt(level) - 1), meta, rnd);
}

const metaOf = (famKey, tag) => ({ fam: STAGE_FAM[famKey], famKey, tag });

/* ---------------- niveau 2 ---------------- */

/** Mauvaises formes d'un verbe irrégulier : régularisée, base, l'autre forme, 3e personne. */
export function irregularTraps(base, right, other) {
  const reg = base.endsWith('e') ? base + 'd' : base + 'ed';
  const out = [];
  for (const x of [reg, base, other, base + 's']) if (x !== right && out.indexOf(x) === -1) out.push(x);
  return out;
}

function irregularQ(level, rnd) {
  const [base, past, pp, fr] = pick(B.IRREGULAR, rnd);
  const wantPast = rnd() < 0.5;
  const right = wantPast ? past : pp;
  const ko = irregularTraps(base, right, wantPast ? pp : past);
  const t = wantPast ? `Past simple of « ${base} » (${fr})` : `Past participle of « ${base} » (${fr})`;
  return mcq(t, right, shuffle(ko, rnd).slice(0, nOpt(level) - 1),
    metaOf('irregular', wantPast ? 'Prétérit' : 'Participe passé'), rnd);
}

function compareQ(level, rnd) {
  const [adj, comp, sup] = pick(B.ADJECTIVES, rnd);
  const long = comp.startsWith('more ');
  const irregular = adj === 'good' || adj === 'bad';
  const wantComp = rnd() < 0.5;
  if (wantComp) {
    const ko = long ? [adj + 'er', sup, 'more ' + adj + 'er'] : irregular ? [adj + 'er', 'more ' + adj, sup] : ['more ' + adj, sup, 'more ' + comp];
    return mcq(`This one is ___ than that one. (${adj})`, comp, shuffle(ko, rnd).slice(0, nOpt(level) - 1),
      metaOf('compare', 'Comparatif'), rnd);
  }
  const ko = long ? [adj + 'est', comp, 'most ' + adj + 'est'] : irregular ? [adj + 'est', 'most ' + adj, comp] : ['most ' + adj, comp, 'most ' + sup];
  return mcq(`It's the ___ one of all. (${adj})`, sup, shuffle(ko, rnd).slice(0, nOpt(level) - 1),
    metaOf('compare', 'Superlatif'), rnd);
}

/* ---------------- niveau 3 ---------------- */

function condQ(level, rnd) {
  if (rnd() < 0.55) {
    const [s, type] = pick(B.L3_COND_ID, rnd);
    const ok = B.COND_TYPES[type];
    return mcq(s, ok, shuffle(B.COND_TYPES.filter((c) => c !== ok), rnd).slice(0, nOpt(level) - 1),
      metaOf('cond', 'Quel conditionnel ?'), rnd);
  }
  return fromRow(pick(B.L3_COND_FILL, rnd), level, metaOf('cond', 'Complète'), rnd);
}

/* ---------------- niveau 4 ---------------- */

function wordclassQ(level, rnd) {
  const [s, word, cls, banned = []] = pick(B.L4_WORDCLASS, rnd);
  const ko = shuffle(B.WORD_CLASSES.filter((c) => c !== cls && banned.indexOf(c) === -1), rnd).slice(0, nOpt(level) - 1);
  return mcq(`${s} — « ${word} » is a…`, cls, ko, metaOf('wordclass', 'Classe de mot'), rnd);
}

function toneQ(level, rnd) {
  if (rnd() < 0.35) return fromRow(pick(B.L4_TONE, rnd), level, metaOf('tone', 'Le ton'), rnd, (q) => `Tone: ${q}`);
  return fromRow(pick(B.L4_REGISTER, rnd), level, metaOf('tone', 'Registre'), rnd);
}

/* ---------------- niveau 5 ---------------- */

function ukusQ(level, rnd) {
  if (rnd() < 0.5) {
    const [us, uk] = pick(B.UK_US, rnd);
    const ko = shuffle(B.UK_US.map((r) => r[1]).filter((w) => w !== uk), rnd).slice(0, nOpt(level) - 1);
    return mcq(`American « ${us} » — in British English?`, uk, ko, metaOf('ukus', 'Mot britannique'), rnd);
  }
  const [us, uk] = pick(B.UK_SPELLING, rnd);
  const usWord = us.split(' (')[0];
  const ko = [usWord];
  // une fausse orthographe de plus, jamais une variante correcte
  const extra = uk.endsWith('our') ? uk.replace(/our$/, 'ur') : uk.endsWith('re') ? uk.slice(0, -2) + 'ere' : uk + 'e';
  if (extra !== uk && extra !== usWord) ko.push(extra);
  return mcq(`British spelling of « ${us} »?`, uk, ko, metaOf('ukus', 'Orthographe UK'), rnd);
}

/* ---------------- modes transversaux ---------------- */

/** Mots d'une phrase, sans la ponctuation collée. */
export const words = (s) => s.split(/\s+/).map((w) => w.replace(/^[^A-Za-z']+|[^A-Za-z']+$/g, '')).filter(Boolean);

/** Au niveau 1, chaque item porte son thème et sa page du cahier (B.L1_SRC). */
function l1Meta(kind, stage, i) {
  if (stage !== 1) return {};
  const [topic, src] = B.L1_SRC[kind][i];
  return { topic, src };
}

function spotQ(stage, level, rnd) {
  const i = Math.floor(rnd() * B.SPOT[stage].length);
  const [s, wrong, fix, ...alts] = B.SPOT[stage][i];
  const extra = l1Meta('spot', stage, i);
  if (rnd() < 0.5) {
    const low = (w) => w.toLowerCase();
    const others = words(s).filter((w) => low(w) !== low(wrong) && w.length > 1)
      .filter((w, i, a) => a.findIndex((x) => low(x) === low(w)) === i);
    return mcq(`Trouve le mot faux : « ${s} »`, wrong, shuffle(others, rnd).slice(0, nOpt(level) - 1),
      { ...metaOf('spot', 'Le mot faux'), ...extra }, rnd);
  }
  return mcq(`« ${s} » — remplace « ${wrong} » par…`, fix, shuffle([wrong, ...alts], rnd).slice(0, nOpt(level) - 1),
    { ...metaOf('spot', 'La correction'), ...extra }, rnd);
}

function listenQ(stage, rnd) {
  const i = Math.floor(rnd() * B.DICTATION[stage].length);
  const s = B.DICTATION[stage][i];
  const q = typed('Écoute, puis écris la phrase.', s, { ...metaOf('listen', 'Dictée'), ...l1Meta('listen', stage, i) });
  q.say = s;
  q.loose = true;
  q.accept = [loose(s)];
  q.a = loose(s);
  return q;
}

/** Même règle que normLoose de generate.js, recopiée pour éviter un import circulaire au chargement. */
function loose(s) {
  return String(s).toLowerCase().replace(/[\u2019\u2018`´]/g, "'").replace(/[^a-z0-9' ]+/g, ' ')
    .replace(/(^|\s)'+|'+(\s|$)/g, ' ').replace(/\s+/g, ' ').trim();
}

/** Orthographe aux niveaux 2+ : mots pièges du niveau (et ceux d'en dessous), orthographe UK. */
function spellQ(stage, rnd) {
  if (rnd() < 0.35) {
    const [us, uk] = pick(B.UK_SPELLING, rnd);
    return typed(`« ${us} » (US) → écris-le à l'anglaise`, uk, metaOf('spell', 'Orthographe UK'));
  }
  const pool = [];
  for (let k = 2; k <= stage; k++) pool.push(...B.MISSPELT[k]);
  const [fr, en] = pick(pool, rnd);
  return typed(`${fr} → en anglais`, en, metaOf('spell', 'Mot piège'));
}

/* ---------------- entrée ---------------- */

const GEN = {
  2: {
    tenses: (l, r) => fromRow(pick(B.L2_TENSES, r), l, metaOf('tenses', 'Le bon temps'), r),
    irregular: irregularQ,
    compare: compareQ,
    tags: (l, r) => fromRow(pick(B.L2_TAGS, r), l, metaOf('tags', 'Question tag'), r)
  },
  3: {
    cond: condQ,
    passive: (l, r) => fromRow(pick(B.L3_PASSIVE, r), l, metaOf('passive', 'Passif'), r),
    reported: (l, r) => fromRow(pick(B.L3_REPORTED, r), l, metaOf('reported', 'Discours indirect'), r),
    modals: (l, r) => fromRow(pick(B.L3_MODALS, r), l, metaOf('modals', 'Modal'), r),
    phrasal: (l, r) => (r() < 0.55
      ? fromRow(pick(B.L3_PHRASAL, r), l, metaOf('phrasal', 'Phrasal verb'), r, (q) => `« ${q} » means…`)
      : fromRow(pick(B.L3_IDIOMS, r), l, metaOf('phrasal', 'Idiom'), r, (q) => `« ${q} » means…`))
  },
  4: {
    devices: (l, r) => fromRow(pick(B.L4_DEVICES, r), l, metaOf('devices', 'Figure de style'), r),
    tone: toneQ,
    wordclass: wordclassQ,
    sentences: (l, r) => fromRow(pick(B.L4_SENTENCES, r), l, metaOf('sentences', 'Type de phrase'), r)
  },
  5: {
    confusables: (l, r) => fromRow(pick(B.L5_CONFUSABLES, r), l, metaOf('confusables', 'Confusable'), r),
    vocab: (l, r) => fromRow(pick(B.L5_VOCAB, r), l, metaOf('vocab', 'Vocabulaire'), r,
      (q) => (q.includes('___') || q.includes(':') || q.includes('=') ? q : `« ${q} » means…`)),
    ukus: ukusQ,
    punct: (l, r) => fromRow(pick(B.L5_PUNCT, r), l, metaOf('punct', 'Ponctuation'), r)
  }
};

/** Est-ce un mode géré ici (et pas par le générateur du niveau 1) ? */
export function handles(stage, mode) {
  if (mode === 'spot' || mode === 'listen') return true;
  if (stage === 1) return false;
  return mode === 'spell' || mode === 'mix' || !!(GEN[stage] && GEN[stage][mode]);
}

/**
 * Une question d'un niveau 2 à 5, ou d'un mode transversal à n'importe quel niveau.
 * `level` est le palier (1 à 5) de la manche, `stage` le niveau scolaire.
 */
export function stageQuestion(level, opt) {
  const rnd = opt.random || Math.random;
  const stage = opt.stage || 1;
  let mode = opt.mode;
  if (mode === 'spot') return spotQ(stage, level, rnd);
  if (mode === 'listen') return listenQ(stage, rnd);
  if (mode === 'spell') return spellQ(stage, rnd);
  const gens = GEN[stage];
  if (!gens[mode]) {
    // mélange : les sujets du niveau, plus un peu de repère l'erreur et d'orthographe
    const keys = [...Object.keys(gens), ...Object.keys(gens), 'spot', 'spell'];
    mode = pick(keys, rnd);
    if (mode === 'spot') return spotQ(stage, level, rnd);
    if (mode === 'spell') return spellQ(stage, rnd);
  }
  return gens[mode](level, rnd);
}
