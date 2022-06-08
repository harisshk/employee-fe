import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import DashboardLayout from './Layout/DashboardLayout';
import Home from './screens/Home';
// Screens

// ----------------------------------------------------------------------


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route path='/home' element={<Home />} />
        </Route>
        <Route path="/" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
