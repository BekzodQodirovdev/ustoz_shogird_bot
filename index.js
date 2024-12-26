import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
export * from "./src/core/bot.js";
export * from "./src/actions/index.js";

config();
const app = express();

const port = process.env.PORT || 4001;
const dbUrl = process.env.MONGO_URI;

app.listen(port, async () => {
    try {
        await mongoose.connect(dbUrl);
        console.log("Connect to MongoDB");
        console.log(`Server running`);
    } catch (error) {
        console.log(error);
    }
});
