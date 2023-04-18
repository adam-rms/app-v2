import { useState } from "react";
import {
  Button,
  Container,
  Divider,
  HStack,
  Heading,
  Input,
  Text,
  VStack,
  View,
  useBreakpointValue,
} from "native-base";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import useRMSLocation from "../../contexts/useRMSLocation";
import { RMSDrawerParamList } from "../../utilities/Routing";
import Card from "../../components/Card";

const SetManualLocation = () => {
  const navigation = useNavigation<NavigationProp<RMSDrawerParamList>>();
  const { getRMSLocation, setRMSLocation } = useRMSLocation();
  const [userLocation, setUserLocation] = useState<string>("");

  const rmsLocation = getRMSLocation();

  const flexDir = useBreakpointValue({
    base: "column",
    lg: "row",
  });

  return (
    <Container>
      <View flexDir={flexDir} w="full">
        <Card p="2">
          <Heading mx="auto">Current Location</Heading>
          <Divider />
          <HStack>
            <VStack mx="auto">
              <Text bold>Name</Text>
              <Text mx="auto">{rmsLocation.name}</Text>
            </VStack>
            <VStack mx="auto">
              <Text bold>Value</Text>
              <Text mx="auto">{rmsLocation.value}</Text>
            </VStack>
            <VStack mx="auto">
              <Text bold>Type</Text>
              <Text mx="auto">{rmsLocation.type}</Text>
            </VStack>
          </HStack>
        </Card>
        <Card p="2">
          <Heading mx="auto">Set Location</Heading>
          <Divider />
          <Text mt="2">Location Name</Text>
          <Input
            size="lg"
            id="locationName"
            placeholder="Location Name"
            mb="2"
            p="2"
            onChangeText={(text) => setUserLocation(text)}
          />
          <Button
            bg="primary"
            onPress={() => {
              setRMSLocation({
                name: userLocation,
                value: userLocation,
                type: "custom",
              });
              navigation.navigate("Home");
            }}
          >
            Set Location
          </Button>
        </Card>
      </View>
    </Container>
  );
};
export default SetManualLocation;
