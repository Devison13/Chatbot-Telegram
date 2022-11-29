const env = require('../../.env')
const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const bot = new Telegraf(env.token)

let lista = []

const botoesProduto = () => Extra.markup(
    Markup.inlineKeyboard(
        lista.map(item => Markup.callbackButton(item, `delete ${item}`)),
        { columns: 3 }
    )
)

//Boas vindas do usuario
bot.start(async ctx => {
    const name = ctx.update.message.from.first_name
    await ctx.reply(`Olá, ${name}!\nEu sou o ChatCalls`)
    await ctx.reply(' - Escreva os itens que você deseja adicionar ao carrinho.')
    await ctx.reply(` - Para excluir clique no produto.`)

})

// Mensagem do produto adicionado
bot.on('text', ctx => {
    lista.push(ctx.update.message.text)
    ctx.reply(`${ctx.update.message.text} Adicionado com sucesso!`, botoesProduto())
})

bot.action(/delete (.+)/, ctx => {
    lista = lista.filter(item => item !== ctx.match[1])
    ctx.reply(`${ctx.match[1]} Deletado com sucesso!`, botoesProduto())
})

bot.startPolling()