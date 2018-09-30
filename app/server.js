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
    '- /dolar \n' +
    '- /euro \n' +
    '- /bitcoin'
  );

  bot.onText(/\/bitcoin/, (msg, match) => {
    bot.sendMessage(chatId, 'US$6329');
  });
  bot.onText(/\/dolar/, (msg, match) => {
    bot.sendMessage(chatId, '$42');
  });
  bot.onText(/\/euro/, (msg, match) => {
    bot.sendMessage(chatId, '$');
  });

};

bot.onText(/\/comprar/, (msg, match) => {
  parseMessage('comprar', msg);
});

bot.onText(/\/vender/, (msg, match) => {
  parseMessage('vender', msg);
});

bot.onText(/(.+)/, (msg, match) => {

  if (['/start','/comprar', '/vender', '/bitcoin', '/dolar', '/euro'].includes(msg.text)) {
    return;
  }
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'No conozco ese mensaje');
});

const wakeupApp = async () => {
  await fetch("https://habotna.herokuapp.com", () => console.log('FETCH'));
  setTimeout(wakeupApp, 1200000);
}

var server = http.createServer(function(req, res) {
  wakeupApp();
});


server.listen(process.env.PORT);