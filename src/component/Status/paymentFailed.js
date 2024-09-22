// src/components/PaymentFailed.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentFailed = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const userInfo= JSON.parse(localStorage.getItem('userInfo'));
    if (!userInfo) {
      alert('Please login to access dashboard');
      navigate('/login');
    }
  }, []);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Payment Failed!</h1>
        <p className="text-gray-700 mb-4">Unfortunately, your payment could not be processed. Please try again.</p>
        <a
          href="/payment" // Change this to the appropriate route or function for retrying
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200"
        >
          Retry Payment
        </a>
      </div>
    </div>
  );
};

export default PaymentFailed;
