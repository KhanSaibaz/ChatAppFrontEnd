import Cookies from 'js-cookie'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Chat() {
  
  const navigate = useNavigate()

  useEffect(() => {
    const validate = Cookies.get('profileSetup')
    if (!validate) {
      navigate('/profile')
    }
  }, [])
  
  return (
    <div>Chat</div>
  )
}

export default Chat