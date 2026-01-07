const TelegramBot = require("node-telegram-bot-api");
const token = "8404640940:AAEHlrAb7qrrIkn1DhmUTdtUW0tYIUtSX-U";

const bot = new TelegramBot(token, { polling: true });

const bootstrap = () => {
  bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (text === "/start") {
      await bot.sendMessage(
        chatId,
        "Ibrohim platformasida bor kurslarni olishingiz mumkin",
        {
          reply_markup: {
            keyboard: [
              [
                {
                  text: "Kurslarni ko'rish",
                  web_app: {
                    url: "https://sammi.ac",
                  },
                },
              ],
            ],
          },
        }
      );
    }
  });
};

bootstrap();
