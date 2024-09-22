import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserState } from '../Context/createContext';
import ReCAPTCHA from 'react-google-recaptcha';
// Load Stripe with your public key
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY); // Replace with your Stripe Publishable Key

const Payment = () => {
  const URI= process.env.REACT_APP_SERVER_URI;
  const { user, setUser } = UserState();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState(0);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [Remark, setRemark] = useState('');
  const [CaptchaToken, setCaptchaToken] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (!userInfo) {
      alert('Please login to access dashboard');
      navigate('/login');
    }
  }, []);
  const SaveNewTransaction = async ({ user, name, email, amount, remarks, transactionId, status, paymentMethod, currency }) => {
    try {
      await axios.post(`${URI}/api/transactions/add-transaction`, {
        user,
        name,
        email,
        amount,
        remarks,
        transactionId,
        status,
        paymentMethod,
        currency
      }, {
        headers: {
          'Authorization': `Bearer ${user.token}`, // Add the Bearer token
          'Content-Type': 'application/json'  // Ensure correct content type (optional)
        },
        withCredentials: true
      });

    } catch (error) {
      alert("server error");
    }
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    setPaymentProcessing(true);

    try {
      // Call your backend to create a payment intent
      const { data } = await axios.post(`${URI}/payment/create-payment-intent`, {
        amount,
        currency: 'usd',
        CaptchaToken: CaptchaToken
      }, {
        headers: {
          'Authorization': `Bearer ${user.token}`, // Add the Bearer token
          'Content-Type': 'application/json' 
        },
        withCredentials: true
      });
      if (!data.success) {
        alert("captcha verification failed")
      }
      const clientSecret = data.clientSecret;
      // Confirm the payment on the frontend using the clientSecret
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            email: email,
          },
        },
      });
      SaveNewTransaction({
        user: user._id,
        name: user.name,
        email: user.email,
        amount: amount,
        remarks: Remark,
        transactionId: result.paymentIntent.id,
        status: result.paymentIntent.status,
        paymentMethod: 'card',
        currency: 'usd'
      })
      if (result.error) {
        console.error(result.error.message);

        navigate('/payment/failed');
      } else {
        if (result.paymentIntent.status === 'succeeded') {

          navigate('/payment/success')
        }
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      navigate('/payment/failed');
    } finally {
      setPaymentProcessing(false);
    }
  };
  const HandleCaptchaChange = (token) => {
    setCaptchaToken(token)
    console.log(token);
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Complete Your Payment</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Amount (in USD)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>


          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Card Details</label>
            <CardElement className="w-full p-3 border border-gray-300 rounded-lg" />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Remark</label>
            <input
              type="text"
              value={Remark}
              onChange={(e) => setRemark(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <ReCAPTCHA sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY} onChange={HandleCaptchaChange}></ReCAPTCHA>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg"
            disabled={paymentProcessing || !CaptchaToken}
          >
            {paymentProcessing ? 'Processing...' : 'Pay Now'}
          </button>
        </form>
      </div>
    </div>
  );
};

// Wrap your Payment component with Stripe's Elements component
const PaymentWrapper = () => (
  <Elements stripe={stripePromise}>
    <Payment />
  </Elements>
);

export default PaymentWrapper;
