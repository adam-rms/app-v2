import { Container, Input, Button, FormControl, Box } from "native-base";
import * as Linking from "expo-linking";
import Logo from "../components/images/Logo";
import useAuth from "../contexts/useAuth";

const Login = () => {
  const { handleEndpointChange, endpoint } = useAuth();
  const magicLinkURL = Linking.createURL("magic-link"); //Returns url, based on environment

  return (
    <Container>
      <Box alignItems={"center"} my={10} p={4} w="full">
        <Logo />
        <FormControl>
          <FormControl.Label>AdamRMS Endpoint</FormControl.Label>
          <Input
            placeholder="AdamRMS Endpoint"
            size="lg"
            value={endpoint}
            onChangeText={(text) => handleEndpointChange(text)}
          />
        </FormControl>

        <Button
          bg="primary"
          w="full"
          my="2"
          onPress={() => {
            Linking.openURL(endpoint + "/login/?app-magiclink=" + magicLinkURL);
          }}
        >
          Log In
        </Button>
      </Box>
    </Container>
  );
};

export default Login;