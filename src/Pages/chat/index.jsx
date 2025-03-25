import Cookies from 'js-cookie'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ContactContainer from './components/contact-container'
import EmptyChatConatiner from './components/empty-chat-container'
import ChatContainer from './components/chat-container'

function Chat() {
  
  const navigate = useNavigate()

  useEffect(() => {
    const validate = Cookies.get('profileSetup')
    if (!validate) {
      navigate('/profile')
    }
  }, [])
  
  return (
    <div className='flex text-white overflow-hidden h-[100vh]'>
    <ContactContainer/>
    {/* <EmptyChatConatiner/> */}
    <ChatContainer/>
    </div>

  )
}

export default Chat