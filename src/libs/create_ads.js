import { Ads } from "../models/ads.model.js";

export const createAds = async (ctx, category) => {
    const userId = await ctx.update.message.from.id;

    const newAds = new Ads({
        user_id: userId,
        category: category,
        ads_state: "name",
    });
    await newAds.save();
};
