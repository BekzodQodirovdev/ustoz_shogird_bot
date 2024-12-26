import { Bot } from "grammy";
import { config } from "dotenv";
config();

export const bot = new Bot(process.env.BOT_API);

console.log("Bot is running");

bot.start();
