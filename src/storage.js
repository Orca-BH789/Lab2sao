
import AsyncStorage from '@react-native-async-storage/async-storage';
const handleLogout = () => {
  signOut(auth)
    .then(() => {
      clearUserFromLocalStorage(); 
      history.push('/login');
      alert('Đăng xuất thành công!');
    })
    .catch((error) => {
      console.error('Lỗi đăng xuất:', error);
    });
};

export const saveUserToLocalStorage = async (user) => {
  try {
    await AsyncStorage.setItem('user', JSON.stringify(user));
  } catch (error) {
    console.error('Error saving user to storage', error);
  }
};

export const getUserFromLocalStorage = async () => {
  try {
    const user = await AsyncStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error fetching user from storage', error);
  }
};

export const clearUserFromLocalStorage = async () => {
  try {
    await AsyncStorage.removeItem('user');
  } catch (error) {
    console.error('Error clearing user from storage', error);
  }
};