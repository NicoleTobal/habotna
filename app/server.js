const TelegramBot = require('node-telegram-bot-api');
var http = require('http');

const token = process.env.BOT_TOKEN;

const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/start/, (msg, match) => {

  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'Hola, estoy usando un contestador automático. Funciona con '+
    'comandos, los cuales se indican en la lista a continuacion: \n ' +
    '- Para consultar el precio de compra de una moneda: /comprar \n' +
    '- Para consultar el precio de venta de una moneda: /vender'
   );
});

const parseMessage = (messageType, message) => {

  const chatId = message.chat.id;

  bot.sendMessage(chatId, 'Que moneda desea '+ messageType + '? \n' +
    '- /' + messageType + '_dolar\n' +
    '- /' + messageType + '_euro \n' +
    '- /' + messageType + '_bitcoin'
  );

};

bot.onText(/\/comprar/, (msg, match) => {
  if (msg.text === '/comprar') {
    parseMessage('comprar', msg);
  }
});

bot.onText(/\/vender/, (msg, match) => {
  if (msg.text === '/vender') {
    parseMessage('vender', msg);
  }
});

bot.onText(/\/comprar_bitcoin/, (msg, match) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'US$6329');
});
bot.onText(/\/comprar_dolar/, (msg, match) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, '$42');
});
bot.onText(/\/comprar_euro/, (msg, match) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, '$50');
});

bot.onText(/\/vender_bitcoin/, (msg, match) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'US$7000');
});
bot.onText(/\/vender_dolar/, (msg, match) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, '$43');
});
bot.onText(/\/vender_euro/, (msg, match) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, '$52');
});

bot.onText(/(.+)/, (msg, match) => {

  if (['/start','/comprar', '/vender',
    '/comprar_bitcoin', '/comprar_dolar', '/comprar_euro',
    '/vender_bitcoin', '/vender_dolar', '/vender_euro'
  ].includes(msg.text)) {
    return;
  }
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'No conozco ese mensaje');
});

const wakeupApp = () => {
  http.get("http://habotna.herokuapp.com", (res) => {
    console.log('Waking up the app: ', res);
  }).end(' ');
  return setTimeout(wakeupApp, 60000);
}

var server = http.createServer((req, res) => {});

server.listen(process.env.PORT, () => {
  wakeupApp();
});
