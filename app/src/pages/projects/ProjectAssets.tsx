import {
  IonAccordionGroup,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
} from "@ionic/react";
import { useContext, useEffect } from "react";
import { useParams } from "react-router";
import Page from "../../components/Page";
import { ProjectDataContext } from "../../contexts/project/ProjectDataContext";
import Refresher from "../../components/Refresher";
import AssetTypeItem from "../../components/assets/AssetTypeItem";

export interface IProjectAssets {
  assets: IAsset[];
  totals: {
    status: string;
    discountPrice: {
      amount: string;
      currency: string;
    };
    formattedDiscountPrice: string;
    price: {
      amount: string;
      currency: string;
    };
    formattedPrice: string;
    mass: number;
    formattedMass: string;
  };
}

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
const ProjectAssets = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { projectData, refreshProjectData } = useContext(ProjectDataContext);

  useEffect(() => {
    refreshProjectData(parseInt(projectId));
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
      content.push(
        <IonCard key="ThisInstance">
          <IonCardHeader>
            <IonCardTitle>Your Business Assets</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonAccordionGroup multiple={true}>
              {Object.keys(projectData.FINANCIALS.assetsAssigned).map(
                (item) => {
                  const asset = projectData.FINANCIALS.assetsAssigned[item];
                  return (
                    <AssetTypeItem
                      key={item}
                      assetTypeKey={item}
                      typedAsset={asset}
                      subHire={false}
                    />
                  );
                },
              )}
            </IonAccordionGroup>
          </IonCardContent>
        </IonCard>,
      );
    }

    //Other Instance's assets
    for (const [instanceKey, instanceAssets] of Object.entries(
      projectData.FINANCIALS.assetsAssignedSUB,
    )) {
      const typedInstance = instanceAssets as IInstanceAssets;
      content.push(
        <IonCard key={instanceKey}>
          <IonCardHeader>
            <IonCardTitle>
              {typedInstance.instance.instances_name + " Assets"}
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonAccordionGroup multiple={true}>
              {Object.keys(typedInstance.assets).map((item: string) => {
                const asset = typedInstance.assets[item];
                return (
                  <AssetTypeItem
                    key={item}
                    assetTypeKey={item}
                    typedAsset={asset}
                    subHire={true}
                  />
                );
              })}
            </IonAccordionGroup>
          </IonCardContent>
        </IonCard>,
      );
    }
  } else {
    content.push(
      <IonCard key="NoAssets">
        <IonCardHeader>
          <IonCardTitle>No Assets Assigned to this Project</IonCardTitle>
        </IonCardHeader>
      </IonCard>,
    );
  }
  return (
    <Page title="Project Assets">
      <Refresher
        onRefresh={(event) => {
          refreshProjectData(parseInt(projectId), event);
        }}
      />
      {content}
    </Page>
  );
};

export default ProjectAssets;
