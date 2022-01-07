import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonRow,
} from "@ionic/react";
import { useContext } from "react";
import { useParams } from "react-router";
import Page from "../../components/Page";
import { ProjectDataContext } from "../../contexts/project/ProjectDataContext";
import Refresher from "../../components/Refresher";
import BrandText from "../../components/menu/components/BrandText";
import AssetTypeItem from "../../components/assets/AssetTypeItem";

export interface IProjectAssets {
  assets: [IAssetTypeData];
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
  assets: IProjectAssets;
  instance: {
    instances_id: number;
    instances_name: string;
  };
}

const ProjectAssetsHeader = (props: { instanceName: string }) => {
  return (
    <IonCardHeader>
      <IonCardTitle>{props.instanceName}</IonCardTitle>
      <IonGrid>
        <IonRow className="ion-padding-horizontal">
          <IonCol size="2">
            <BrandText>Assets</BrandText>
          </IonCol>
          <IonCol size="4">
            <BrandText>Status/Location</BrandText>
          </IonCol>
          <IonCol size="1">
            <BrandText>Mass</BrandText>
          </IonCol>
          <IonCol size="1">
            <BrandText>Price</BrandText>
          </IonCol>
          <IonCol size="2">
            <BrandText>Discounted Price</BrandText>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonCardHeader>
  );
};

/**
 * Project Assets Page
 * Lists assets for a project
 */
const ProjectAssets = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { projectData, refreshProjectData } = useContext(ProjectDataContext);

  function doRefresh(event: CustomEvent) {
    refreshProjectData(parseInt(projectId));
    event.detail.complete();
  }

  //Generate Project Assets
  const content: JSX.Element[] = [];
  if (
    projectData.FINANCIALS &&
    ((projectData.FINANCIALS.assetsAssigned &&
      Object.keys(projectData.FINANCIALS.assetsAssigned).length > 0) ||
      (projectData.FINANCIALS.assetsAssignedSUB &&
        Object.keys(projectData.FINANCIALS.assetsAssignedSUB).length > 0))
  ) {
    //This businesses assets
    const assets: JSX.Element[] = [];
    for (const [assetTypeKey, assetTypeValue] of Object.entries(
      projectData.FINANCIALS.assetsAssigned,
    )) {
      if (assetTypeValue) {
        const typedAsset = assetTypeValue as IProjectAssets;
        //append asset Type to main asset list
        assets.push(
          <AssetTypeItem assetTypeKey={assetTypeKey} typedAsset={typedAsset} />,
        );
      }
    }
    //If there are assets from this business, generate card
    if (Object.keys(projectData.FINANCIALS.assetsAssigned).length > 0) {
      content.push(
        <IonCard key="ThisInstance">
          <ProjectAssetsHeader instanceName="Your Business Assets" />
          <IonCardContent>{assets}</IonCardContent>
        </IonCard>,
      );
    }

    //Add SubAssigned assets
    for (const [instanceKey, instanceAssets] of Object.entries(
      projectData.FINANCIALS.assetsAssignedSUB,
    )) {
      const typedInstance = instanceAssets as IInstanceAssets;
      const assets: JSX.Element[] = [];
      //Asset types
      for (const [assetTypeKey, assetTypeValue] of Object.entries(
        typedInstance.assets,
      )) {
        if (assetTypeValue) {
          const typedAsset = assetTypeValue as IProjectAssets;
          //append list to main asset list
          assets.push(
            <AssetTypeItem
              key={assetTypeKey}
              assetTypeKey={assetTypeKey}
              typedAsset={typedAsset}
              subHire={true}
            />,
          );
        }
      }
      content.push(
        <IonCard key={instanceKey}>
          <ProjectAssetsHeader
            instanceName={typedInstance.instance.instances_name + " Assets"}
          />
          <IonCardContent>{assets}</IonCardContent>
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
      <Refresher onRefresh={doRefresh} />
      {content}
    </Page>
  );
};

export default ProjectAssets;
