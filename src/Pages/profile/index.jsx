import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useUserInfoQuery,useProfileUpdateMutation } from '@/redux/ApiSlice/User.slice';
import { IoArrowBack } from "react-icons/io5";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getColor, colors } from '@/utils/Utils';
import { FaTrash, FaPlus } from 'react-icons/fa';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


function Profile() {
  const { data: users } = useUserInfoQuery();
  const [updateProfile] = useProfileUpdateMutation();
  const data = useSelector((state) => state.auth?.token);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [image, setImage] = useState(null);
  const [selectedColor, setSelectedColor] = useState(0);
  const [hovered, setHovered] = useState(false);
  const navigate=useNavigate()
  
  // Reference for file input
  const fileInputRef = useRef(null);

  console.log(selectedColor,"io");
  
  useEffect(() => {
    console.log(users?.data, 'users');
    setFirstName(users?.data?.firstName || null)
    setLastName(users?.data?.lastName|| null)
    setSelectedColor(users?.data?.setColor || null)
    setImage(users?.data?.image || null)
    Cookies.set("profileSetup",users?.data?.profileSetup)

  }, [users]);
  console.log(selectedColor,"selectcolor");
  

const handleNavigate=()=>{
  if(users?.data?.profileSetup){
    navigate('/chat')
  }
}

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(event.target.files[0],'saibaz  ');
    
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      console.log(imageUrl);
      
      setImage(imageUrl);
    }
  };

  const handleDeleteImage=async()=>{
    setImage(null)
  }

  // Function to trigger file input
  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmitProfile = async () => {
    if (!firstName || !lastName) {
      alert("First Name and Last Name are required");
      return;
    }
  
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("selectedColor", selectedColor);
    console.log(fileInputRef.current.files,"fileInputRef.current?.files[0])");
    
    
    if (fileInputRef.current?.files.length > 0) {
      formData.append("profileImage", fileInputRef.current.files[0]);
    } else if (image) {
      formData.append("profileImage", image);
    }
    console.log(formData,'formdata')
  
    try {
      const res = await updateProfile(formData);
      console.log(res);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  





  return (
    <div className='bg-[#1b1c24] h-[100vh] flex flex-col items-center justify-center gap-10'>
      <div className="flex flex-col gap-10 w-[80vw] md:w-max">
        <div onClick={handleNavigate}>
          <IoArrowBack className="text-4xl lg:text-6xl text-white/90 cursor-pointer" />
        </div>
        <div className="grid grid-cols-2">
          <div
            className="h-full w-32 md:w-48 md:h-48 relative flex items-center justify-center"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={image ?handleDeleteImage :handleAvatarClick} // Trigger file input on click
          >
            <Avatar className="h-24 w-24 md:w-32 md:h-32 rounded-full overflow-hidden">
              {image ? (
                <AvatarImage src={image} alt="Profile" className="object-cover w-full h-full bg-black" />
              ) : (
                <div className={`h-24 w-24 uppercase md:w-32 md:h-32 text-5xl border-[1px] flex items-center justify-center rounded-full ${getColor(selectedColor)}`}>
                  {firstName ? firstName.charAt(0) : "U"}
                </div>
              )}
            </Avatar>
            {hovered && (
              <div className='absolute inset-0 flex items-center justify-center bg-black/50 ring-fuchsia-50 rounded-full'>
                {image ? <FaTrash className='text-white text-3xl cursor-pointer' /> : <FaPlus className='text-white text-3xl cursor-pointer' />}
              </div>
            )}
            {/* Hidden file input */}
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              name='profile-image'
              onChange={handleFileChange}
            />
          </div>
          
          <div className='flex min-w-32 md:min-w-64 flex-col gap-5 items-center justify-center text-white'>
            <div className="w-full">
              <Input placeholder="Email" type="email" disabled value={users?.data?.email} className="rounded-lg p-6 bg-[#2c2e3b] border-none" />
            </div>
            <div className='w-full'>
              <Input placeholder="First Name" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="rounded-lg p-6 bg-[#2c2e3b] border-none" />
            </div>
            <div className='w-full'>
              <Input placeholder="Last Name" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="rounded-lg p-6 bg-[#2c2e3b] border-none" />
            </div>
            <div className="w-full flex gap-5">
              {colors?.map((color, index) => (
                <div className={`${color} h-8 w-8 rounded-full cursor-pointer transition-all duration-300 ${selectedColor === index ? " outline-white/80 outline-2" : ""}`} key={index} onClick={() => setSelectedColor(index)}>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full">
          <button type="button" className="text-white w-full bg-[#730039] hover:bg-red-800 transition duration-300 font-bold rounded-lg px-5 py-2.5 cursor-pointer" onClick={handleSubmitProfile}>
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
