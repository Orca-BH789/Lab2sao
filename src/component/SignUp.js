import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, Button, Alert,  TouchableOpacity } from 'react-native'; 

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigation = useNavigation();

  const handleSignUp = async () => {    
    setLoading(true);
    setError('');
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Alert("Đăng ký thành công!");
      navigation.navigate('Login');
    } catch (err) {
      if (err.name === 'AbortError') {      
        setError('Yêu cầu đã bị hủy do thời gian quá lâu.');
    // }if (!navigator.onLine) {
    //     setError('Mất kết nối mạng. Vui lòng thử lại.');    
    }else {
        setError('Vui lòng thử lại.#'+err.message);
    } 
      
    } finally {
      setLoading(false);
      console.log(error)
    }
  };
 

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f9f9f9' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Đăng Ký</Text>
      {/* {error && <Text style={{ color: 'red' }}>{error}</Text>} */}
      <TextInput 
        value={email} 
        onChangeText={setEmail} 
        placeholder="Email" 
        keyboardType="email-address"
        autoCapitalize="none"
        style={{
          marginBottom: 10,
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 5,
          padding: 10,
          backgroundColor: '#fff',
        }}
      />
      <View style={{ marginBottom: 20 }}>
        <TextInput 
          value={password} 
          onChangeText={setPassword} 
          placeholder="Mật khẩu" 
          secureTextEntry={!isPasswordVisible} // Toggle visibility
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 5,
            padding: 10,
            backgroundColor: '#fff',
          }}
        />
        <TouchableOpacity 
          onPress={() => setIsPasswordVisible(!isPasswordVisible)} 
          style={{ position: 'absolute', right: 10, top: 15 }}>
          <Text style={{ color: '#007BFF' }}>
            {isPasswordVisible ? 'Ẩn' : 'Hiện'}
          </Text>
        </TouchableOpacity>
      </View>
      <Button 
        title={loading ? 'Đang đăng ký...' : 'Đăng Ký'} 
        onPress={handleSignUp} 
        disabled={loading} 
        color="#007BFF"
      />
      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{ marginTop: 10 }}>
        <Text style={{ color: '#007BFF', textAlign: 'center' }}>Đã có tài khoản? Đăng nhập</Text>
      </TouchableOpacity>
    </View>
  );
  
};

export default SignUp;
