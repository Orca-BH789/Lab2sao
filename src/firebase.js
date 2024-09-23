import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCC_sz_JMFN63QNdTfk49vlzxwTB4ZhotE",
  authDomain: "labauthapp.firebaseapp.com",
  databaseURL: "https://labauthapp-default-rtdb.firebaseio.com",
  projectId: "labauthapp",
  storageBucket: "labauthapp.appspot.com",
  messagingSenderId: "336754767108",
  appId: "1:336754767108:web:4fd0adc6faa03001e9cc51",
  measurementId: "G-DDVD85HVZQ"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage), 
});

export const database = getDatabase(app);
