import React from 'react'

const Footer = () => {
  return (
    <div className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <p className="text-center">© {new Date().getFullYear()} Alpha News. All rights reserved.</p>
      </div>
    </div>
  )
}

export default Footer
