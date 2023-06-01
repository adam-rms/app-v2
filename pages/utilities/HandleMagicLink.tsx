import { DrawerScreenProps } from "@react-navigation/drawer";
import { RMSDrawerParamList } from "../../utilities/Routing";
import useAuth from "../../contexts/useAuth";
import { useEffect } from "react";

/**
 * Empty screen to handle magic link logins
 * Screen is automatically redirected once authentication is complete
 */
const HandleMagicLink = ({
  route,
}: DrawerScreenProps<RMSDrawerParamList, "magic-link">) => {
  const { token, referer } = route.params;
  const { handleLogin } = useAuth();

  useEffect(() => {
    (async () => {
      await handleLogin(token, referer);
    })();
  }, []);

  return <></>;
};

export default HandleMagicLink;
