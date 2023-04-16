import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { FetchData, StoreData } from "../utilities/DataStorage";

/** Parameters returned from the context
 * @see useAuth
 */
interface AuthContextType {
  authenticated: boolean;
  endpoint: string;
  token: string | null;
  handleLogin: (token: string) => void;
  logout: () => Promise<void>;
  handleEndpointChange: (endpoint: string) => void;
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
  const [initialLoading, setInitialLoading] = useState<boolean>(true); // Used to prevent the app overwriting the endpoint and token with null values
  const [endpoint, setEndpoint] = useState<string>("https://dash.adam-rms.com");
  const [token, setToken] = useState<string | null>(null);

  // Check if we've already stored a token and endpoint when we first load the app.
  useEffect(() => {
    (async () => {
      const storedEndpoint = await FetchData("Endpoint");
      const storedToken = await FetchData("AuthToken");
      if (storedEndpoint && storedToken) {
        setEndpoint(storedEndpoint);
        setToken(storedToken);
        setAuthenticated(true);
        setInitialLoading(false); //Allow saving to occur
      } else {
        setAuthenticated(false);
        setInitialLoading(false);
      }
    })();
  }, []);

  //Store the token when the context is updated
  useEffect(() => {
    const storeToken = async () => {
      if (token && !initialLoading) {
        await StoreData("AuthToken", token);
        setAuthenticated(true);
      }
    };
    storeToken();
  }, [token]);

  //store the Endpoint when the context is updated
  useEffect(() => {
    (async () => {
      if (endpoint && !initialLoading) {
        await StoreData("Endpoint", endpoint);
      }
    })();
  }, [endpoint]);

  const handleEndpointChange = (endpoint: string) => {
    setEndpoint(endpoint);
  };

  // Update token
  const handleLogin = (token: string) => {
    //TODO: Validate the token
    setToken(token);
    setAuthenticated(true);
  };

  const logout = async () => {
    //clear our storage of the token and reset the endpoint
    setToken(null);
    setEndpoint("https://dash.adam-rms.com");
    setAuthenticated(false);
  };

  //Memoize the context to prevent unnecessary re-renders
  const memoedValue = useMemo(
    () => ({
      authenticated,
      endpoint,
      token,
      handleLogin,
      logout,
      handleEndpointChange,
    }),
    [authenticated, endpoint, token],
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
 * @returns The useAuth Hook, containing:
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
