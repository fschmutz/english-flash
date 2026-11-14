<div align="center">

# English Flash

**60 secondes. My daily routine.**

Arcade d'anglais 6ème dans le navigateur. Rien n'est envoyé.

</div>

---

Borne d'arcade, petite sœur de [calcul-flash](https://github.com/fschmutz/calcul-flash) et de
[physique-flash](https://github.com/fschmutz/physique-flash). Prénom, puis entraînement / niveau / durée.
Manche chronométrée, séries à multiplicateur, récap de fin de manche, **Rejouer les erreurs** qui repasse
exactement les questions ratées. Consignes en français, contenu en anglais, tout hors ligne.

Le programme vient du cahier d'anglais de 6ème (Collège Provence), Unit 4 *My daily routine* : la fiche
« Je sais dire et écrire… » et les vocabox collées dans le cahier. Tout est recopié dans
[SYLLABUS.md](SYLLABUS.md), et un test refuse une banque de questions qui s'en écarte. Un cran au-dessus du
cahier : c'est de l'entraînement, pas une recopie des exercices.

## Screenshots

| Choix de l'entraînement | Une question à toucher | Orthographe au clavier | Fin de manche |
|---|---|---|---|
| <img src="docs/screenshots/setup.png" alt="Écran de choix : sept entraînements, trois niveaux, trois durées" width="200"> | <img src="docs/screenshots/question.png" alt="Une question sur l'heure avec quatre réponses à toucher" width="200"> | <img src="docs/screenshots/orthographe.png" alt="Une question d'orthographe avec le clavier QWERTY de la borne" width="200"> | <img src="docs/screenshots/recap.png" alt="Récap de fin de manche : score, réussite, questions à revoir" width="200"> |

Les captures sont prises avec un prénom fictif.

## Entraînements

| Mode | Ce qu'on révise | Comment on répond |
| --- | --- | --- |
| `routine` | Vocabox *Morning routine* et *Daily routine*, anglais ↔ français, *eat / have*, First / Then / After / Finally. | Boutons à toucher |
| `free` | Vocabox *Free time activities* : DO, GO ou PLAY ? Traductions, et compréhension des quatre textes *Around the world* (leurs activités, pas leur pays). | Boutons à toucher |
| `present` | Présent simple aux trois formes : le -s de la 3e personne, *don't / doesn't*, *Do / Does*, la bonne phrase négative ou interrogative (*Tom doesn't watch*, jamais *doesn't watches*), habitude → présent simple et pas -ing, réponses courtes, *am / is / are*, *have / has*, prononciation /s/ /z/ /iz/. | Boutons à toucher |
| `poss` | my, your, his, her, its, our, their selon le sujet ; au palier 3, déterminant (*her bag*) ou pronom (*it's hers*). | Boutons à toucher |
| `time` | L'heure, méthode 1 (*a quarter to six*, *twenty-five past ten*) et méthode 2 (*seven fifteen*, *eleven O five*), dans les deux sens, et am / pm. | Boutons à toucher |
| `spell` | Écrire sans faute : les mots des vocabox, le verbe à la 3e personne (*brushes*, *goes*, *has*), le déterminant possessif. | Clavier QWERTY de la borne |
| `mix` | Tout, sans prévenir, avec plus de présent simple et d'heure. | Les deux |

Trois niveaux (Tranquille / 6ème / 5ème), cinq paliers qui montent avec les séries, manches de 45 s, 60 s ou
2 min. Au palier 1, trois réponses au choix ; ensuite quatre.

Le clavier de l'orthographe est celui de la borne, pas celui du téléphone : pas de correcteur automatique ni
de suggestion, l'orthographe reste celle de l'élève. Majuscules et espaces en trop ne comptent pas.

## Vie privée

Pas de compte, pas de réseau, pas d'analytics, pas de police distante. Seuls le prénom et les records locaux
vont dans `localStorage`. La CSP est `default-src 'self'`. Les polices sont celles du système.

## En local

```bash
python3 -m http.server 8080
# http://localhost:8080
```

```bash
node --test "test/*.test.mjs"
```

Les tests vérifient les générateurs sans navigateur : chaque QCM a exactement une bonne option et pas de
doublon, chaque réponse est recalculée par des tables écrites à part (`test/expected.mjs` : 3e personne,
possessif par sujet, les deux méthodes de l'heure), la banque de vocabulaire est identique aux listes de
[SYLLABUS.md](SYLLABUS.md), aucun mot inadapté ne peut sortir, et aucun énoncé ne se répète dans la fenêtre de
mémoire du distributeur.

## GitHub Pages

Site statique servi depuis la racine de `main`, comme `calcul-flash` : pas de build, pas de workflow, juste
`.nojekyll`. La page ne sera en ligne qu'après fusion, et une fois Pages activé sur le dépôt
(*Settings → Pages → Deploy from a branch → `main` / `/`*).

Si la page semble vieille après une mise à jour, touchez **Recharger la dernière version** en bas : le service
worker garde sinon l'ancienne version.

## Dépôt

Créé depuis le modèle `ScaleMeNow/GITHUB-TEMPLATE` : les fichiers communautaires, le wiki dans `wiki/`, la CI
(`ci.yml`, qui lance aussi `node --test`) et le contrôle d'attribution viennent de là. Voir
[CONTRIBUTING.md](CONTRIBUTING.md) et [AGENTS.md](AGENTS.md).

## Licence

MIT. Copyright (c) 2026 [Falco Schmutz](https://github.com/fschmutz).
