import { Inngest } from 'inngest'

export const inngest = new Inngest({
    id: 'signalist',
    name: 'Signalist',
    ai: { gemini: { apiKey: process.env.GEMINI_API_KEY }},
})