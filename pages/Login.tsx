import { Container, Input, Button, FormControl, Box } from "native-base";
import * as Linking from "expo-linking";
import Logo from "../components/images/Logo";
import { RMSDrawerParamList } from "../utilities/Routing";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { useEffect, useState } from "react";
import { DEFAULT_ENDPOINT } from "../contexts/useAuth";

const Login = ({
  navigation,
}: DrawerScreenProps<RMSDrawerParamList, "Login">) => {
  const [endpoint, setEndpoint] = useState(DEFAULT_ENDPOINT); //endpoint is only ever local to this page
  const magicLinkURL = Linking.createURL("magic-link"); //Returns url, based on environment

  useEffect(() => {
    fetch("https://adam-rms.com/.well-known/dash-url.txt").then((response) => {
      response.text().then((text) => {
        setEndpoint(text);
      });
    });
  }, []);

  // Close the drawer - it sometimes gets stuck open when navigating back to this page
  navigation.closeDrawer();

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
            onChangeText={(text) => setEndpoint(text)}
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
