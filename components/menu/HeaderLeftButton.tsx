import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Box, Pressable } from "native-base";
import { faArrowLeft, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const HeaderLeftButton = () => {
  const navigation = useNavigation();
  if (navigation.canGoBack()){
    return (
      <Box p={2}>
        <Pressable onPress={() => navigation.goBack()}>
          <FontAwesomeIcon icon={faArrowLeft} size={24} />
        </Pressable>
      </Box>
    );
  } else {
    return (
      <Box p={2}>
        <Pressable onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
          <FontAwesomeIcon icon={faBars} size={24} />
        </Pressable>
      </Box>
    ); 
  }
};

export default HeaderLeftButton;
