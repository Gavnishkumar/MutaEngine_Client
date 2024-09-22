import logo from './logo.svg';
import './App.css';
import Login from './component/Login';
import Signup from './component/SignUp';
import Dashboard from './component/Dashboard';
import { BrowserRouter as Router, Switch, Route, Routes, useNavigate } from 'react-router-dom';
import { UserState } from './Context/createContext';
import { useEffect } from 'react';
import Navigation from './component/Navigation';
import axios from 'axios';
import PaymentWrapper from './component/Payment';
import PaymentSuccess from './component/Status/paymentSuccess';
import PaymentFailed from './component/Status/paymentFailed';
// import PdfView from './component/Invoice/PdfView';
import Invoice from './component/Invoice/Invoice';
function App() {
  const navigate = useNavigate();
  const { user, setUser } = UserState();
  const URI= process.env.REACT_APP_SERVER_URI;
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const fetchGoogleInfo = async () => {
      try {
        const googleInfo = await axios.get(`${URI}/user`, { withCredentials: true })
        localStorage.setItem('userInfo', JSON.stringify(googleInfo.data));
        setUser(googleInfo.data);
        navigate('/');
      } catch (error) {
        console.log(error);
      }
    }
    fetchGoogleInfo();
    console.log("root", userInfo);
    if (userInfo) {
      setUser(userInfo);
    }

  }, [])
  const onLogout = () => {

    const handleLogout = () => {
      window.open(`${URI}/logout`, '_self');
    };
    setUser(null);
    localStorage.removeItem('userInfo');

    handleLogout();



  }
  return (
    <div className="App">
      <Navigation onLogout={onLogout} />
      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/payment" element={<PaymentWrapper />} />
        <Route path="/payment/failed" element={<PaymentFailed />} />
        <Route path="/payment/success" element={<PaymentSuccess />} />
        <Route path="/" element={<Dashboard onLogout={onLogout} />} />
        <Route path="/invoice/:details" element={<Invoice />} />
      </Routes>

    </div>
  );
}

export default App;
