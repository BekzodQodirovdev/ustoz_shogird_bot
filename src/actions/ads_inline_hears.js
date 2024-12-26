import { bot } from "../core/adminbot.js";
import { User } from "../models/user.model.js";
import { Ads } from "../models/ads.model.js";
import { sendMessageUser } from "../libs/send_user.js";

const awaitingMessages = new Map();

bot.on("callback_query:data", async (ctx) => {
    try {
        const callbackData = ctx.callbackQuery.data;
        const user_id = ctx.callbackQuery.from.id;

        const data = await User.find({ user_id });
        const user = data?.[0];
        if (!user) {
            return ctx.answerCallbackQuery({
                text: "Foydalanuvchi topilmadi!",
                show_alert: true,
            });
        }

        if (callbackData.startsWith("ok")) {
            const ads_id = callbackData.slice(3);
            const ads = await Ads.findById(ads_id);
            if (!ads) {
                return ctx.answerCallbackQuery({
                    text: "E'lon topilmadi!",
                    show_alert: true,
                });
            }

            let adsText = ctx.callbackQuery.message.text;

            adsText += `\n\n👉 Kanal: @ustozshogirtd`;
            adsText += `\n👉 Elon berish: @ustozshogirdtest_bot`;

            const msgText = `Tabriklayman! Ushbu e'lon admin tomonidan tasdiqlandi!`;
            const post = await ctx.api.sendMessage(
                String(process.env.CHANEL),
                adsText,
                { parse_mode: "HTML" }
            );

            ctx.editMessageText("Tasdiqlandi");
            await sendMessageUser(
                `${ads.user_id}`,
                `${msgText} 👉  https://t.me/ustozshogirtd/${post.message_id}`
            );

            ads.post_id = String(post.message_id);
            await ads.save();
            // await Ads.deleteMany({ user_id: ctx.update.message.from.id }); // tekshirish kerak
        } else if (callbackData.startsWith("no")) {
            const ads_id = callbackData.slice(3);
            const ads = await Ads.findById(ads_id);
            if (!ads) {
                return ctx.answerCallbackQuery({
                    text: "E'lon topilmadi!",
                    show_alert: true,
                });
            }

            const adsText = ctx.callbackQuery.message.text;
            const msgText = `Afsus! Ushbu e'lon admin tomonidan ma'qullanmadi. Ma'lumotlarni to'g'rilab qayta yuboring!`;

            await sendMessageUser(`${ads.user_id}`, adsText);
            ctx.editMessageText("Bekor qilindi");
            await sendMessageUser(`${ads.user_id}`, msgText);
            // await Ads.deleteMany({ user_id: ctx.update.message.from.id }); // tekshirish kerak
        } else if (callbackData.startsWith("message")) {
            const ads_id = callbackData.slice(8);
            const ads = await Ads.findById(ads_id);
            if (!ads) {
                return ctx.answerCallbackQuery({
                    text: "E'lon topilmadi!",
                    show_alert: true,
                });
            }

            awaitingMessages.set(ctx.callbackQuery.from.id, ads.user_id);
            await ctx.reply("Xabaringizni kiriting:");
        }
    } catch (err) {
        console.error(err);
        ctx.answerCallbackQuery({
            text: "Xatolik yuz berdi!",
            show_alert: true,
        });
    }
});

bot.on("message:text", async (ctx) => {
    const userId = ctx.message.from.id;

    if (awaitingMessages.has(userId)) {
        const adsUserId = awaitingMessages.get(userId);
        const adminMessage = `Admin sizga xabar yubordi:  ${ctx.message.text}`;

        try {
            await sendMessageUser(adsUserId, adminMessage);
            await ctx.reply("Xabaringiz yuborildi ✅");
        } catch (err) {
            await ctx.reply("Xabarni yuborishda xatolik yuz berdi ❌");
            console.error(err);
        }

        awaitingMessages.delete(userId);
    }
});
