const TelegramBot = require("node-telegram-bot-api");
const token = "8404640940:AAEHlrAb7qrrIkn1DhmUTdtUW0tYIUtSX-U";

const bot = new TelegramBot(token, { polling: true });

const bootstrap = () => {
  bot.setMyCommands([
    {
      command: "/start",
      description: "Kurslar haqida ma'lumot",
    },
    {
      command: "/courses",
      description: "Barcha kurslar",
    },
  ]);

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
                    url: "https://telegram-web-bot-lovat-eight.vercel.app/",
                  },
                },
              ],
            ],
          },
        }
      );
    }

    if (text === "/courses") {
      await bot.sendMessage(
        chatId,
        "Ibrohim platformasida bor kurslarni olishingiz mumkin",
        {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "Kurslarni ko'rish",
                  web_app: {
                    url: "https://telegram-web-bot-lovat-eight.vercel.app/",
                  },
                },
              ],
            ],
          },
        }
      );
    }

    if (msg.web_app_data?.data) {
      try {
        const data = JSON.parse(msg.web_app_data?.data);

        await bot.sendMessage(
          chatId,
          "Bizga ishonch bildirganingiz uchun raxmat, Ismoil tinchmisan jgar ;)"
        );

        for (item of data) {
          await bot.sendMessage(chatId, `${item?.title} - ${item?.qty} ta`);
        }

        await bot.sendMessage(
          chatId,
          `Umumiy narx - ${data
            .reduce((a, c) => a + c.price * c.qty, 0)
            .toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}`
        );
      } catch (error) {
        console.log(error);
      }
    }
  });
};

bootstrap();
