import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { UserState } from '../Context/createContext';
import { useNavigate } from 'react-router-dom';

const TransactionTable = () => {
  const URI= process.env.REACT_APP_SERVER_URI;
  const {user}= UserState();
  const [transactions, setTransactions] = useState([]);
const navigate = useNavigate();
  useEffect(() => {
    // Fetch all transactions (replace with your actual API endpoint)
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`${URI}/api/transactions/fetch-all/${user._id}`,{
          headers: {
            'Authorization': `Bearer ${user.token}` // Include the Bearer token in the Authorization header
          },
          withCredentials:true
        });
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  // Function to generate PDF
  const generateInvoicePDF = (transaction) => {
    const details= JSON.stringify(transaction);
    navigate(`invoice/${details}`)
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Transactions</h2>
      <table className="min-w-full bg-white border border-gray-200 shadow-sm">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Transaction ID</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Amount</th>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Payment Method</th>
            <th className="py-2 px-4 border-b">Currency</th>
            <th className="py-2 px-4 border-b">Remarks</th>
            <th className="py-2 px-4 border-b">Download Invoice</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction._id}>
              <td className="py-2 px-4 border-b">{transaction.transactionId}</td>
              <td className="py-2 px-4 border-b">{transaction.email}</td>
              <td className="py-2 px-4 border-b">${transaction.amount}</td>
              <td className="py-2 px-4 border-b">{new Date(transaction.date).toLocaleString()}</td>
              <td className={`py-2 px-4 border-b ${transaction.status === 'success' ? 'text-green-600' : transaction.status === 'failed' ? 'text-red-600' : 'text-yellow-600'}`}>
                <span className="mr-2">&#8226;</span> {transaction.status}
              </td>
              <td className="py-2 px-4 border-b">{transaction.paymentMethod}</td>
              <td className="py-2 px-4 border-b">{transaction.currency}</td>
              <td className="py-2 px-4 border-b">{transaction.remarks || 'N/A'}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => generateInvoicePDF(transaction)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
                >
                  Download Invoice
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Hidden sections for each transaction to generate the PDF */}
      {transactions.map((transaction) => (
        <div key={transaction._id} style={{ display: 'none' }}>
          <div id={`invoice-${transaction._id}`} className="invoice-container p-4">
            <h2 className="text-xl font-bold mb-4">Invoice</h2>
            <p><strong>Transaction ID:</strong> {transaction.transactionId}</p>
            <p><strong>Email:</strong> {transaction.email}</p>
            <p><strong>Amount:</strong> ${transaction.amount}</p>
            <p><strong>Date:</strong> {new Date(transaction.date).toLocaleString()}</p>
            <p><strong>Status:</strong> {transaction.status}</p>
            <p><strong>Payment Method:</strong> {transaction.paymentMethod}</p>
            <p><strong>Currency:</strong> {transaction.currency}</p>
            <p><strong>Remarks:</strong> {transaction.remarks || 'N/A'}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionTable;
