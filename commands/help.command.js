async function helpCommand(ctx) {
  const text = `
Poktil hissa botiga, haqoratli so'z yoz va men uni ko'rib chiqaman.

Bu esa asosiy @poktil_bot uchun juda katta yordam!
  `

  await ctx.reply(text)
}

module.exports = {
  helpCommand,
}
