import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import { onIdTokenChanged, signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loginTime, setLoginTime] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation(); 

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, (user) => {
      if (!user) {
        setCurrentUser(null);
        setLoginTime(null); 
        navigation.navigate('Login');
      } else {
        setCurrentUser(user);
        setLoginTime(Date.now()); 
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigation]);

  useEffect(() => {

    const checkTokenExpiration = setInterval(() => {
      if (currentUser && loginTime) {
        const currentTime = Date.now();
        const timeElapsed = currentTime - loginTime;
        const OneMin = 1 * 60 * 1000; 

        if (timeElapsed > OneMin) {
          alert('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
          signOut(auth); 
          navigation.navigate('Login');
        }
      }
    }, 1000); 

    return () => clearInterval(checkTokenExpiration);
  }, [currentUser, loginTime, navigation]);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
