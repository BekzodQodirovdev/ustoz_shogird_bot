import { Keyboard } from "grammy";
import { User } from "../models/user.model.js";
import { bot } from "../core/bot.js";
import { createAds } from "../libs/create_ads.js";
import { Ads } from "../models/ads.model.js";
import { sendMessageAdmin } from "../libs/send_adminbot.js";

bot.hears("👥 Sherik kerak", async (ctx) => {
    const user_id = ctx.update.message.from.id;
    const data = await User.find({ user_id });
    const user = data?.[0];

    if (!user) {
        await ctx.reply(`Botga "/start" buyrug'ini kiriting`);
    } else {
        await ctx.reply(`Sherik topish uchun ariza berish

Hozir sizga birnecha savollar beriladi. 
Har biriga javob bering. 
Oxirida agar hammasi to'g'ri bo'lsa, HA tugmasini bosing va arizangiz Adminga yuboriladi.`);
        await ctx.reply(`Ism, familiyangizni kiriting?`);
        createAds(ctx, "sherik");
    }
});

bot.hears("💼 Ish joyi kerak", async (ctx) => {
    const user_id = ctx.update.message.from.id;
    const data = await User.find({ user_id });
    const user = data?.[0];

    if (!user) {
        await ctx.reply(`Botga "/start" buyrug'ini kiriting`);
    } else {
        await ctx.reply(`Ish joyi topish uchun ariza berish

Hozir sizga birnecha savollar beriladi. 
Har biriga javob bering. 
Oxirida agar hammasi to'g'ri bo'lsa, HA tugmasini bosing va arizangiz Adminga yuboriladi.`);
        await ctx.reply(`Ism, familiyangizni kiriting?`);
        createAds(ctx, "ish");
    }
});

bot.hears("🤵🤵‍♀️ Hodim kerak", async (ctx) => {
    const user_id = ctx.update.message.from.id;
    const data = await User.find({ user_id });
    const user = data?.[0];

    if (!user) {
        await ctx.reply(`Botga "/start" buyrug'ini kiriting`);
    } else {
        await ctx.reply(`Xodim topish uchun ariza berish

Hozir sizga birnecha savollar beriladi. 
Har biriga javob bering. 
Oxirida agar hammasi to'g'ri bo'lsa, HA tugmasini bosing va arizangiz Adminga yuboriladi.`);
        await ctx.reply(`🎓 Idora nomi?`);
        createAds(ctx, "hodim");
    }
});

bot.hears("👨‍🏫👩‍🏫 Ustoz kerak", async (ctx) => {
    const user_id = ctx.update.message.from.id;
    const data = await User.find({ user_id });
    const user = data?.[0];

    if (!user) {
        await ctx.reply(`Botga "/start" buyrug'ini kiriting`);
    } else {
        await ctx.reply(`Ustoz topish uchun ariza berish

Hozir sizga birnecha savollar beriladi. 
Har biriga javob bering. 
Oxirida agar hammasi to'g'ri bo'lsa, HA tugmasini bosing va arizangiz Adminga yuboriladi.`);
        await ctx.reply(`Ism, familiyangizni kiriting?`);
        createAds(ctx, "ustoz");
    }
});

bot.hears("🙋🙋‍♀️ Shogird kerak", async (ctx) => {
    const user_id = ctx.update.message.from.id;
    const data = await User.find({ user_id });
    const user = data?.[0];

    if (!user) {
        await ctx.reply(`Botga "/start" buyrug'ini kiriting`);
    } else {
        await ctx.reply(`Ustoz topish uchun ariza berish

Hozir sizga birnecha savollar beriladi. 
Har biriga javob bering. 
Oxirida agar hammasi to'g'ri bo'lsa, HA tugmasini bosing va arizangiz Adminga yuboriladi.`);
        await ctx.reply(`Ism, familiyangizni kiriting?`);
        createAds(ctx, "shogird");
    }
});

bot.hears("✅ Ha", async (ctx) => {
    try {
        const adsData = await Ads.find({ user_id: ctx.update.message.from.id });
        const ads = adsData?.[adsData.length - 1];
        if (ads) {
            const {
                category,
                name,
                phone,
                age,
                tg_link,
                call_time,
                technology,
                degree,
                work_place,
                work_time,
                region,
                info,
                price,
            } = ads;
            let adsText;
            if (category != "hodim") {
                adsText = `${
                    category == "sherik"
                        ? "Sherik kerak:"
                        : category == "ustoz"
                        ? `Ustoz kerak:`
                        : category == "shogird"
                        ? "Shogird kerak:"
                        : "Ish joyi kerak:"
                }

${
    category == "sherik"
        ? `🏅 Sherik: ${name}`
        : category == "ustoz"
        ? `🎓 Shogird: ${name}`
        : category == "shogird"
        ? `🎓 Ustoz: ${name}`
        : `👨‍💼 Xodim: ${name}`
} ${
                    category == "ish" ||
                    category == "ustoz" ||
                    category == "shogird"
                        ? `\n🕑 Yosh: ${age}`
                        : ""
                }
📚 Texnologiya: ${technology} 
🇺🇿 Telegram: @${tg_link}
📞 Aloqa: ${phone}
🌐 Hudud: ${region} 
💰 Narxi: ${price} 
👨🏻‍💻 Kasbi: ${work_place}
🕰 Murojaat qilish vaqti: ${call_time}
🔎 Maqsad: ${info}

${
    category == "sherik"
        ? `#sherik`
        : category == "ish"
        ? `#xodim`
        : category == "ustoz"
        ? `#ustoz`
        : category == "shogird"
        ? `#shogird`
        : ""
} #${region} `;
            } else {
                adsText = `Xodim kerak:
    
🏢 Idora: ${name}
📚 Texnologiya: ${technology}
🇺🇿 Telegram: @${tg_link}
📞 Aloqa: ${phone} 
🌐 Hudud: ${region} 
✍️ Mas'ul: ${work_place}
🕰 Murojaat vaqti: ${call_time}
🕰 Ish vaqti: ${work_time}
💰 Maosh: ${price}
‼️ Qo'shimcha: ${info}

#ishJoyi #${region} `;
            }
            let technoligyHtag = technology
                .replace(",", " ")
                .trim()
                .split(" ")
                .filter((item) => item !== "");
            let htag = "";
            for (let i of technoligyHtag) {
                htag += `#${i} `;
            }
            adsText += htag;
            await sendMessageAdmin(adsText, ads.id);
        } else if (!ads) {
            return await ctx.reply(
                `<b>Xatolik, Botni qayta ishga tushiring:</b> /start`,
                {
                    parse_mode: "HTML",
                }
            );
        }
        await ctx.reply("Elon ko'rib chiqilish uchun adminga yuborildi!", {
            reply_markup: new Keyboard()
                .text("👥 Sherik kerak")
                .text("💼 Ish joyi kerak")
                .row()
                .text("🤵🤵‍♀️ Hodim kerak")
                .text("👨‍🏫👩‍🏫 Ustoz kerak")
                .row()
                .text("🙋🙋‍♀️ Shogird kerak")
                .oneTime()
                .resized(),
        });
    } catch (error) {
        console.log(error);
    }
});

bot.hears("❌ Yo'q", async (ctx) => {
    try {
        const adsData = await Ads.find({ user_id: ctx.update.message.from.id });
        const ads = adsData?.[adsData.length - 1];
        if (ads) {
            await Ads.findByIdAndDelete(ads._id);
            // await Ads.deleteMany({ user_id: ctx.update.message.from.id }); // tekshirish kerak
        }
        await ctx.reply("Qabul qilinmadi", {
            reply_markup: new Keyboard()
                .text("👥 Sherik kerak")
                .text("💼 Ish joyi kerak")
                .row()
                .text("🤵🤵‍♀️ Hodim kerak")
                .text("👨‍🏫👩‍🏫 Ustoz kerak")
                .row()
                .text("🙋🙋‍♀️ Shogird kerak")
                .oneTime()
                .resized(),
        });
    } catch (error) {
        console.log(error);
    }
});
