const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
const cors = require("cors");

// Tokenni Render Environment Variables-dan olish tavsiya etiladi
const token =
  process.env.BOT_TOKEN || "8404640940:AAEHlrAb7qrrIkn1DhmUTdtUW0tYIUtSX-U";

const bot = new TelegramBot(token, { polling: true });
const app = express();

app.use(express.json());
app.use(cors());

// --- RENDER UCHUN MUHIM QISM ---
// Render serveringiz "Live" ekanini bilishi uchun GET so'roviga javob bo'lishi shart
app.get("/", (req, res) => {
  res.send("Bot is running...");
});
// ------------------------------

const bootstrap = () => {
  bot.setMyCommands([
    { command: "/start", description: "Kurslar haqida ma'lumot" },
    { command: "/courses", description: "Barcha kurslar" },
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
                    url: "https://chat-app-507f3.firebaseapp.com/",
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
                    url: "https://chat-app-507f3.firebaseapp.com/",
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
          "Bizga ishonch bildirganingiz uchun raxmat!"
        );

        for (let item of data) {
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
        console.log("JSON Parse error:", error);
      }
    }
  });
};

bootstrap();

app.post("/web-data", async (req, res) => {
  const { queryId, products } = req.body;
  try {
    await bot.answerWebAppQuery(queryId, {
      type: "article",
      id: queryId,
      title: "Muvaffaqiyatli xarid qildingiz!",
      input_message_content: {
        message_text: `Xaridingiz bilan tabriklayman, siz ${products
          ?.reduce((a, c) => a + c.price * c.qty, 0)
          .toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })} qiymatga ega mahsulot sotib oldingiz`,
      },
    });
    return res.status(200).json({});
  } catch (error) {
    console.log("WebApp Query error:", error);
    return res.status(500).json({});
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
