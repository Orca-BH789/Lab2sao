import React from 'react';
import { AuthProvider } from '@/src/component/AuthContext';
import Routes from '@/src/Route';

function App() {
  return (
    <AuthProvider>    
        <Routes /> 
    </AuthProvider>
  );
}

export default App;
