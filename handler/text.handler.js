const { getFromFirestore } = require('../database/get')
const { setToFirestore } = require('../database/set')
const { findInsult } = require('../lib/insults.lib')

async function textMessageHandler(ctx) {
  if (ctx.chat.type !== 'private') return

  const messages = ctx.message || ctx.editedMessage

  const text = messages.text || messages.caption || ''

  const result = findInsult(text)
  const resText = []
  const notInsults = [...result.notInsults]

  if (result.insults?.length) {
    console.log(result.insults)
    resText.push(
      `🔴 Mavjud:\n${result.insults
        .map((item, i) => `${i + 1}. ${item.insult} - ${item.word}`)
        .join('\n')}`,
    )
  }
  if (notInsults?.length) {
    resText.push(
      `🟢 Yangi:\n${notInsults
        .map((item, i) => `${i + 1}. ${item}`)
        .join('\n')}`,
    )
    resText.push('🟡 Yuborilmoqda...')
  }

  await ctx.reply(resText.join('\n\n'))

  if (notInsults?.length) {
    for (const word of notInsults) {
      const exists = await getFromFirestore('haqoratlar', word)
      if (exists.ok) {
        await ctx.reply(`🙄 "${word}" bu oldin qo'shilgan ekan!`)
        return
      }
      const res = await setToFirestore('haqoratlar', word, getData(ctx.from))
      if (!res.ok) {
        console.error(`"${word}" so'zda xatolik: ${res.message}`)
        return
      }
      await ctx.reply(`✅ "${word}" so'zi haqoratlar bazasiga qo'shildi!`)
    }
  }
}

function getData(u) {
  const data = {
    telegram_id: u?.id,
    username: u?.username,
    first_name: u?.first_name,
    last_name: u?.last_name,
    language: u?.language_code,
    is_premium: u?.is_premium,
    created_at: formatCreatedAt(),
  }

  return Object.fromEntries(
    Object.entries(data).filter(([, v]) => v !== null && v !== undefined),
  )
}

function formatCreatedAt(date = new Date()) {
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Tashkent',
  })
}

module.exports = { textMessageHandler }
