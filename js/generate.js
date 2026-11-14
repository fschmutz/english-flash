/**
 * Générateurs de questions d'anglais — Unit 4 « My daily routine » (6ème, Collège Provence).
 * Navigateur + Node (node --test). Pas de DOM, pas de réseau.
 *
 * Tout le contenu vient du cahier d'anglais de Paloma (fiche « Je sais dire et écrire… ») :
 * Vocabox Morning routine, Vocabox Free time activities, Vocabox Daily routine,
 * présent simple aux trois formes, déterminants possessifs, l'heure (deux méthodes).
 */

export function rint(a, b, rnd = Math.random) {
  return Math.floor(rnd() * (b - a + 1)) + a;
}

export function pick(arr, rnd = Math.random) {
  return arr[Math.floor(rnd() * arr.length)];
}

/** Mélange une copie du tableau. Les options d'un QCM ne doivent jamais arriver dans l'ordre. */
export function shuffle(arr, rnd = Math.random) {
  const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    const t = out[i]; out[i] = out[j]; out[j] = t;
  }
  return out;
}

function sample(arr, n, rnd = Math.random) {
  return shuffle(arr, rnd).slice(0, n);
}

/** Réponse tapée : minuscules, apostrophes droites, espaces simples. */
export function norm(s) {
  return String(s)
    .toLowerCase()
    .replace(/[\u2019\u2018`´]/g, "'")
    .replace(/[.!?]+$/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export const FAM_KEYS = ['routine', 'free', 'present', 'poss', 'time', 'spell', 'mix'];

/**
 * D'où vient chaque item : la page du cahier (photo de l'album) et la rubrique.
 * Chaque question porte `src` (une ou plusieurs pages, séparées par « · ») et `topic`.
 * test/sources.test.mjs refuse une question sans source ou hors des thèmes de l'Unit 4.
 */
export const SOURCES = {
  p14: 'Vocabox Morning routine, mots de liaison First / Then / After / Finally',
  p15: 'Présent simple : le -s de la 3e personne et sa prononciation, phrases du cahier',
  p16: 'be / have, déterminants et pronoms possessifs',
  p17: 'Traduction et phrases possessives (brush my teeth, wash their faces)',
  p18: 'Textes « Free time activities around the world »',
  p19: 'Présent simple aux trois formes',
  p20: 'Questions et négations au présent simple',
  p22: 'Vocabox Free time activities : DO / GO / PLAY',
  p23: "L'heure, méthode 1 (aiguilles)",
  p24: "Leslie's daily routine",
  p25: "L'heure, méthode 2 (digitale) et am / pm",
  p26: 'Vocabox Daily routine',
  p27: 'Fiche « Je sais dire et écrire… » (ce que couvre l’évaluation)'
};

/** Les seuls thèmes du niveau 1 : la fiche de révision de l'Unit 4, rien d'autre. */
export const L1_TOPICS = ['routine-vocab', 'free-time', 'present-simple', 'possessives', 'time', 'sequencers'];

export const FAM = {
  routine: 'Ma routine',
  free: 'Free time',
  present: 'Présent simple',
  poss: 'Possessifs',
  time: "L'heure",
  spell: 'Orthographe',
  mix: 'Mélange'
};

/* ------------------------------------------------------------------ *
 * Fabrique d'items
 * ------------------------------------------------------------------ */

/** Question tapée au clavier : `a` est la réponse attendue, `accept` les variantes acceptées. */
export function typed(t, answer, meta, alts = []) {
  const accept = [answer, ...alts].map(norm);
  return { t, a: norm(answer), aLabel: answer, accept, choices: null, ...meta };
}

/**
 * Question à toucher : options mélangées, une seule vaut la réponse.
 * Les doublons de libellé sont retirés : deux boutons identiques rendraient la question injouable.
 */
export function mcq(t, ok, ko, meta, rnd = Math.random) {
  const labels = [ok];
  for (const k of ko) if (labels.indexOf(k) === -1) labels.push(k);
  const choices = shuffle(labels, rnd).map((label, i) => ({ v: i, label }));
  const good = choices.find((c) => c.label === ok);
  return { t, a: good.v, aLabel: ok, accept: null, choices, ...meta };
}

/** Nombre d'options selon le palier : 3 au début, 4 ensuite. */
export const nOpt = (level) => (level <= 1 ? 3 : 4);

/** Est-ce que la réponse donnée est juste ? Index pour un QCM, texte pour une question tapée. */
export function isCorrect(q, given) {
  if (q.choices) return given === q.a;
  if (q.loose) return q.accept.indexOf(normLoose(given)) !== -1;
  return q.accept.indexOf(norm(given)) !== -1;
}

/**
 * Dictée : la ponctuation et les majuscules ne comptent pas, l'apostrophe des mots oui
 * (« it's » et « its » ne sont pas le même mot).
 */
export function normLoose(s) {
  return String(s)
    .toLowerCase()
    .replace(/[\u2019\u2018`´]/g, "'")
    .replace(/[^a-z0-9' ]+/g, ' ')
    .replace(/(^|\s)'+|'+(\s|$)/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/* ------------------------------------------------------------------ *
 * Vocabox « Morning routine » + « Daily routine »
 * ------------------------------------------------------------------ */

/**
 * `en` tel qu'écrit dans le cahier, `fr` le sens en français (à l'infinitif),
 * `box` la vocabox d'origine, `lvl` le palier à partir duquel l'expression sort.
 */
export const ROUTINE = [
  { en: 'wake up', fr: 'se réveiller', box: 'morning', lvl: 1, src: 'p14' },
  { en: 'get up', fr: 'se lever', box: 'morning', lvl: 1, src: 'p14' },
  { en: 'brush my hair', fr: 'me brosser les cheveux', box: 'morning', lvl: 1, src: 'p14' },
  { en: 'brush my teeth', fr: 'me brosser les dents', box: 'morning', lvl: 1, src: 'p14' },
  { en: 'make my bed', fr: 'faire mon lit', box: 'morning', lvl: 2, src: 'p14' },
  { en: 'take a bath', fr: 'prendre un bain', box: 'morning', lvl: 1, src: 'p14' },
  { en: 'take a shower', fr: 'prendre une douche', box: 'morning', lvl: 1, src: 'p14' },
  { en: 'wash my face', fr: 'me laver le visage', box: 'morning', lvl: 2, src: 'p14' },
  { en: 'get dressed', fr: "m'habiller", box: 'morning', lvl: 2, src: 'p14' },
  { en: 'pack my bag', fr: 'faire mon sac', box: 'morning', lvl: 2, src: 'p14' },
  { en: 'drink tea', fr: 'boire du thé', box: 'morning', lvl: 1, src: 'p14' },
  { en: 'eat breakfast', fr: 'prendre le petit-déjeuner', box: 'morning', lvl: 1, src: 'p14' },
  { en: 'check my phone', fr: 'regarder mon téléphone', box: 'morning', lvl: 2, src: 'p14' },
  { en: 'read the newspaper', fr: 'lire le journal', box: 'morning', lvl: 2, src: 'p14' },
  { en: 'go to school', fr: "aller à l'école", box: 'morning', lvl: 1, src: 'p14' },
  { en: 'go to bed', fr: 'aller au lit', box: 'daily', lvl: 1, src: 'p26' },
  { en: 'sleep', fr: 'dormir', box: 'daily', lvl: 1, src: 'p26' },
  { en: 'do my homework', fr: 'faire mes devoirs', box: 'daily', lvl: 2, src: 'p26' },
  { en: 'go home', fr: 'rentrer à la maison', box: 'daily', lvl: 2, src: 'p26' },
  { en: 'go to work', fr: 'aller au travail', box: 'daily', lvl: 2, src: 'p26' },
  { en: 'have lunch', fr: 'déjeuner (le midi)', box: 'daily', lvl: 3, src: 'p26' },
  { en: 'have a snack', fr: 'prendre le goûter', box: 'daily', lvl: 3, src: 'p26' },
  { en: 'have dinner', fr: 'dîner (le soir)', box: 'daily', lvl: 3, src: 'p26' },
  { en: 'watch TV', fr: 'regarder la télé', box: 'daily', lvl: 1, src: 'p24' },
  { en: 'read a book', fr: 'lire un livre', box: 'daily', lvl: 1, src: 'p24' }
];

/** Les mots de liaison du cahier, dans l'ordre. */
export const SEQUENCE = ['First', 'Then', 'After', 'Finally'];

function routineQuestion(level, opt) {
  const rnd = opt.random || Math.random;
  const meta = { fam: FAM.routine, famKey: 'routine', topic: 'routine-vocab' };
  const pool = ROUTINE.filter((w) => w.lvl <= Math.max(1, level));
  const kinds = ['fr2en', 'en2fr'];
  if (level >= 2) kinds.push('eatHave');
  if (level >= 3) kinds.push('seq', 'seq');
  const kind = opt.kind || pick(kinds, rnd);
  const n = nOpt(level);

  if (kind === 'eatHave') {
    const meal = pick(['breakfast', 'lunch', 'dinner'], rnd);
    const fr = { breakfast: 'le petit-déjeuner', lunch: 'le déjeuner', dinner: 'le dîner' }[meal];
    return mcq(`Prendre ${fr} : I ___ ${meal}.`, 'have', ['take', 'make', 'do'].slice(0, n - 1),
      { ...meta, tag: 'eat / have', src: 'p26' }, rnd);
  }
  if (kind === 'seq') {
    const i = rint(0, SEQUENCE.length - 1, rnd);
    const prompts = [
      '___, I wake up. (le tout premier mot)',
      'First, I wake up. ___, I get up. (et ensuite)',
      'Then, I eat breakfast. ___ breakfast, I brush my teeth. (après)',
      '___, I go to school. (enfin, pour finir)'
    ];
    return mcq(prompts[i], SEQUENCE[i], SEQUENCE.filter((s) => s !== SEQUENCE[i]).slice(0, n - 1),
      { ...meta, tag: 'Mots de liaison', topic: 'sequencers', src: 'p14 · p27' }, rnd);
  }
  const w = pick(pool, rnd);
  const others = sample(ROUTINE.filter((x) => x.en !== w.en && x.fr !== w.fr), n - 1, rnd);
  if (kind === 'en2fr') {
    return mcq(w.en, w.fr, others.map((x) => x.fr), { ...meta, tag: 'English → français', src: w.src }, rnd);
  }
  return mcq(w.fr, w.en, others.map((x) => x.en), { ...meta, tag: 'Français → English', src: w.src }, rnd);
}

/* ------------------------------------------------------------------ *
 * Vocabox « Free time activities » : DO / GO / PLAY
 * ------------------------------------------------------------------ */

export const FREE_TIME = [
  { verb: 'do', what: 'Irish dancing', fr: 'faire de la danse irlandaise', src: 'p22' },
  { verb: 'do', what: 'karate', fr: 'faire du karaté', src: 'p22' },
  { verb: 'do', what: 'gymnastics', fr: 'faire de la gymnastique', src: 'p22' },
  { verb: 'do', what: 'my homework', fr: 'faire mes devoirs', src: 'p22' },
  { verb: 'go', what: 'out with friends', fr: 'sortir avec des amis', src: 'p22' },
  { verb: 'go', what: 'swimming', fr: 'aller nager', src: 'p22' },
  { verb: 'go', what: 'to the cinema', fr: 'aller au cinéma', src: 'p22' },
  { verb: 'go', what: 'shopping', fr: 'faire les magasins', src: 'p22' },
  { verb: 'play', what: 'hockey', fr: 'jouer au hockey', src: 'p22' },
  { verb: 'play', what: 'American football', fr: 'jouer au football américain', src: 'p22' },
  { verb: 'play', what: 'Gaelic football', fr: 'jouer au football gaélique', src: 'p22' },
  { verb: 'play', what: 'football', fr: 'jouer au foot', src: 'p22' },
  { verb: 'play', what: 'cricket', fr: 'jouer au cricket', src: 'p22' },
  { verb: 'play', what: 'baseball', fr: 'jouer au baseball', src: 'p22' },
  { verb: 'play', what: 'video games', fr: 'jouer aux jeux vidéo', src: 'p22' },
  { verb: 'play', what: 'the bagpipes', fr: 'jouer de la cornemuse', src: 'p22' },
  { verb: 'watch', what: 'TV', fr: 'regarder la télé', src: 'p22 · p24' },
  { verb: 'read', what: 'a book', fr: 'lire un livre', src: 'p22 · p24' }
];

/** Les quatre textes « Free time activities around the world », questions de compréhension. */
export const AROUND_THE_WORLD = [
  { q: 'What do Leslie and Monica do every Sunday?', a: 'They go swimming.', ko: ['They play cricket.', 'They do Irish dancing.', 'They play baseball.'] },
  { q: 'What do Leslie and Monica play every Tuesday?', a: 'Cricket', ko: ['Baseball', 'Gaelic football', 'The bagpipes'] },
  { q: 'What does Hannah do every Wednesday?', a: 'She does Irish dancing.', ko: ['She plays the bagpipes.', 'She goes swimming.', 'She plays cricket.'] },
  { q: 'What does Hannah play at the weekend?', a: 'Gaelic football', ko: ['American football', 'Baseball', 'Cricket'] },
  { q: 'Does Hannah watch TV?', a: 'Yes, she does.', ko: ["No, she doesn't.", 'Yes, she do.', "No, she don't."] },
  { q: 'What do Dennis and Joey play every Wednesday?', a: 'The bagpipes', ko: ['Video games', 'Cricket', 'Baseball'] },
  { q: 'Where do Dennis and Joey go every Friday evening?', a: 'To the cinema', ko: ['Shopping', 'Swimming', 'Out with friends'] },
  { q: 'What do Dennis and Joey do at 5 pm?', a: 'They do their homework.', ko: ['They play the bagpipes.', 'They go to the cinema.', 'They go swimming.'] },
  { q: 'When does Tom play baseball?', a: 'Every Tuesday at 6 pm', ko: ['Every Sunday', 'At the weekend', 'Every Friday evening'] },
  { q: 'What does Tom play at the weekend?', a: 'American football', ko: ['Gaelic football', 'Cricket', 'Hockey'] },
  { q: 'What does Tom play every evening?', a: 'Video games', ko: ['The bagpipes', 'Cricket', 'Hockey'] },
  { q: 'Does Tom watch TV?', a: "No, he doesn't.", ko: ['Yes, he does.', "No, he don't.", 'Yes, he do.'] }
].map((x) => ({ ...x, src: 'p18' }));

function freeQuestion(level, opt) {
  const rnd = opt.random || Math.random;
  const meta = { fam: FAM.free, famKey: 'free', topic: 'free-time' };
  const kinds = ['dgp', 'dgp', 'fr2en'];
  if (level >= 2) kinds.push('en2fr');
  if (level >= 3) kinds.push('world', 'world');
  const kind = opt.kind || pick(kinds, rnd);
  const n = nOpt(level);
  const dgp = FREE_TIME.filter((x) => ['do', 'go', 'play'].includes(x.verb));

  if (kind === 'dgp') {
    const x = pick(dgp, rnd);
    return mcq(`I ___ ${x.what}.`, x.verb, ['do', 'go', 'play'].filter((v) => v !== x.verb),
      { ...meta, tag: 'DO, GO ou PLAY ?', src: x.src }, rnd);
  }
  if (kind === 'world') {
    const x = pick(AROUND_THE_WORLD, rnd);
    return mcq(x.q, x.a, x.ko.slice(0, n - 1), { ...meta, tag: 'Around the world', src: x.src }, rnd);
  }
  const x = pick(FREE_TIME, rnd);
  const others = sample(FREE_TIME.filter((y) => y !== x && y.fr !== x.fr), n - 1, rnd);
  const en = (y) => y.verb + ' ' + y.what;
  if (kind === 'en2fr') return mcq(en(x), x.fr, others.map((y) => y.fr), { ...meta, tag: 'English → français', src: x.src }, rnd);
  return mcq(x.fr, en(x), others.map(en), { ...meta, tag: 'Français → English', src: x.src }, rnd);
}

/* ------------------------------------------------------------------ *
 * Présent simple — trois formes, toutes les personnes
 * ------------------------------------------------------------------ */

/** Le -s de la 3e personne : -es après sh, ch, x, s, o ; y après voyelle reste y. */
export function third(base) {
  const irregular = { have: 'has', do: 'does', go: 'goes', be: 'is' };
  if (irregular[base]) return irregular[base];
  if (/(sh|ch|x|s|z|o)$/.test(base)) return base + 'es';
  if (/[^aeiou]y$/.test(base)) return base.slice(0, -1) + 'ies';
  return base + 's';
}

/** Verbe + complément. `v` est la base, le reste suit tel quel. */
export const ACTIONS = [
  { v: 'get', rest: 'up at 7 o\'clock', src: 'p14 · p27' },
  { v: 'wake', rest: 'up every morning', src: 'p14' },
  { v: 'watch', rest: 'TV after school', src: 'p20' },
  { v: 'go', rest: 'swimming every Sunday', src: 'p18' },
  { v: 'go', rest: 'to school every morning', src: 'p14' },
  { v: 'go', rest: 'to the cinema every Friday evening', src: 'p18' },
  { v: 'do', rest: 'Irish dancing every Wednesday', src: 'p18' },
  { v: 'play', rest: 'video games every evening', src: 'p18' },
  { v: 'play', rest: 'cricket every Tuesday', src: 'p18' },
  { v: 'play', rest: 'baseball every Tuesday', src: 'p18' },
  { v: 'have', rest: 'breakfast at 7:30 am', src: 'p15 · p26' },
  { v: 'eat', rest: 'lunch at 12 o\'clock', src: 'p26' },
  { v: 'read', rest: 'the newspaper', src: 'p15' },
  { v: 'drink', rest: 'tea before breakfast', src: 'p15' },
  { v: 'take', rest: 'a shower every morning', src: 'p15' },
  { v: 'do', rest: 'homework at 5 pm', src: 'p18' }
];

/** Sujets : `s` vrai = 3e personne du singulier. */
export const SUBJECTS = [
  { w: 'I', s: false }, { w: 'You', s: false }, { w: 'We', s: false }, { w: 'They', s: false },
  { w: 'He', s: true }, { w: 'She', s: true },
  { w: 'Tom', s: true }, { w: 'Hannah', s: true }, { w: 'My sister', s: true }, { w: 'My brother', s: true },
  { w: 'Peter', s: true }, { w: 'Emma', s: true },
  { w: 'Leslie and Monica', s: false }, { w: 'Dennis and Joey', s: false }, { w: 'My parents', s: false },
  { w: 'My friends', s: false }, { w: 'Joshua and I', s: false }
];

/** -ing : get → getting, take → taking, play → playing. */
export function ing(v) {
  if (v === 'get') return 'getting';
  if (v.endsWith('e') && v !== 'be') return v.slice(0, -1) + 'ing';
  return v + 'ing';
}

/** -s, -es : /s/, /z/ ou /iz/ — la liste du cahier, plus quelques verbes de la vocabox. */
export const S_SOUND = [
  { w: 'brushes', s: '/iz/', src: 'p15' }, { w: 'washes', s: '/iz/', src: 'p15' }, { w: 'fixes', s: '/iz/', src: 'p15' }, { w: 'watches', s: '/iz/', src: 'p14 · p15' },
  { w: 'reads', s: '/z/', src: 'p15' }, { w: 'loves', s: '/z/', src: 'p15' }, { w: 'calls', s: '/z/', src: 'p15' }, { w: 'goes', s: '/z/', src: 'p15' }, { w: 'plays', s: '/z/', src: 'p15' },
  { w: 'gets', s: '/s/', src: 'p15' }, { w: 'likes', s: '/s/', src: 'p15' }, { w: 'stops', s: '/s/', src: 'p15' }, { w: 'writes', s: '/s/', src: 'p15' },
  { w: 'packs', s: '/s/', src: 'p14 · p15' }, { w: 'takes', s: '/s/', src: 'p14 · p15' }, { w: 'eats', s: '/s/', src: 'p14 · p15' }, { w: 'drinks', s: '/s/', src: 'p14 · p15' }
];

function presentQuestion(level, opt) {
  const rnd = opt.random || Math.random;
  const meta = { fam: FAM.present, famKey: 'present', topic: 'present-simple' };
  const kinds = ['aff', 'aff', 'neg', 'ques', 'beHave'];
  if (level >= 2) kinds.push('simpleVsIng', 'sound');
  if (level >= 3) kinds.push('negSentence', 'quesSentence', 'short');
  const kind = opt.kind || pick(kinds, rnd);
  const n = nOpt(level);
  const subj = pick(SUBJECTS, rnd);
  const act = pick(ACTIONS, rnd);
  const base = act.v, s3 = third(base);
  const verb = subj.s ? s3 : base;
  meta.src = 'p19 · ' + act.src;

  if (kind === 'aff') {
    const ko = subj.s ? [base, base + 's' === s3 ? base + 'es' : base + 's', 'is ' + ing(base)]
      : [s3, 'are ' + ing(base), ing(base)];
    return mcq(`${subj.w} ___ ${act.rest}. (${base})`, verb, ko.slice(0, n - 1),
      { ...meta, tag: 'Forme affirmative' }, rnd);
  }
  if (kind === 'neg') {
    const ok = subj.s ? "doesn't" : "don't";
    const ko = subj.s ? ["don't", "isn't", "aren't"] : ["doesn't", "aren't", 'not'];
    return mcq(`${subj.w} ___ ${base} ${act.rest}.`, ok, ko.slice(0, n - 1), { ...meta, tag: 'Forme négative' }, rnd);
  }
  if (kind === 'ques') {
    const ok = subj.s ? 'Does' : 'Do';
    const ko = subj.s ? ['Do', 'Is', 'Are'] : ['Does', 'Are', 'Is'];
    const w = subj.w === 'I' ? 'I' : subj.w.replace(/^My /, 'your ').replace(/^We$/, 'we').replace(/^They$/, 'they')
      .replace(/^You$/, 'you').replace(/^He$/, 'he').replace(/^She$/, 'she');
    return mcq(`___ ${w} ${base} ${act.rest}?`, ok, ko.slice(0, n - 1), { ...meta, tag: 'Forme interrogative' }, rnd);
  }
  if (kind === 'beHave') {
    const be = { I: 'am', You: 'are', We: 'are', They: 'are' };
    const useBe = rnd() < 0.5;
    if (useBe) {
      const ok = be[subj.w] || (subj.s ? 'is' : 'are');
      const tail = pick(['at school at 9 am', 'in bed at 10 pm', 'at home after school', 'at the cinema every Friday'], rnd);
      return mcq(`${subj.w} ___ ${tail}.`, ok, ['am', 'is', 'are', 'be'].filter((x) => x !== ok).slice(0, n - 1),
        { ...meta, tag: 'be : am / is / are', src: 'p16' }, rnd);
    }
    const ok = subj.s ? 'has' : 'have';
    const tail = pick(['a snack at 4 pm', 'breakfast at 7 am', 'lunch at school', 'dinner at 8 pm'], rnd);
    return mcq(`${subj.w} ___ ${tail}.`, ok, ['have', 'has', 'haves', 'is'].filter((x) => x !== ok).slice(0, n - 1),
      { ...meta, tag: 'have / has', src: 'p16 · p26' }, rnd);
  }
  if (kind === 'simpleVsIng') {
    // Une habitude (every Sunday, every evening) se dit au présent simple.
    const ko = subj.s ? ['is ' + ing(base), base, ing(base)] : ['are ' + ing(base), s3, ing(base)];
    return mcq(`${subj.w} ___ ${act.rest}. (habitude)`, verb, ko.slice(0, n - 1),
      { ...meta, tag: 'Habitude → présent simple', src: 'p20 · ' + act.src }, rnd);
  }
  if (kind === 'sound') {
    const x = pick(S_SOUND, rnd);
    return mcq(`Le -s de « ${x.w} » se prononce…`, x.s, ['/s/', '/z/', '/iz/'].filter((y) => y !== x.s),
      { ...meta, tag: 'Prononciation du -s', src: x.src }, rnd);
  }
  if (kind === 'negSentence') {
    // Après doesn't, le verbe reste à la base ; don't et doesn't selon la personne.
    const ok = `${subj.w} ${subj.s ? "doesn't" : "don't"} ${base} ${act.rest}.`;
    const ko = subj.s
      ? [`${subj.w} doesn't ${s3} ${act.rest}.`, `${subj.w} don't ${base} ${act.rest}.`, `${subj.w} isn't ${ing(base)} ${act.rest}.`]
      : [`${subj.w} doesn't ${base} ${act.rest}.`, `${subj.w} don't ${s3} ${act.rest}.`, `${subj.w} aren't ${base} ${act.rest}.`];
    return mcq('Quelle phrase négative est juste ?', ok, ko.slice(0, n - 1), { ...meta, tag: 'La bonne négation', src: 'p19 · p20 · ' + act.src }, rnd);
  }
  if (kind === 'quesSentence') {
    const s = pick(SUBJECTS.filter((x) => x.s && !/^(He|She)$/.test(x.w)), rnd);
    const ok = `Does ${s.w.replace(/^My /, 'your ')} ${base} ${act.rest}?`;
    const sw = s.w.replace(/^My /, 'your ');
    const ko = [`Does ${sw} ${s3} ${act.rest}?`, `Do ${sw} ${base} ${act.rest}?`, `Is ${sw} ${base} ${act.rest}?`];
    return mcq('Quelle question est juste ?', ok, ko.slice(0, n - 1), { ...meta, tag: 'La bonne question', src: 'p19 · p20 · ' + act.src }, rnd);
  }
  // short : réponse courte
  const s = pick(SUBJECTS.filter((x) => x.w !== 'I' && x.w !== 'You' && x.w !== 'Joshua and I'), rnd);
  const pron = s.s ? (/(Hannah|sister|Emma|She)/.test(s.w) ? 'she' : 'he') : (s.w === 'We' ? 'we' : 'they');
  const yes = rnd() < 0.5;
  const aux = s.s ? 'does' : 'do';
  const q = `${s.s ? 'Does' : 'Do'} ${s.w.replace(/^My /, 'your ').replace(/^(We|They|He|She)$/, (m) => m.toLowerCase())} ${base} ${act.rest}?`;
  const ok = yes ? `Yes, ${pron} ${aux}.` : `No, ${pron} ${aux === 'does' ? "doesn't" : "don't"}.`;
  const wrongAux = s.s ? 'do' : 'does';
  const ko = yes
    ? [`Yes, ${pron} ${wrongAux}.`, `Yes, ${pron} ${s.s ? 'is' : 'are'}.`, `Yes, ${pron} ${s.s ? s3 : base}.`]
    : [`No, ${pron} ${wrongAux === 'does' ? "doesn't" : "don't"}.`, `No, ${pron} ${s.s ? "isn't" : "aren't"}.`, `No, ${pron} not.`];
  return mcq(`${q} — ${yes ? 'Oui' : 'Non'}.`, ok, ko.slice(0, n - 1), { ...meta, tag: 'Réponse courte', src: 'p19 · p20 · ' + act.src }, rnd);
}

/* ------------------------------------------------------------------ *
 * Déterminants possessifs
 * ------------------------------------------------------------------ */

export const POSSESSIVES = [
  { p: 'I', det: 'my', pron: 'mine', fr: 'mon / ma / mes' },
  { p: 'you', det: 'your', pron: 'yours', fr: 'ton / ta / tes' },
  { p: 'he', det: 'his', pron: 'his', fr: 'son / sa / ses (à lui)' },
  { p: 'she', det: 'her', pron: 'hers', fr: 'son / sa / ses (à elle)' },
  { p: 'it', det: 'its', pron: 'its', fr: 'son / sa / ses (un animal, une chose)' },
  { p: 'we', det: 'our', pron: 'ours', fr: 'notre / nos' },
  { p: 'they', det: 'their', pron: 'theirs', fr: 'leur / leurs' }
];

/** Qui fait l'action, et à quel possessif ça renvoie. */
const OWNERS = [
  { w: 'I', det: 'my', s: false }, { w: 'You', det: 'your', s: false }, { w: 'We', det: 'our', s: false },
  { w: 'They', det: 'their', s: false }, { w: 'He', det: 'his', s: true }, { w: 'She', det: 'her', s: true },
  { w: 'Tom', det: 'his', s: true }, { w: 'Peter', det: 'his', s: true }, { w: 'My brother', det: 'his', s: true },
  { w: 'Hannah', det: 'her', s: true }, { w: 'My sister', det: 'her', s: true }, { w: 'Kate', det: 'her', s: true },
  { w: 'Kate and William', det: 'their', s: false }, { w: 'My parents', det: 'their', s: false },
  { w: 'My sister and I', det: 'our', s: false }
];

const OWNED = [
  { v: 'brush', what: 'teeth' }, { v: 'brush', what: 'hair' }, { v: 'wash', what: 'face' },
  { v: 'pack', what: 'bag' }, { v: 'make', what: 'bed' }, { v: 'check', what: 'phone' }, { v: 'do', what: 'homework' }
];

function possQuestion(level, opt) {
  const rnd = opt.random || Math.random;
  const meta = { fam: FAM.poss, famKey: 'poss', topic: 'possessives', src: 'p16' };
  const kinds = ['sentence', 'sentence', 'fr'];
  if (level >= 3) kinds.push('detVsPron');
  const kind = opt.kind || pick(kinds, rnd);
  const n = nOpt(level);
  const dets = POSSESSIVES.map((x) => x.det).filter((d, i, a) => a.indexOf(d) === i);

  if (kind === 'fr') {
    const x = pick(POSSESSIVES.filter((y) => y.p !== 'it' || level >= 2), rnd);
    return mcq(`${x.p} → ${x.fr}`, x.det, sample(dets.filter((d) => d !== x.det), n - 1, rnd),
      { ...meta, tag: 'Déterminant possessif' }, rnd);
  }
  if (kind === 'detVsPron') {
    const x = pick(POSSESSIVES.filter((y) => y.det !== y.pron), rnd);
    const usePron = rnd() < 0.5;
    const who = { I: 'moi', you: 'toi', she: 'elle', we: 'nous', they: 'eux' }[x.p];
    if (usePron) {
      return mcq(`This bag is ___ . (à ${who}, sans nom après)`, x.pron,
        [x.det, ...sample(POSSESSIVES.map((y) => y.pron).filter((p) => p !== x.pron && p !== 'its'), 2, rnd)].slice(0, n - 1),
        { ...meta, tag: 'Pronom : mine, hers…' }, rnd);
    }
    return mcq(`This is ___ bag. (à ${who})`, x.det,
      [x.pron, ...sample(dets.filter((d) => d !== x.det), 2, rnd)].slice(0, n - 1),
      { ...meta, tag: 'Déterminant + nom' }, rnd);
  }
  const o = pick(OWNERS, rnd);
  const thing = pick(OWNED, rnd);
  const v = o.s ? third(thing.v) : thing.v;
  const what = thing.what === 'face' && !o.s && o.w !== 'I' && o.w !== 'You' ? 'faces' : thing.what;
  const ko = sample(dets.filter((d) => d !== o.det), n - 1, rnd);
  return mcq(`${o.w} ${v} ___ ${what}.`, o.det, ko, { ...meta, tag: 'my, your, his, her…', src: 'p16 · p17' }, rnd);
}

/* ------------------------------------------------------------------ *
 * L'heure en anglais — méthode 1 (aiguilles) et méthode 2 (digitale)
 * ------------------------------------------------------------------ */

export const HOURS = ['twelve', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'];
const MIN_WORD = {
  5: 'five', 10: 'ten', 15: 'fifteen', 20: 'twenty', 25: 'twenty-five', 30: 'thirty',
  35: 'thirty-five', 40: 'forty', 45: 'forty-five', 50: 'fifty', 55: 'fifty-five'
};

const hourWord = (h) => HOURS[((h % 12) + 12) % 12 === 0 ? 12 : h % 12];

/** Méthode 1 : minutes puis heure. 1–30 → past, 31–59 → to (l'heure d'après). */
export function method1(h, m) {
  if (m === 0) return `${hourWord(h)} o'clock`;
  if (m === 15) return `a quarter past ${hourWord(h)}`;
  if (m === 30) return `half past ${hourWord(h)}`;
  if (m === 45) return `a quarter to ${hourWord(h + 1)}`;
  if (m < 30) return `${MIN_WORD[m]} past ${hourWord(h)}`;
  return `${MIN_WORD[60 - m]} to ${hourWord(h + 1)}`;
}

/** Méthode 2 : l'heure, puis les minutes. Sous 10 minutes, le 0 se dit « O ». */
export function method2(h, m) {
  if (m === 0) return `${hourWord(h)} o'clock`;
  if (m < 10) return `${hourWord(h)} O ${MIN_WORD[m]}`;
  return `${hourWord(h)} ${MIN_WORD[m]}`;
}

export const clock = (h, m) => `${h}:${String(m).padStart(2, '0')}`;

function timeQuestion(level, opt) {
  const rnd = opt.random || Math.random;
  const meta = { fam: FAM.time, famKey: 'time', topic: 'time', src: 'p23 · p27' };
  const kinds = ['m1', 'm1', 'read'];
  if (level >= 2) kinds.push('m2', 'ampm');
  if (level >= 3) kinds.push('m1', 'read');
  const kind = opt.kind || pick(kinds, rnd);
  const n = nOpt(level);
  const h = rint(1, 12, rnd);
  const mins = level <= 1 ? [0, 15, 30, 45] : level === 2 ? [0, 5, 10, 15, 20, 30, 45, 50] : [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
  const m = pick(mins, rnd);

  /** Les pièges : heure d'avant / d'après, past et to inversés. */
  const traps = () => {
    const out = [];
    if (m === 0) out.push(`${hourWord(h + 1)} o'clock`, `half past ${hourWord(h)}`, `a quarter past ${hourWord(h)}`);
    else if (m === 30) out.push(`half past ${hourWord(h + 1)}`, `half to ${hourWord(h + 1)}`, `thirty to ${hourWord(h)}`);
    else if (m < 30) {
      const p = m === 15 ? 'a quarter' : MIN_WORD[m];
      out.push(`${p} to ${hourWord(h)}`, `${p} past ${hourWord(h + 1)}`, `${hourWord(h)} past ${p}`);
    } else {
      const p = m === 45 ? 'a quarter' : MIN_WORD[60 - m];
      out.push(`${p} past ${hourWord(h)}`, `${p} to ${hourWord(h)}`, `${p} past ${hourWord(h + 1)}`);
    }
    return out;
  };

  if (kind === 'm2') {
    const ok = method2(h, m);
    // Pas de distracteur en méthode 1 : « half past four » est juste aussi, seulement pas digital.
    const ko = [method2(h + 1, m), m ? `${MIN_WORD[m]} ${hourWord(h)}` : `${hourWord(h)} zero zero`,
      m === 0 ? `${hourWord(h)} hundred` : m < 10 ? `${hourWord(h)} ${MIN_WORD[m]}` : `${hourWord(h)} O ${MIN_WORD[m]}`]
      .filter((x) => x !== ok);
    return mcq(`${clock(h, m)} — méthode 2 (digitale) : it's…`, ok, ko.slice(0, n - 1), { ...meta, tag: 'Heure digitale', src: 'p25 · p27' }, rnd);
  }
  if (kind === 'read') {
    const ok = clock(h, m);
    const alt = m === 0 ? [clock(h === 12 ? 1 : h + 1, 0), clock(h, 30)]
      : m > 30 ? [clock(h === 12 ? 1 : h + 1, m), clock(h, 60 - m), clock(h === 12 ? 1 : h + 1, 60 - m)]
        : [clock(h, 60 - m === 30 ? 45 : 60 - m), clock(h === 1 ? 12 : h - 1, m), clock(h === 1 ? 12 : h - 1, 60 - m)];
    return mcq(`It's ${method1(h, m)}.`, ok, alt.filter((x) => x !== ok).slice(0, n - 1), { ...meta, tag: 'Quelle heure ?' }, rnd);
  }
  if (kind === 'ampm') {
    const morning = rnd() < 0.5;
    const hh = morning ? rint(6, 11, rnd) : rint(1, 11, rnd);
    const fr = morning ? `${hh} h du matin` : `${hh + 12} h`;
    const ok = `It's ${hh} ${morning ? 'am' : 'pm'}.`;
    const ko = [`It's ${hh} ${morning ? 'pm' : 'am'}.`, `It's ${hh + 12} ${morning ? 'am' : 'pm'}.`];
    return mcq(`Il est ${fr}.`, ok, ko.filter((x) => x !== ok).slice(0, n - 1), { ...meta, tag: 'am / pm', src: 'p25' }, rnd);
  }
  const ok = method1(h, m);
  return mcq(`${clock(h, m)} — méthode 1 (aiguilles) : it's…`, ok, traps().filter((x) => x !== ok).slice(0, n - 1),
    { ...meta, tag: 'past / to' }, rnd);
}

/* ------------------------------------------------------------------ *
 * Orthographe — réponses tapées au clavier de la borne
 * ------------------------------------------------------------------ */

/** Mots à écrire sans faute. `fr` est l'indice, `en` la réponse, `alts` les variantes justes. */
export const SPELL_WORDS = [
  { fr: 'le petit-déjeuner', en: 'breakfast', lvl: 1, src: 'p14', topic: 'routine-vocab' },
  { fr: "l'école", en: 'school', lvl: 1, src: 'p14', topic: 'routine-vocab' },
  { fr: 'les dents', en: 'teeth', lvl: 1, src: 'p14', topic: 'routine-vocab' },
  { fr: 'les cheveux', en: 'hair', lvl: 1, src: 'p14', topic: 'routine-vocab' },
  { fr: 'le visage', en: 'face', lvl: 1, src: 'p14', topic: 'routine-vocab' },
  { fr: 'le lit', en: 'bed', lvl: 1, src: 'p14', topic: 'routine-vocab' },
  { fr: 'le sac', en: 'bag', lvl: 1, src: 'p14', topic: 'routine-vocab' },
  { fr: 'le thé', en: 'tea', lvl: 1, src: 'p14', topic: 'routine-vocab' },
  { fr: 'le bain', en: 'bath', lvl: 1, src: 'p14', topic: 'routine-vocab' },
  { fr: 'la douche', en: 'shower', lvl: 2, src: 'p14', topic: 'routine-vocab' },
  { fr: 'le journal', en: 'newspaper', lvl: 2, src: 'p14', topic: 'routine-vocab' },
  { fr: 'le téléphone', en: 'phone', lvl: 1, src: 'p14', topic: 'routine-vocab' },
  { fr: 'les devoirs', en: 'homework', lvl: 2, src: 'p26', topic: 'routine-vocab' },
  { fr: 'le déjeuner (midi)', en: 'lunch', lvl: 2, src: 'p26', topic: 'routine-vocab' },
  { fr: 'le dîner (soir)', en: 'dinner', lvl: 2, src: 'p24', topic: 'routine-vocab' },
  { fr: 'le goûter', en: 'snack', lvl: 2, src: 'p26', topic: 'routine-vocab' },
  { fr: 'se réveiller', en: 'wake up', lvl: 1, src: 'p14', topic: 'routine-vocab' },
  { fr: "s'habiller", en: 'get dressed', lvl: 3, src: 'p14', topic: 'routine-vocab' },
  { fr: 'dormir', en: 'sleep', lvl: 1, src: 'p26', topic: 'routine-vocab' },
  { fr: 'la natation (go …)', en: 'swimming', lvl: 3, src: 'p22', topic: 'free-time' },
  { fr: 'les magasins (go …)', en: 'shopping', lvl: 2, src: 'p22', topic: 'free-time' },
  { fr: 'le cinéma', en: 'cinema', lvl: 2, src: 'p22', topic: 'free-time' },
  { fr: 'la cornemuse', en: 'bagpipes', lvl: 3, alts: ['the bagpipes'], src: 'p22', topic: 'free-time' },
  { fr: 'les jeux vidéo', en: 'video games', lvl: 2, src: 'p22', topic: 'free-time' },
  { fr: 'la gymnastique', en: 'gymnastics', lvl: 3, src: 'p22', topic: 'free-time' },
  { fr: 'mercredi', en: 'Wednesday', lvl: 3, src: 'p18', topic: 'free-time' },
  { fr: 'mardi', en: 'Tuesday', lvl: 3, src: 'p18', topic: 'free-time' },
  { fr: 'dimanche', en: 'Sunday', lvl: 2, src: 'p18', topic: 'free-time' },
  { fr: 'le week-end', en: 'weekend', lvl: 2, alts: ['week-end', 'the weekend'], src: 'p18', topic: 'free-time' },
  { fr: "d'abord", en: 'first', lvl: 1, src: 'p14', topic: 'sequencers' },
  { fr: 'ensuite', en: 'then', lvl: 1, src: 'p14', topic: 'sequencers' },
  { fr: 'enfin', en: 'finally', lvl: 2, src: 'p14', topic: 'sequencers' },
  { fr: 'un quart (d\'heure)', en: 'quarter', lvl: 2, alts: ['a quarter'], src: 'p23', topic: 'time' },
  { fr: 'et demie', en: 'half past', lvl: 2, src: 'p23', topic: 'time' }
];

/** Les verbes à la 3e personne, pour taper le -s ou le -es. */
export const SPELL_VERBS = ['brush', 'wash', 'watch', 'go', 'do', 'have', 'play', 'fix', 'get', 'read', 'pack', 'take', 'check', 'make', 'drink', 'eat'];

function spellQuestion(level, opt) {
  const rnd = opt.random || Math.random;
  const meta = { fam: FAM.spell, famKey: 'spell' };
  const kinds = ['word', 'word', 'verb'];
  if (level >= 2) kinds.push('det');
  const kind = opt.kind || pick(kinds, rnd);

  if (kind === 'verb') {
    const v = pick(SPELL_VERBS, rnd);
    const who = pick(['He', 'She', 'Tom', 'My sister', 'Hannah'], rnd);
    return typed(`${who} … (${v}) → écris le verbe`, third(v), { ...meta, tag: '-s / -es à la 3e personne', topic: 'present-simple', src: 'p15' });
  }
  if (kind === 'det') {
    const x = pick(POSSESSIVES.filter((y) => y.p !== 'it'), rnd);
    return typed(`${x.p} → ${x.fr} : écris le déterminant`, x.det, { ...meta, tag: 'Possessif à écrire', topic: 'possessives', src: 'p16' });
  }
  const pool = SPELL_WORDS.filter((w) => w.lvl <= Math.max(1, level));
  const w = pick(pool, rnd);
  return typed(`${w.fr} → en anglais`, w.en, { ...meta, tag: 'Écris le mot', topic: w.topic, src: w.src }, w.alts || []);
}

/* ------------------------------------------------------------------ *
 * Entrée unique
 * ------------------------------------------------------------------ */

const GENS = {
  routine: routineQuestion, free: freeQuestion, present: presentQuestion,
  poss: possQuestion, time: timeQuestion, spell: spellQuestion
};

/** Le mélange pèse plus lourd sur le présent simple et l'heure, les deux grosses rubriques de la fiche. */
const MIX_WEIGHTS = ['routine', 'free', 'present', 'present', 'poss', 'time', 'time', 'spell'];

/**
 * Une question.
 * @param {number} level 1 à 5
 * @param {{mode?:string, random?:function, kind?:string}} opt
 */
export function generateQuestion(level, opt = {}) {
  const rnd = opt.random || Math.random;
  let mode = opt.mode;
  if (!GENS[mode]) mode = pick(MIX_WEIGHTS, rnd);
  return GENS[mode](level, opt);
}

/** Distribue des questions sans répéter un énoncé vu récemment. */
export function createDealer(opt = {}) {
  const memory = Math.max(1, opt.memory || 10);
  const seen = [];
  return {
    seen,
    next(level) {
      let q = generateQuestion(level, opt);
      for (let i = 0; i < 60 && seen.indexOf(q.t) !== -1; i++) q = generateQuestion(level, opt);
      seen.push(q.t);
      while (seen.length > memory) seen.shift();
      return q;
    }
  };
}
