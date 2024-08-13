import { NextResponse } from "next/server";
import OpenAI from 'openai'

const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
    defaultHeaders: {
        "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL,
        "X-Title": 'Flashcards App',
    },
});

const systemPrompt = `You are a helpful assistant that generates flashcards. You take in text and create exactly 10 flashcards from it. Both front and back should be one sentence long. You MUST return your response in the following JSON format, with no additional text before or after the JSON:

{
  "flashcards": [
    {
      "question": "Front of the card",
      "answer": "Back of the card"
    },
    // ... (8 more flashcards)
  ]
}`;
export async function POST(request: Request) {
    const data = await request.text();

    const completion = await openai.chat.completions.create({
        model: "meta-llama/llama-3.1-8b-instruct:free",
        messages: [
            {
                role: "system",
                content: systemPrompt
            },
            {
                role: "user",
                content: data
            }
        ],
        response_format: { type: 'json_object' },
    })

    // // Check if the content is not null before parsing
    // if (completion.choices[0]?.message?.content) {
    //     const flashcards = JSON.parse(completion.choices[0].message.content);
    //     return NextResponse.json(flashcards);
    // } else {
    //     // Handle the case where the content is null or not present
    //     return NextResponse.json({ error: "Failed to generate flashcards." }, { status: 500 });
    // }
    if (completion.choices[0]?.message?.content) {
        try {
            const flashcards = JSON.parse(completion.choices[0].message.content);
            return NextResponse.json(flashcards);
        } catch (error) {
            console.error('Error parsing JSON:', error);
            console.log('Raw content:', completion.choices[0].message.content);
            return NextResponse.json({ error: "Invalid response format" }, { status: 500 });
        }
    } else {
        return NextResponse.json({ error: "Failed to generate flashcards." }, { status: 500 });
    }
}

