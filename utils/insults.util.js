const { INSULTS } = require('../config/insults.config')
const { INSULTS_KEYS } = require('../constants/insults.constants')
const { normalizer } = require('../lib/normalizer.lib')

function tokenize(text) {
  if (!text) return []
  return text.match(/\p{L}+/gu) || []
}

function scanWords(words, containsOnly) {
  const found = []
  const notInsults = new Set()
  let levelSum = 0

  for (let i = 0; i < words.length; i++) {
    const w1 = normalizer(words[i])
    const w2 = words[i + 1] ? normalizer(words[i + 1]) : null

    const phraseHit = w2 && findByPhrase(`${w1} ${w2}`)
    if (phraseHit) {
      if (containsOnly) return { containsInsult: true }

      found.push(phraseHit)
      levelSum += phraseHit.level
      i++
      continue
    } else {
      const wordHit1 = findByWord(w1)
      const wordHit2 = findByWord(w2)

      if (!wordHit1 && !wordHit2) notInsults.add(`${w1}${w2 ? ' ' + w2 : ''}`)
    }

    const wordHit = findByWord(w1)
    if (wordHit) {
      if (containsOnly) return { containsInsult: true }

      found.push(wordHit)
      levelSum += wordHit.level
    } else {
      notInsults.add(w1)
    }
  }

  return { found, levelSum, notInsults }
}

function findByPhrase(phrase) {
  const pool = INSULTS[INSULTS_KEYS.PHRASES] || []

  for (const item of pool) {
    const match = phrase.match(item.pattern)
    if (match) return { ...item, insult: match[0], word: phrase }
  }

  return null
}

function findByWord(word) {
  if (!word) return null

  const pool = [
    ...(INSULTS[word[0]] || []),
    ...(INSULTS[INSULTS_KEYS.OTHERS] || []),
  ]

  const res = pool.find((i) => i.pattern.test(word))
  if (res) return { ...res, word }

  return null
}

module.exports = {
  tokenize,
  scanWords,
  findByPhrase,
  findByWord,
}
