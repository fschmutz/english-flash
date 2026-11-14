# Changelog

## 2026.11.14.3

Quatre niveaux au-dessus de l'Unit 4, pour aller jusqu'à l'anglais d'une école britannique exigeante.

- Sélecteur de niveau : 1 · Collège 6e (par défaut, inchangé), 2 · UK Year 7-8, 3 · UK Year 9, 4 · GCSE,
  5 · Native stretch. Un niveau s'ouvre à 85 % sur le niveau d'avant (manche de 10 questions au moins) ;
  **Mode parent** ouvre tout.
- Nouveaux modes à chaque niveau : **Repère l'erreur** et **Dictée** (voix anglaise de l'appareil, en-GB de
  préférence, **Réécouter**, hors ligne). L'orthographe des niveaux 2 à 5 ajoute les mots pièges et
  l'orthographe britannique.
- Banques écrites à la main dans `js/bank.js`, vérifiées par `test/key.mjs` et `test/levels.test.mjs`.
  Les items « repère l'erreur » et dictée du niveau 1 portent leur page du cahier, comme le reste du niveau 1.
- Les records des niveaux 2 à 5 sont séparés de ceux du niveau 1, qui restent où ils étaient.

## 2026.11.14.2

Niveau 1 recentré sur la fiche de révision de l'Unit 4, rien d'autre.

- Retiré : les quatre questions « Where do / does … live? » des textes *Around the world*. Remplacées par des
  questions sur leurs activités (Hannah regarde la télé, Dennis et Joey font leurs devoirs à 5 pm, Tom joue au
  football américain le week-end et aux jeux vidéo le soir).
- Retiré : les phrases inventées hors cahier du présent simple (*by bus*, *brush the dog*, *wash the car*,
  *fix bikes*), remplacées par des phrases des textes et des vocabox (*go to the cinema every Friday evening*,
  *play baseball every Tuesday*, *eat lunch*, *go to school every morning*).
- Retiré : *tired, hungry, late, happy* (unité « How are you? ») après *be*, remplacés par des situations de la
  routine (*at school at 9 am*, *in bed at 10 pm*…) ; *have a shower* remplacé par *have breakfast*.
- Retiré : *The dog … its face* (sujet inventé) dans les possessifs.
- Orthographe : *jeudi* et *samedi* (rituel de début d'année) remplacés par *mardi* et *dimanche*, les jours des
  textes de l'Unit 4.
- Chaque question porte la page du cahier d'où elle vient et son thème. `test/sources.test.mjs` échoue si une
  question n'a pas de source, sort des six thèmes de la fiche, ou parle de pays, de lieu de vie ou d'une unité
  d'avant.

## 2026.11.14.1

Première version, pour l'évaluation d'anglais du lundi 16 novembre 2026 : Unit 4 *My daily routine*.

Sept entraînements tirés de la fiche « Je sais dire et écrire… » du cahier : les vocabox *Morning routine*,
*Daily routine* et *Free time activities*, le présent simple aux trois formes, les déterminants possessifs,
l'heure avec ses deux méthodes, et l'orthographe des mots à savoir écrire. `mix` mélange le tout, avec plus de
présent simple et d'heure.

Toutes les questions se jouent au doigt, sauf l'orthographe, qui a son propre clavier QWERTY : pas de
correcteur automatique du téléphone. Les pièges visés sont ceux du cours : *doesn't* + base verbale, le -s de
la 3e personne, une habitude au présent simple et pas en -ing, *past* et *to*, déterminant ou pronom.

Côté borne, la même que `physique-flash` : manches de 45 s, 60 s ou 2 min, trois niveaux, cinq paliers,
multiplicateurs ×2 et ×3, secondes perdues sur une erreur, récap par famille, **Rejouer les erreurs**,
records locaux par joueur et par mode. Rien n'est envoyé.

Dépôt créé depuis `ScaleMeNow/GITHUB-TEMPLATE`. `ci.yml` gagne un job `node --test`.
