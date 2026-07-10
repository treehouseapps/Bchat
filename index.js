require("dotenv").config();

const TelegramBot = require("node-telegram-bot-api").default;
const { GoogleGenAI } = require("@google/genai");

// Create the Telegram bot and keep polling enabled.
const bot = new TelegramBot(process.env.BOT_TOKEN, {
  polling: true,
});

console.log("Bot is running...");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const axios = require("axios");

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

bot.on("message", async (msg) => {
  if (!msg.text) {
    return bot.sendMessage(msg.chat.id, "Please send text only.");
  }

  try {
    await bot.sendChatAction(msg.chat.id, "typing");

    const reply = await askAI(msg.text);

    await bot.sendMessage(msg.chat.id, reply);
  } catch (err) {
    console.error(err.response?.data || err);

    await bot.sendMessage(msg.chat.id, "Sorry, something went wrong.");
  }
});

bot.on("polling_error", (error) => {
  console.log("Polling error:", error.message);
});
