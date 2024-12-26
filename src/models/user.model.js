import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        user_id: { type: String, unique: true },
        username: String,
        first_name: String,
        last_name: String,
        phone_number: String,
        tg_link: String,
    },
    { timestamp: true }
);

export const User = mongoose.model("users", userSchema);
