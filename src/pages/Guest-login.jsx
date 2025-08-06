import React from 'react'

export default function Guest() {
  return (
    <div className='w-full min-h-screen flex items-center justify-center p-4 relative' style={{backgroundImage:"url('/bgimage.jpg')",backgroundSize:"cover",backgroundPosition:"center"}}>
        <div className='absolute inset-0 bg-black/30 '></div>
        <div className='w-full md:w-1/3 z-50 h-full p-4 bg-white rounded-xl  flex flex-col items-center'>
        <div className='w-50 h-50  relative'>
<img src='/cafelogo.png'></img>
        </div>
        <form className='flex flex-col w-full gap-8 '>
            <input type='text' placeholder='Full Name' className='w-full p-3 text-semibold  rounded-md my-2 border-2 border-orange-500'></input>
            <input type='text' placeholder='Phone Number' className='w-full p-3  rounded-md my-2 border-2 border-orange-500'></input>
            <button className='bg-orange-500 text-white rounded-xl cursor-pointer px-2 py-2 font-semibold text-lg'>Login As Guests</button>
        </form>
        
        </div>

      
    </div>
  )
}
