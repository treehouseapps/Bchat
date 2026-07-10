const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");

const bot = new TelegramBot(process.env.BOT_TOKEN);

async function askAI(prompt) {
  const response = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      model: "openrouter/free",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
    },
  );

  return response.data.choices[0].message.content;
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(200).send("Telegram Bot is running.");
  }

  const msg = req.body.message;

  if (!msg) {
    return res.status(200).end();
  }

  const chatId = msg.chat.id;

  if (!msg.text) {
    await bot.sendMessage(chatId, "Please send text only.");
    return res.status(200).end();
  }

  try {
    await bot.sendChatAction(chatId, "typing");

    const reply = await askAI(msg.text);

    await bot.sendMessage(chatId, reply);
  } catch (err) {
    console.error(err.response?.data || err);

    await bot.sendMessage(chatId, "Sorry, I couldn't generate a response.");
  }

  res.status(200).end();
};
