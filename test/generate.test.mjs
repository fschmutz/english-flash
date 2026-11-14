import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  generateQuestion, createDealer, isCorrect, norm, third, ing, method1, method2, clock,
  FAM_KEYS, ROUTINE, FREE_TIME, POSSESSIVES, SPELL_WORDS, ACTIONS
} from '../js/generate.js';
import { THIRD, SINGULAR, OWNER_DET, expectedMethod1, expectedMethod2, parseClock } from './expected.mjs';

function mulberry32(a) {
  return function () {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function batch(mode, level, n, seed, extra = {}) {
  const random = mulberry32(seed);
  const out = [];
  for (let i = 0; i < n; i++) out.push(generateQuestion(level, { mode, random, ...extra }));
  return out;
}

const PLAY_MODES = FAM_KEYS.filter((k) => k !== 'mix');
const goodLabel = (q) => q.choices.find((c) => c.v === q.a).label;

/* ---------------- forme de chaque item ---------------- */

test('chaque QCM a au moins 3 options distinctes et une seule bonne', () => {
  for (const mode of FAM_KEYS) {
    for (let level = 1; level <= 5; level++) {
      for (const q of batch(mode, level, 300, 1000 * level + mode.length)) {
        assert.ok(q.t && !/undefined|NaN|null/.test(q.t), `énoncé cassé: ${q.t}`);
        assert.ok(q.tag && q.fam && q.famKey, 'meta manquante');
        if (!q.choices) {
          assert.ok(Array.isArray(q.accept) && q.accept.length >= 1, 'réponse tapée sans réponse');
          assert.ok(q.accept.includes(q.a));
          continue;
        }
        const labels = q.choices.map((c) => c.label);
        assert.ok(labels.length >= 3, `${mode} L${level}: ${labels.length} options pour « ${q.t} »`);
        assert.equal(new Set(labels).size, labels.length, `doublon dans « ${q.t} »`);
        assert.equal(q.choices.filter((c) => c.v === q.a).length, 1);
        assert.equal(goodLabel(q), q.aLabel);
        for (const l of labels) assert.ok(!/undefined|NaN|null/.test(l), `option cassée: ${l}`);
      }
    }
  }
});

test('le palier 1 propose 3 options, les paliers suivants 4 quand il y en a assez', () => {
  for (const q of batch('routine', 1, 100, 7)) if (q.choices) assert.equal(q.choices.length, 3);
  for (const q of batch('routine', 3, 100, 8)) if (q.choices) assert.equal(q.choices.length, 4);
});

test('les options ne tombent pas toujours au même endroit', () => {
  const pos = new Set(batch('poss', 3, 200, 9).map((q) => q.a));
  assert.ok(pos.size >= 3);
});

test('mix tire dans toutes les familles', () => {
  const fams = new Set(batch('mix', 3, 500, 10).map((q) => q.famKey));
  for (const k of PLAY_MODES) assert.ok(fams.has(k), `mix ne pose jamais ${k}`);
});

/* ---------------- réponses tapées ---------------- */

test('une réponse tapée accepte la casse et les espaces, pas les fautes', () => {
  const q = generateQuestion(1, { mode: 'spell', kind: 'word', random: () => 0 });
  assert.equal(q.a, norm(SPELL_WORDS[0].en));
  assert.ok(isCorrect(q, '  Breakfast '));
  assert.ok(isCorrect(q, 'BREAKFAST'));
  assert.ok(!isCorrect(q, 'breakfeast'));
  assert.ok(!isCorrect(q, 'brekfast'));
  assert.ok(!isCorrect(q, ''));
});

test('norm uniformise apostrophes et espaces', () => {
  assert.equal(norm("Don’t  "), "don't");
  assert.equal(norm('  get   dressed '), 'get dressed');
  assert.equal(norm('Wednesday.'), 'wednesday');
});

test('le verbe à écrire suit la table de la 3e personne', () => {
  for (const q of batch('spell', 3, 400, 11, { kind: 'verb' })) {
    const v = /\((\w+)\)/.exec(q.t)[1];
    assert.equal(q.a, THIRD[v], q.t);
  }
});

test('le possessif à écrire est le déterminant, pas le pronom', () => {
  for (const q of batch('spell', 3, 200, 12, { kind: 'det' })) {
    const p = q.t.split(' → ')[0];
    assert.equal(q.a, POSSESSIVES.find((x) => x.p === p).det);
    assert.ok(!['mine', 'yours', 'hers', 'ours', 'theirs'].includes(q.a));
  }
});

test('isCorrect sur un QCM compare l\'index', () => {
  const q = generateQuestion(2, { mode: 'free', kind: 'dgp', random: mulberry32(3) });
  assert.ok(isCorrect(q, q.a));
  for (const c of q.choices) if (c.v !== q.a) assert.ok(!isCorrect(q, c.v));
});

/* ---------------- présent simple ---------------- */

test('third() suit le cahier : -s, -es après sh/ch/x/o, has, does, goes', () => {
  for (const [base, s3] of Object.entries(THIRD)) assert.equal(third(base), s3, base);
});

test('ing() double le t de get', () => {
  assert.equal(ing('get'), 'getting');
  assert.equal(ing('take'), 'taking');
  assert.equal(ing('play'), 'playing');
});

test('forme affirmative : -s seulement à la 3e personne du singulier', () => {
  for (const q of batch('present', 3, 400, 13, { kind: 'aff' })) {
    const subj = q.t.split(' ___ ')[0];
    const base = /\((\w+)\)$/.exec(q.t)[1];
    assert.equal(q.aLabel, SINGULAR.has(subj) ? THIRD[base] : base, q.t);
  }
});

test('habitude : le présent simple bat la forme en -ing', () => {
  for (const q of batch('present', 3, 300, 14, { kind: 'simpleVsIng' })) {
    const subj = q.t.split(' ___ ')[0];
    assert.ok(!/ing$/.test(q.aLabel), q.t);
    assert.ok(SINGULAR.has(subj) ? /s$/.test(q.aLabel) : !/^(is|are) /.test(q.aLabel), q.t);
  }
});

test("négation : doesn't à la 3e personne du singulier, don't ailleurs", () => {
  for (const q of batch('present', 2, 300, 15, { kind: 'neg' })) {
    const subj = q.t.split(' ___ ')[0];
    assert.equal(q.aLabel, SINGULAR.has(subj) ? "doesn't" : "don't", q.t);
  }
});

test('question : Does à la 3e personne du singulier, Do ailleurs', () => {
  for (const q of batch('present', 2, 300, 16, { kind: 'ques' })) {
    const subj = q.t.replace('___ ', '').split(' ').slice(0, 2).join(' ');
    const sing = /^(he|she|Tom|Hannah|your sister|your brother|Peter|Emma)\b/.test(subj);
    assert.equal(q.aLabel, sing ? 'Does' : 'Do', q.t);
  }
});

test("la bonne phrase négative n'a jamais doesn't + verbe en -s", () => {
  for (const q of batch('present', 4, 300, 17, { kind: 'negSentence' })) {
    const ok = q.aLabel;
    const subj = ok.split(/ (doesn't|don't) /)[0];
    const verb = ok.split(/ (?:doesn't|don't) /)[1].split(' ')[0];
    assert.ok(Object.keys(THIRD).includes(verb), ok);
    assert.ok(ok.includes(SINGULAR.has(subj) ? "doesn't" : "don't"), ok);
  }
});

test('la bonne question à la 3e personne garde la base verbale', () => {
  for (const q of batch('present', 4, 200, 18, { kind: 'quesSentence' })) {
    const verb = q.aLabel.split(' ').find((w) => THIRD[w] !== undefined);
    assert.ok(verb, q.aLabel);
    assert.ok(q.aLabel.startsWith('Does '), q.aLabel);
  }
});

test('réponse courte : même auxiliaire que la question', () => {
  for (const q of batch('present', 4, 300, 19, { kind: 'short' })) {
    const aux = q.t.startsWith('Does') ? 'does' : 'do';
    const yes = q.t.endsWith('Oui.');
    const want = yes ? aux : aux === 'does' ? "doesn't" : "don't";
    assert.ok(q.aLabel.startsWith(yes ? 'Yes' : 'No'), q.t);
    assert.ok(q.aLabel.endsWith(want + '.'), `${q.t} → ${q.aLabel}`);
  }
});

test('be et have : am / is / are, have / has', () => {
  for (const q of batch('present', 2, 300, 20, { kind: 'beHave' })) {
    const subj = q.t.split(' ___ ')[0];
    if (q.tag.startsWith('be')) {
      const want = subj === 'I' ? 'am' : SINGULAR.has(subj) ? 'is' : 'are';
      assert.equal(q.aLabel, want, q.t);
    } else {
      assert.equal(q.aLabel, SINGULAR.has(subj) ? 'has' : 'have', q.t);
    }
  }
});

test('prononciation du -s : les verbes du cahier', () => {
  const book = { brushes: '/iz/', reads: '/z/', gets: '/s/', likes: '/s/', stops: '/s/', loves: '/z/', calls: '/z/', goes: '/z/', plays: '/z/', washes: '/iz/', fixes: '/iz/', writes: '/s/' };
  for (const q of batch('present', 3, 400, 21, { kind: 'sound' })) {
    const w = /« (\w+) »/.exec(q.t)[1];
    if (book[w]) assert.equal(q.aLabel, book[w], w);
    else assert.equal(q.aLabel, /(shes|ches|xes)$/.test(w) ? '/iz/' : '/s/', w);
  }
});

/* ---------------- possessifs ---------------- */

test('le possessif suit le sujet de la phrase', () => {
  for (const q of batch('poss', 3, 400, 22, { kind: 'sentence' })) {
    const subj = Object.keys(OWNER_DET).sort((a, b) => b.length - a.length).find((s) => q.t.startsWith(s + ' '));
    assert.ok(subj, q.t);
    assert.equal(q.aLabel, OWNER_DET[subj], q.t);
  }
});

test('déterminant devant un nom, pronom sans nom', () => {
  for (const q of batch('poss', 4, 300, 23, { kind: 'detVsPron' })) {
    const dets = ['my', 'your', 'his', 'her', 'its', 'our', 'their'];
    if (q.t.startsWith('This is ___ bag')) assert.ok(dets.includes(q.aLabel), q.t);
    else assert.ok(['mine', 'yours', 'hers', 'ours', 'theirs'].includes(q.aLabel), q.t);
  }
});

/* ---------------- l'heure ---------------- */

test('méthode 1 et 2 : les exemples du cahier', () => {
  assert.equal(method2(7, 15), 'seven fifteen');
  assert.equal(method2(11, 5), 'eleven O five');
  assert.equal(method1(6, 0), "six o'clock");
  assert.equal(method1(5, 45), 'a quarter to six');
  assert.equal(method1(10, 25), 'twenty-five past ten');
  assert.equal(method1(1, 30), 'half past one');
  assert.equal(method1(8, 40), 'twenty to nine');
  assert.equal(method1(12, 55), 'five to one');
  assert.equal(method1(12, 15), 'a quarter past twelve');
});

test('méthode 1 et 2 recalculées pour toutes les heures', () => {
  for (let h = 1; h <= 12; h++) {
    for (let m = 0; m < 60; m += 5) {
      assert.equal(method1(h, m), expectedMethod1(h, m), clock(h, m));
      assert.equal(method2(h, m), expectedMethod2(h, m), clock(h, m));
    }
  }
});

test("chaque question sur l'heure a la bonne réponse", () => {
  for (const q of batch('time', 5, 600, 24)) {
    if (q.tag === 'past / to') {
      const { h, m } = parseClock(q.t);
      assert.equal(q.aLabel, expectedMethod1(h, m), q.t);
    } else if (q.tag === 'Heure digitale') {
      const { h, m } = parseClock(q.t);
      assert.equal(q.aLabel, expectedMethod2(h, m), q.t);
    } else if (q.tag === 'Quelle heure ?') {
      const { h, m } = parseClock(q.aLabel);
      assert.equal(q.t, `It's ${expectedMethod1(h, m)}.`);
    } else if (q.tag === 'am / pm') {
      const morning = q.t.includes('du matin');
      const hh = +/(\d+) h/.exec(q.t)[1];
      assert.equal(q.aLabel, `It's ${morning ? hh : hh - 12} ${morning ? 'am' : 'pm'}.`, q.t);
    } else assert.fail('tag inconnu ' + q.tag);
  }
});

test('au palier 1, seulement o\'clock, quart et demie', () => {
  for (const q of batch('time', 1, 200, 25, { kind: 'm1' })) {
    const { m } = parseClock(q.t);
    assert.ok([0, 15, 30, 45].includes(m), q.t);
  }
});

/* ---------------- free time ---------------- */

test('DO / GO / PLAY suit la vocabox', () => {
  const map = Object.fromEntries(FREE_TIME.map((x) => [x.what, x.verb]));
  for (const q of batch('free', 2, 300, 26, { kind: 'dgp' })) {
    const what = q.t.replace('I ___ ', '').replace(/\.$/, '');
    assert.equal(q.aLabel, map[what], q.t);
    assert.deepEqual(q.choices.map((c) => c.label).sort(), ['do', 'go', 'play']);
  }
});

test('traductions routine : chaque paire vient de la liste', () => {
  for (const q of batch('routine', 4, 400, 27)) {
    if (q.tag === 'Français → English') assert.equal(ROUTINE.find((w) => w.fr === q.t).en, q.aLabel);
    if (q.tag === 'English → français') assert.equal(ROUTINE.find((w) => w.en === q.t).fr, q.aLabel);
  }
});

/* ---------------- distributeur ---------------- */

test("le distributeur ne répète pas un énoncé dans sa fenêtre de mémoire", () => {
  for (const mode of FAM_KEYS) {
    const d = createDealer({ mode, memory: 8, random: mulberry32(99) });
    const last = [];
    for (let i = 0; i < 120; i++) {
      const q = d.next(3);
      assert.ok(!last.includes(q.t), `${mode}: « ${q.t} » répété`);
      last.push(q.t);
      if (last.length > 8) last.shift();
    }
  }
});

test('chaque action du présent simple a un verbe connu de la table', () => {
  for (const a of ACTIONS) assert.ok(THIRD[a.v], a.v);
});
