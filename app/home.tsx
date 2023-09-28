import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet } from 'react-native';
import {
  Text,
  Box,
  Input,
  InputField,
  Button,
  ButtonText,
} from '@gluestack-ui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';

import { AuthContext } from '../components/context/AuthContext';

export default function TabOneScreen() {
  const { signOutAction } = useContext(AuthContext);

  return (
    <SafeAreaView>
      <Text>Home Page</Text>
      <Button
        onPress={() => {
          signOutAction();
        }}
      >
        <ButtonText>LOGOUT</ButtonText>
      </Button>
    </SafeAreaView>
  );
}
