import { useState } from "react";
import { Button, Divider, HStack, Heading, Select } from "native-base";
import Card from "../Card";
import useProjectData from "../../contexts/useProjectData";

const ProjectDispatch = () => {
  const { projectData } = useProjectData();
  const [status, setStatus] = useState<string>("");
  return (
    <Card p="2">
      <Heading mx="auto">Project Dispatch</Heading>
      <Divider />
      <Select
        my={2}
        placeholder="Select an Asset Status"
        selectedValue={status}
        onValueChange={(itemValue) => setStatus(itemValue)}
      >
        {projectData.assetsAssignmentsStatus.map((status) => (
          <Select.Item
            key={status.assetsAssignmentsStatus_id}
            label={status.assetsAssignmentsStatus_name}
            value={status.assetsAssignmentsStatus_id.toString()}
          />
        ))}
      </Select>
      <HStack>
        <Button bg="primary" w="45%" mx={2} disabled={status !== ""}>
          Scan Assets
        </Button>
        <Button bg="primary" w="45%" mx={2} disabled={status !== ""}>
          Enter Barcodes
        </Button>
      </HStack>
    </Card>
  );
};

export default ProjectDispatch;
