import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet } from 'react-native';
import {
  Text,
  Box,
  Input,
  InputField,
  Button,
  ButtonText,
  ButtonIcon,
  Avatar,
  AvatarFallbackText,
  VStack,
  HStack,
  Badge,
  BadgeText,
  EditIcon,
  AddIcon,
} from '@gluestack-ui/themed';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { AuthContext } from '../../components/context/AuthContext';
import { COLORS } from '../../constants';
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import DeviceDetailShared from '../../components/shared/DeviceDetailShared';
import InteractiveChart from './charts';
import ChartCarousel from './Carousel';
import SwipeCarousel from './SwipeCarousel';
import { useRouter } from 'expo-router';
export default function DashboardScreen() {
  const router = useRouter();
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
      <ScrollView>
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
                  bg={
                    item === buttonType ? COLORS.purple : COLORS.secondaryBlack
                  }
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
          <LinearGradient
            style={{
              borderRadius: 6,
              marginBottom: 10,
              marginTop: 12,
              marginHorizontal: 8,
            }}
            colors={['#F2F2F21A', '#BEB5B51A']}
          >
            <Box>
              <HStack
                marginTop={22}
                marginHorizontal={8}
                justifyContent="space-between"
              >
                <Text fontSize={20} fontWeight="bold">
                  Activity
                </Text>
                <Text color={COLORS.green}>Show more</Text>
              </HStack>
              {/* <SwipeCarousel /> */}
              <ChartCarousel />
            </Box>
          </LinearGradient>
          {/* ---- Sensors ---- */}
          <HStack
            marginHorizontal={16}
            marginTop={8}
            marginBottom={12}
            justifyContent="space-between"
          >
            <Text fontSize={20}>Sensors</Text>
            <Text color={COLORS.green}>Show more</Text>
          </HStack>
          <FlatList
            style={{ marginTop: 12 }}
            data={deviceList}
            renderItem={({ item }) => (
              <DeviceDetailShared device={item} title="S102" status="active" />
            )}
          />
        </Box>
        <Box alignItems="center" marginBottom={16} marginTop={8}>
          <LinearGradient
            style={{
              borderRadius: 10,
              width: 200,
              paddingVertical: 4,
            }}
            colors={['#F2F2F21A', '#BEB5B51A']}
          >
            <Button variant="outline" borderWidth={0}>
              <ButtonIcon color="white" as={AddIcon} mr="$2" />
              <ButtonText color="white">Add new device</ButtonText>
            </Button>
          </LinearGradient>
        </Box>
        <Text>Home Page</Text>
        <Button
          onPress={() => {
            router.push('/new');
          }}
        >
          <ButtonText>LOGOUT</ButtonText>
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}
