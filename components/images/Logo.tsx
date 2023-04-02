import { Image } from "expo-image";
import { makeStyles } from "@rneui/themed";

const Logo = () => {
  const styles = useStyles();
  return (
    <Image
      style={styles.logo}
      source={require("../../assets/logo.png")}
      contentFit="contain"
    />
  );
};

const useStyles = makeStyles(() => ({
  logo: {
    width: 200,
    height: 70,
    margin: 80,
    objectFit: "contain",
  },
}));

export default Logo;
