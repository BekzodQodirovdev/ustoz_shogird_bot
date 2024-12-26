import { Keyboard } from "grammy";
import { bot } from "../core/bot.js";
import { User } from "../models/user.model.js";

bot.command("start", async (ctx) => {
    const newUserId = ctx.update.message.from.id;
    const username = ctx.update.message.from.username || "";
    const first_name = ctx.update.message.from.first_name || "";
    const last_name = ctx.update.message.from.last_name || "";

    const data = await User.find({ user_id: newUserId });
    const user = data?.[0];
    if (!user) {
        const newUser = new User({
            user_id: newUserId,
            username,
            first_name,
            last_name,
        });
        await newUser.save();
    }

    await ctx.reply(
        `<b>Assalom alaykum ${first_name} ${last_name}
UstozShogird kanalining rasmiy botiga xush kelibsiz!</b>

/help yordam buyrugi orqali nimalarga qodir ekanligimni bilib oling!`,
        {
            parse_mode: "HTML",
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
        }
    );
});

bot.command("help", async (ctx) => {
    await ctx.reply(`UzGeeks faollari tomonidan tuzilgan Ustoz-Shogird kanali. 

Bu yerda Programmalash bo'yicha
  #Ustoz,  
  #Shogird,
  #oquvKursi,
  #Sherik,  
  #Xodim va 
  #IshJoyi 
 topishingiz mumkin. 

E'lon berish: @ustozshogirdtest_bot

Admin @ustozshogirdadmin_bot`);
});
