"use client"

// componentes styles
import '@livekit/components-styles'

// componentes react
import {
  LiveKitRoom,
  VideoConference,
  GridLayout,
  ParticipantTile,
  useTracks,
  RoomAudioRenderer,
  ControlBar
} from '@livekit/components-react'

import { Track } from 'livekit-client'

// hooks
import { useEffect, useState } from 'react'

const Room = () => {
  const [token, setToken] = useState("")
  const room = "quickstart-room"
  const name = "quickstart-user"

  useEffect(() => {
    const getParticipantToken = async () => {
      const numerRandom = Math.random() * 10000
      const response = await fetch(`/api/get-participant-token?room=${room}&username=${name + numerRandom}`)
      console.log('response ', response)
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
    serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
    data-lk-theme="default"
    style={{ height: '100vh'}}
    >
      <MyVideoConference />
      <RoomAudioRenderer />
      <ControlBar />
    </LiveKitRoom>
  )
}

const MyVideoConference = () => {
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
      { source: Track.Source.Microphone, withPlaceholder: true }
    ],
    { onlySubscribed: true}
  )

  return (
    <GridLayout tracks={tracks} style={{ height: 'calc(100vh - var(--lk-control-bar-height)'}}>
      <ParticipantTile />
    </GridLayout>
  )
}

export default Room