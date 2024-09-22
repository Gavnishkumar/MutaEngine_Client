import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserState } from '../Context/createContext';
import PaymentWrapper from './Payment';
import PaymentFailed from './Status/paymentFailed';
import PaymentSuccess from './Status/paymentSuccess';
import TransactionsTable from './TransactionsTable';
const Dashboard = ({onLogout }) => {
const { user,setUser } = UserState();
  const navigate = useNavigate();
  useEffect(() => {
    const userInfo= JSON.parse(localStorage.getItem('userInfo'));
    if (!userInfo) {
      alert('Please login to access dashboard');
      navigate('/login');
    }
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    
    <div className="flex-1 container mx-auto flex flex-col items-center justify-center py-10">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-xl">
        <img src={user.pic} alt="Profile" className="w-20 h-20 mx-auto mb-4 rounded-full" />
        <h2 className="text-3xl font-semibold text-center mb-6">Welcome, {user.name}!</h2>

        <div className="flex flex-col space-y-4">
          <p className="text-lg">
            <strong>Name:</strong> {user.name}
          </p>
          <p className="text-lg">
            <strong>Email:</strong> {user.email}
          </p>
          {user.googleId && (
            <p className="text-lg">
              <strong>Google ID:</strong> {user.googleId}
            </p>
          )}
        </div>
      </div>
        <div className="flex flex-col items-center justify-center mt-10">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => navigate('/payment')}>Make Payment</button>
        </div>
        <div>
          <TransactionsTable/>
        </div>
  </div>
);
};

export default Dashboard;
