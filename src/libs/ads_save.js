import { Ads } from "../models/ads.model.js";
import { Keyboard } from "grammy";

export async function saveAds(ctx) {
    const adsData = await Ads.find({ user_id: ctx.update.message.from.id });
    const ads = adsData?.[adsData.length - 1];
    let adsText = "";
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
}${
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

        await ctx.reply(adsText);
        return await ctx.reply(`Barcha ma'lumotlar to'g'rimi?`, {
            reply_markup: new Keyboard()
                .text("✅ Ha")
                .text("❌ Yo'q")
                .row()
                .oneTime()
                .resized(),
        });
    }
}
