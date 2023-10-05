import React, { useRef, useState } from 'react';
import InteractiveChart from './charts';

import { View } from '@gluestack-ui/themed';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { COLORS } from '../../constants';
import { Dimensions } from 'react-native';
import Swiper from 'react-native-web-swiper';

const Item = ({ item }: any) => {
  return <InteractiveChart chartColor={item.chartColor} />;
};

const data = [
  { chartColor: COLORS.chartLinePink },
  { chartColor: COLORS.chartLineBlue },
  { chartColor: COLORS.chartLinePurple },
  { chartColor: COLORS.chartLineRed },
];

const DeviceWidth = Dimensions.get('window').width;
const SwipeCarousel = () => {
  return (
    <View style={{ flex: 1, width: DeviceWidth, height: 400 }}>
      <Swiper
        from={1}
        minDistanceForAction={0.1}
        springConfig={{ bounciness: 0 }}
        controlsProps={{
          dotsTouchable: true,
        }}
      >
        {data.map((item, index) => (
          <InteractiveChart key={index} chartColor={item.chartColor} />
        ))}
      </Swiper>
    </View>
  );
};

export default SwipeCarousel;
