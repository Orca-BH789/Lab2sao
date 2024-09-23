import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const handleLogout = () => {
  signOut(auth).then(() => {
    alert('Đăng xuất thành công!');
  }).catch((error) => {
    console.error('Lỗi đăng xuất:', error);
  });
};
