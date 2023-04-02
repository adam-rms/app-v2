import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { FetchData, RemoveData, StoreData } from "../utilities/DataStorage";
import {
  DiscoveryDocument,
  makeRedirectUri,
  useAuthRequest,
} from "expo-auth-session";
import Toast from "react-native-root-toast";

/** Parameters returned from the context
 * @see useAuth
 */
interface AuthContextType {
  authenticated: boolean;
  loading: boolean;
  endpoint: string;
  token: string | null;
  promptAsync: () => void;
  logout: () => void;
  setEndpoint: (endpoint: string) => void;
}

// The actual Context
const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// The context provider
export function AuthProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [endpoint, setEndpoint] = useState<string>("https://dash.adam-rms.com");
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Auth handling
  const [discovery, setDiscovery] = useState<DiscoveryDocument>({
    authorizationEndpoint: endpoint,
  });
  const redirectUri = makeRedirectUri();
  // Create and load an auth request
  const [request, result, promptAsync] = useAuthRequest(
    {
      clientId: "com.bstudios.adamrms",
      redirectUri: redirectUri,
      responseType: "token",
      extraParams: {
        "app-oauth": "v2",
      },
    },
    discovery,
  );

  // Map loading var to useAuthRequest request
  useEffect(() => {
    setLoading(!!request);
  }, [request]);

  //Store the token when the context is updated
  useEffect(() => {
    const storeToken = async () => {
      if (token) {
        await StoreData("AuthToken", token);
        setAuthenticated(true);
      } else {
        RemoveData("AuthToken");
        setAuthenticated(false);
      }
    };
    storeToken();
  }, [token]);

  //store the Endpoint when the context is updated
  useEffect(() => {
    const storeEndpoint = async () => {
      await StoreData("Endpoint", endpoint);
      // Update the Discovery document
      setDiscovery({
        authorizationEndpoint: endpoint + "/login",
      });
    };
    storeEndpoint();
  }, [endpoint]);

  // Check if we've already stored a token and endpoint
  // when we first load the app.
  useEffect(() => {
    const getData = async () => {
      const storedEndpoint = await FetchData("Endpoint");
      const storedToken = await FetchData("AuthToken");
      if (storedEndpoint && storedToken) {
        setEndpoint(storedEndpoint);
        setToken(storedToken);
        setAuthenticated(true);
      }
    };
    getData();
  }, []);

  //Handle the Auth response
  useEffect(() => {
    if (result?.type === "success") {
      //we have a token so store it
      setToken(result.params.token);
    } else {
      Toast.show("There was an issue logging in", {
        duration: Toast.durations.LONG,
      });
    }
  }, [result]);

  function logout() {
    //clear our storage of the token and reset the endpoint
    setToken(null);
    setEndpoint("https://dash.adam-rms.com");
  }

  //Memoize the context to prevent unnecessary re-renders
  const memoedValue = useMemo(
    () => ({
      authenticated,
      loading,
      endpoint,
      token,
      promptAsync,
      logout,
      setEndpoint,
    }),
    [authenticated, loading, endpoint, token, promptAsync],
  );

  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  );
}

/**
 * The key authentication context for the app.
 * Stores current versions of the endpoint and token
 * and provides functions to prompt the user for authentication
 * ---
 * Wraps the AuthProvider component
 * @link https://docs.expo.dev/versions/latest/sdk/auth-session/
 * ---
 * @returns An object containing:
 * - authenticated: boolean - whether the user is authenticated
 * - loading: boolean - whether the auth request is loading
 * - endpoint: string - the current endpoint
 * - token: string | null - the current token or null if not authenticated
 * - promptAsync: () => void - the async function from useAuthRequest
 * - logout: () => void - a function to clear the token and reset the endpoint
 * - setEndpoint: (endpoint: string) => void - a function to set the endpoint
 *
 */
export default function useAuth() {
  return useContext(AuthContext);
}
