import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home.js';
import Login from './Components/Login.js';
import Signup from './Components/Signup.js';
import Ngo from './Components/Ngo.js';
import Places from './Components/Places.js';
import Profile from './Components/Profile.js';
import Acceptedplaces from './Components/Acceptedplaces.js';
import Myplaces from './Components/Myplaces.js';

function App() {
  return (
    <div >
      <BrowserRouter>

        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/ngo" element={<Ngo />} />
          <Route path="/places" element={<Places />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/acceptedplaces" element={<Acceptedplaces />} />
          <Route path="/myplaces" element={<Myplaces />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
