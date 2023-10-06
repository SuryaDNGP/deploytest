import React, { useRef, useState, useEffect } from 'react';
// import InteractiveChart from './charts';
import InteractiveChart from './AlternateChart';
import { COLORS } from '../../constants';
import { Dimensions } from 'react-native';
import Swiper from 'react-native-web-swiper';
import { Platform } from 'react-native';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import { CarouselGesture } from '../../utils/helpers';
import { Box } from '@gluestack-ui/themed';
import { ProgressCircle } from 'react-native-svg-charts';
import { Text, View } from '@gluestack-ui/themed';
import Animated, {
  useSharedValue,
  withSequence,
  withTiming,
  Easing,
  Keyframe,
} from 'react-native-reanimated';

const data = [
  { chartColor: COLORS.chartLinePink, bgColor: '#b91e7a66' },
  { chartColor: COLORS.chartLineBlue, bgColor: '#0C66B166' },
  { chartColor: COLORS.chartLinePurple, bgColor: '#9368FB66' },
  { chartColor: COLORS.chartLineRed, bgColor: '#F44C4566' },
];
// const DeviceWidth = Dimensions.get('window').width;
const AnimatedSwiper = Animated.createAnimatedComponent(View);

const SwipeCarousel = () => {
  const swiperRef = useRef(null);
  const opacity = useSharedValue(0);
  const handleScroll = () => {
    opacity.value = withSequence(
      withTiming(0),
      withTiming(1, {
        duration: 2000,
        easing: Easing.out(Easing.cubic),
      })
    );
  };
  const handleEnd = () => {
    opacity.value = withTiming(1);
  };

  return (
    <View style={{ flex: 1 }}>
      <Swiper
        springConfig={{ bounciness: 0 }}
        gesturesEnabled={CarouselGesture}
        from={0}
        minDistanceForAction={0.1}
        controlsProps={{
          prevPos: false,
          nextPos: false,
          dotsTouchable: true,
          dotsPos: 'bottom',
          dotActiveStyle: { backgroundColor: COLORS.grey },
        }}
      >
        {data.map((item, index) => (
          <Animated.View onLayout={handleScroll} style={{ opacity: opacity }}>
            <Box flexDirection="row" ml={20} mt={20}>
              <Box position="relative">
                <ProgressCircle
                  style={{ height: 100, width: 100 }}
                  progress={0.8}
                  progressColor={item.chartColor}
                  backgroundColor={item.bgColor}
                />
                <Box position="absolute" left={32} top={30}>
                  <Text fontWeight="$bold">24&deg;C</Text>
                  <Text fontSize="$sm" color="#B7B7B7">
                    Temp
                  </Text>
                </Box>
              </Box>
              <Box ml={30} mt={20}>
                <Text>30% Lower Today</Text>
                <Text fontSize="$sm" color="#B7B7B7">
                  Updated 10mins ago
                </Text>
              </Box>
            </Box>
            <InteractiveChart chartColor={item.chartColor} />
          </Animated.View>
        ))}
      </Swiper>
    </View>
  );
};

export default SwipeCarousel;

const fadeIn = new Keyframe({
  0: {
    opacity: 0,
  },
  100: {
    opacity: 1,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    fontSize: 44,
  },
  wrapper: {},
  slide: {},
  slide1: {},
  slide2: {},
  slide3: {},
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  img: {
    width: 310,
    height: 350,
  },
});
