/**
 * Banques de questions des niveaux 2 à 5, et des modes transversaux (repère l'erreur, dictée,
 * orthographe) à tous les niveaux. Anglais britannique.
 *
 * QCM écrit à la main : [énoncé, bonne réponse, mauvaise 1, mauvaise 2, (mauvaise 3)].
 * Chaque bonne réponse est recopiée à part dans test/key.mjs : une faute de frappe ici ne peut pas
 * être d'accord avec elle-même là-bas.
 */

/* ================================================================== *
 * Niveau 2 — UK Year 7-8
 * ================================================================== */

export const L2_TENSES = [
  ['She ___ in York since 2019. (live)', 'has lived', 'lives', 'lived', 'is living'],
  ['I ___ when the phone rang. (read)', 'was reading', 'read', 'have read', 'am reading'],
  ['By the time we arrived, the film ___. (start)', 'had started', 'has started', 'starts', 'is starting'],
  ['Look! It ___. (snow)', 'is snowing', 'snows', 'snowed', 'has snowed'],
  ['We ___ Edinburgh last summer. (visit)', 'visited', 'have visited', 'are visiting', 'visit'],
  ['They ___ for an hour before the bus finally came. (wait)', 'had been waiting', 'have been waiting', 'are waiting', 'wait'],
  ['How long have you ___ the piano? (learn)', 'been learning', 'learning', 'be learning', 'to learn'],
  ['I have never ___ to Japan. (be)', 'been', 'be', 'was', 'being'],
  ['Water ___ at 100 degrees Celsius. (boil)', 'boils', 'is boiling', 'boiled', 'has boiled'],
  ['This time tomorrow, I ___ to Madrid. (fly)', 'will be flying', 'fly', 'flew', 'have flown'],
  ["I haven't finished my homework ___.", 'yet', 'already', 'since', 'ago'],
  ['We moved to Bristol three years ___.', 'ago', 'since', 'for', 'yet'],
  ['She has been a teacher ___ 2015.', 'since', 'for', 'ago', 'from'],
  ['I have known Sam ___ six years.', 'for', 'since', 'ago', 'during'],
  ['While I ___ home, it started to rain. (walk)', 'was walking', 'am walking', 'have walked', 'walks'],
  ['Every Saturday, my brother ___ rugby. (play)', 'plays', 'is playing', 'play', 'has played'],
  ['Shh! The baby ___. (sleep)', 'is sleeping', 'sleeps', 'slept', 'has slept'],
  ['When I got to the station, the train had already ___. (leave)', 'left', 'leave', 'leaving', 'leaved'],
  ['I ___ him since Monday. (not / see)', "haven't seen", "didn't see", "don't see", "wasn't seeing"],
  ['What ___ you doing at eight o\'clock last night?', 'were', 'was', 'did', 'have'],
  ['___ you ever eaten sushi?', 'Have', 'Did', 'Do', 'Are'],
  ['She ___ three emails so far this morning. (write)', 'has written', 'writes', 'had written', 'is write'],
  ["I'm out of breath because I ___ for an hour. (run)", 'have been running', 'run', 'am run', 'had run'],
  ['Tom ___ dinner when the lights went out. (cook)', 'was cooking', 'cooks', 'has cooked', 'is cooking'],
  ['Next week we ___ to the Lake District — the cottage is booked. (go)', 'are going', 'went', 'have gone', 'had gone']
];

/** Verbes irréguliers : base, prétérit, participe passé, sens. Formes britanniques (get → got). */
export const IRREGULAR = [
  ['begin', 'began', 'begun', 'commencer'], ['break', 'broke', 'broken', 'casser'],
  ['bring', 'brought', 'brought', 'apporter'], ['build', 'built', 'built', 'construire'],
  ['buy', 'bought', 'bought', 'acheter'], ['catch', 'caught', 'caught', 'attraper'],
  ['choose', 'chose', 'chosen', 'choisir'], ['come', 'came', 'come', 'venir'],
  ['do', 'did', 'done', 'faire'], ['draw', 'drew', 'drawn', 'dessiner'],
  ['drink', 'drank', 'drunk', 'boire'], ['drive', 'drove', 'driven', 'conduire'],
  ['eat', 'ate', 'eaten', 'manger'], ['fall', 'fell', 'fallen', 'tomber'],
  ['feel', 'felt', 'felt', 'ressentir'], ['find', 'found', 'found', 'trouver'],
  ['fly', 'flew', 'flown', 'voler (en avion)'], ['forget', 'forgot', 'forgotten', 'oublier'],
  ['get', 'got', 'got', 'obtenir'], ['give', 'gave', 'given', 'donner'],
  ['go', 'went', 'gone', 'aller'], ['grow', 'grew', 'grown', 'grandir'],
  ['know', 'knew', 'known', 'savoir'], ['leave', 'left', 'left', 'partir'],
  ['lose', 'lost', 'lost', 'perdre'], ['make', 'made', 'made', 'fabriquer'],
  ['meet', 'met', 'met', 'rencontrer'], ['ride', 'rode', 'ridden', 'monter (à vélo)'],
  ['run', 'ran', 'run', 'courir'], ['say', 'said', 'said', 'dire'],
  ['see', 'saw', 'seen', 'voir'], ['sing', 'sang', 'sung', 'chanter'],
  ['sit', 'sat', 'sat', "s'asseoir"], ['speak', 'spoke', 'spoken', 'parler'],
  ['steal', 'stole', 'stolen', 'voler (dérober)'], ['swim', 'swam', 'swum', 'nager'],
  ['take', 'took', 'taken', 'prendre'], ['teach', 'taught', 'taught', 'enseigner'],
  ['think', 'thought', 'thought', 'penser'], ['throw', 'threw', 'thrown', 'lancer'],
  ['wear', 'wore', 'worn', 'porter (un vêtement)'], ['win', 'won', 'won', 'gagner'],
  ['write', 'wrote', 'written', 'écrire']
];

/** Adjectifs : base, comparatif, superlatif. Pas de cas qui accepte les deux formes (clever, quiet…). */
export const ADJECTIVES = [
  ['tall', 'taller', 'tallest'], ['small', 'smaller', 'smallest'], ['old', 'older', 'oldest'],
  ['big', 'bigger', 'biggest'], ['hot', 'hotter', 'hottest'], ['thin', 'thinner', 'thinnest'],
  ['happy', 'happier', 'happiest'], ['busy', 'busier', 'busiest'], ['easy', 'easier', 'easiest'],
  ['funny', 'funnier', 'funniest'], ['heavy', 'heavier', 'heaviest'], ['nice', 'nicer', 'nicest'],
  ['large', 'larger', 'largest'], ['safe', 'safer', 'safest'], ['fast', 'faster', 'fastest'],
  ['beautiful', 'more beautiful', 'most beautiful'], ['expensive', 'more expensive', 'most expensive'],
  ['interesting', 'more interesting', 'most interesting'], ['dangerous', 'more dangerous', 'most dangerous'],
  ['important', 'more important', 'most important'], ['difficult', 'more difficult', 'most difficult'],
  ['famous', 'more famous', 'most famous'], ['careful', 'more careful', 'most careful'],
  ['good', 'better', 'best'], ['bad', 'worse', 'worst']
];

export const L2_TAGS = [
  ["You're from Leeds, ___?", "aren't you", "isn't it", "don't you", 'are you'],
  ['She can swim, ___?', "can't she", 'can she', "doesn't she", "isn't she"],
  ["They didn't come, ___?", 'did they', "didn't they", 'do they', "weren't they"],
  ['He has finished, ___?', "hasn't he", "doesn't he", 'has he', "isn't he"],
  ["It isn't raining, ___?", 'is it', "isn't it", 'does it', "doesn't it"],
  ['We should leave now, ___?', "shouldn't we", 'should we', "don't we", "won't we"],
  ["You won't tell anyone, ___?", 'will you', "won't you", 'do you', 'are you'],
  ['Your mum likes tea, ___?', "doesn't she", "isn't she", 'does she', "don't she"],
  ["I'm late, ___?", "aren't I", "isn't I", "amn't I", "don't I"],
  ["Let's go to the park, ___?", 'shall we', "shan't we", 'do we', "don't we"],
  ["There's a problem, ___?", "isn't there", "isn't it", 'is there', "hasn't it"],
  ["You've got a sister, ___?", "haven't you", 'have you', "aren't you", "didn't you"],
  ['Nobody called, ___?', 'did they', "didn't they", 'does it', 'did it'],
  ['He was at school yesterday, ___?', "wasn't he", "didn't he", 'was he', "isn't he"],
  ["They'll be here soon, ___?", "won't they", 'will they', "aren't they", "don't they"]
];

/* ================================================================== *
 * Niveau 3 — UK Year 9
 * ================================================================== */

export const COND_TYPES = ['Zero conditional', 'First conditional', 'Second conditional', 'Third conditional'];

/** Phrase, type (0 à 3). */
export const L3_COND_ID = [
  ['If you mix red and blue, you get purple.', 0],
  ['If it rains tomorrow, we will stay at home.', 1],
  ['If I won the lottery, I would buy a horse.', 2],
  ['If she had studied harder, she would have passed.', 3],
  ['If you press this button, the machine stops.', 0],
  ["If you don't hurry, you'll miss the bus.", 1],
  ['If I were you, I would apologise.', 2],
  ["If we had left earlier, we wouldn't have missed the train.", 3],
  ['Ice melts if you heat it.', 0],
  ["If he calls, I'll tell him the news.", 1],
  ['If I knew the answer, I would tell you.', 2],
  ["If they hadn't helped us, we would have got lost.", 3]
];

export const L3_COND_FILL = [
  ['If I ___ you, I would talk to the teacher.', 'were', 'am', 'will be', 'had been'],
  ['If it ___ tomorrow, the match will be cancelled.', 'rains', 'will rain', 'would rain', 'had rained'],
  ['If we ___ more time, we would visit the museum.', 'had', 'have', 'will have', 'would have'],
  ["I'll lend you my bike if you ___ careful with it.", 'are', 'will be', 'would be', 'had been'],
  ['If they had invited me, I ___.', 'would have gone', 'will go', 'went', 'had gone'],
  ['Unless you ___, you will be late.', 'hurry', 'will hurry', 'hurried', "don't hurry"],
  ['If she had set an alarm, she ___ on time yesterday.', 'would have been', 'will be', 'is', 'had been']
];

export const L3_PASSIVE = [
  ['The Mona Lisa ___ by Leonardo da Vinci.', 'was painted', 'painted', 'is painting', 'has painted'],
  ['English ___ all over the world.', 'is spoken', 'speaks', 'is speaking', 'spoke'],
  ['Tower Bridge ___ in 1894.', 'was completed', 'completed', 'has completed', 'is completing'],
  ['The letters ___ every morning.', 'are delivered', 'deliver', 'are delivering', 'delivers'],
  ['A new school ___ next year.', 'will be built', 'will build', 'builds', 'has built'],
  ['The thief ___ by the police yesterday.', 'was caught', 'caught', 'is caught', 'has been caught'],
  ["My phone ___! I can't find it anywhere.", 'has been stolen', 'has stolen', 'is stealing', 'steals'],
  ['The house ___ at the moment, so we are staying with my aunt.', 'is being painted', 'is painting', 'paints', 'has painted'],
  ['The Harry Potter books ___ into more than 80 languages.', 'have been translated', 'have translated', 'are translating', 'translate'],
  ['Passive of "Someone cleans the room every day."', 'The room is cleaned every day.', 'The room cleans every day.', 'The room is cleaning every day.', 'The room was clean every day.'],
  ['Passive of "They will announce the results tomorrow."', 'The results will be announced tomorrow.', 'The results will announce tomorrow.', 'The results will be announcing tomorrow.', 'The results were announced tomorrow.'],
  ['Passive of "Shakespeare wrote Macbeth."', 'Macbeth was written by Shakespeare.', 'Macbeth wrote by Shakespeare.', 'Macbeth was wrote by Shakespeare.', 'Macbeth has written Shakespeare.']
];

export const L3_REPORTED = [
  ['"I live in Bath," he said. → He said that he ___ in Bath.', 'lived', 'lives', 'has lived', 'is living'],
  ['"We are going to the beach," they said. → They said they ___ to the beach.', 'were going', 'are going', 'go', 'will go'],
  ['"I will help you," Mum said. → Mum said she ___ help me.', 'would', 'will', 'shall', 'is'],
  ['"I can swim," Tom said. → Tom said he ___ swim.', 'could', 'can', 'would', 'must'],
  ['"I have finished," she said. → She said she ___ finished.', 'had', 'has', 'have', 'was'],
  ['"I saw a fox," he said. → He said he ___ a fox.', 'had seen', 'has seen', 'sees', 'is seeing'],
  ['"Where do you live?" she asked. → She asked me where I ___.', 'lived', 'did live', 'do live', 'living'],
  ['"Are you hungry?" Dad asked. → Dad asked ___ I was hungry.', 'if', 'that', 'what', 'are'],
  ['"Don\'t touch it!" the teacher said. → The teacher told us ___ it.', 'not to touch', "don't touch", 'not touch', 'to not touching'],
  ['"I\'m leaving tomorrow," she said last week. → She said she was leaving ___.', 'the next day', 'yesterday', 'today', 'the day before']
];

export const L3_MODALS = [
  ["You ___ wear a seatbelt in a car. It's the law.", 'must', 'might', 'could', 'would'],
  ["You ___ eat so many sweets. It's bad for your teeth.", "shouldn't", "couldn't", "wouldn't", "needn't"],
  ['Take an umbrella. It ___ rain later — perhaps.', 'might', 'must', 'has to', 'ought'],
  ['"I\'m sure they\'re out." = They ___ be out.', 'must', 'might', "can't", 'should'],
  ['"It\'s impossible that he\'s the thief." = He ___ be the thief.', "can't", "mustn't", "shouldn't", 'might not'],
  ["I'm sure she left early. = She ___ left early.", 'must have', 'should have', 'might have', "can't have"],
  ['Perhaps he missed the bus. = He ___ missed the bus.', 'might have', 'must have', 'should have', "can't have"],
  ['It was a mistake not to revise. = I ___ revised.', 'should have', 'must have', 'might have', 'can have'],
  ["I'm sure he didn't see us. = He ___ seen us.", "can't have", "mustn't have", "shouldn't have", 'might have'],
  ['You ___ bring food — lunch is provided.', "don't have to", "mustn't", "can't", 'must'],
  ["You ___ run in the corridors. It's against the rules.", "mustn't", "don't have to", "needn't", 'might not'],
  ['___ I open the window, please?', 'May', 'Do', 'Am', 'Have']
];

export const L3_PHRASAL = [
  ['give up', 'stop trying', 'give a present', 'go upstairs', 'arrive'],
  ['look after (a baby)', 'take care of', 'search for', 'admire', 'follow'],
  ['look for (your keys)', 'try to find', 'take care of', 'visit', 'watch'],
  ['turn down (an offer)', 'refuse', 'accept', 'repeat', 'discover'],
  ['find out (the truth)', 'discover', 'lose', 'go outside', 'forget'],
  ['put off (a meeting)', 'postpone', 'start', 'attend', 'organise'],
  ['run out of (milk)', 'have none left', 'run to the shop', 'spill', 'buy more'],
  ['get on with (someone)', 'have a good relationship with', 'argue with', 'travel with', 'meet for the first time'],
  ['bring up (a child)', 'raise', 'carry upstairs', 'blame', 'visit'],
  ['turn up (at a party)', 'arrive', 'leave', 'refuse', 'dance'],
  ['take after (your mum)', 'look or behave like', 'follow', 'take care of', 'disagree with'],
  ['set off (on a journey)', 'start a journey', 'cancel a trip', 'return home', 'pack a bag'],
  ['come across (an old photo)', 'find by chance', 'lose', 'throw away', 'print'],
  ['break down (a car)', 'stop working', 'crash', 'park', 'speed up']
];

export const L3_IDIOMS = [
  ["It's raining cats and dogs.", "It's raining very heavily.", 'Animals are falling from the sky.', "It's drizzling.", 'The pets are wet.'],
  ['a piece of cake', 'something very easy', 'something expensive', 'a reward', 'a celebration'],
  ['break the ice', 'make people feel relaxed at the start', 'cause an accident', 'go skating', 'end a friendship'],
  ['once in a blue moon', 'very rarely', 'every month', 'at night', 'when you are sad'],
  ['under the weather', 'feeling ill', 'outside in the rain', 'very happy', 'lost'],
  ['hit the books', 'study hard', 'get angry', 'tidy up', 'write a novel'],
  ['cost an arm and a leg', 'be very expensive', 'be dangerous', 'be cheap', 'hurt'],
  ['let the cat out of the bag', 'reveal a secret', 'free a pet', 'make a mess', 'tell a lie'],
  ['on cloud nine', 'extremely happy', 'very tired', 'confused', 'flying'],
  ['spill the beans', 'tell a secret', 'cook dinner', 'make a mistake', 'waste food'],
  ['bite off more than you can chew', 'take on too much', 'eat too fast', 'be rude', 'lose a tooth'],
  ['the ball is in your court', "it's your decision now", 'you lost', "you're late", 'you must play tennis']
];

/* ================================================================== *
 * Niveau 4 — GCSE
 * ================================================================== */

export const L4_DEVICES = [
  ['The wind howled through the trees.', 'personification', 'simile', 'alliteration', 'hyperbole'],
  ['Her smile was as bright as the sun.', 'simile', 'metaphor', 'alliteration', 'onomatopoeia'],
  ['The classroom was a zoo.', 'metaphor', 'simile', 'onomatopoeia', 'alliteration'],
  ['Peter Piper picked a peck of pickled peppers.', 'alliteration', 'simile', 'personification', 'onomatopoeia'],
  ['The stars danced in the night sky.', 'personification', 'simile', 'alliteration', 'onomatopoeia'],
  ['He ran like the wind.', 'simile', 'metaphor', 'alliteration', 'onomatopoeia'],
  ['Time is a thief.', 'metaphor', 'simile', 'onomatopoeia', 'hyperbole'],
  ['Sally sells seashells by the seashore.', 'alliteration', 'metaphor', 'simile', 'personification'],
  ['The leaves whispered secrets to each other.', 'personification', 'simile', 'alliteration', 'hyperbole'],
  ['Life is a rollercoaster.', 'metaphor', 'simile', 'alliteration', 'onomatopoeia'],
  ['She was as quiet as a mouse.', 'simile', 'metaphor', 'personification', 'onomatopoeia'],
  ['Buzz! Crash! Bang!', 'onomatopoeia', 'simile', 'metaphor', 'personification'],
  ["I've told you a million times!", 'hyperbole', 'simile', 'onomatopoeia', 'personification'],
  ['The old car coughed and wheezed up the hill.', 'personification', 'simile', 'alliteration', 'hyperbole'],
  ['Crack! The branch snapped.', 'onomatopoeia', 'simile', 'metaphor', 'personification'],
  ['This bag weighs a ton.', 'hyperbole', 'simile', 'onomatopoeia', 'alliteration'],
  ['The big brown bear bounced on the bed.', 'alliteration', 'simile', 'metaphor', 'onomatopoeia']
];

export const L4_TONE = [
  ['"Get out. Now. I will not say it again."', 'threatening', 'cheerful', 'nostalgic', 'apologetic'],
  ['"I remember those long summer evenings at Gran\'s, the smell of warm bread…"', 'nostalgic', 'angry', 'sarcastic', 'urgent'],
  ['"Oh, brilliant. Another Monday. Just what I needed."', 'sarcastic', 'sincere', 'fearful', 'solemn'],
  ['"Hurry! The water is rising — we have minutes, not hours!"', 'urgent', 'relaxed', 'nostalgic', 'humorous'],
  ['"We regret to inform you that the concert has been cancelled."', 'formal', 'playful', 'angry', 'chatty'],
  ['"The house stood silent; every shadow seemed to watch me."', 'menacing', 'joyful', 'comic', 'bored']
];

export const L4_REGISTER = [
  ['Which sentence is the most formal?', 'I am writing to complain about the service.', 'I wanna moan about the service.', 'The service was rubbish, mate.', 'Just saying, the service was meh.'],
  ['Which request is the most formal?', 'Could you please send me further information?', 'Send me more stuff, yeah?', 'Gimme the info.', 'Info pls!'],
  ['Which sentence is informal?', 'Hiya! Fancy coming round later?', 'I would be grateful for a prompt reply.', 'Please find attached my application.', 'We look forward to welcoming you.'],
  ['Formal word for "get" (a ticket)', 'obtain', 'grab', 'nab', 'snag'],
  ['Formal word for "ask for"', 'request', 'beg', 'shout', 'nag'],
  ['Formal word for "help"', 'assist', 'chip in', 'sort', 'mind'],
  ['Formal word for "buy"', 'purchase', 'splash out', 'pick up', 'nick'],
  ['Formal word for "need"', 'require', 'fancy', 'reckon', 'crave'],
  ['Formal word for "start"', 'commence', 'kick off', 'get going', 'crack on'],
  ['Formal word for "enough"', 'sufficient', 'loads', 'plenty of', 'tons'],
  ['Formal word for "kids"', 'children', 'lads', 'tots', 'mates'],
  ['Formal word for "show" (that something is true)', 'demonstrate', 'flash', 'flaunt', 'spill'],
  ['"Dear Sir or Madam," — the letter ends with…', 'Yours faithfully', 'Yours sincerely', 'Love', 'Cheers'],
  ['"Dear Mrs Patel," — the letter ends with…', 'Yours sincerely', 'Yours faithfully', 'Lots of love', 'See ya']
];

export const WORD_CLASSES = ['noun', 'verb', 'adjective', 'adverb', 'pronoun', 'preposition', 'conjunction', 'determiner'];

/** Phrase, mot souligné, classe, et les classes interdites comme distracteurs (trop proches). */
export const L4_WORDCLASS = [
  ['The quick fox jumped.', 'quick', 'adjective'],
  ['She sang beautifully.', 'beautifully', 'adverb'],
  ['The cat slept under the table.', 'under', 'preposition'],
  ['I wanted to go, but it was late.', 'but', 'conjunction'],
  ['They are my friends.', 'They', 'pronoun'],
  ['Happiness is important.', 'Happiness', 'noun'],
  ['We swim every morning.', 'swim', 'verb'],
  ['He arrived extremely late.', 'extremely', 'adverb'],
  ['Although it rained, we played outside.', 'Although', 'conjunction'],
  ['The ancient castle stood on the hill.', 'ancient', 'adjective'],
  ['She quickly ran home.', 'ran', 'verb'],
  ['Courage is rare.', 'Courage', 'noun'],
  ['That book is on the shelf.', 'That', 'determiner', ['pronoun']],
  ['The dog wagged its tail.', 'its', 'determiner', ['pronoun']],
  ['Give it to me.', 'me', 'pronoun', ['determiner']],
  ['We waited until midnight.', 'until', 'preposition', ['conjunction']]
];

export const SENTENCE_TYPES = ['statement', 'question', 'command', 'exclamation'];
export const SENTENCE_FORMS = ['simple sentence', 'compound sentence', 'complex sentence', 'minor sentence'];

export const L4_SENTENCES = [
  ['"Close the door." is a…', 'command', 'statement', 'question', 'exclamation'],
  ['"What a beautiful day it is!" is an…', 'exclamation', 'command', 'question', 'statement'],
  ['"The bus arrives at nine." is a…', 'statement', 'command', 'question', 'exclamation'],
  ['"Who would ever want to live like this?" (in a speech) is a…', 'rhetorical question', 'statement', 'command', 'exclamation'],
  ['"I like tea and she likes coffee." is a…', 'compound sentence', 'simple sentence', 'complex sentence', 'minor sentence'],
  ['"Although it was cold, we went swimming." is a…', 'complex sentence', 'simple sentence', 'compound sentence', 'minor sentence'],
  ['"The fox ran." is a…', 'simple sentence', 'compound sentence', 'complex sentence', 'minor sentence'],
  ['"Silence." (on its own) is a…', 'minor sentence', 'simple sentence', 'compound sentence', 'complex sentence'],
  ['Why might a writer use a very short sentence like "He was gone."?', 'to create shock or tension', 'to give lots of detail', 'to sound informal', 'to ask the reader a question'],
  ['Why use a rhetorical question in a speech?', 'to make the audience think', 'to get a real answer', 'to list facts', 'to end the speech'],
  ['Why might a writer list "the noise, the heat, the endless crowds"?', 'to build a sense of being overwhelmed', 'to slow the pace down calmly', 'to introduce a new character', 'to show that time has passed'],
  ['A long sentence linked by many commas and "and"s often creates…', 'a breathless, fast pace', 'a calm pause', 'a formal tone', 'a question']
];

/* ================================================================== *
 * Niveau 5 — Native stretch
 * ================================================================== */

export const L5_CONFUSABLES = [
  ['The weather can ___ your mood.', 'affect', 'effect', 'efect'],
  ['The new rule had a big ___ on us.', 'effect', 'affect', 'afect'],
  ['There are ___ people here than yesterday.', 'fewer', 'less', 'lesser'],
  ['I drink ___ milk than my sister.', 'less', 'fewer', 'lesser'],
  ['To ___ it may concern.', 'whom', 'who', 'whose'],
  ['___ is coming to the party?', 'Who', 'Whom', 'Whose'],
  ['The company changed ___ logo.', 'its', "it's", "its'"],
  ['___ been raining all day.', "It's", 'Its', "Its'"],
  ['I need to ___ the piano every day.', 'practise', 'practice', 'practize'],
  ['Football ___ is on Tuesday.', 'practice', 'practise', 'practize'],
  ['___ going to be late. (= they are)', "They're", 'Their', 'There'],
  ['Is that ___ dog? (= belonging to them)', 'their', 'there', "they're"],
  ["I'd rather walk ___ take the bus.", 'than', 'then', 'that'],
  ['He gave me some good ___.', 'advice', 'advise', 'advize'],
  ['Can you ___ me what to do?', 'advise', 'advice', 'advize'],
  ["Don't ___ your keys.", 'lose', 'loose', 'lost'],
  ['My shoelace is ___.', 'loose', 'lose', 'lost'],
  ['She ___ me in the corridor without saying hello.', 'passed', 'past', 'pasted'],
  ['We walked ___ the old church.', 'past', 'passed', 'pasted'],
  ['Please ___ my apology.', 'accept', 'except', 'expect'],
  ['Everyone came ___ Joe.', 'except', 'accept', 'expect'],
  ['The ___ of the school gave a speech.', 'principal', 'principle', 'principel'],
  ['It is a matter of ___.', 'principle', 'principal', 'principel'],
  ['I bought some writing paper at the ___ shop.', 'stationery', 'stationary', 'stationnery'],
  ['The car was ___ at the traffic lights.', 'stationary', 'stationery', 'stationnery'],
  ['The film was ___ long.', 'too', 'to', 'two']
];

export const L5_VOCAB = [
  ['___ a decision', 'make', 'do', 'take'],
  ['___ a mistake', 'make', 'do', 'take'],
  ['___ your homework', 'do', 'make', 'take'],
  ['___ a photo', 'take', 'make', 'do'],
  ['___ attention', 'pay', 'give', 'make'],
  ['___ a risk', 'take', 'make', 'do'],
  ['a downpour = ___ rain', 'heavy', 'strong', 'big', 'fat'],
  ['not weak: ___ coffee', 'strong', 'heavy', 'powerful', 'large'],
  ['a criminal: commit a ___', 'crime', 'homework', 'holiday', 'smile'],
  ['ubiquitous', 'found everywhere', 'very rare', 'extremely loud', 'ancient'],
  ['meticulous', 'very careful and precise', 'careless', 'enormous', 'shy'],
  ['benevolent', 'kind and generous', 'cruel', 'lazy', 'noisy'],
  ['ephemeral', 'lasting a very short time', 'lasting forever', 'very heavy', 'colourful'],
  ['eloquent', 'fluent and persuasive in speaking', 'clumsy', 'silent', 'rude'],
  ['resilient', 'able to recover quickly', 'easily broken', 'forgetful', 'boastful'],
  ['ambiguous', 'having more than one meaning', 'perfectly clear', 'very large', 'enthusiastic'],
  ['tenacious', 'determined, never giving up', 'timid', 'tired', 'careless'],
  ['candid', 'honest and direct', 'secretive', 'sweet', 'sleepy'],
  ['frugal', 'careful with money', 'wasteful', 'fruity', 'fragile'],
  ['lethargic', 'lacking energy', 'energetic', 'noisy', 'angry'],
  ['pragmatic', 'practical and realistic', 'dreamy', 'dramatic', 'musical']
];

/** Américain → britannique. Les distracteurs sont d'autres mots britanniques, jamais le mot américain. */
export const UK_US = [
  ['apartment', 'flat'], ['elevator', 'lift'], ['truck', 'lorry'], ['sidewalk', 'pavement'],
  ['cookie', 'biscuit'], ['fall (season)', 'autumn'], ['French fries', 'chips'], ['potato chips', 'crisps'],
  ['trash', 'rubbish'], ['vacation', 'holiday'], ['eraser', 'rubber'], ['soccer', 'football'],
  ['pants', 'trousers'], ['sweater', 'jumper'], ['diaper', 'nappy'], ['gas (for a car)', 'petrol'],
  ['flashlight', 'torch'], ['movie theater', 'cinema'], ['candy', 'sweets'], ['mailman', 'postman'],
  ['zip code', 'postcode'], ['parking lot', 'car park'], ['freeway', 'motorway'], ['mom', 'mum'],
  ['line (of people)', 'queue']
];

/** Orthographe américaine → britannique. organise : la forme en -ise, usuelle à l'école en Angleterre. */
export const UK_SPELLING = [
  ['color', 'colour'], ['favorite', 'favourite'], ['center', 'centre'], ['theater', 'theatre'],
  ['neighbor', 'neighbour'], ['gray', 'grey'], ['traveled', 'travelled'], ['behavior', 'behaviour'],
  ['defense', 'defence'], ['catalog', 'catalogue'], ['jewelry', 'jewellery'], ['tire (of a car)', 'tyre'],
  ['pajamas', 'pyjamas'], ['organize', 'organise'], ['analyze', 'analyse'], ['program (on TV)', 'programme'],
  ['honor', 'honour'], ['humor', 'humour'], ['meter (100 cm)', 'metre'], ['aluminum', 'aluminium'],
  ['cozy', 'cosy'], ['check (from a bank)', 'cheque'], ['canceled', 'cancelled']
];

export const L5_PUNCT = [
  ['Which sentence uses the semicolon correctly?', 'I love reading; my brother prefers football.', 'I love reading; and my brother prefers football.', 'I love; reading my brother prefers football.', 'I love reading my brother; prefers football.'],
  ['Which sentence uses the colon correctly?', 'You will need three things: a pen, a ruler and a rubber.', 'You will need: three things a pen, a ruler and a rubber.', 'You will: need three things a pen, a ruler and a rubber.', 'You will need three: things a pen, a ruler and a rubber.'],
  ['Which apostrophe is correct?', "The children's coats are in the hall.", "The childrens' coats are in the hall.", 'The childrens coats are in the hall.', "The children's' coats are in the hall."],
  ['Which is correct? (several girls share it)', "The girls' changing room is upstairs.", "The girl's changing room is upstairs.", 'The girls changing room is upstairs.', "The girls's changing room is upstairs."],
  ['Which is correct? (its / it\'s)', 'The dog wagged its tail.', "The dog wagged it's tail.", "The dog wagged its' tail.", 'The dog wagged it is tail.'],
  ['Which list is punctuated correctly?', 'We bought apples, pears and bananas.', 'We bought, apples pears and bananas.', 'We bought apples pears, and, bananas.', 'We, bought apples pears and bananas.'],
  ['Which uses the comma correctly?', 'After lunch, we went to the park.', 'After, lunch we went to the park.', 'After lunch we, went to the park.', 'After lunch we went, to the park.'],
  ['Which direct speech is punctuated correctly?', '"Come here," said Mum.', '"Come here" said Mum.', '"Come here, said Mum."', 'Come here," said Mum.'],
  ['Which uses a colon to introduce an explanation?', 'There was only one problem: we had no money.', 'There was: only one problem we had no money.', 'There was only one: problem we had no money.', 'There: was only one problem we had no money.'],
  ['Which list of places is punctuated correctly?', 'We visited Paris, France; Rome, Italy; and Madrid, Spain.', 'We visited Paris; France, Rome; Italy, and Madrid; Spain.', 'We visited Paris France, Rome Italy; and Madrid Spain.', 'We visited; Paris, France Rome, Italy and Madrid, Spain.'],
  ['Which is correct? (they\'re / their)', "They're sure it won't rain.", 'Theyre sure it wont rain.', "Their sure it won't rain.", "They're sure it willn't rain."],
  ['Which is correct? (extra information)', 'My sister, who is a nurse, works nights.', 'My sister who is a nurse, works nights.', 'My sister, who is a nurse works nights.', 'My, sister who is a nurse works nights.'],
  ['Which is correct? (who\'s / whose)', "Who's coming to the cinema?", 'Whose coming to the cinema?', "Who'se coming to the cinema?", 'Whos coming to the cinema?']
];

/* ================================================================== *
 * Repère l'erreur — [phrase avec une erreur, mot faux, correction, autres corrections fausses…]
 * Remplacer le mot faux par la correction donne une phrase juste ; aucun autre mot n'est faux.
 * ================================================================== */

export const SPOT = {
  1: [
    ['She go to school every morning.', 'go', 'goes', 'gos', 'going'],
    ["Tom doesn't watches TV after school.", 'watches', 'watch', 'watching', 'watchs'],
    ['They plays football every Sunday.', 'plays', 'play', 'playes', 'playing'],
    ['My sister brush her hair every morning.', 'brush', 'brushes', 'brushs', 'brushing'],
    ['Do Hannah play Gaelic football?', 'Do', 'Does', 'Is', 'Are'],
    ['They wash there faces in the evening.', 'there', 'their', "they're", 'theirs'],
    ['He have breakfast at seven.', 'have', 'has', 'haves', 'having'],
    ["She don't drink tea.", "don't", "doesn't", "isn't", 'not'],
    ['Does he plays cricket?', 'plays', 'play', 'playing', 'playes'],
    ['I wakes up at seven every day.', 'wakes', 'wake', 'waking', 'wokes']
  ],
  2: [
    ['I seen my cousin at the park yesterday.', 'seen', 'saw', 'see', 'sawed'],
    ['She has lived here since three years.', 'since', 'for', 'from', 'ago'],
    ['He is taller then his brother.', 'then', 'than', 'that', 'as'],
    ['This is the bigest cake in the shop.', 'bigest', 'biggest', 'bigger', 'most big'],
    ['We was watching TV when you called.', 'was', 'were', 'is', 'be'],
    ["You're coming, aren't it?", 'it', 'you', 'they', 'we'],
    ['She speaked to the head teacher.', 'speaked', 'spoke', 'speak', 'spoked'],
    ['They buyed a new car last week.', 'buyed', 'bought', 'buyt', 'boughted'],
    ['She catched the ball with one hand.', 'catched', 'caught', 'catch', 'caughted'],
    ['My dad drived us to school.', 'drived', 'drove', 'drave', 'droved'],
    ['It was the worse day of my life.', 'worse', 'worst', 'baddest', 'worser']
  ],
  3: [
    ['If it rain tomorrow, we will stay inside.', 'rain', 'rains', 'raining', 'rained'],
    ['The window was broke by the ball.', 'broke', 'broken', 'breaked', 'breaking'],
    ['He told that he was tired.', 'told', 'said', 'talked', 'spoke'],
    ['You should of told me.', 'of', 'have', 'off', 'had'],
    ['He must have forgot his keys.', 'forgot', 'forgotten', 'forget', 'forgetting'],
    ["I'm looking forward to see you.", 'see', 'seeing', 'saw', 'seen'],
    ['The cake was eaten from the dog.', 'from', 'by', 'with', 'of'],
    ['If I had known, I would have came.', 'came', 'come', 'coming', 'comed'],
    ['English is spoke in many countries.', 'spoke', 'spoken', 'speaking', 'speaked'],
    ['We ran out off milk.', 'off', 'of', 'from', 'by']
  ],
  4: [
    ['The wind whispered threw the trees.', 'threw', 'through', 'thru', 'though'],
    ['He walked slow down the corridor.', 'slow', 'slowly', 'slower', 'slowed'],
    ['Their going to the library after school.', 'Their', "They're", 'There', 'Theirs'],
    ['I could of finished sooner.', 'of', 'have', 'off', 'had'],
    ['Each of the poems have a different tone.', 'have', 'has', 'having', 'haves'],
    ['The writer creates tention in the final paragraph.', 'tention', 'tension', 'tencion', 'tenssion'],
    ['The narrator feels lonely and isolate.', 'isolate', 'isolated', 'isolating', 'isolation'],
    ['This simile compair the girl to a flower.', 'compair', 'compares', 'comparing', 'compaires'],
    ['The mood of the story is very erie.', 'erie', 'eerie', 'eary', 'eery'],
    ['The poet uses a metafor in the first line.', 'metafor', 'metaphor', 'metaphore', 'metafore']
  ],
  5: [
    ['There were less people than expected.', 'less', 'fewer', 'lesser', 'few'],
    ['The weather effected our plans.', 'effected', 'affected', 'afected', 'affect'],
    ['To who should I address the letter?', 'who', 'whom', 'whose', 'which'],
    ['I need to practice my scales every day.', 'practice', 'practise', 'practize', 'practicing'],
    ["The dog chased it's tail.", "it's", 'its', "its'", 'it'],
    ['Please except my apologies.', 'except', 'accept', 'expect', 'excess'],
    ['Could you advice me on this?', 'advice', 'advise', 'advize', 'advices'],
    ['My shoes are to big.', 'to', 'too', 'two', 'toe'],
    ['The principle of the school gave a speech.', 'principle', 'principal', 'principel', 'principals'],
    ['She was laying on the sofa all afternoon.', 'laying', 'lying', 'lieing', 'layed'],
    ['Between you and I, it was a mistake.', 'I', 'me', 'myself', 'mine'],
    ["I'm definately coming on Saturday.", 'definately', 'definitely', 'definatly', 'definitly']
  ]
};

/* ================================================================== *
 * Dictée — lettres, espaces, apostrophes, ponctuation simple. Pas de chiffres : le clavier n'en a pas.
 * ================================================================== */

/**
 * Niveau 1 : le thème et la page du cahier de chaque ligne de SPOT[1] et DICTATION[1], dans l'ordre.
 * test/sources.test.mjs refuse une ligne sans source ou hors des thèmes de l'Unit 4.
 */
export const L1_SRC = {
  spot: [
    ['present-simple', 'p14 · p15'], ['present-simple', 'p19 · p20'], ['present-simple', 'p18 · p22'],
    ['present-simple', 'p14 · p15'], ['present-simple', 'p18 · p20'], ['possessives', 'p16 · p17'],
    ['present-simple', 'p16'], ['present-simple', 'p14 · p20'], ['present-simple', 'p18 · p19'],
    ['present-simple', 'p14 · p19']
  ],
  listen: [
    ['present-simple', 'p15 · p17'], ['time', 'p27'], ['free-time', 'p18 · p22'], ['present-simple', 'p20'],
    ['present-simple', 'p18 · p20'], ['time', 'p23 · p26'], ['sequencers', 'p14 · p27'], ['possessives', 'p17'],
    ['possessives', 'p16 · p18'], ['sequencers', 'p14 · p26']
  ]
};

export const DICTATION = {
  1: [
    'My sister brushes her teeth every morning.',
    "I wake up at seven o'clock.",
    'We go swimming every Sunday.',
    "Tom doesn't watch TV after school.",
    'Does Hannah play Gaelic football?',
    'They have breakfast at half past seven.',
    'First, I get up. Then, I get dressed.',
    'My brother packs his bag.',
    'We do our homework at five.',
    'Finally, I go to bed at ten.'
  ],
  2: [
    'I have lived in this town since I was five.',
    'We were watching a film when the lights went out.',
    'She had already left when I arrived.',
    'This is the best book I have ever read.',
    "You're coming to the party, aren't you?",
    'My brother is taller than my dad.',
    'Have you ever been to Scotland?',
    'They bought some bread and went home.',
    'It was the hottest day of the year.',
    "I haven't seen her for two weeks."
  ],
  3: [
    'If I were you, I would tell the truth.',
    'If it rains, we will stay inside.',
    'The castle was built in the twelfth century.',
    'She said that she was feeling tired.',
    'You should have told me earlier.',
    'He must have forgotten his keys.',
    'We ran out of milk this morning.',
    "I'm looking forward to seeing you.",
    'The results will be announced tomorrow.',
    "Don't worry, it's a piece of cake."
  ],
  4: [
    'The wind howled like a wounded animal.',
    'Darkness crept slowly across the silent field.',
    'I am writing to complain about the delay.',
    'The writer uses a metaphor to create tension.',
    'Although it was late, nobody wanted to leave.',
    'What a remarkable achievement it was!',
    'The poem has a melancholy tone.',
    'Short sentences can build suspense.',
    'Her words were a dagger in his heart.',
    'Yours faithfully, the headteacher.'
  ],
  5: [
    'The new rules will affect everyone.',
    'There are fewer people here than last year.',
    'I need to practise the piano every evening.',
    'The dog wagged its tail happily.',
    'We stayed in a flat near the motorway.',
    'Their neighbours are extremely generous.',
    "It's definitely my favourite colour.",
    'She gave me some excellent advice.',
    'The committee will meet on Wednesday.',
    'The necessary changes were made immediately.'
  ]
};

/* ================================================================== *
 * Orthographe — mots souvent mal écrits, par niveau. [indice, mot]
 * ================================================================== */

export const MISSPELT = {
  2: [
    ['nécessaire', 'necessary'], ['séparer', 'separate'], ['mercredi', 'Wednesday'], ['février', 'February'],
    ['la bibliothèque', 'library'], ['demain', 'tomorrow'], ['apparemment', 'apparently'], ["jusqu'à", 'until'],
    ['croire', 'believe'], ['recevoir', 'receive'], ['un ami', 'friend'], ['parce que', 'because'],
    ['beau, magnifique', 'beautiful']
  ],
  3: [
    ['certainement, sans aucun doute', 'definitely'], ["l'hébergement", 'accommodation'], ['embarrasser', 'embarrass'],
    ['le rythme', 'rhythm'], ['une occasion', 'occasion'], ['le début', 'beginning'], ['une entreprise', 'business'],
    ['le gouvernement', 'government'], ["l'environnement", 'environment'], ['immédiatement', 'immediately'],
    ['disparaître', 'disappear'], ['décevoir', 'disappoint'], ['une dispute, un argument', 'argument'],
    ['une île', 'island'], ['la connaissance', 'knowledge'], ['réussir, atteindre', 'achieve'], ['bizarre', 'weird']
  ],
  4: [
    ['la conscience (morale)', 'conscience'], ['conscient', 'conscious'], ['survenu (occur, au passé)', 'occurred'],
    ['recommander', 'recommend'], ['sincèrement', 'sincerely'], ['étranger (adj.)', 'foreign'],
    ['indépendant', 'independent'], ["l'existence", 'existence'], ['persistant', 'persistent'],
    ['la prononciation', 'pronunciation'], ['la possession', 'possession'], ['un comité', 'committee'],
    ['un collègue', 'colleague'], ['exagérer', 'exaggerate']
  ],
  5: [
    ['espiègle', 'mischievous'], ['un millénaire', 'millennium'], ['le parlement', 'parliament'],
    ['un privilège', 'privilege'], ['une garantie', 'guarantee'], ['une manœuvre (orthographe UK)', 'manoeuvre'],
    ['un questionnaire', 'questionnaire'], ['consciencieux', 'conscientious'], ['une connaissance (personne)', 'acquaintance'],
    ['la bureaucratie', 'bureaucracy'], ['un entrepreneur', 'entrepreneur'], ["l'onomatopée", 'onomatopoeia'],
    ['une particularité, une manie', 'idiosyncrasy']
  ]
};
