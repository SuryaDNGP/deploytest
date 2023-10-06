import { Box, Text, Avatar, AvatarFallbackText } from '@gluestack-ui/themed';
import { Stack } from 'expo-router';
import { Drawer } from 'expo-router/drawer';

import React, { useContext } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../../components/context/AuthContext';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';

const CustomDrawer = (props: any) => {
  const { signOutAction } = useContext(AuthContext);
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        labelStyle={{ color: 'white' }}
        label="Logout"
        onPress={() => {
          signOutAction();
        }}
      />
    </DrawerContentScrollView>
  );
};

export function FallBack(props: any) {
  return (
    <View>
      <Text>Hello</Text>
      <Text>{props.error.toString()}</Text>
    </View>
  );
}

const ScreensLayout = () => {
  return (
    
      <Drawer
        initialRouteName="dashboard"
        screenOptions={({ navigation }) => ({
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: '#000',
            height: 100,
          },
          drawerStyle: {
            backgroundColor: '#000',
          },
          drawerLabelStyle: {
            color: '#fff',
          },
          drawerActiveBackgroundColor: '#98989837',
          headerTitle: '',
          drawerPosition: 'right',
          headerLeft: () => (
            <Box ml={20}>
              <Text
                sx={{
                  color: '#fff',
                }}
                size="md"
              >
                Hammersmith
              </Text>
              <Text
                sx={{
                  color: '#B7B7B7',
                }}
                size="sm"
              >
                Tap to change your site
              </Text>
            </Box>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={navigation.toggleDrawer}>
              <Avatar mr={20} bgColor="$amber600" size="md" borderRadius="$md">
                <AvatarFallbackText>Surya D</AvatarFallbackText>
              </Avatar>
            </TouchableOpacity>
          ),
        })}
        drawerContent={(props) => <CustomDrawer {...props} />}
      >
        <Drawer.Screen
          name="dashboard"
          options={{ drawerLabel: 'Dashboard' }}
        />
        <Drawer.Screen name="home" />
      </Drawer>
   
  );
};

export default ScreensLayout;
