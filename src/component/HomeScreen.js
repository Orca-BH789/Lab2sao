import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { auth } from '../firebase';
import { View, Text, Button, StyleSheet } from 'react-native';
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native'; 

const HomeScreen = () => {
  const { currentUser } = useContext(AuthContext);
  const navigation = useNavigation(); 

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert('Đăng xuất thành công!');
      navigation.navigate('Login'); 
    } catch (error) {
      console.error('Lỗi đăng xuất:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>
        Chào mừng, {currentUser ? currentUser.email : "Khách"}
      </Text>
      <Button 
        title="Đăng xuất" 
        onPress={handleLogout} 
        color="#FF6347" // Màu đỏ cà chua cho nút
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5', // Màu nền sáng
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333', // Màu chữ tối
  },
});


export default HomeScreen;
