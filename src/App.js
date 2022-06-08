import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { TopBar } from './components/Topbar';

// Screens
import Home from './screens/Home/Home';
import EmployeeForm from './screens/Employee/EmployeeForm';

// ----------------------------------------------------------------------


function App() {
  return (
    <BrowserRouter>
      <TopBar />
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/employee/add' element={<EmployeeForm />} />
        <Route path="/" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
