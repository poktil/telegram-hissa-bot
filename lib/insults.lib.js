const { INSULT_LEVELS } = require('../constants/insults.constants')
const { tokenize, scanWords } = require('../utils/insults.util')

function findInsult(text, options = {}) {
  const { containsOnly = false } = options

  const words = tokenize(text)

  const result = scanWords(words, containsOnly)

  if (containsOnly) return result
  if (!result.found.length)
    return { containsInsult: false, notInsults: result.notInsults }

  const avgLevel = Math.round(result.levelSum / result.found.length)
  const level = INSULT_LEVELS[avgLevel]

  return {
    containsInsult: true,
    level: avgLevel,
    insults: result.found,
    notInsults: result.notInsults,
    message: `Haqoratlar: ${result.found.length}ta\nDaraja: ${level.TEXT} ${level.EMOJI}`,
  }
}

module.exports = { findInsult }
