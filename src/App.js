import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/Login/LoginPage';
import LocalSignUpPage from './components/Login/LocalSignUpPage';
import SocialSignUpPage from './components/Login/SocialSignUpPage';

import LoginSuccessPage from './components/Login/LoginSuccessPage'; // ✅ 추가
import MainMap from './components/Point/MainMap';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/local-signup" element={<LocalSignUpPage />} />
        <Route path="/social-signup" element={<SocialSignUpPage />} />
        <Route path="/login-success" element={<LoginSuccessPage />} /> {/* ✅ 추가 */}
        <Route path="/oauth/loginInfo" element={<LoginPage />} />
        <Route path="/point-map" element={<MainMap />} />
      </Routes>
    </Router>
  );
}

export default App;
