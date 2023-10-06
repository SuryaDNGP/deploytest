import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet } from 'react-native';
import {
  Text,
  Box,
  Input,
  InputField,
  Button,
  View,
  ButtonText,
} from '@gluestack-ui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { AuthContext } from '../../components/context/AuthContext';
import SwipeCarousel from '../../screens/DashboardScreens/SwipeCarousel';

export default function TabOneScreen() {
  const { signOutAction } = useContext(AuthContext);

  return (
    <SafeAreaView>
      <View style={{ width: 600, height: 600 }}>
        <SwipeCarousel />
      </View>
    </SafeAreaView>
  );
}
