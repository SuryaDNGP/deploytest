import React, { useEffect, useRef, useState } from 'react';
// import * as React from 'react'
import {
  PanResponder,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Pressable,
  Vibration,
} from 'react-native';
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
  sampleDateList,
  samplePriceList,
} from '../../utils/sampleData';
import { Platform } from 'react-native';
import { COLORS } from '../../constants';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  LongPressGestureHandler,
} from 'react-native-gesture-handler';
import * as Haptics from 'expo-haptics';
export default InteractiveChart;
let DeviceWidth = Dimensions.get('window').width;

function InteractiveChart({ chartColor }: any) {
  const apx = (size = 0) => {
    let width = Dimensions.get('window').width;
    return Platform.OS === 'web' ? size : (width / 750) * size;
    // return size;
    // return (width / 750) * size;
  };

  //full width of chart (used in multiple places)
  const globalChartWidth = 1000;

  //stores current scrollview offset
  const [scrollPos, setScrollPos] = useState(0);

  const [dateList, setDateList] = useState(longSampleDateList);
  const [priceList, setPriceList] = useState(longSamplePriceList);
  const size = useRef(dateList.length);

  const [positionX, setPositionX] = useState(10); // The currently selected X coordinate position

  //cursor logic
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderTerminationRequest: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        updatePosition(evt.nativeEvent.locationX);
        return true;
      },
      onPanResponderMove: (evt, gestureState) => {
        updatePosition(evt.nativeEvent.locationX);
        return true;
      },
      onPanResponderRelease: () => {
        // setPositionX(-1);
      },
    })
  );

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

    // console.log((x - x0) )

    // The selected coordinate x :
    // (x - x0)/ xDistance = value
    let value = parseFloat(((x - x0) / xDistance).toFixed(0));
    if (value >= size.current - 1) {
      value = size.current - 1; // Out of chart range, automatic correction
    }

    setPositionX(Number(value));
  };

  //Background grid, not being used
  const CustomGrid = ({ x, y, ticks }: any) => (
    <G>
      {
        // Horizontal grid
        ticks.map((tick: any) => (
          <Line
            key={tick}
            x1="0%"
            x2="100%"
            y1={y(tick)}
            y2={y(tick)}
            stroke="#EEF3F6"
          />
        ))
      }
      {
        // Vertical grid
        priceList.map((_, index) => (
          <Line
            key={index.toString()}
            y1="0%"
            y2="100%"
            x1={x(index)}
            x2={x(index)}
            stroke="#EEF3F6"
          />
        ))
      }
    </G>
  );

  const CustomLine = ({ line }: any) => (
    <Path
      key="line"
      d={line}
      stroke={chartColor}
      strokeWidth={apx(2)}
      fill="none"
    />
  );

  const CustomGradient = () => (
    <Defs key="gradient">
      <LinearGradient id="gradient" x1="0" y="0%" x2="0%" y2="100%">
        {/* <Stop offset="0%" stopColor="rgb(134, 65, 244)" /> */}
        {/* <Stop offset="100%" stopColor="rgb(66, 194, 244)" /> */}
        <Stop offset="0%" stopColor={chartColor} stopOpacity="0" />
        <Stop offset="100%" stopColor={chartColor} stopOpacity="1" />
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
          <SvgText x={apx(20)} fontSize={apx(28)} fill="white">
            {priceList[positionX]}&deg;C
          </SvgText>
          <SvgText
            x={apx(20)}
            y={apx(24 + 12)}
            fill="white"
            opacity={0.65}
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
  const isLongPressed = useSharedValue(false);
  const pan = Gesture.Pan()
    .activateAfterLongPress(1000)
    .runOnJS(true)
    .onBegin((e) => {
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
          // width: DeviceWidth,
          // width: '100%',
          // paddingRight: 20,
          // height: apx(400),
          height: 400,
          alignSelf: 'stretch',
        }}
      >
        {/* <YAxis
          numberOfTicks={6}
          data={priceList}
          contentInset={verticalContentInset}
          svg={{ fontSize: apx(20), fill: "#617485" }}
        /> */}
        <ScrollView
          onMomentumScrollEnd={(e) => {
            setScrollPos(e.nativeEvent.contentOffset.x);
            // console.log(e.nativeEvent.contentOffset.x);
          }}
          horizontal
        >
          {/* <View {...panResponder.current.panHandlers}> */}
          <GestureDetector gesture={pan}>
            <View>
              <AreaChart
                style={{ flex: 1, width: DeviceWidth - 30 }}
                data={priceList}
                // curve={shape.curveNatural}
                curve={shape.curveMonotoneX}
                contentInset={{ ...verticalContentInset }}
                svg={{ fill: 'url(#gradient)' }}
              >
                <CustomLine />
                {/* <CustomGrid /> */}
                <CustomGradient />

                <Tooltip />
              </AreaChart>

              <XAxis
                style={{
                  alignSelf: 'stretch',
                  // marginTop: apx(57),
                  // width: '100%',
                  // width: apx(globalChartWidth),
                  width: DeviceWidth - 30,
                  height: apx(60),
                  // height: apx(60),
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
                  fontSize: 16,
                  fill: '#617485',
                  y: apx(20),
                  // originY: 30,
                }}
              />
            </View>
          </GestureDetector>
        </ScrollView>
      </View>
    </View>
  );
}
