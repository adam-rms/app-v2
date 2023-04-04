import { Button, Text } from "@rneui/themed";
import useRMSLocation from "../contexts/useRMSLocation";

const Home = () => {
  const { getRMSLocation, updateRMSLocation } = useRMSLocation();
  return (
    <>
      <Text h1>Home</Text>
      <Text h2>{getRMSLocation().name}</Text>
      <Text h2>{getRMSLocation().value}</Text>
      <Text h2>{getRMSLocation().type}</Text>
      <Button onPress={() => updateRMSLocation()}>Set location</Button>
    </>
  );
};

export default Home;
