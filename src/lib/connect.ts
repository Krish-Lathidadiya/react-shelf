"use server";
import mongoose from "mongoose";

export default async function connect():Promise<void>{
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("db connected...");
    } catch (error) {
        console.error(error);
    }
}