// Multiplos usuários acessando o bot
const env = require('../../.env')
const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const session = require('telegraf/session')
const bot = new Telegraf(env.token)

const botoes = lista => Extra.markup(
    Markup.inlineKeyboard(
    lista.map(item => Markup.callbackButton(item, `delete ${item}`))
    , {columns: 3}
    )
)

bot.use(session())

bot.start(async ctx => {
    const name = ctx.update.message.from.first_name
    await ctx.reply(`Olá, ${name}!\nEu sou o ChatCalls`)
    await ctx.reply(' - Escreva os itens que você deseja adicionar ao carrinho.')
    await ctx.reply(` - Para excluir clique no produto.`)
    ctx.session.lista = []
})

bot.on('text', ctx => {
    let msg = ctx.update.message.text
    ctx.session.lista.push(msg)
    ctx.reply(`${msg} Adicionado com sucesso!`, botoes(ctx.session.lista))
})

bot.action(/delete (.+)/, ctx => {
    ctx.session.lista = ctx.session.lista.filter(
        item => item !== ctx.match[1])
    ctx.reply(`${ctx.match[1]}Deletado com sucesso!`, botoes(ctx.session.lista))
    })

    bot.startPolling()

