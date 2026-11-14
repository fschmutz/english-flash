import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { ROUTINE, FREE_TIME, POSSESSIVES, generateQuestion, FAM_KEYS } from '../js/generate.js';

const SYL = readFileSync(new URL('../SYLLABUS.md', import.meta.url), 'utf8');

/** Une liste balisée <!-- vocab:x --> … <!-- /vocab --> de SYLLABUS.md. */
function list(name) {
  const r = new RegExp(`<!-- vocab:${name} -->([\\s\\S]*?)<!-- /vocab -->`).exec(SYL);
  assert.ok(r, `liste ${name} absente de SYLLABUS.md`);
  return r[1].split('\n').map((l) => l.replace(/^- /, '').trim()).filter(Boolean);
}

const same = (a, b) => assert.deepEqual([...a].sort(), [...b].sort());

test('Morning routine : la banque et le programme ont exactement les mêmes expressions', () => {
  same(ROUTINE.filter((w) => w.box === 'morning').map((w) => w.en), list('morning'));
});

test('Daily routine : la banque et le programme ont exactement les mêmes expressions', () => {
  same(ROUTINE.filter((w) => w.box === 'daily').map((w) => w.en), list('daily'));
});

test('Free time activities : verbe + activité identiques au programme', () => {
  same(FREE_TIME.map((x) => x.verb + ' ' + x.what), list('free'));
});

test('Possessifs : les sept déterminants du programme', () => {
  same(POSSESSIVES.map((x) => x.p + ' → ' + x.det), list('poss'));
});

test('chaque expression a un sens français', () => {
  for (const w of ROUTINE) assert.ok(w.fr && w.fr.length > 2, w.en);
  for (const w of FREE_TIME) assert.ok(w.fr && w.fr.length > 2, w.what);
});

/** Rien d'inadapté à une élève de 11 ans ne doit pouvoir sortir du générateur. */
const DENY = /\b(kill|die|dead|blood|gun|beer|wine|drunk|sexy|stupid|idiot|hate|fuck|shit|damn)\b/i;

test('aucun énoncé ni option ne contient de mot inadapté', () => {
  for (const mode of FAM_KEYS) {
    for (let level = 1; level <= 5; level++) {
      for (let i = 0; i < 200; i++) {
        const q = generateQuestion(level, { mode });
        assert.ok(!DENY.test(q.t), q.t);
        for (const c of q.choices || []) assert.ok(!DENY.test(c.label), c.label);
        assert.ok(!DENY.test(q.aLabel), q.aLabel);
      }
    }
  }
});
