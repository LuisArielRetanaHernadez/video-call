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
  const [token, setToken] = useState<string>("")
  const [room, setRoom] = useState<string>("")
  const [username, setUsername] = useState<string>("")

  // useEffect(() => {
  //   const getParticipantToken = async () => {
  //     const numerRandom = Math.random() * 10000
  //     const response = await fetch(`/api/get-participant-token?room=${room}&username=${name + numerRandom}`)
  //     console.log('response ', response)
  //     const { token } = await response.json()
  //     setToken(token)
  //   }
  //   getParticipantToken()
  // }, [])

  const getParticipantToken = async () => {
    const numerRandom = Math.random() * 10000
    const response = await fetch(`/api/get-participant-token?room=${room}&username=${username}`)
    console.log('response ', response)
    const { token } = await response.json()
    setToken(token)
  }

  if (token === "") {
    return (
      <div className=' w-screen h-screen bg-slate-100 flex items-center justify-center'>
        <form
        className='w-2/5 min-w-[355px] min-h-[280px] p-2 rounded-md shadow-xl shadow-[#211951] bg-[#070F2B] flex flex-col items-center justify-center'
         onSubmit={e => {
          e.preventDefault()
          getParticipantToken()
        }}>
          <div className='w-[80%] text-[#F0F3FF] mb-8 flex flex-col gap-3'>
            <label
              className='font-bold text-xl'
              htmlFor="room">Room</label>
            <input
              className='p-1 rounded-md text-[#070F2B] font-semibold outline-none'
             type="text" id="room" name="room" value={room} onChange={e => setRoom(e.target.value)} />
          </div>
          <div className='w-[80%] text-[#F0F3FF] mb-8 flex flex-col gap-3'>
            <label
              className='font-bold text-xl'
              htmlFor="name">Name</label>
            <input
            className='p-1 rounded-md text-[#070F2B] font-semibold  outline-none'
             type="text" id="name" name="name" value={username} onChange={e => setUsername(e.target.value)} />
          </div>
          <button
          className='px-3 py-2 text-[#070F2B] font-semibold rounded-md bg-[#F72798]'
          type="submit">Get Token</button>
        </form>
      </div>
    )
  }

  return (
    <LiveKitRoom
    video={true}
    audio={true}
    token={token}
    onReset={() => setToken("")}
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