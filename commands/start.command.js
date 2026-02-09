async function startCommand(ctx) {
  const text = `Salom, ${ctx.from.first_name}! \n\nMen Poktil hissa botman, hoziroq menga haqoratli so'z yoz va men uni ko'rib chiqaman.`
  await ctx.reply(text)
}

module.exports = {
  startCommand,
}
