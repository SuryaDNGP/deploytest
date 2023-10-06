import { Platform } from 'react-native';
import { useToast, Toast } from '@gluestack-ui/themed';

export const CarouselGesture = () => {
  if (Platform.OS === 'web') {
    return false;
  }
  return true;
};

export const AdaptSize = (size: number) => {
  if (Platform.OS === 'web') {
    return size * 2;
  }
  return size;
};

type CustomSizeType = (a: number, b: number) => number;
export const CustomSize: CustomSizeType = (mobileSize, webSize) => {
  if (Platform.OS === 'web') {
    return webSize;
  }
  return mobileSize;
};
