// src/components/Login.js
import React, { useEffect } from 'react';
import axios from 'axios';
import { UserState } from '../Context/createContext';
import { useNavigate } from 'react-router-dom';

const GoogleLogin = () => {
  const navigate = useNavigate();
  const { user, setUser } = UserState();
  const URI= process.env.REACT_APP_SERVER_URI;
  useEffect(() => {
    const fetchGoogleInfo = async () => {
      try {
        const googleInfo = await axios.get(`${URI}/user`, { withCredentials: true });
        localStorage.setItem('userInfo', JSON.stringify(googleInfo.data));
        setUser(googleInfo.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGoogleInfo();
  }, [setUser]);

  const handleLogin = () => {
    window.open(`${URI}/auth/google`, '_self');
  };

  return (
    <div className="w-full flex flex-col items-center justify-center mt-3 mb-4">
      <button
        className="flex items-center justify-center bg-white text-gray-700 border border-gray-300 shadow-md hover:shadow-lg px-4 py-2 rounded-lg transition duration-300 ease-in-out"
        onClick={handleLogin}
      >
        <img
          src="https://banner2.cleanpng.com/20201008/rtv/transparent-google-suite-icon-google-icon-1713858301568.webp"
          alt="Google Icon"
          className="w-5 h-5 mr-2"
        />
        Continue with Google
      </button>
    </div>
  );
};

export default GoogleLogin;
