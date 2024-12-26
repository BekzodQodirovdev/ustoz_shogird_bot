import mongoose from "mongoose";

const adsSchema = mongoose.Schema(
    {
        user_id: String,
        category: String,
        post_id: { type: String },
        tg_link: String,
        name: String,
        age: String,
        phone: String,
        technology: String,
        degree: String,
        work_place: String,
        work_time: String,
        price: String,
        region: String,
        call_time: String,
        info: String,
        ads_state: String,
    },
    {
        timestamp: true,
    }
);

export const Ads = mongoose.model("advertisements", adsSchema);
