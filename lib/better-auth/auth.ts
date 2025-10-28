import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from 'better-auth/next-js';
import { connectToDatabase } from "@/database/mongoose";
import 'dotenv/config';

let authIntance: ReturnType<typeof betterAuth> | null = null;

export const getAuth = async () => {
    if (authIntance) return authIntance;

    const mongoose = await connectToDatabase();

    const db = mongoose?.connection.db;

    if(!db) throw new Error('Mongo DB Connection Not Found');

    authIntance = betterAuth({
        database: mongodbAdapter(db as any),
        secret: process.env.BETTER_AUTH_SECRET,
        baseURL: process.env.BETTER_AUTH_URL,
        emailAndPassword: {
            enabled: true,
            disableSignUp: false,
            requireEmailVerification: false, 
            minPasswordLength: 8,
            maxPasswordLength: 128,
            autoSignIn: true,
        },
        plugins: [nextCookies()],
        
    })

    return authIntance;
};

export const auth = await getAuth();
