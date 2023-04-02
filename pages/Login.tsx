import { View } from "react-native";
import { makeStyles, Button, Input } from "@rneui/themed";
import Logo from "../components/images/Logo";
import useAuth from "../contexts/useAuth";

const Login = () => {
  const styles = useStyles();
  const { loading, promptAsync, setEndpoint, endpoint } = useAuth();

  return (
    <View style={styles.container}>
      <Logo />
      <Input
        placeholder="AdamRMS Endpoint"
        label="AdamRMS Endpoint"
        value={endpoint}
        onChangeText={(text) => setEndpoint(text)}
      />
      <Button disabled={!loading} onPress={() => promptAsync()}>
        Log In
      </Button>
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: "center",
    marginTop: theme.spacing.xl,
    padding: theme.spacing.lg,
  },
  text: {
    marginVertical: theme.spacing.lg,
  },
}));

export default Login;
