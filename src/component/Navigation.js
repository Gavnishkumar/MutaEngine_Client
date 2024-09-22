import React from 'react'
import { Link } from 'react-router-dom'

function Navigation({onLogout}) {
  return (
    <div className=" bg-gray-100 flex flex-col">
    {/* Navigation Bar */}
    <nav className="bg-blue-600 p-4 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Dashboard</h1>
        <ul className="flex space-x-6">
          <li>
            <a href="/" className="hover:underline">Home</a>
          </li>
          <li>
            <p><Link to="/login" className="hover:underline">Login</Link></p>
          </li>
          <li>
            <p><Link to="/signup" className="hover:underline">Signup</Link></p>
          </li>
          <li>
            <button
              onClick={onLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          </li>
         
        </ul>
      </div>
    </nav>
    </div>
  )
  }

export default Navigation