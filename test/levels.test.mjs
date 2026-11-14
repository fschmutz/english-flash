import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as B from '../js/bank.js';
import { STAGES, STAGE_MODES, irregularTraps, words } from '../js/levels.js';
import { question, createDealer } from '../js/engine.js';
import { isCorrect, normLoose } from '../js/generate.js';
import { record, isUnlocked, UNLOCK_PCT } from '../js/progress.js';
import { KEY, IRREGULAR_KEY, UK_KEY, SPELLING_KEY } from './key.mjs';

function mulberry32(a) {
  return function () {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const MCQ_BANKS = ['L2_TENSES', 'L2_TAGS', 'L3_COND_FILL', 'L3_PASSIVE', 'L3_REPORTED', 'L3_MODALS', 'L3_PHRASAL',
  'L3_IDIOMS', 'L4_DEVICES', 'L4_TONE', 'L4_REGISTER', 'L4_SENTENCES', 'L5_CONFUSABLES', 'L5_VOCAB', 'L5_PUNCT'];

/* ---------------- corrigé indépendant ---------------- */

test('chaque bonne réponse écrite à la main est celle du corrigé', () => {
  for (const name of MCQ_BANKS) {
    const bank = B[name];
    assert.equal(bank.length, KEY[name].length, `${name}: ${bank.length} lignes, ${KEY[name].length} au corrigé`);
    bank.forEach((row, i) => assert.equal(row[1], KEY[name][i], `${name}[${i}] « ${row[0]} »`));
  }
  B.L3_COND_ID.forEach(([s, type], i) => assert.equal(type, KEY.L3_COND_ID[i], s));
  B.L4_WORDCLASS.forEach(([s, , cls], i) => assert.equal(cls, KEY.L4_WORDCLASS[i], s));
  for (const st of [1, 2, 3, 4, 5]) {
    assert.equal(B.SPOT[st].length, KEY.SPOT[st].length, `SPOT ${st}`);
    B.SPOT[st].forEach((row, i) => assert.equal(row[2], KEY.SPOT[st][i], row[0]));
  }
});

test('chaque QCM écrit à la main : la bonne réponse n\'est pas parmi les fausses, pas de doublon', () => {
  for (const name of MCQ_BANKS) {
    for (const [q, ok, ...ko] of B[name]) {
      assert.ok(ko.length >= 2, `${name}: « ${q} » a moins de 3 options`);
      assert.ok(!ko.includes(ok), `${name}: « ${q} » a sa bonne réponse parmi les fausses`);
      assert.equal(new Set(ko).size, ko.length, `${name}: doublon dans « ${q} »`);
    }
  }
});

test('aucun énoncé en double dans un niveau', () => {
  const byStage = {
    2: ['L2_TENSES', 'L2_TAGS'], 3: ['L3_COND_FILL', 'L3_PASSIVE', 'L3_REPORTED', 'L3_MODALS', 'L3_PHRASAL', 'L3_IDIOMS'],
    4: ['L4_DEVICES', 'L4_TONE', 'L4_REGISTER', 'L4_SENTENCES'], 5: ['L5_CONFUSABLES', 'L5_VOCAB', 'L5_PUNCT']
  };
  for (const [st, names] of Object.entries(byStage)) {
    const all = names.flatMap((n) => B[n].map((r) => r[0]));
    if (+st === 3) all.push(...B.L3_COND_ID.map((r) => r[0]));
    if (+st === 4) all.push(...B.L4_WORDCLASS.map((r) => r[0]));
    all.push(...B.SPOT[st].map((r) => r[0]), ...B.DICTATION[st]);
    const dup = all.filter((x, i) => all.indexOf(x) !== i);
    assert.deepEqual(dup, [], `niveau ${st}: doublons ${dup.join(' | ')}`);
  }
  const words5 = B.MISSPELT[2].concat(B.MISSPELT[3], B.MISSPELT[4], B.MISSPELT[5]).map((r) => r[1]);
  assert.equal(new Set(words5).size, words5.length, 'mot piège en double');
});

/* ---------------- tables : vérifications par règle ---------------- */

test('verbes irréguliers : identiques au tableau retapé', () => {
  assert.equal(B.IRREGULAR.length, IRREGULAR_KEY.length);
  B.IRREGULAR.forEach(([b, p, pp], i) => assert.deepEqual([b, p, pp], IRREGULAR_KEY[i]));
});

test('verbes irréguliers : un piège n\'est jamais la forme demandée', () => {
  for (const [b, p, pp] of B.IRREGULAR) {
    assert.ok(!irregularTraps(b, p, pp).includes(p), b);
    assert.ok(!irregularTraps(b, pp, p).includes(pp), b);
    assert.ok(irregularTraps(b, p, pp).length >= 2, b);
  }
});

/** Règle du comparatif, écrite ici sans regarder la table. */
function comparative(adj) {
  const irr = { good: ['better', 'best'], bad: ['worse', 'worst'] };
  if (irr[adj]) return irr[adj];
  const LONG = ['beautiful', 'expensive', 'interesting', 'dangerous', 'important', 'difficult', 'famous', 'careful'];
  if (LONG.includes(adj)) return ['more ' + adj, 'most ' + adj];
  if (/[^aeiou]y$/.test(adj)) return [adj.slice(0, -1) + 'ier', adj.slice(0, -1) + 'iest'];
  if (adj.endsWith('e')) return [adj + 'r', adj + 'st'];
  if (/^[^aeiou]*[aeiou][^aeiouwxy]$/.test(adj)) { const d = adj + adj.slice(-1); return [d + 'er', d + 'est']; }
  return [adj + 'er', adj + 'est'];
}

test('comparatifs et superlatifs suivent la règle', () => {
  for (const [a, c, s] of B.ADJECTIVES) assert.deepEqual([c, s], comparative(a), a);
});

test('UK / US : chaque mot britannique est celui du corrigé', () => {
  for (const [us, uk] of B.UK_US) assert.equal(uk, UK_KEY[us.split(' (')[0]], us);
  for (const [us, uk] of B.UK_SPELLING) {
    assert.ok(SPELLING_KEY.has(uk), uk);
    assert.notEqual(us.split(' (')[0], uk);
  }
  for (const st of [2, 3, 4, 5]) for (const [, w] of B.MISSPELT[st]) assert.ok(SPELLING_KEY.has(w), w);
});

test('classes de mots : le mot est dans la phrase, la réponse est une classe connue', () => {
  for (const [s, w, cls] of B.L4_WORDCLASS) {
    assert.ok(words(s).includes(w), `${w} absent de « ${s} »`);
    assert.ok(B.WORD_CLASSES.includes(cls));
  }
});

/* ---------------- repère l'erreur ---------------- */

test("repère l'erreur : un seul mot faux, une seule correction parmi les options", () => {
  for (const st of [1, 2, 3, 4, 5]) {
    for (const [s, wrong, fix, ...alts] of B.SPOT[st]) {
      const toks = words(s);
      assert.equal(toks.filter((t) => t === wrong).length, 1, `« ${wrong} » doit apparaître une fois dans « ${s} »`);
      assert.notEqual(fix, wrong);
      assert.ok(!alts.includes(fix) && !alts.includes(wrong), s);
      assert.equal(new Set(alts).size, alts.length, s);
      const others = new Set(toks.filter((t) => t.toLowerCase() !== wrong.toLowerCase() && t.length > 1).map((t) => t.toLowerCase()));
      assert.ok(others.size >= 3, `« ${s} » : pas assez d'autres mots`);
    }
  }
});

/* ---------------- dictée ---------------- */

test('dictée : tapable au clavier de la borne, sans chiffres, pas trop longue', () => {
  for (const st of [1, 2, 3, 4, 5]) {
    assert.ok(B.DICTATION[st].length >= 10);
    for (const s of B.DICTATION[st]) {
      assert.ok(!/\d/.test(s), s);
      assert.ok(s.length <= 60, `${s.length} caractères : « ${s} »`);
      assert.match(normLoose(s), /^[a-z' ]+$/, s);
    }
  }
});

test('dictée : ponctuation et majuscules tolérées, mots et apostrophes non', () => {
  const q = question(2, { stage: 5, mode: 'listen', random: () => 0 });
  assert.equal(q.say, B.DICTATION[5][0]);
  assert.ok(isCorrect(q, 'the new rules will affect everyone'));
  assert.ok(isCorrect(q, 'The new rules, will affect everyone!!'));
  assert.ok(!isCorrect(q, 'the new rules will effect everyone'));
  const q2 = question(2, { stage: 5, mode: 'listen', random: () => 0.35 });
  assert.equal(q2.say, B.DICTATION[5][3]);
  assert.ok(isCorrect(q2, 'the dog wagged its tail happily'));
  assert.ok(!isCorrect(q2, "the dog wagged it's tail happily"));
});

/* ---------------- questions générées, par niveau ---------------- */

for (const st of STAGES.map((s) => s.n)) {
  test(`niveau ${st} : chaque question générée est jouable et sans ambiguïté`, () => {
    for (const m of STAGE_MODES[st]) {
      for (let level = 1; level <= 5; level++) {
        const random = mulberry32(st * 1000 + level * 37 + m.key.length);
        for (let i = 0; i < 150; i++) {
          const q = question(level, { stage: st, mode: m.key, random });
          assert.ok(q.t && !/undefined|NaN|null/.test(q.t), `${st}/${m.key}: ${q.t}`);
          assert.ok(q.fam && q.famKey && q.tag, `${st}/${m.key}: meta`);
          if (!q.choices) { assert.ok(q.accept && q.accept.includes(q.a)); continue; }
          const labels = q.choices.map((c) => c.label);
          assert.ok(labels.length >= 3, `${st}/${m.key}: « ${q.t} » ${labels.length} options`);
          assert.equal(new Set(labels.map((l) => l.toLowerCase())).size, labels.length, `doublon: ${labels}`);
          assert.equal(q.choices.filter((c) => c.v === q.a).length, 1);
          assert.equal(q.choices.find((c) => c.v === q.a).label, q.aLabel);
        }
      }
    }
  });
}

test('chaque niveau a au moins 40 questions différentes', () => {
  const counts = {};
  for (const st of [1, 2, 3, 4, 5]) {
    const seen = new Set();
    const random = mulberry32(st);
    for (const m of STAGE_MODES[st]) {
      for (let i = 0; i < 3000; i++) {
        const q = question(5, { stage: st, mode: m.key, random });
        seen.add(q.say || q.t);
      }
    }
    counts[st] = seen.size;
    assert.ok(seen.size >= 40, `niveau ${st}: ${seen.size} questions`);
  }
});

test('le niveau 1 garde ses modes et son ordre, plus les deux modes transversaux', () => {
  assert.deepEqual(STAGE_MODES[1].map((m) => m.key), ['routine', 'free', 'present', 'poss', 'time', 'spell', 'spot', 'listen', 'mix']);
});

test('le distributeur ne répète pas une dictée dans sa fenêtre', () => {
  const d = createDealer({ stage: 3, mode: 'listen', memory: 6, random: mulberry32(5) });
  const last = [];
  for (let i = 0; i < 60; i++) {
    const q = d.next(2);
    assert.ok(!last.includes(q.say), q.say);
    last.push(q.say); if (last.length > 6) last.shift();
  }
});

/* ---------------- déblocage ---------------- */

test(`un niveau s'ouvre à ${UNLOCK_PCT} % sur le niveau d'avant, manche de 10 questions au moins`, () => {
  let best = {};
  assert.ok(isUnlocked(best, 1));
  assert.ok(!isUnlocked(best, 2));
  best = record(best, 1, 9, 9);
  assert.ok(!isUnlocked(best, 2), 'moins de 10 questions ne compte pas');
  best = record(best, 1, 8, 10);
  assert.ok(!isUnlocked(best, 2), '80 % ne suffit pas');
  best = record(best, 1, 17, 20);
  assert.ok(isUnlocked(best, 2), '85 % ouvre le niveau 2');
  assert.ok(!isUnlocked(best, 3));
  best = record(best, 1, 1, 20);
  assert.ok(isUnlocked(best, 2), 'une mauvaise manche ne referme pas');
  assert.ok(isUnlocked({}, 5, true), 'le choix libre ouvre tout');
});

/* ---------------- contenu ---------------- */

const DENY = /\b(kill|die|dead|blood|gun|beer|wine|sexy|stupid|idiot|hate|fuck|shit|damn)\b/i;

test('aucun mot inadapté dans les banques', () => {
  const walk = (v) => (typeof v === 'string' ? [v] : Array.isArray(v) ? v.flatMap(walk) : v && typeof v === 'object' ? Object.values(v).flatMap(walk) : []);
  for (const s of walk(Object.values(B))) assert.ok(!DENY.test(s), s);
});

/* ---------------- hors ligne ---------------- */

import { readFileSync, readdirSync } from 'node:fs';

test('le service worker met en cache chaque script, et les versions concordent', () => {
  const sw = readFileSync(new URL('../sw.js', import.meta.url), 'utf8');
  for (const f of readdirSync(new URL('../js/', import.meta.url))) assert.ok(sw.includes(`'./js/${f}'`), f);
  const v = JSON.parse(readFileSync(new URL('../version.json', import.meta.url), 'utf8')).version;
  assert.ok(readFileSync(new URL('../js/version.js', import.meta.url), 'utf8').includes(`'${v}'`));
});

test("aucun script n'appelle le réseau, sauf version.json", () => {
  for (const f of readdirSync(new URL('../js/', import.meta.url))) {
    const src = readFileSync(new URL('../js/' + f, import.meta.url), 'utf8');
    assert.ok(!/XMLHttpRequest|WebSocket|sendBeacon|https?:\/\//.test(src), f);
    const fetches = src.match(/fetch\(([^)]*)\)/g) || [];
    for (const x of fetches) assert.match(x, /version\.json/, f);
  }
});
