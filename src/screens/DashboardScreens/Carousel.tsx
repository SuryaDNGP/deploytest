import React, { useRef, useState } from 'react';
import InteractiveChart from './charts';

import { Box, View, Text } from '@gluestack-ui/themed';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { COLORS } from '../../constants';
import { ProgressCircle } from 'react-native-svg-charts';
import { Dimensions } from 'react-native';

const Item = ({ item }: any) => {
  return (
    <>
      <Box flexDirection="row" mt={20}>
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
    </>
  );
};

const data = [
  { chartColor: COLORS.chartLinePink, bgColor: '#b91e7a66' },
  { chartColor: COLORS.chartLineBlue, bgColor: '#0C66B166' },
  { chartColor: COLORS.chartLinePurple, bgColor: '#9368FB66' },
  { chartColor: COLORS.chartLineRed, bgColor: '#F44C4566' },
];
const ChartCarousel = () => {
  const isCarousel = useRef(null);
  const width = Dimensions.get('window').width;
  const [index, setIndex] = useState(0);
  return (
    <>
      <View>
        <Carousel
          containerCustomStyle={{ width: 400 }}
          layout="default"
          ref={isCarousel}
          data={data}
          renderItem={Item}
          sliderWidth={width}
          itemWidth={width}
          inactiveSlideShift={0}
          useScrollView={true}
          onSnapToItem={(index) => setIndex(index)}
        />
      </View>
    </>
  );
};

export default ChartCarousel;
