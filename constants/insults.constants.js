const RETRIEVE_INSULTS_PERIOD = 24 * 60 * 60 * 1000 // 24 hours
const INSULTS_KEYS = {
  OTHERS: 'others',
  PHRASES: 'phrases',
}
const INSULT_LEVELS = {
  1: { EMOJI: '🟢', TEXT: 'Past' },
  2: { EMOJI: '🟡', TEXT: "O'rta" },
  3: { EMOJI: '🔴', TEXT: 'Yuqori' },
}

module.exports = {
  RETRIEVE_INSULTS_PERIOD,
  INSULTS_KEYS,
  INSULT_LEVELS,
}
