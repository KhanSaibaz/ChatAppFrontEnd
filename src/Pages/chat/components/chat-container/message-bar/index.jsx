import React, { useEffect, useRef, useState } from 'react'
import { GrAttachment } from 'react-icons/gr'
import { RiEmojiStickerLine } from 'react-icons/ri'
import { IoMdSend } from 'react-icons/io'
import EmojiPicker from 'emoji-picker-react'


function MeaasgeBar() {
  const emojiRef=useRef()
  const [emojiPicker,setEmojiPicker]=useState(false)
  const [message, setMessage] = useState('')

  useEffect(()=>{
    function handleClickOutsie(event){
      if(emojiRef.current && !emojiRef.current.contains(event.target)){
        setEmojiPicker(false)
      }
    }
    document.addEventListener('mousedown',handleClickOutsie)
    return()=>{
      document.removeEventListener('mousedown',handleClickOutsie)
    }
  },[emojiRef])

  const handleAddEmoji=(emoji)=>{
    console.log(emoji,'saibaz');
    
    setMessage((msg)=>msg+emoji.emoji)
  }

  const handleSendMessage=async()=>{
    console.log('1');
    
  }

  return (
    <div className='h-[10vh] bg-[#1c1d25] flex justify-center items-center px-8 mb-8 gap-6'>
      <div className="flex-1 flex bg-[#282b33] rounded-md items-center gap-5 pr-5">
        <input type="text" className='flex-1 p-5 bg-transparent rounded-md focus:border-none focus:outline-none' placeholder='Enter Message....' value={message} onChange={(e) => setMessage(e.target.value)} />
        <button className='text-neutral-500 focus:border-none focus:outline-none focus:text-white transition-all duration-300'><GrAttachment className='text-2xl' /></button>
        <div className="relative">
          <button className='text-neutral-500 focus:border-none focus:outline-none focus:text-white transition-all duration-300' onClick={()=>setEmojiPicker(!emojiPicker)}><RiEmojiStickerLine className='text-2xl' /></button>
        <div className="absolute bottom-16 right-0" ref={emojiRef}>
          <EmojiPicker theme='dark' open={emojiPicker} onEmojiClick={handleAddEmoji}></EmojiPicker>
        </div>
        </div>
      </div>
      <button className='bg-[#8417ff] rounded-md flex items-center justify-center p-5 hover:bg-[#741bda] focus:bg-[#741bda] focus:border-none focus:outline-none focus:text-white transition-all duration-300' onClick={handleSendMessage}><IoMdSend className='text-2xl' /></button>

    </div>
  )
}

export default MeaasgeBar