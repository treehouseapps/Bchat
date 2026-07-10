# Telegram Bot Chat

A simple Telegram bot built with Node.js that replies to text messages from users.

## Features

- Starts a Telegram bot using polling
- Sends a typing indicator before responding
- Replies to user messages with an AI-generated response via OpenRouter
- Handles basic errors and invalid input gracefully

## Requirements

- Node.js
- npm
- A Telegram bot token
- An OpenRouter API key

## Installation

1. Open the project folder:
   ```bash
   cd telegram-bot-chat
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the project root and add your credentials:
   ```env
   BOT_TOKEN=your_telegram_bot_token
   OPENROUTER_API_KEY=your_openrouter_api_key
   ```

## Run the bot

Start the bot with:

```bash
node index.js
```

The bot will begin listening for messages in Telegram.

## How it works

- The bot listens for incoming messages.
- If the message contains text, it sends a typing action.
- It sends the message to the configured AI service.
- The reply is sent back to the user.

## Project files

- `index.js` - Main bot logic
- `package.json` - Project dependencies and scripts
- `.env` - Environment variables for tokens and API keys

## Notes

- The bot currently accepts text messages only.
- Non-text messages will receive a simple response asking the user to send text.
