import React, { useState } from 'react'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { FaPlus } from 'react-icons/fa'


function NewDm() {
  const [openNewContactModal,setOpenNewContactModal]  =  useState(false)
  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
             <FaPlus className='text-neutral-400 font-light text-opacity-90 text-sm hover:text-neutral-100 cursor-pointer transit duration-300' onClick={()=>set}/> 
             </TooltipTrigger>
          <TooltipContent>
            <p>Add to library</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>


    </div>
  )
}

export default NewDm