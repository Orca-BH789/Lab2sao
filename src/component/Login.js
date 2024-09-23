import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { saveUserToLocalStorage } from '../storage';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    client_id:"290426710054-ugkrk8aq76gu71so1d35uf6hf7qce8vn.apps.googleusercontent.com",
    redirectUri: 'http://localhost:8081'
  });

  const handleLogin = async () => {
    setLoading(true);
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      saveUserToLocalStorage(user);
      // Alert.alert("Đăng nhập thành công!");
      navigation.navigate('Home');
    } catch (err) {
      handleAuthError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAuthError = (err) => {
    switch (err.code) {
      case 'auth/user-not-found':
        setError('Không tìm thấy người dùng.');
        break;
      case 'auth/wrong-password':
        setError('Mật khẩu không đúng.');
        break;
      default:
        setError('Đã xảy ra lỗi. Vui lòng thử lại. ' + err.message);
    }
    // if (err.name === 'AbortError') {     
//   setError('Yêu cầu đã bị hủy do thời gian quá lâu.');
// }if (!navigator.onLine) {
//   setError('Mất kết nối mạng. Vui lòng thử lại.');    
// }else if (err.code === 'auth/user-not-found') {
//   setError('Không tìm thấy người dùng.');
// } else if (err.code === 'auth/wrong-password') {
//   setError('Mật khẩu không đúng.');
// } else {
//   setError('Đã xảy ra lỗi. Vui lòng thử lại.#'+err.message);
// }
  };

  const handleGoogleLogin = async () => {
    const result = await promptAsync();
    
    if (result?.type === 'success') {
      const { id_token } = result.params;
      const credential = GoogleAuthProvider.credential(id_token);
      const userCredential = await signInWithCredential(auth, credential);
      const user = userCredential.user;
      saveUserToLocalStorage(user);
      Alert.alert("Đăng nhập bằng Google thành công!");
      navigation.navigate('Home');
    } else {
      setError('Lỗi đăng nhập với Google');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng Nhập</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      
      <TextInput 
        value={email} 
        onChangeText={setEmail} 
        placeholder="Email" 
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />
      
      <TextInput 
        value={password} 
        onChangeText={setPassword} 
        placeholder="Mật khẩu" 
        secureTextEntry
        style={styles.input}
      />
      
      <TouchableOpacity 
        onPress={handleLogin} 
        style={[styles.button, loading && styles.disabledButton]}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? 'Đang đăng nhập...' : 'Đăng Nhập'}</Text>
      </TouchableOpacity>
      <Text style={styles.and}>AND</Text>
      <TouchableOpacity onPress={handleGoogleLogin} style={styles.googleButton}>
        <Text style={styles.googleText}>Đăng nhập bằng Google</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={styles.signupButton}>
        <Text style={styles.signupText}>Chưa có tài khoản? Đăng ký</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#007BFF',
    textAlign: 'center',
  },
  and: {
    color: 'gray',
    marginBottom: 10,
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 15,
 
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#007BFF80',
  },
  googleButton: {
    backgroundColor: '#4285F4',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  googleText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupButton: {
    alignItems: 'center',
  },
  signupText: {
    color: '#007BFF',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Login;
