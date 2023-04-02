import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

const StoreData = async (key: string, value: string) => {
  if (await SecureStore.isAvailableAsync()) {
    SecureStore.setItemAsync(key, value);
  } else {
    AsyncStorage.setItem(key, value);
  }
};

const FetchData = async (key: string) => {
  if (await SecureStore.isAvailableAsync()) {
    return SecureStore.getItemAsync(key);
  } else {
    return AsyncStorage.getItem(key);
  }
};

const RemoveData = async (key: string) => {
  if (await SecureStore.isAvailableAsync()) {
    SecureStore.deleteItemAsync(key);
  } else {
    AsyncStorage.removeItem(key);
  }
};

export { StoreData, FetchData, RemoveData };
