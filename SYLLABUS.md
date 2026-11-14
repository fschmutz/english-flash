# Programme — Unit 4 « My daily routine » (6ème, Collège Provence)

Ce que couvre l'évaluation, recopié de la fiche « Je sais dire et écrire… » du cahier d'anglais et des
vocabox collées dans le cahier. Le jeu ne pose rien qui ne soit pas ici ou tout près.
`test/syllabus.test.mjs` lit ce fichier et refuse une banque de questions qui s'en écarte.

## Je sais dire et écrire…

- le vocabulaire de la Vocabox « Morning routine »
- les mots de la Vocabox « Free time activities »
- le vocabulaire de la Vocabox « Daily routine »

## Je connais et comprends…

- le présent simple aux trois formes (affirmative, négative, interrogative), à toutes les personnes
- les déterminants possessifs
- l'heure en anglais — les deux méthodes

## Je suis capable de faire des phrases entières pour…

- parler de ma routine (First, I wake up. Then, I check my phone…) et de la routine d'autres personnes
- dire à quelle heure je fais une activité (I wake up at 7 o'clock)

## Vocabox — Morning routine

<!-- vocab:morning -->
- wake up
- get up
- brush my hair
- brush my teeth
- make my bed
- take a bath
- take a shower
- wash my face
- get dressed
- pack my bag
- drink tea
- eat breakfast
- check my phone
- read the newspaper
- go to school
<!-- /vocab -->

## Vocabox — Daily routine

<!-- vocab:daily -->
- go to bed
- sleep
- do my homework
- go home
- go to work
- have lunch
- have a snack
- have dinner
- watch TV
- read a book
<!-- /vocab -->

« eat / have » : *eat breakfast* ou *have breakfast*, *eat lunch* ou *have lunch*.

## Vocabox — Free time activities (DO / GO / PLAY)

<!-- vocab:free -->
- do Irish dancing
- do karate
- do gymnastics
- do my homework
- go out with friends
- go swimming
- go to the cinema
- go shopping
- play hockey
- play American football
- play Gaelic football
- play football
- play cricket
- play baseball
- play video games
- play the bagpipes
- watch TV
- read a book
<!-- /vocab -->

Textes « Free time activities around the world » : ce que font Leslie et Monica, Hannah, Dennis et Joey,
et Tom, quel jour et à quelle heure. Les questions portent sur leurs activités, pas sur le pays où ils vivent.

## D'où vient chaque question

Chaque question du jeu porte la page du cahier d'où elle vient (`SOURCES` dans `js/generate.js`) et un
thème parmi : vocabulaire de la routine, free time (DO / GO / PLAY), présent simple, possessifs, l'heure,
mots de liaison. `test/sources.test.mjs` refuse une question sans page ou hors de ces thèmes.

## Présent simple

- On ajoute un -s à la 3ème personne du singulier : she gets, she brushes, she goes.
- -es après sh, ch, x, o : brushes, watches, fixes, goes. have → has, do → does.
- Prononciation du -s : /s/ (gets, likes, stops, writes), /z/ (reads, loves, calls, goes, plays),
  /iz/ (brushes, washes, fixes).
- (+) I read · he / she reads · (−) I don't read · he / she doesn't read · (?) Do I read? · Does he / she read?
- Après *doesn't* et *does*, le verbe reste à la base : *Tom doesn't watch TV*, *Does Tom watch TV?*
- Une habitude (every Sunday, every morning, at the weekend) se dit au présent simple, pas en -ing.
- be : I am, you are, he / she is, we are, they are · have : I have, she has, they have.
- Mots de liaison : First, Then, After, Finally.

## Déterminants possessifs

<!-- vocab:poss -->
- I → my
- you → your
- he → his
- she → her
- it → its
- we → our
- they → their
<!-- /vocab -->

Pronoms possessifs (sans nom après) : mine, yours, his, hers, its, ours, theirs.

## L'heure — les deux méthodes

- Méthode 1, cadran avec aiguilles : on arrondit à 5 minutes ; l'heure juste : *o'clock* ; on dit les minutes
  puis l'heure ; de 1 à 30 : *past* ; de 31 à 59 : *to* (on compte les minutes qui restent jusqu'à l'heure
  suivante). five past, ten past, a quarter past, twenty past, twenty-five past, half past, twenty-five to,
  twenty to, a quarter to, ten to, five to.
- Méthode 2, heure digitale : l'heure puis les minutes. 7:15 = *it's seven fifteen*. Sous 10 minutes, le 0 se
  dit « O » : 11:05 = *it's eleven O five*.
- am = le matin (*it's 8 am*), pm = l'après-midi et le soir (*it's 9 pm*).

## Niveaux 2 à 5 (au-dessus de l'évaluation)

Le niveau 1 est ce programme, et seulement lui. Les niveaux suivants suivent le programme anglais
(National Curriculum, Key Stage 3 puis GCSE English Language), pour une élève presque native :

| Niveau | Grammaire et langue | Transversal |
| --- | --- | --- |
| 2 · UK Year 7-8 | present / past simple, present / past perfect, continuous, futur ; verbes irréguliers (prétérit, participe passé, *got* à l'anglaise) ; comparatifs et superlatifs ; question tags | orthographe UK, mots pièges, repère l'erreur, dictée |
| 3 · UK Year 9 | conditionnels 0, 1, 2, 3 ; passif ; discours indirect avec concordance des temps ; modaux et *must / might / should / can't have* ; phrasal verbs ; idioms | idem |
| 4 · GCSE | metaphor, simile, personification, alliteration, onomatopoeia, hyperbole ; ton ; registre formel / informel (*Yours faithfully / sincerely*) ; classes de mots ; types de phrases et leur effet | idem |
| 5 · Native stretch | confusables (affect / effect, fewer / less, who / whom, its / it's, practise / practice…) ; vocabulaire soutenu et collocations ; britannique ou américain ; ponctuation : point-virgule, deux-points, apostrophe, virgules | idem |

Orthographe britannique retenue : *-our* (colour), *-re* (centre), *-ise* (organise), *-ll-* (travelled),
*programme*, *grey*, *pyjamas*. L'orthographe d'Oxford accepte aussi *-ize* ; le jeu attend *-ise*, la forme la
plus courante à l'école au Royaume-Uni.
