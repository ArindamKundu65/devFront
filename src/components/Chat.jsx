import React from 'react'
import { useParams } from 'react-router-dom'

const Chat = () => {
    const { targetUserId } = useParams();
  return (
    <div className='w-1/2 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col'>
      <h1 className='p-5 border-b border-gray-600'>Chat</h1>
      <div>

      </div>


      <div>
        <input className=''></input>
        <button>Send</button>

      </div>
    </div>

  )
}

export default Chat