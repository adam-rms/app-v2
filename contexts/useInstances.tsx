import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import Api from "../utilities/Api";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RMSDrawerParamList } from "../utilities/Routing";
import useAuth from "./useAuth";

/**
 * Instances Context
 * Wraps information surrounding instances and instance permissions
 */

/**
 * Parameters returned from the context
 * @see useLocations
 */
interface LocationContextType {
  instances: IInstance[];
  thisInstance: IInstance;
  getInstances: () => Promise<void>;
  switchInstance: () => Promise<void>;
  instancePermissionCheck: (permission: string) => boolean;
}

// The actual context
const InstanceContext = createContext<LocationContextType>(
  {} as LocationContextType,
);

export const InstanceProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [instances, setInstances] = useState<IInstance[]>([]);
  const [thisInstance, setThisInstance] = useState<IInstance>({} as IInstance);
  const navigation = useNavigation<NavigationProp<RMSDrawerParamList>>();
  const { showActionSheetWithOptions } = useActionSheet();
  const { authenticated } = useAuth();

  //Get instances when authenticated state changes
  useEffect(() => {
    (async () => {
      if (authenticated) await getInstances();
    })();
  }, [authenticated]);

  const getInstances = async () => {
    const response = await Api("instances/list.php");
    if (response.result) {
      setInstances(response.response);
      setThisInstance(
        response.response.filter((instance: IInstance) => {
          return instance.this;
        })[0],
      );
    }
  };

  const switchInstance = async () => {
    const buttons: string[] = [];
    const instanceIds: { [key: string]: number } = {};

    if (instances.length === 0) {
      await getInstances();
    }

    instances.map((instance: IInstance) => {
      buttons.push(instance.instances_name);
      instanceIds[instance.instances_name] = instance.instances_id;
    });
    buttons.push("Cancel");

    //create action sheet
    showActionSheetWithOptions(
      {
        options: buttons,
        cancelButtonIndex: buttons.length - 1, // depends on number of instances
        title: "Set Location",
      },
      async (buttonIndex: number | undefined) => {
        if (buttonIndex !== undefined && buttonIndex !== buttons.length - 1) {
          const instanceName = buttons[buttonIndex];
          const instanceId = instanceIds[instanceName];
          const data = { instances_id: instanceId };
          Api("instances/switch.php", data)
            .then(() => {
              navigation.navigate("Home");
            })
            .catch((error) => {
              console.error(error);
            });
        }
      },
    );
  };

  const instancePermissionCheck = (permission: string) => {
    if (thisInstance && thisInstance.permissions) {
      return thisInstance.permissions.includes(permission);
    }
    return false;
  };

  //Memoize the context so it doesn't change on every render
  const memoedValue = useMemo(
    () => ({
      instances,
      thisInstance,
      getInstances,
      switchInstance,
      instancePermissionCheck,
    }),
    [instances, thisInstance, authenticated],
  );

  return (
    <InstanceContext.Provider value={memoedValue}>
      {children}
    </InstanceContext.Provider>
  );
};

/**
 * Wraps the InstanceContext
 * @returns A Hook containing:
 * - instances: The list of instances available to the user
 * - thisInstance: The instance that the user is currently using
 * - getInstances: Function to fetch the list of instances
 * - switchInstance: Function to switch the instance
 */
export default function useInstances() {
  return useContext(InstanceContext);
}
