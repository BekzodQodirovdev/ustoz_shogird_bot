import { bot } from "../core/adminbot.js";
import { User } from "../models/user.model.js";
import { Ads } from "../models/ads.model.js";
import { config } from "dotenv";
config();

bot.command("status", async (ctx) => {
    if (ctx.update.message.from.id == process.env.ADMIN) {
        await ctx.reply("Salom admin");

        const user = await User.find();
        const ads = await Ads.find();
        const adsStatusTrue = ads.filter(
            (obj) => typeof obj?.post_id == "string"
        );
        let statistica = `👤 Userlar soni: ${user.length}
✅ Tasdiqlangan postlar: ${adsStatusTrue.length}`;
        await ctx.reply(statistica);
    } else {
        await ctx.reply("Bu command faqat adminlar uchun!");
    }
});
