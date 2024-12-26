import { User } from "../models/user.model.js";
import { Ads } from "../models/ads.model.js";
import { bot } from "../core/bot.js";
import { saveAds } from "../libs/ads_save.js";

bot.on("message", async (ctx) => {
    const user_id = ctx.update.message.from.id;
    const userData = await User.find({ user_id });
    const user = userData?.[0];
    if (!user) {
        await ctx.reply(`👉 "/start" `);
    }
    let tg_link = user.username;
    const adsArray = await Ads.find({ user_id });

    const ads = adsArray?.[adsArray.length - 1];
    let state = ads?.ads_state;
    let category = ads?.category;
    if (state == "name") {
        if (ctx.update.message?.text) {
            ads.name = ctx.update.message.text;
            ads.tg_link = tg_link;
            if (
                category == "ish" ||
                category == "ustoz" ||
                category == "shogird"
            ) {
                ads.ads_state = "age";
                await ctx.reply(`🕑 Yosh: 
    
    Yoshingizni kiriting?
    Masalan, 19`);
            } else {
                ads.ads_state = "texnologiya";
                await ctx.reply(`📚 Texnologiya:

Talab qilinadigan texnologiyalarni kiriting?
Texnologiya nomlarini vergul bilan ajrating. Masalan, 

Java, C++, C#`);
            }
            await ads.save();
        }
    } else if (state == "age") {
        if (ctx.update.message?.text) {
            ads.age = ctx.update.message.text;
            ads.ads_state = "texnologiya";
            await ads.save();
            await ctx.reply(`📚 Texnologiya:

Talab qilinadigan texnologiyalarni kiriting?
Texnologiya nomlarini vergul bilan ajrating. Masalan, 

Nodejs Java Reactjs`);
        }
    } else if (state == "texnologiya") {
        if (ctx.update.message?.text) {
            ads.technology = ctx.update.message.text;
            ads.ads_state = "phone";
            await ads.save();
            await ctx.reply(`📞 Aloqa: 

Bog'lanish uchun raqamingizni kiriting?
Masalan, +998 90 123 45 67`);
        }
    } else if (state == "phone") {
        if (ctx.update.message?.text) {
            ads.phone = ctx.update.message.text;
            ads.ads_state = "region";
            await ads.save();
            await ctx.reply(`🌐 Hudud: 

Qaysi hududdansiz?
Viloyat nomi, Toshkent shahar yoki Respublikani kiriting.`);
        }
    } else if (state == "region") {
        if (ctx.update.message?.text) {
            ads.region = ctx.update.message.text;

            ads.ads_state = "price";
            await ads.save();
            if (category == "hodim") {
                await ctx.reply(`💰 Maoshni kiriting?`);
            } else {
                await ctx.reply(`💰 Narxi:

Tolov qilasizmi yoki Tekinmi?
Kerak bo'lsa, Summani kiriting?`);
            }
        }
    } else if (state == "price") {
        if (ctx.update.message?.text) {
            ads.price = ctx.update.message.text;
            ads.ads_state = "work_place";
            await ads.save();
            if (category == "hodim") {
                await ctx.reply(`✍️Mas'ul ism sharifi?`);
            } else {
                await ctx.reply(`👨🏻‍💻 Kasbi: 

Ishlaysizmi yoki o'qiysizmi?
Masalan, Talaba`);
            }
        }
    } else if (state == "work_place") {
        if (ctx.update.message?.text) {
            ads.work_place = ctx.update.message.text;
            ads.ads_state = "call_time";
            await ads.save();
            await ctx.reply(`🕰 Murojaat qilish vaqti: 

Qaysi vaqtda murojaat qilish mumkin?
Masalan, 9:00 - 18:00`);
        }
    } else if (state == "call_time") {
        if (ctx.update.message?.text) {
            ads.call_time = ctx.update.message.text;
            if (category == "hodim") {
                ads.ads_state = "work_time";
                await ctx.reply(`🕰 Ish vaqtini kiriting?`);
            } else {
                ads.ads_state = "info";
                await ctx.reply(`🔎 Maqsad: 
    
    Maqsadingizni qisqacha yozib bering.`);
            }
            await ads.save();
        }
    } else if (state == "work_time") {
        if (ctx.update.message?.text) {
            ads.work_time = ctx.update.message.text;
            ads.ads_state = "info";
            await ads.save();
            await ctx.reply(`‼️ Qo'shimcha ma'lumotlar?`);
        }
    } else if (state == "info") {
        if (ctx.update.message?.text) {
            ads.info = ctx.update.message.text;
            ads.ads_state = "finish";
            await ads.save();
            await saveAds(ctx);
        }
    }
});

bot.on("edit:text", async (ctx) => {
    await ctx.reply("O'zgartirib bo'lmaydi qaytadan yozing /start");
});
