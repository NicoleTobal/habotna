const TelegramBot = require('node-telegram-bot-api');
var http = require('http');

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.BOT_TOKEN;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Matches "/echo [whatever]"
bot.onText(/\/start/, (msg, match) => {

  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'Hola, estoy usando un contestador automático. Funciona con '+
    'comandos, los cuales se indican en la lista a continuacion: \n ' +
    '/comprar'
   );
});

// Matches "/echo [whatever]"
bot.onText(/\/comprar (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;

  const response = msg.text === '/comprar bitcoin' ? 'US$6329' : 'No conozco esa moneda';

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, response);
});

// // Listen for any kind of message. There are different kinds of
// // messages.
// bot.on('message', (msg) => {
//   const chatId = msg.chat.id;

//   // send a message to the chat acknowledging receipt of their message
//   bot.sendMessage(chatId, 'Received your message');
// });

var server = http.createServer(function(req, res) {
});


server.listen(process.env.PORT);