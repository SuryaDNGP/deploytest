import { useUserLoginMutation } from '../services/authAPI';
import { useRouter } from 'expo-router';
const AuthAPIThunks = () => {
  const [userLogin, { isLoading, isError, isSuccess }] = useUserLoginMutation();
  

  const loginUser: any = async (formData: any) => {
    console.log('FormData', formData);
    try {
      const res = await userLogin(formData).unwrap();

      console.log('login success', res);
    } catch (error) {
      console.log('Login Failed', error);
    }
  };

  return { loginUser, isLoading, isError };
};

export default AuthAPIThunks;
