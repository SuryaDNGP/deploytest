import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import {
  Text,
  Box,
  Input,
  InputField,
  Button,
  ButtonText,
  Image,
  HStack,
  VStack,
} from '@gluestack-ui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthContext } from '../../src/components/context/AuthContext';
import { Spinner } from '@gluestack-ui/themed';

import AuthAPIThunks from '../../src/store/thunks/authAPIThunks';

export default function TabOneScreen() {
  const { loginUserAction, isLogin, signUpAction, signInAction, isLoggedIn } =
    useContext(AuthContext);

  const { loginUser, isLoading } = AuthAPIThunks();

  const {
    control,
    handleSubmit,
    reset,
    formState,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ email: '', password: '' });
    }
  }, [formState, reset]);

  const handleSignIn = (data: any) => {
    // loginUserAction(data)
    // loginUser(data);
    signInAction(data).then(() => {
      isLoggedIn();
    });
  };

  const handleSignUp = (data: any) => {
    signUpAction(data);
  };
  return (
    <SafeAreaView
      style={{
        backgroundColor: '#000',
        flex: 1,
        justifyContent: 'center',
        height: '100%',
      }}
    >
      {isLoading && <Spinner size="large" />}

      <Box height="$full" margin={24} justifyContent="space-between">
        <Box marginTop={130}>
          <HStack style={{ justifyContent: 'center', marginBottom: 50 }}>
            <Image
              height={100}
              resizeMode="contain"
              source={require('../../src/assets/images/clearvueimg.png')}
              alt="logo"
            />
          </HStack>
          <VStack style={{ gap: 20 }}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <LinearGradient
                  style={{ borderRadius: 6 }}
                  colors={['#F2F2F21A', '#BEB5B51A']}
                >
                  <Input
                    style={{ borderColor: 'transparent' }}
                    height={48}
                    variant="outline"
                    size="md"
                    isDisabled={false}
                    isInvalid={false}
                    isReadOnly={false}
                  >
                    <InputField
                      fontSize={14}
                      color="#A5ADBE"
                      onChangeText={onChange}
                      value={value}
                      onBlur={onBlur}
                      placeholder="Email"
                    />
                  </Input>
                </LinearGradient>
              )}
              name="email"
            />
            {errors.email && <Text>This is required.</Text>}
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <LinearGradient
                  style={{ borderRadius: 6 }}
                  colors={['#F2F2F21A', '#BEB5B51A']}
                >
                  <Input
                    style={{ borderColor: 'transparent' }}
                    variant="outline"
                    size="md"
                    height={48}
                    isDisabled={false}
                    isInvalid={false}
                    isReadOnly={false}
                  >
                    <InputField
                      fontSize={14}
                      color="#A5ADBE"
                      onChangeText={onChange}
                      value={value}
                      onBlur={onBlur}
                      placeholder="Password"
                    />
                  </Input>
                </LinearGradient>
              )}
              name="password"
            />
            {errors.password && <Text>This is required.</Text>}
            <LinearGradient
              style={{ borderRadius: 6, marginTop: 20 }}
              colors={['#0C67B2', '#195688']}
            >
              <Button
                height={48}
                variant="outline"
                style={{ borderColor: 'transparent' }}
                onPress={handleSubmit(handleSignIn)}
              >
                <ButtonText style={{ color: 'white' }}>LOGIN </ButtonText>
              </Button>
            </LinearGradient>
            <LinearGradient
              style={{ borderRadius: 6, marginTop: 4 }}
              colors={['#0C67B2', '#195688']}
            >
              <Button
                height={48}
                variant="outline"
                style={{ borderColor: 'transparent' }}
                onPress={handleSubmit(handleSignUp)}
              >
                <ButtonText style={{ color: 'white' }}>SIGN UP </ButtonText>
              </Button>
            </LinearGradient>
          </VStack>
        </Box>
        <Box alignItems="center" marginBottom={100}>
          <Text fontSize={12}>Powered by</Text>
          <Text fontSize={12}>Global Procurement Group</Text>
        </Box>
      </Box>
    </SafeAreaView>
  );
}
