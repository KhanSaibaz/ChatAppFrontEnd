import { Avatar,AvatarImage } from '@/components/ui/avatar'
import React from 'react'
function ProfileInfo() {

  return (
    <div className='absolute bottom-0 h-16 flex items-center justify-between px-10 w-full bg-[#2a2b33]'>

        <div className="flex gap-3 items-center justify-center"> 
        {/* <Avatar className="h-24 w-24 md:w-32 md:h-32 rounded-full overflow-hidden">
              {image ? (
                <AvatarImage src={image} alt="Profile" className="object-cover w-full h-full bg-black" />
              ) : (
                <div className={`h-24 w-24 uppercase md:w-32 md:h-32 text-5xl border-[1px] flex items-center justify-center rounded-full ${getColor(selectedColor)}`}>
                  {firstName ? firstName.charAt(0) : "U"}
                </div>
              )}
            </Avatar> */}
        </div>
    </div>
  )
}

export default ProfileInfo