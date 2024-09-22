import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { UserState } from '../Context/createContext';
import GoogleLogin from './GoogleLogin';

const Login = () => {
  const URI= process.env.REACT_APP_SERVER_URI;
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, setUser } = UserState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${URI}/api/user/login`, { email, password });
      localStorage.setItem('userInfo', JSON.stringify(res.data));
      setUser(res.data);
      alert('Login successful!');
      navigate('/');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="flex flex-col items-center  min-h-screen bg-gray-100">
      <div className="w-md max-w-md bg-white p-8 rounded-lg shadow-lg flex flex-col justify-center mt-5">
        <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">Login to Your Account</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600 mb-1 font-semibold">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 mb-1 font-semibold">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Login
          </button>
        </form>

        <div className="text-center w-full">
          <h2 className="text-gray-500">Or</h2>
          <GoogleLogin/>
        </div>

        <div className="text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
