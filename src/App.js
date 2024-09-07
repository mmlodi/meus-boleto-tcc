import './App.css';
import AppRouter from './Routes';
import Header from './components/Header';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import { AuthProvider } from './context/AuthContext';
import { useEffect, useState } from 'react';

function App() {

  return (
    <AuthProvider>
        <Header>
          <AppRouter />
        </Header>
    </AuthProvider>
  );
}

export default App;
