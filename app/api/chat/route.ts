import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Vaša logika ovdje
    
    return NextResponse.json({ response: "Vaš odgovor" })
  } catch (error) {
    return NextResponse.json({ error: "Greška" }, { status: 500 })
  }
}