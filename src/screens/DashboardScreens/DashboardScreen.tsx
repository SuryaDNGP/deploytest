import React, { useState } from "react";
import {
  Text,
  Box,
  Button,
  ButtonText,
  ButtonIcon,
  HStack,
  AddIcon,
  FlatList,
  ToastTitle,
  ToastDescription,
  VStack,
  useToast,
  Toast,
  ScrollView
} from "@gluestack-ui/themed";
import { View } from "@gluestack-ui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "../../components/context/AuthContext";
import { COLORS } from "../../constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AdaptSize, CustomSize } from "../../utils/helpers";
import DeviceDetailShared from "../../components/shared/DeviceDetailShared";
import SwipeCarousel from "./SwipeCarousel";
import { Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DashboardScreen() {
  const [buttonType, setButtonType] = useState("Production Floor");
  const toast = useToast();
  const deviceList = [
    {
      status: "active",
      title: "S102",
      data: {
        temp: "24",
        pressure: "1004",
        humidity: "74",
        light: "74"
      }
    },
    {
      status: "inactive",
      title: "S103",
      data: {}
    },
    {
      status: "active",
      title: "S104",
      data: {
        temp: "24",
        pressure: "1004",
        humidity: "72",
        light: "720"
      }
    }
  ];

  const data = [
    { chartColor: COLORS.chartLinePink },
    { chartColor: COLORS.chartLineBlue },
    { chartColor: COLORS.chartLinePurple },
    { chartColor: COLORS.chartLineRed }
  ];

  const DeviceWidth = Dimensions.get("window").width;
  return (
    <Box style={{ backgroundColor: COLORS.background, flex: 1 }}>
      <HStack marginTop={20} mb={5}>
        <FlatList
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            marginBottom: 10
          }}
          style={{ paddingHorizontal: 10 }}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={["Production Floor", "Warehouse", "Boiler Room"]}
          renderItem={({ item }: any) => (
            <Button
              marginRight={12}
              variant="solid"
              bg={item === buttonType ? COLORS.purple : COLORS.secondaryBlack}
              borderRadius="$full"
              paddingVertical={6}
              paddingHorizontal={20}
              onPress={(e) => {
                setButtonType(item);
              }}
              minWidth={160}
            >
              <ButtonText marginTop={2} fontSize="$sm">
                {item}
              </ButtonText>
            </Button>
          )}
        />
      </HStack>

      <ScrollView>
        <Box mt={10}>
          {/* ---- Badges ---- */}

          <LinearGradient
            style={{
              borderRadius: 10,
              marginBottom: 10,
              marginTop: 12,
              marginHorizontal: 10
            }}
            colors={["#F2F2F21A", "#BEB5B51A"]}
          >
            <Box>
              <HStack
                marginTop={22}
                marginHorizontal={8}
                justifyContent="space-between"
              >
                <Text fontSize="$lg" fontWeight="bold">
                  Activity
                </Text>
                <TouchableOpacity>
                  <Text
                    sx={{
                      _web: {
                        cursor: "pointer"
                      }
                    }}
                    color={COLORS.green}
                  >
                    Show more
                  </Text>
                </TouchableOpacity>
              </HStack>
              <View
                style={{
                  width: "100%",
                  height: CustomSize(380, 580)
                }}
              >
                <SwipeCarousel />
              </View>
            </Box>
          </LinearGradient>
          {/* ---- Sensors ---- */}
          <HStack
            marginHorizontal={16}
            marginTop={8}
            marginBottom={12}
            justifyContent="space-between"
          >
            <Text fontSize="$lg" fontWeight="bold">
              Sensors
            </Text>
            <TouchableOpacity>
              <Text
                sx={{
                  _web: {
                    cursor: "pointer"
                  }
                }}
                color={COLORS.green}
              >
                Show more
              </Text>
            </TouchableOpacity>
          </HStack>
          <FlatList
            style={{ marginTop: 12 }}
            data={deviceList}
            renderItem={({ item }) => (
              <DeviceDetailShared device={item} title="S102" status="active" />
            )}
          />
        </Box>

        <Box alignItems="center" marginBottom={16} marginTop={8}>
          {/* <TouchableOpacity> */}
          <LinearGradient
            style={{
              borderRadius: 10,
              width: 200
            }}
            colors={["#F2F2F21A", "#BEB5B51A"]}
          >
            <Button
              py={8}
              variant="outline"
              action="primary"
              borderWidth={0}
              sx={{
                ":hover": {
                  bg: "transparent"
                }
              }}
              onPress={() => {
                toast.show({
                  placement: "top",
                  render: ({ id }) => {
                    return (
                      <SafeAreaView>
                        <Toast
                          nativeID={String(id)}
                          action="attention"
                          variant="solid"
                        >
                          <VStack space="xs">
                            <ToastTitle>New Message</ToastTitle>
                            <ToastDescription>
                              Hey, just wanted to touch base and see how you're
                              doing. Let's catch up soon!
                            </ToastDescription>
                          </VStack>
                        </Toast>
                      </SafeAreaView>
                    );
                  }
                });
              }}
            >
              <ButtonIcon color="white" as={AddIcon} mr="$2" />
              <ButtonText color="white">Add new device</ButtonText>
            </Button>
          </LinearGradient>
          {/* </TouchableOpacity> */}
        </Box>
        {/* <Text>Home Page</Text>
      <Button
        onPress={() => {
          signOutAction();
        }}
      >
        <ButtonText>LOGOUT</ButtonText>
      </Button> */}
      </ScrollView>
    </Box>
  );
}
