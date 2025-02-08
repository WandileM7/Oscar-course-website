import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Welcome } from './pages/Welcome';
import ClassAcademy from './components/ClassAcademy';
import { useAuth } from './contexts/AuthContext';

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route 
        path="/" 
        element={user ? <Navigate to="/dashboard" /> : <Welcome />} 
      />
      <Route 
        path="/dashboard" 
        element={user ? <ClassAcademy /> : <Navigate to="/" />} 
      />
    </Routes>
  );
}

export default App;