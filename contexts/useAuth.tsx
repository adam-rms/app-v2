import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { FetchData, RemoveData, StoreData } from "../utilities/DataStorage";
import jwt_decode from "jwt-decode";
import { useToast } from "native-base";
import * as Sentry from "sentry-expo";

export const DEFAULT_ENDPOINT = "https://dash.adam-rms.com";

/** Parameters returned from the context
 * @see useAuth
 */
interface AuthContextType {
  authenticated: boolean;
  endpoint: string;
  token: string | null;
  userID: number;
  handleLogin: (token: string, referer: string) => Promise<void>;
  logout: () => Promise<void>;
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
  const [endpoint, setEndpoint] = useState<string>(DEFAULT_ENDPOINT);
  const [token, setToken] = useState<string | null>(null);
  const [userID, setUserID] = useState<number>(0);
  const toast = useToast();

  // Check if we've already stored a token and endpoint when we first load the app.
  useEffect(() => {
    (async () => {
      const storedEndpoint = await FetchData("Endpoint");
      const storedToken = await FetchData("AuthToken");
      if (storedEndpoint && storedToken) {
        if (await validateJWT(storedToken, storedEndpoint)) {
          setEndpoint(storedEndpoint);
          setToken(storedToken);
          setAuthenticated(true);
        } else {
          //Token isn't valid, clear the storage
          setEndpoint(DEFAULT_ENDPOINT);
          setToken(null);
          setAuthenticated(false);
        }
      } else {
        setAuthenticated(false);
      }
    })();
  }, []);

  /**
   * Validates the JWT is still live
   * @param token recieved JWT
   * @param referer Expected Referrer
   * @returns true if valid, false otherwise
   */
  const validateJWT = async (
    token: string,
    referer: string,
  ): Promise<boolean> => {
    const decodedToken: IJwt = jwt_decode(token);
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp < currentTime) return false; // Token has expired
    if (decodedToken.iss !== referer) return false; // Token is for a different endpoint
    //token is valid, store UID
    setUserID(parseInt(decodedToken.uid));
    Sentry.Native.setUser({ id: decodedToken.uid });
    return true;
  };

  // Update token
  const handleLogin = async (token: string, referer: string) => {
    if (await validateJWT(token, referer)) {
      await StoreData("AuthToken", token);
      setToken(token);
      await StoreData("Endpoint", referer);
      setEndpoint(referer);
      setAuthenticated(true);
    } else {
      toast.show({
        title: "There was an error logging in",
        description: "Please try again",
      });
    }
  };

  /**
   * Clear the various state variables we have for tracking Auth related information
   */
  const logout = async () => {
    //clear our storage of the token and reset the endpoint
    // TODO - cancel the token on the server
    await RemoveData("AuthToken");
    setToken(null);
    setUserID(0);
    Sentry.Native.setUser(null);
    await StoreData("Endpoint", DEFAULT_ENDPOINT);
    setEndpoint(DEFAULT_ENDPOINT);
    setAuthenticated(false);
  };

  //Memoize the context to prevent unnecessary re-renders
  const memoedValue = useMemo(
    () => ({
      authenticated,
      endpoint,
      token,
      userID,
      handleLogin,
      logout,
    }),
    [authenticated, endpoint, token, userID],
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
