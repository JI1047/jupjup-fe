import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Test from "./Pages/Test";
import Start from "./Pages/Start";
import Main from "./Pages/Main";



function App() {
  return (
    <div className="App">
      <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Test />} />
                    <Route path="/Start" element={<Start />} />
                    <Route path="/Main" element={<Main />} />

                </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
