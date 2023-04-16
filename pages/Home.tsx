import { Container, Heading, Text } from "native-base";
import useAuth from "../contexts/useAuth";

const Home = () => {
  const { endpoint, token } = useAuth();
  return (
    <Container maxW="full" alignItems="center" m="2">
      <Heading>Welcome to AdamRMS</Heading>
      <Text>Endpoint: {endpoint}</Text>
      <Text>Token: {token}</Text>
    </Container>
  );
};

export default Home;
