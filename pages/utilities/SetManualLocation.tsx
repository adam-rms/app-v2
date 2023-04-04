import { useState } from "react";
import { Button, Card, Input, Text, makeStyles } from "@rneui/themed";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import useRMSLocation from "../../contexts/useRMSLocation";
import { RMSDrawerParamList } from "../../utilities/Routing";
import { Column, Container, Row } from "../../components/Layout";

const SetManualLocation = () => {
  const styles = useStyles();
  const navigation = useNavigation<NavigationProp<RMSDrawerParamList>>();
  const { getRMSLocation, setRMSLocation } = useRMSLocation();
  const [userLocation, setUserLocation] = useState<string>("");

  const rmsLocation = getRMSLocation();

  return (
    <Container>
      <Row>
        <Column>
          <Card wrapperStyle={styles.card}>
            <Card.Title>Current Location</Card.Title>
            <Card.Divider />
            <Text>Name: {rmsLocation.name}</Text>
            <Text>Value: {rmsLocation.value}</Text>
            <Text>Type: {rmsLocation.type}</Text>
          </Card>
        </Column>
        <Column>
          <Card wrapperStyle={styles.card}>
            <Card.Title>Set Location</Card.Title>
            <Card.Divider />
            <Text>Location Name</Text>
            <Input
              id="locationName"
              placeholder="Location Name"
              onChangeText={(text) => setUserLocation(text)}
            />
            <Button
              buttonStyle={styles.bottom}
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
        </Column>
      </Row>
    </Container>
  );
};

const useStyles = makeStyles(() => ({
  card: {
    minWidth: 300,
    minHeight: 200,
    margin: "auto",
  },
  bottom: {
    bottom: 0,
  },
}));

export default SetManualLocation;
