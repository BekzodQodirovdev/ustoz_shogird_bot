import { Bot } from "grammy";
import { config } from "dotenv";
config();

export const bot = new Bot(process.env.ADMIN_BOT_API);

console.log("Admin Bot is running");

bot.start();
