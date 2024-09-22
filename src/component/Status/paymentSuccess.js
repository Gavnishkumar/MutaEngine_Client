// src/components/PaymentSuccess.js
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const userInfo= JSON.parse(localStorage.getItem('userInfo'));
    if (!userInfo) {
      alert('Please login to access dashboard');
      navigate('/login');
    }
  }, []);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Payment Successful!</h1>
        <p className="text-gray-700 mb-4">Thank you for your payment. Your transaction was successful.</p>
        <Link to='/'
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
