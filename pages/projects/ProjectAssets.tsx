import { useEffect, useState } from "react";
import { RefreshControl } from "react-native";
import { Container, Divider, Heading, ScrollView } from "native-base";
import { DrawerScreenProps } from "@react-navigation/drawer";
import AssetTypeItem from "../../components/assets/AssetTypeItem";
import { RMSDrawerParamList } from "../../utilities/Routing";
import useProjectData from "../../contexts/useProjectData";
import Card from "../../components/Card";

import RMSAccordion from "../../components/RMSAccordion";

interface IInstanceAssets {
  assets: { [key: string]: IProjectAssets };
  instance: {
    instances_id: number;
    instances_name: string;
  };
}

/**
 * Project Assets Page
 * Lists assets for a project
 */
const ProjectAssets = ({
  route,
}: DrawerScreenProps<RMSDrawerParamList, "ProjectAssets">) => {
  const { projectId } = route.params;
  const { projectData, refreshProjectData } = useProjectData();
  const [loading, setLoading] = useState<boolean>(true);

  const doRefresh = () => {
    setLoading(true);
    refreshProjectData(projectId);
    setLoading(false);
  };

  useEffect(() => {
    doRefresh();
  }, []);

  //Generate Project Assets
  const content: JSX.Element[] = [];
  if (
    projectData.FINANCIALS &&
    ((projectData.FINANCIALS.assetsAssigned &&
      Object.keys(projectData.FINANCIALS.assetsAssigned).length > 0) ||
      (projectData.FINANCIALS.assetsAssignedSUB &&
        Object.keys(projectData.FINANCIALS.assetsAssignedSUB).length > 0))
  ) {
    //This instance's assets
    if (Object.keys(projectData.FINANCIALS.assetsAssigned).length > 0) {
      const thisInstanceSections = Object.keys(
        projectData.FINANCIALS.assetsAssigned,
      ).map((item) => {
        const asset = projectData.FINANCIALS.assetsAssigned[item];
        return {
          header: <Heading>{asset.assets[0].assetTypes_name}</Heading>,
          content: (
            <AssetTypeItem
              key={item}
              assetTypeKey={item}
              typedAsset={asset}
              subHire={false}
            />
          ),
        };
      });
      content.push(
        <Card key="ThisInstance" p="2">
          <Heading mx="auto" mb="1">
            Your Business Assets
          </Heading>
          <Divider />
          <RMSAccordion sections={thisInstanceSections} />
        </Card>,
      );
    }

    //Other Instance's assets
    for (const [instanceKey, instanceAssets] of Object.entries(
      projectData.FINANCIALS.assetsAssignedSUB,
    )) {
      const typedInstance = instanceAssets as IInstanceAssets;
      const thisInstanceSections = Object.keys(typedInstance.assets).map(
        (item: string) => {
          const asset = typedInstance.assets[item];
          return {
            header: <Heading>{asset.assets[0].assetTypes_name}</Heading>,
            content: (
              <AssetTypeItem
                key={item}
                assetTypeKey={item}
                typedAsset={asset}
                subHire={true}
              />
            ),
          };
        },
      );
      content.push(
        <Card key={instanceKey} p="2">
          <Heading mx="auto" mb="1">
            {typedInstance.instance.instances_name + " Assets"}
          </Heading>
          <Divider />
          <RMSAccordion sections={thisInstanceSections} />
        </Card>,
      );
    }
  } else {
    content.push(
      <Card key="NoAssets">
        <Heading>No Assets Assigned to this Project</Heading>
      </Card>,
    );
  }
  return (
    <Container>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={doRefresh} />
        }
      >
        {content}
      </ScrollView>
    </Container>
  );
};

export default ProjectAssets;
