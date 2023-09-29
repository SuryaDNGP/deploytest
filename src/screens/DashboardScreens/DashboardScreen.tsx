import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet } from 'react-native';
import {
  Text,
  Box,
  Input,
  InputField,
  Button,
  ButtonText,
  Avatar,
  AvatarFallbackText,
  VStack,
  HStack,
  Badge,
  BadgeText,
} from '@gluestack-ui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { AuthContext } from '../../components/context/AuthContext';
import { COLORS } from '../../constants';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import DeviceDetailShared from '../../components/shared/DeviceDetailShared';
export default function DashboardScreen() {
  const { signOutAction } = useContext(AuthContext);
  const [buttonType, setButtonType] = useState('Production Floor');
  const deviceList = [
    {
      status: 'active',
      title: 'S102',
      data: {
        temp: '24',
        pressure: '1004',
        humidity: '74',
        light: '74',
      },
    },
    {
      status: 'inactive',
      title: 'S103',
      data: {},
    },
    {
      status: 'active',
      title: 'S104',
      data: {
        temp: '24',
        pressure: '1004',
        humidity: '72',
        light: '720',
      },
    },
  ];

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.background, flex: 1 }}>
      <Stack.Screen options={{ headerShown: false }} />

      <Box>
        {/* ----Header Profile---- */}
        <HStack margin={20} justifyContent="space-between">
          <VStack>
            <Text>HammerSmith</Text>
            <Text fontSize={12} color={COLORS.grey}>
              Tap to change your site
            </Text>
          </VStack>
          <Avatar bgColor="$amber600" size="md" borderRadius="$md">
            <AvatarFallbackText>Surya D</AvatarFallbackText>
          </Avatar>
        </HStack>
        {/* ---- Badges ---- */}
        <HStack>
          <FlatList
            horizontal
            data={['Production Floor', 'Warehouse', 'Boiler Room']}
            renderItem={({ item }) => (
              <Button
                marginRight={12}
                variant="solid"
                bg={item === buttonType ? COLORS.purple : COLORS.secondaryBlack}
                borderRadius="$full"
                paddingVertical={6}
                paddingHorizontal={44}
                onPress={(e) => {
                  setButtonType(item);
                }}
              >
                <ButtonText marginTop={2}>{item}</ButtonText>
              </Button>
            )}
          />
        </HStack>

        {/* ---- Sensors ---- */}
        <HStack marginHorizontal={16} justifyContent="space-between">
          <Text fontSize={20}>Sensors</Text>
          <Text color={COLORS.green}>Show more</Text>
        </HStack>
        <FlatList
          data={deviceList}
          renderItem={({ item }) => (
            <DeviceDetailShared device={item} title="S102" status="active" />
          )}
        />
      </Box>

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
