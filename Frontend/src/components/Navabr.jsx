import React from 'react'

export const Navabr = () => {
  return (
    <nav className="flex items-center rounded-3xl justify-between px-6 py-3 shadow-md bg-white">
      {/* Left: Logo + Title */}
      <div className="flex items-center  ">
        <img src="./public/img/Top.png"  alt="Logo" className="w-full h-20 object-contain" />
        
      </div>

      {/* Right: Buttons */}
      <div className="flex items-center gap-3">
        <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded">
          Build Resume
        </button>
        <button className="border border-orange-500 text-orange-500 hover:bg-orange-50 font-semibold px-4 py-2 rounded">
          Sign In
        </button>
      </div>
    </nav>
  )
}
