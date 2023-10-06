import React, { useEffect, useRef, useState } from 'react';
// import * as React from 'react'
import { PanResponder, Dimensions, View, ScrollView } from 'react-native';
import { AreaChart, XAxis, YAxis } from 'react-native-svg-charts';
import {
  Circle,
  Defs,
  G,
  Line,
  LinearGradient,
  Path,
  Rect,
  Stop,
  Text as SvgText,
} from 'react-native-svg';
import * as shape from 'd3-shape';
import {
  longSampleDateList,
  longSamplePriceList,
} from '../../utils/sampleData';

import { COLORS } from '../../constants';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { CarouselGesture, AdaptSize } from '../../utils/helpers';
import * as Haptics from 'expo-haptics';
import { Vibration, Platform } from 'react-native';
export default InteractiveChart;
let DeviceWidth = Dimensions.get('window').width;

function InteractiveChart({ chartColor }: any) {
  const apx = (size = 0) => {
    let width = Dimensions.get('window').width;
    return Platform.OS === 'web' ? size : (width / 750) * size;
  };

  //stores current scrollview offset
  const [scrollPos, setScrollPos] = useState(0);

  const [dateList, setDateList] = useState(longSampleDateList);
  const [priceList, setPriceList] = useState(longSamplePriceList);

  const size = useRef(dateList.length);

  const [positionX, setPositionX] = useState(10); // The currently selected X coordinate position

  //function to change pointer position
  const updatePosition = (x: any) => {
    const YAxisWidth = apx(0);
    // const x0 = apx(0); // x0 position
    const x0 = apx(0);
    // const chartWidth = apx(globalChartWidth) - YAxisWidth - x0;
    const chartWidth = DeviceWidth - YAxisWidth - x0;
    const xN = x0 + chartWidth; //xN position
    const xDistance = chartWidth / size.current; // The width of each coordinate point
    if (x <= x0) {
      x = x0;
    }
    if (x >= xN) {
      x = xN;
    }
    let value = parseFloat(((x - x0) / xDistance).toFixed(0));
    if (value >= size.current - 1) {
      value = size.current - 1; // Out of chart range, automatic correction
    }

    setPositionX(Number(value));
  };

  const CustomLine = ({ line }: any) => (
    <Path
      key="line"
      d={line}
      stroke={chartColor}
      strokeWidth={apx(1)}
      fill="none"
    />
  );

  const CustomGradient = () => (
    <Defs key="gradient">
      <LinearGradient id="gradient" x1="0" y="1" x2="0" y2="1">
        {/* <Stop offset="0%" stopColor="rgb(134, 65, 244)" /> */}
        {/* <Stop offset="100%" stopColor="rgb(66, 194, 244)" /> */}
        <Stop offset="0" stopColor={chartColor} stopOpacity="0.1" />
        <Stop offset="0.3" stopColor={chartColor} stopOpacity="0" />
      </LinearGradient>
    </Defs>
  );

  const Tooltip = ({ x, y, ticks }: any) => {
    //prevent tooltip from going out of graph
    const date = dateList[positionX];

    return (
      <G x={x(positionX)} key="tooltip">
        <G
          x={positionX > size.current / 2 ? -apx(100 + 100) : apx(10)}
          y={apx(70)}
        >
          {/* calculate left or right position of tooltip*/}
          <SvgText
            x={apx(20)}
            fontFamily="Rubik"
            fontSize={apx(28)}
            fill="white"
          >
            {priceList[positionX]}&deg;C
          </SvgText>
          <SvgText
            x={apx(20)}
            y={apx(24 + 12)}
            fill="white"
            opacity={0.65}
            fontFamily="Rubik"
            fontSize={apx(24)}
          >
            {date}
          </SvgText>
        </G>

        <G x={x}>
          {/*dotted line and point*/}

          <Line
            y1={0}
            y2={570}
            stroke={COLORS.chartLineGrey}
            opacity={0.7}
            strokeWidth={apx(1)}
            strokeDasharray={[6, 3]}
          />

          <Circle
            cy={y(priceList[positionX])}
            r={apx(12)}
            stroke="#fff"
            strokeWidth={apx(0)}
            fill={chartColor}
          />
        </G>
      </G>
    );
  };

  const verticalContentInset = { top: apx(40), bottom: apx(40) };

  const pan = Gesture.Pan()
    .activateAfterLongPress(CarouselGesture() ? 500 : 0)
    .runOnJS(true)
    .onStart((e) => {
      if (Platform.OS === 'android') {
        // Vibration.vibrate();
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      }

      updatePosition(e.x);
      console.log(e.x, e.x, 'Begin');
      return true;
    })
    .onUpdate((e) => {
      updatePosition(e.x);
      return true;
    });

  return (
    <View
      style={{
        backgroundColor: 'transparent',
        alignItems: 'stretch',
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          height: AdaptSize(200),
        }}
      >
        <GestureDetector gesture={pan}>
          <View style={{ flex: 1 }}>
            <AreaChart
              style={{ flex: 1, minWidth: '100%', alignItems: 'stretch' }}
              data={priceList}
              // curve={shape.curveNatural}
              curve={shape.curveMonotoneX}
              contentInset={{ ...verticalContentInset }}
              svg={{ fill: 'url(#gradient)' }}
            >
              <CustomLine />
              <CustomGradient />
              <Tooltip />
            </AreaChart>

            <XAxis
              style={{
                alignSelf: 'stretch',
                minWidth: '100%',
                //   width: DeviceWidth - 30,
                height: apx(60),
                borderColor: chartColor,
                borderTopWidth: 0.5,
              }}
              numberOfTicks={4}
              data={priceList}
              formatLabel={(value, index) => dateList[value]}
              contentInset={{
                left: apx(50),
                // right: apx(130),
              }}
              svg={{
                fontFamily: 'Rubik',
                fontSize: apx(20),
                fill: '#617485',
                y: apx(20),
              }}
            />
          </View>
        </GestureDetector>
      </View>
    </View>
  );
}
