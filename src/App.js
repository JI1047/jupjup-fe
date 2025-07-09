import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Test from "./Pages/Test";
import Start from "./Pages/Start";
import Main from "./Pages/Main";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import LoginVal from "./Pages/LoginVal";
import SocialSignUp from "./Pages/SocialSignUp";
import MyPage from "./Pages/MyPage";
import MypageInformation from "./Pages/MpInformation";



function App() {
  return (
    <div className="App">
      <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Test />} />
                    <Route path="/Start" element={<Start />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/Signup" element={<Signup />} />
                    <Route path="/LoginVal" element={<LoginVal />} />
                    <Route path="/SocialSignUp" element={<SocialSignUp />} />
                    <Route path="/MyPage" element={<MyPage />} />
                    <Route path="/MyPage" element={<MypageInformation />} />
                    

                    <Route path="/Main" element={<Main />} />



                </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
