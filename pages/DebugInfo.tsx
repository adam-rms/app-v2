import { Divider, Heading, Text, VStack } from "native-base";
import * as Device from "expo-device";
import ScrollContainer from "../components/ScrollContainer";
import useAuth from "../contexts/useAuth";
import useInstances from "../contexts/useInstances";
import Card from "../components/Card";
import RMSAccordion from "../components/RMSAccordion";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faAppleAlt,
  faMobileAndroidAlt,
} from "@fortawesome/free-solid-svg-icons";

const DebugInfo = () => {
  const { endpoint, token, userID } = useAuth();
  const { instances, thisInstance } = useInstances();
  const permissionSections = instances.map((instance) => {
    return {
      header: (
        <Text key={"title-" + instance.instances_id}>
          ({instance.instances_id}) {instance.instances_name}
        </Text>
      ),
      content: (
        <VStack>
          {instance.permissions.map((permission) => {
            return <Text key={permission}>{permission}</Text>;
          })}
        </VStack>
      ),
    };
  });
  return (
    <ScrollContainer>
      <Card p="2">
        <Heading>Auth Information</Heading>
        <Divider />
        <Text>
          <Text bold>Endpoint:</Text> {endpoint}
        </Text>
        <Text>
          <Text bold>Token:</Text> {token}
        </Text>
        <Text>
          <Text bold>User ID:</Text> {userID}
        </Text>
      </Card>
      <Card p="2">
        <Heading>Instance Information</Heading>
        <Divider />
        <Text>
          Current Instance: {thisInstance.instances_id} -{" "}
          {thisInstance.instances_name}
        </Text>
        <Heading size="sm">Available Instances</Heading>
        <RMSAccordion sections={permissionSections} />
      </Card>
      <Card p="2">
        <Heading>Device Information</Heading>
        <Divider />
        <Text>
          <Text bold>Brand: </Text>
          {Device.brand}
        </Text>
        <Text>
          <Text bold>Name: </Text>
          {Device.deviceName}
        </Text>
        <Text>
          <Text bold>Manufacturer: </Text>
          {Device.manufacturer}
        </Text>
        <Text>
          <Text bold>
            <FontAwesomeIcon icon={faAppleAlt} /> Model Id:{" "}
          </Text>
          {Device.modelId}
        </Text>
        <Text>
          <Text bold>Model Name: </Text>
          {Device.modelName}
        </Text>
        <Text>
          <Text bold>OS Name: </Text>
          {Device.osName}
        </Text>
        <Text>
          <Text bold>OS Version: </Text>
          {Device.osVersion}
        </Text>
        <Text>
          <Text bold>
            <FontAwesomeIcon icon={faMobileAndroidAlt} /> API Level:{" "}
          </Text>
          {Device.platformApiLevel}
        </Text>
        <Text>
          <Text bold>Memory: </Text>
          {Device.totalMemory}
        </Text>
      </Card>
    </ScrollContainer>
  );
};

export default DebugInfo;
