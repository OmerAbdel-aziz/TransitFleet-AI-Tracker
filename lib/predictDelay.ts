// lib/predictDelay.ts
import { GoogleGenerativeAI } from "@google/generative-ai"


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")


export async function predictDelay(input: {
bus_speed: number
temperature: number
rain: number
historical_avg_delay: number
}) {
try {
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })


const prompt = `
Given the following transit conditions:
- Bus speed: ${input.bus_speed} km/h
- Temperature: ${input.temperature} °C
- Rain (0 = no rain, 1 = raining): ${input.rain}
- Historical average delay: ${input.historical_avg_delay} minutes


Predict the expected bus delay in minutes.
Return ONLY a number (float).
`


const result = await model.generateContent(prompt)
const text = result.response.text().trim()


// Try to parse as number, fallback to NaN
const predicted = parseFloat(text)


if (isNaN(predicted)) {
console.error("Gemini returned a non-numeric response:", text)
throw new Error("Invalid prediction output")
}


return { predicted_delay_minutes: predicted }
} catch (error) {
console.error("Gemini API error in predictDelay:", error)
throw error
}
}