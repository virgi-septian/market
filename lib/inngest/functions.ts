import {inngest} from "@/lib/inngest/client"
import { PERSONALIZED_WELCOME_EMAIL_PROMPT } from "./prompts"
import { sendWelcomeEmail } from "../nodemailer"
import 'dotenv/config';
import { getAllUsersForNewsEmail } from "../actions/user.actions";

export const sendSignUpEmail = inngest.createFunction(
    {id: 'sign-up-email'},
    {event: 'app/user.created'},
    async ({event, step}) => {
        const userProfile = `
            - Country : ${event.data.country}
            - Investment goals : ${event.data.investmentGoals}
            - Risk rolerance : ${event.data.riskTolerance}
            - Preferred industry : ${event.data.preferredIndustry}
        `

        const prompt = PERSONALIZED_WELCOME_EMAIL_PROMPT.replace('{{userProfile}}', userProfile)

        const response = await step.ai.infer('generate-welcome-intro', {
            model: step.ai.models.gemini({ model: 'gemini-2.5-flash-lite' }), 
            body: {
                contents: [
                    {
                        role: 'user', 
                        parts: [
                            { text: prompt }
                        ]
                    }
                ]
            }
            
        });

        await step.run('send-welcome-email', async () => {
            const part = response.candidates?.[0]?.content?.parts?.[0];
            const introText = (part && 'text' in part ? part.text : null) || 'Thanks for joining Signalist. You now have the tools to track markets and smarter' 


            const {data: {email, name}} = event; 
            return await sendWelcomeEmail(email, name, introText)
        })

        return {
            succes: true,
            message: 'Email sent successfully'
        }
    }
)

export const sendDailyNewsSummary = inngest.createFunction(
    {id: 'daily-news-summary'},
    [{event: 'app/send.daily.news'}, {cron: '0 12 * * *'}],
    async ({event, step}) => {
        // Step 1 Get all users for news delivery
        const user = await step.run('get-all-users', getAllUsersForNewsEmail)

        if(!user || user.length === 0) return {success: false, message: 'No users found for news email'}
        // Step 2 Fetch personalized news for each user

        // Summarize news via AI for each user

        // Send emails
    }
)