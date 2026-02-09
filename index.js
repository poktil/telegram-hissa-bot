require('dotenv').config()
const { BOT } = require('./config/bot.config')
const { message } = require('telegraf/filters')
const { startCommand } = require('./commands/start.command')
const { helpCommand } = require('./commands/help.command')
const { textMessageHandler } = require('./handler/text.handler')
const { registerInsults } = require('./config/insults.config')
const { launchBot } = require('./config/launch.config')

BOT.start(startCommand)
BOT.help(helpCommand)

BOT.on(message('text'), textMessageHandler)
registerInsults()

launchBot()
