import * as SecureStore from "expo-secure-store";

/**
 * This project does not explicitly support web builds, but local storage is used
 * as a fallback for secure storage when the app is run in a web browser.
 */

/**
 * Store data
 * @param key identifier for the data
 * @param value data to store
 */
const StoreData = async (key: string, value: string) => {
  if (await SecureStore.isAvailableAsync()) {
    SecureStore.setItemAsync(key, value);
  } else {
    localStorage.setItem(key, value);
  }
};

/**
 * Fetch data if available
 * @param key the identifier for the data
 * @returns the data if available, otherwise null
 */
const FetchData = async (key: string) => {
  if (await SecureStore.isAvailableAsync()) {
    return SecureStore.getItemAsync(key);
  } else {
    return localStorage.getItem(key);
  }
};

/**
 * Delete data from storage
 * @param key the identifier for the data
 */
const RemoveData = async (key: string) => {
  if (await SecureStore.isAvailableAsync()) {
    SecureStore.deleteItemAsync(key);
  } else {
    localStorage.removeItem(key);
  }
};

export { StoreData, FetchData, RemoveData };
