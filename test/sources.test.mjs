import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  generateQuestion, FAM_KEYS, SOURCES, L1_TOPICS,
  ROUTINE, FREE_TIME, AROUND_THE_WORLD, ACTIONS, S_SOUND, SPELL_WORDS
} from '../js/generate.js';
import { question } from '../js/engine.js';
import { STAGE_MODES } from '../js/levels.js';
import { SPOT, DICTATION, L1_SRC } from '../js/bank.js';

function mulberry32(a) {
  return function () {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Les thèmes que la fiche de révision ne couvre pas : pays, lieu de vie, unités d'avant, sujets inventés. */
const OFF_TOPIC = [
  /\blives?\b|\bliving\b|\bvivre\b|\bhabite/i,
  /\b(England|Ireland|Scotland|United States|America|country|pays)\b/i,
  /\b(weather|sunny|rainy|cloudy|windy|snowy)\b/i,
  /\b(January|February|March|April|May|June|July|August|September|October|November|December)\b/,
  /\b(Monday|Thursday|Saturday|lundi|jeudi|samedi)\b/i,
  /\b(absent|tired|hungry|thirsty|scared|angry|sick)\b/i,
  /\b(pencil case|ruler|eraser|scissors|glue stick|copybook|there is|there are)\b/i,
  /\b(bus|car|bikes?|dog|dogs|cat)\b/i
];

const srcOk = (src) => typeof src === 'string' && src.split(' · ').every((p) => Object.hasOwn(SOURCES, p));

test('chaque ligne des banques du niveau 1 porte une page du cahier', () => {
  for (const [name, bank] of Object.entries({ ROUTINE, FREE_TIME, AROUND_THE_WORLD, ACTIONS, S_SOUND, SPELL_WORDS })) {
    for (const row of bank) assert.ok(srcOk(row.src), `${name}: ${JSON.stringify(row)} sans source valide`);
  }
});

test('chaque question du niveau 1 a une source et un thème de l\'Unit 4', () => {
  for (const mode of FAM_KEYS) {
    for (let level = 1; level <= 5; level++) {
      const random = mulberry32(level * 101 + mode.length);
      for (let i = 0; i < 400; i++) {
        const q = generateQuestion(level, { mode, random });
        assert.ok(srcOk(q.src), `${mode}/${level} « ${q.t} » : source « ${q.src} »`);
        assert.ok(L1_TOPICS.includes(q.topic), `${mode}/${level} « ${q.t} » : thème « ${q.topic} »`);
      }
    }
  }
});

test('aucune question du niveau 1 ne sort du programme (pays, lieu de vie, unités d\'avant)', () => {
  for (const mode of FAM_KEYS) {
    for (let level = 1; level <= 5; level++) {
      const random = mulberry32(level * 7 + mode.length * 13);
      for (let i = 0; i < 400; i++) {
        const q = generateQuestion(level, { mode, random });
        const text = [q.t, q.aLabel, ...(q.choices || []).map((c) => c.label)].join(' | ');
        for (const re of OFF_TOPIC) assert.ok(!re.test(text), `${mode}/${level} hors programme (${re}) : ${text}`);
      }
    }
  }
});

test('les sources renvoient à des pages du cahier, chacune décrite', () => {
  for (const [k, v] of Object.entries(SOURCES)) {
    assert.match(k, /^p\d{1,2}$/);
    assert.ok(v.length > 10, k);
  }
});

/* Niveau 1 de la version à cinq niveaux : « repère l'erreur » et la dictée suivent la même règle. */

test("repère l'erreur et dictée du niveau 1 : une source et un thème par ligne", () => {
  assert.equal(L1_SRC.spot.length, SPOT[1].length);
  assert.equal(L1_SRC.listen.length, DICTATION[1].length);
  for (const [topic, src] of [...L1_SRC.spot, ...L1_SRC.listen]) {
    assert.ok(L1_TOPICS.includes(topic), topic);
    assert.ok(srcOk(src), src);
  }
});

test('chaque mode du niveau 1, y compris repère l\'erreur et dictée, reste dans le programme', () => {
  for (const m of STAGE_MODES[1]) {
    for (let level = 1; level <= 5; level++) {
      const random = mulberry32(level * 31 + m.key.length);
      for (let i = 0; i < 300; i++) {
        const q = question(level, { stage: 1, mode: m.key, random });
        assert.ok(srcOk(q.src), `${m.key}/${level} « ${q.t} » : source « ${q.src} »`);
        assert.ok(L1_TOPICS.includes(q.topic), `${m.key}/${level} « ${q.t} » : thème « ${q.topic} »`);
        const text = [q.t, q.say || '', q.aLabel, ...(q.choices || []).map((c) => c.label)].join(' | ');
        for (const re of OFF_TOPIC) assert.ok(!re.test(text), `${m.key}/${level} hors programme (${re}) : ${text}`);
      }
    }
  }
});
