import { bot } from "../core/adminbot.js";
import { config } from "dotenv";
config();

export const sendMessageAdmin = async (adsText, adsId) => {
    try {
        await bot.api.sendMessage(process.env.ADMIN, adsText, {
            parse_mode: "HTML",
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: "✅ Tasdiqlansin",
                            callback_data: `ok=${adsId}`,
                        },
                        {
                            text: "❌ Inkor qilinsin",
                            callback_data: `no=${adsId}`,
                        },
                    ],
                    [
                        {
                            text: "✉️ Xabar yuborish",
                            callback_data: `message=${adsId}`,
                        },
                    ],
                ],
            },
        });
    } catch (error) {
        console.error("Xabar yuborishda xatolik yuz berdi: ", error.message);
    }
};
