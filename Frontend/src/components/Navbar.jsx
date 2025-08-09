import React from 'react'

export const Navbar = () => {
  return (
    <nav className="flex  rounded-3xl justify-between  shadow-amber-100 bg-white">
      {/* Left: Logo + Title */}
      <div className="flex ">
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
