import { DrawerScreenProps } from "@react-navigation/drawer";
import { Container, Heading } from "native-base";
import { RMSDrawerParamList } from "@utility/Routing";

/**
 * The Home page
 * Used as a default page once logged in or instances have been changed
 */
const Home = ({
  navigation,
}: DrawerScreenProps<RMSDrawerParamList, "Home">) => {
  // Close the drawer - it sometimes gets stuck open when navigating back to this page
  navigation.closeDrawer();
  // Reset navigation - some routes get a bit confused and this is a fallback assertion.
  if (navigation.canGoBack()) {
    navigation.reset({
      index: 0,
      routes: [{ name: "Home" }],
    });
  }
  return (
    <Container maxW="full" alignItems="center" m="2">
      <Heading>Welcome to AdamRMS</Heading>
    </Container>
  );
};

export default Home;
