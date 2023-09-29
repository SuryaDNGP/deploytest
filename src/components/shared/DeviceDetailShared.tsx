import { Badge, BadgeIcon, BadgeText, Box, HStack } from '@gluestack-ui/themed';
import React from 'react';
import { Text } from '@gluestack-ui/themed';
import { CircleIcon } from '@gluestack-ui/themed';
import { COLORS } from '../../constants';
import { LinearGradient } from 'expo-linear-gradient';
const DeviceDetailShared: React.FC<any> = ({ device, status, title }) => {
  return (
    <LinearGradient
      style={{ borderRadius: 6 }}
      colors={['#F2F2F21A', '#BEB5B51A']}
    >
      <Box paddingVertical={20} paddingHorizontal={24}>
        <HStack justifyContent="space-between">
          <Box>
            <Text>{device?.title}</Text>
            <Badge paddingLeft={0} bg="transparent" maxWidth={60}>
              <BadgeIcon
                color={device.status === 'active' ? COLORS.green : COLORS.red}
                mr="$1"
                width="$2"
                as={CircleIcon}
              />
              <BadgeText
                color={COLORS.white}
                fontSize={12}
                textTransform="capitalize"
              >
                {device.status}
              </BadgeText>
            </Badge>
          </Box>
          {Object.keys(device?.data).length === 0 ? (
            <HStack width="100%" justifyContent="center" alignItems="center">
              <Text fontSize={12} color={COLORS.grey + '50'}>
                No data to Show
              </Text>
            </HStack>
          ) : (
            <HStack style={{ gap: 30 }}>
              <Box>
                <Text fontSize={12}>{device?.data?.temp}&deg;C</Text>
                <Text fontSize={10} color={COLORS?.pink}>
                  Temp.
                </Text>
              </Box>
              <Box>
                <Text fontSize={12}>{device?.data?.pressure}pa</Text>
                <Text fontSize={10} color={COLORS?.captionBlue}>
                  Pressure
                </Text>
              </Box>
              <Box>
                <Text fontSize={12}>{device?.data?.humidity}%</Text>
                <Text fontSize={10} color={COLORS?.captionViolet}>
                  Humidity
                </Text>
              </Box>
              <Box>
                <Text fontSize={12}>{device?.data?.light}lux</Text>
                <Text fontSize={10} color={COLORS?.textRed}>
                  Light
                </Text>
              </Box>
            </HStack>
          )}
        </HStack>
      </Box>
    </LinearGradient>
  );
};

export default DeviceDetailShared;
