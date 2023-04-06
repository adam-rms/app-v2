import { useState } from "react";
import {
  Button,
  Container,
  Divider,
  Heading,
  Input,
  Text,
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
    <Container w="full" maxW="full">
      <View alignItems="center" flexDir={flexDir} w="full">
        <Card>
          <Heading>Current Location</Heading>
          <Divider />
          <Text>Name: {rmsLocation.name}</Text>
          <Text>Value: {rmsLocation.value}</Text>
          <Text>Type: {rmsLocation.type}</Text>
        </Card>
        <Card>
          <Heading>Set Location</Heading>
          <Divider />
          <Text mt="2">Location Name</Text>
          <Input
            id="locationName"
            placeholder="Location Name"
            mb="2"
            p="2"
            onChangeText={(text) => setUserLocation(text)}
          />
          <Button
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
