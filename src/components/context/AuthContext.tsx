import React, { createContext, useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import { err } from 'react-native-svg/lib/typescript/xml';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';


export const AuthContext = createContext({} as any);
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import app from '../../utils/config/firebase';
const INITIAL_STATE = {
  error: null,
  loading: false,
  userAuth: '',
};

const authReducer = (state: any, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        error: null,
        loading: false,
        userAuth: payload,
      };
    case 'REGISTER_FAILED':
      return {
        ...state,
        error: payload,
        loading: false,
        userAuth: null,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        error: null,
        loading: false,
        userAuth: payload,
      };
    case 'LOGIN_FAILED':
      return {
        ...state,
        error: payload,
        loading: false,
        userAuth: null,
      };
  }
};

const AuthContextProvider: React.FC<any> = ({ children }) => {
  const auth = getAuth(app);
  const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);
  const router = useRouter();

  const isLoggedIn = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace('/dashboard');
      }
    });
  };

  /**FIREBASE AUTH */

  const signUpAction = async (formData: any) => {
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      console.log('Registered', res.user);
      dispatch({ type: 'REGISTER_SUCCESS', payload: res.user });
    } catch (error) {
      console.log('reGISTER FAiled', error);
      dispatch({ type: 'REGISTER_FAILED', payload: error });
    }
  };

  const signInAction = async (formData: any) => {
    try {
      const res = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      console.log('Signed In', res.user);
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.user });
    } catch (error) {
      console.log('Sign In Failed', error);
      dispatch({ type: 'LOGIN_FAILED', payload: error });
    }
  };

  const signOutAction = async () => {
    try {
      await signOut(auth);
      router.replace('/(auth)');
    } catch (error) {
      console.log('Signing out error', error);
    }
  };

  const loginUserAction = async (formData: any) => {
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
    };
    console.log('FormData', formData);

    try {
      const res = await axios.post(
        'http://192.168.155.208:3333/api/v1/users/login',
        formData
      );
      if (res.data) {
        console.log('Logged In');
        console.log(res.data);
        AsyncStorage.setItem('userToken', JSON.stringify(res.data));
        router.replace('/home');
        dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
      }
    } catch (error) {
      console.log('Login Error', error);
      dispatch({ type: 'LOGIN_FAILED', payload: error });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loginUserAction,
        signUpAction,
        signInAction,
        userAuth: state,
        isLoggedIn,
        signOutAction,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
