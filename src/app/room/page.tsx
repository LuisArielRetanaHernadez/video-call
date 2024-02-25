"use client"

// componentes styles
import '@livekit/components-styles'

// componentes react
import {
  LiveKitRoom,
  VideoConference,
  GridLayout,
  ParticipantTile,
  useTracks
} from '@livekit/components-react'

import { Track } from 'livekit-client'

// hooks
import { useEffect, useState } from 'react'

const Room = () => {
  const [token, setToken] = useEffect("")
  const room = "quickstart-room"
  const name = "quickstart-user"

  useEffect(() => {
    const getParticipantToken = async () => {
      const response = await fetch(`/api/get-participant-token?room=${room}&name=${name}`)
      const { token } = await response.json()
      setToken(token)
    }
    getParticipantToken()
  }, [])

  if (token === "") {
    return <div>Loading...</div>
  }

  return (
    <LiveKitRoom
    video={true}
    audio={true}
    token={token}

    serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_SERVER_URL}
    data-lk-theme="default"
    style={{ height: '100dvh'}}
    >
      <MyVideoConference />
    </LiveKitRoom>
  )
}

export default Room