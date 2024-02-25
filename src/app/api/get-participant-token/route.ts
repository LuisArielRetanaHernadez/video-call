"use server"
import { AccessToken } from "livekit-server-sdk"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req: NextRequest, res: NextResponse) => {
  // componente dinamico 
  // 'use server'
  const room = req.nextUrl.searchParams.get("room")
  const username = req.nextUrl.searchParams.get("username")

  console.log('hola')

  if (!room || !username) {
    return new Response("Missing room or username", { status: 400 })
  }
  console.log(process.env.LIVEKIT_API_KEY, ' ', process.env.LIVEKIT_API_SECRET, ' ', process.env.NEXT_PUBLIC_LIVEKIT_URL)
  const apiKey = process.env.LIVEKIT_API_KEY
  const apiSecret = process.env.LIVEKIT_API_SECRET
  const wsUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL

  if (!apiKey || !apiSecret || !wsUrl) {
    return new Response("configuration not found", { status: 500 })
  }

  const at = new AccessToken(apiKey, apiSecret, { identity: username})

  at.addGrant({ roomJoin: true, room, canPublish: true, canSubscribe: true })

  return NextResponse.json({ token: await at.toJwt() })
}
