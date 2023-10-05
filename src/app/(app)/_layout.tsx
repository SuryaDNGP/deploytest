import { Stack } from 'expo-router';

import React from 'react';
import { Drawer } from 'expo-router/drawer';

const ScreensLayout = () => {
  return (
    <Drawer initialRouteName='dashboard'  >
      <Drawer.Screen name="dashboard" options={{ headerShown: false }} />
    </Drawer>
  );
};

export default ScreensLayout;
