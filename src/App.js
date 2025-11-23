import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Start from "./Pages/Start";
import Main from "./Pages/Main/Main";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import SignupSuccess from "./Pages/SignupSuccess";
import LoginVal from "./Pages/LoginVal";
import SocialSignUp from "./Pages/SocialSignUp";
import MyPage from "./Pages/MyPage";
import CalPage from './Pages/Main/calculate/calPage.jsx';
import MypageInfo from "./Components/MyPage/MypageInfo";
import Pointhistory from "./Components/MyPage/MypagePointHistory";
import ExchangeHistory from "./Components/MyPage/ExchangeHistory";
import ExchangeRequest from "./Pages/ExchangeRequest";
import AuthCodePage from "./Pages/Main/auth.jsx";
import Introduse from "./Components/Start/introduse";
import IntroduseSE from "./Components/Start/introduseSE";
import IntroduseTH from "./Components/Start/introduseTH";
import IntroduseFO from "./Components/Start/introduseFO";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Start />} />
                    <Route path="/Start" element={<Start />} />
                    <Route path="Introduse" element={<Introduse />} />
                    <Route path="IntroduseSE" element={<IntroduseSE />} />
                    <Route path="IntroduseTH" element={<IntroduseTH />} />
                    <Route path="IntroduseFO" element={<IntroduseFO />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/Signup" element={<Signup />} />
                    <Route path="/LoginVal" element={<LoginVal />} />
                    <Route path="/Signup/SocialSignUp" element={<SocialSignUp />} />
                    <Route path="/signup-success" element={<SignupSuccess />} />
                    <Route path="/MyPage" element={<MyPage />} />
                    {/* <Route path="/MyPage" element={<MypageInformation />} /> */}
                    <Route path="/calPage" element={<CalPage />} />
                    <Route path="/MyPage/Info" element={<MypageInfo />} />
                    <Route path="/MyPage/Poinhistory" element={<Pointhistory />} />
                    <Route path="/MyPage/ExchangeHistory" element={<ExchangeHistory />} />
                    <Route path="/MyPage/ExchangeRequest" element={<ExchangeRequest />} />
                    
                    <Route path="/Main" element={<Main />} />
                    <Route path="/auth" element={<AuthCodePage />} />
                </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
