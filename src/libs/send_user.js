import { bot } from "../core/bot.js";
import { config } from "dotenv";
config();

export const sendMessageUser = async (id, adminTxt) => {
    try {
        await bot.api.sendMessage(id, adminTxt);
    } catch (error) {
        console.error("Xabar yuborishda xatolik yuz berdi: ", error.message);
    }
};
