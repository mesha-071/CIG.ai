import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(request: Request) {
  try {
    const { messages } = await request.json()

    const systemMessage = {
      role: "system",
      content: "Vi ste AI asistent specijaliziran za cigarete i duhanske proizvode. Pomažete korisnicima da uporede različite cigarete, njihove karakteristike kao što su nikotin, tar, i cijena. Također možete preporučiti alternative bazirane na preferencijama korisnika. Odgovarajte na bosanskom jeziku."
    }

    const completion = await openai.chat.completions.create({
      messages: [
        systemMessage,
        ...messages.map((msg: any) => ({
          role: msg.isUser ? "user" : "assistant",
          content: msg.text
        }))
      ],
      model: "gpt-3.5-turbo",
      temperature: 0.7,
      max_tokens: 500,
    })

    return NextResponse.json({
      response: completion.choices[0].message.content
    })
  } catch (error) {
    console.error('Greška:', error)
    return NextResponse.json(
      { error: 'Došlo je do greške pri komunikaciji sa AI servisom.' },
      { status: 500 }
    )
  }
}