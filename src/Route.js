import React, { useEffect, useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from './component/SignUp';
import Login from './component/Login';
import HomeScreen from './component/HomeScreen';
import { AuthContext } from './component/AuthContext';
import { getUserFromLocalStorage } from './storage';
import { Header } from 'react-native/Libraries/NewAppScreen';

const Stack = createNativeStackNavigator();

const Routes = () => {
  const { setCurrentUser } = useContext(AuthContext);

  useEffect(() => {
    const user = getUserFromLocalStorage();
    if (user) {
      setCurrentUser(user);
    }
  }, [setCurrentUser]);

  return (    
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={HomeScreen} />
</Stack.Navigator>

  );
};

export default Routes;
