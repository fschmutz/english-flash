/**
 * Corrigé tapé à part, dans l'ordre des banques de js/bank.js.
 * Le test compare chaque bonne réponse de la banque à ce corrigé : une ligne déplacée, une réponse
 * recopiée dans la mauvaise colonne ou une faute de frappe font échouer la CI.
 */
export const KEY = {
  L2_TENSES: ['has lived', 'was reading', 'had started', 'is snowing', 'visited', 'had been waiting', 'been learning',
    'been', 'boils', 'will be flying', 'yet', 'ago', 'since', 'for', 'was walking', 'plays', 'is sleeping', 'left',
    "haven't seen", 'were', 'Have', 'has written', 'have been running', 'was cooking', 'are going'],
  L2_TAGS: ["aren't you", "can't she", 'did they', "hasn't he", 'is it', "shouldn't we", 'will you', "doesn't she",
    "aren't I", 'shall we', "isn't there", "haven't you", 'did they', "wasn't he", "won't they"],
  L3_COND_ID: [0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3],
  L3_COND_FILL: ['were', 'rains', 'had', 'are', 'would have gone', 'hurry', 'would have been'],
  L3_PASSIVE: ['was painted', 'is spoken', 'was completed', 'are delivered', 'will be built', 'was caught',
    'has been stolen', 'is being painted', 'have been translated', 'The room is cleaned every day.',
    'The results will be announced tomorrow.', 'Macbeth was written by Shakespeare.'],
  L3_REPORTED: ['lived', 'were going', 'would', 'could', 'had', 'had seen', 'lived', 'if', 'not to touch', 'the next day'],
  L3_MODALS: ['must', "shouldn't", 'might', 'must', "can't", 'must have', 'might have', 'should have', "can't have",
    "don't have to", "mustn't", 'May'],
  L3_PHRASAL: ['stop trying', 'take care of', 'try to find', 'refuse', 'discover', 'postpone', 'have none left',
    'have a good relationship with', 'raise', 'arrive', 'look or behave like', 'start a journey', 'find by chance',
    'stop working'],
  L3_IDIOMS: ["It's raining very heavily.", 'something very easy', 'make people feel relaxed at the start', 'very rarely',
    'feeling ill', 'study hard', 'be very expensive', 'reveal a secret', 'extremely happy', 'tell a secret',
    'take on too much', "it's your decision now"],
  L4_DEVICES: ['personification', 'simile', 'metaphor', 'alliteration', 'personification', 'simile', 'metaphor',
    'alliteration', 'personification', 'metaphor', 'simile', 'onomatopoeia', 'hyperbole', 'personification',
    'onomatopoeia', 'hyperbole', 'alliteration'],
  L4_TONE: ['threatening', 'nostalgic', 'sarcastic', 'urgent', 'formal', 'menacing'],
  L4_REGISTER: ['I am writing to complain about the service.', 'Could you please send me further information?',
    'Hiya! Fancy coming round later?', 'obtain', 'request', 'assist', 'purchase', 'require', 'commence', 'sufficient',
    'children', 'demonstrate', 'Yours faithfully', 'Yours sincerely'],
  L4_WORDCLASS: ['adjective', 'adverb', 'preposition', 'conjunction', 'pronoun', 'noun', 'verb', 'adverb', 'conjunction',
    'adjective', 'verb', 'noun', 'determiner', 'determiner', 'pronoun', 'preposition'],
  L4_SENTENCES: ['command', 'exclamation', 'statement', 'rhetorical question', 'compound sentence', 'complex sentence',
    'simple sentence', 'minor sentence', 'to create shock or tension', 'to make the audience think',
    'to build a sense of being overwhelmed', 'a breathless, fast pace'],
  L5_CONFUSABLES: ['affect', 'effect', 'fewer', 'less', 'whom', 'Who', 'its', "It's", 'practise', 'practice', "They're",
    'their', 'than', 'advice', 'advise', 'lose', 'loose', 'passed', 'past', 'accept', 'except', 'principal', 'principle',
    'stationery', 'stationary', 'too'],
  L5_VOCAB: ['make', 'make', 'do', 'take', 'pay', 'take', 'heavy', 'strong', 'crime', 'found everywhere',
    'very careful and precise', 'kind and generous', 'lasting a very short time', 'fluent and persuasive in speaking',
    'able to recover quickly', 'having more than one meaning', 'determined, never giving up', 'honest and direct',
    'careful with money', 'lacking energy', 'practical and realistic'],
  L5_PUNCT: ['I love reading; my brother prefers football.', 'You will need three things: a pen, a ruler and a rubber.',
    "The children's coats are in the hall.", "The girls' changing room is upstairs.", 'The dog wagged its tail.',
    'We bought apples, pears and bananas.', 'After lunch, we went to the park.', '"Come here," said Mum.',
    'There was only one problem: we had no money.', 'We visited Paris, France; Rome, Italy; and Madrid, Spain.',
    "They're sure it won't rain.", 'My sister, who is a nurse, works nights.', "Who's coming to the cinema?"],
  SPOT: {
    1: ['goes', 'watch', 'play', 'brushes', 'Does', 'their', 'has', "doesn't", 'play', 'wake'],
    2: ['saw', 'for', 'than', 'biggest', 'were', 'you', 'spoke', 'bought', 'caught', 'drove', 'worst'],
    3: ['rains', 'broken', 'said', 'have', 'forgotten', 'seeing', 'by', 'come', 'spoken', 'of'],
    4: ['through', 'slowly', "They're", 'have', 'has', 'tension', 'isolated', 'compares', 'eerie', 'metaphor'],
    5: ['fewer', 'affected', 'whom', 'practise', 'its', 'accept', 'advise', 'too', 'principal', 'lying', 'me', 'definitely']
  }
};

/** Verbes irréguliers retapés : base prétérit participe. */
export const IRREGULAR_KEY = `
begin began begun · break broke broken · bring brought brought · build built built · buy bought bought ·
catch caught caught · choose chose chosen · come came come · do did done · draw drew drawn · drink drank drunk ·
drive drove driven · eat ate eaten · fall fell fallen · feel felt felt · find found found · fly flew flown ·
forget forgot forgotten · get got got · give gave given · go went gone · grow grew grown · know knew known ·
leave left left · lose lost lost · make made made · meet met met · ride rode ridden · run ran run · say said said ·
see saw seen · sing sang sung · sit sat sat · speak spoke spoken · steal stole stolen · swim swam swum ·
take took taken · teach taught taught · think thought thought · throw threw thrown · wear wore worn · win won won ·
write wrote written`.split('·').map((x) => x.trim().split(/\s+/));

/** Américain → britannique, retapé. */
export const UK_KEY = {
  apartment: 'flat', elevator: 'lift', truck: 'lorry', sidewalk: 'pavement', cookie: 'biscuit', fall: 'autumn',
  'French fries': 'chips', 'potato chips': 'crisps', trash: 'rubbish', vacation: 'holiday', eraser: 'rubber',
  soccer: 'football', pants: 'trousers', sweater: 'jumper', diaper: 'nappy', gas: 'petrol', flashlight: 'torch',
  'movie theater': 'cinema', candy: 'sweets', mailman: 'postman', 'zip code': 'postcode', 'parking lot': 'car park',
  freeway: 'motorway', mom: 'mum', line: 'queue'
};

/** Les mots britanniques bien écrits, retapés (orthographe UK et mots pièges). */
export const SPELLING_KEY = new Set(`
colour favourite centre theatre neighbour grey travelled behaviour defence catalogue jewellery tyre pyjamas organise
analyse programme honour humour metre aluminium cosy cheque cancelled
necessary separate Wednesday February library tomorrow apparently until believe receive friend because beautiful
definitely accommodation embarrass rhythm occasion beginning business government environment immediately disappear
disappoint argument island knowledge achieve weird
conscience conscious occurred recommend sincerely foreign independent existence persistent pronunciation possession
committee colleague exaggerate
mischievous millennium parliament privilege guarantee manoeuvre questionnaire conscientious acquaintance bureaucracy
entrepreneur onomatopoeia idiosyncrasy`.trim().split(/\s+/));
