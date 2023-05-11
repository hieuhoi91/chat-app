import React from 'react';
import './App.css';
import Login from './components/Login';
import ChatRoom from './components/ChatRoom';
import AuthProvider from './components/Context/AuthProvider';
import { Route, Routes } from 'react-router-dom';
import AppProvider from './components/Context/AppProvider';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <AppProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ChatRoom />} />
          </Routes>
        </AppProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
