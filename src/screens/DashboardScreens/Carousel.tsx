import React, { useRef, useState } from 'react';
import InteractiveChart from './charts';

import { View } from '@gluestack-ui/themed';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { COLORS } from '../../constants';
import { Dimensions } from 'react-native';

const Item = ({ item }: any) => {
  return <InteractiveChart chartColor={item.chartColor} />;
};

const data = [
  { chartColor: COLORS.chartLinePink },
  { chartColor: COLORS.chartLineBlue },
  { chartColor: COLORS.chartLinePurple },
  { chartColor: COLORS.chartLineRed },
];
const ChartCarousel = () => {
  const isCarousel = useRef(null);
  const width = Dimensions.get("window").width
  const [index, setIndex] = useState(0);
  return (
    <>
      <View>
        <Carousel
          onSnapToItem={(index) => setIndex(index)}
          layout="default"
          ref={isCarousel}
          data={data}
          renderItem={Item}
          sliderWidth={width}
          itemWidth={width}
          inactiveSlideShift={0}
          useScrollView={true}
        
        />
        <Pagination
          carouselRef={isCarousel}
          dotsLength={data.length}
          activeDotIndex={index}
          dotStyle={{
            width: 10,
            height: 10,
            padding: 4,
            borderRadius: 100,
            marginHorizontal: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          tappableDots={true}
        />
      </View>
    </>
  );
};

export default ChartCarousel;
