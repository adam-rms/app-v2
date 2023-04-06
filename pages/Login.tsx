import Logo from "../components/images/Logo";
import useAuth from "../contexts/useAuth";
import { Container, Input, Button, FormControl } from "native-base";

const Login = () => {
  const { loading, promptAsync, setEndpoint, endpoint } = useAuth();

  return (
    <Container>
      <Logo />
      <FormControl>
        <FormControl.Label>AdamRMS Endpoint</FormControl.Label>
        <Input
          placeholder="AdamRMS Endpoint"
          value={endpoint}
          onChangeText={(text) => setEndpoint(text)}
        />
      </FormControl>

      <Button disabled={!loading} onPress={() => promptAsync()}>
        Log In
      </Button>
    </Container>
  );
};

export default Login;
