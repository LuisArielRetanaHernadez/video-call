import { AccessToken } from "livekit-server-sdk"
import { NextRequest, NextResponse } from "next/server"

export const get = async (req: NextRequest, res: NextResponse) => {
  const room = req.nextUrl.searchParams.get("room")
  const username = req.nextUrl.searchParams.get("username")

  if (!room || !username) {
    return new Response("Missing room or username", { status: 400 })
  }

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
