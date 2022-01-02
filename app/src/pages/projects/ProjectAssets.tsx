import {
  IonAccordion,
  IonAccordionGroup,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonItem,
  IonLabel,
  IonList,
  IonRow,
} from "@ionic/react";
import { useContext } from "react";
import { useParams } from "react-router";
import AssetItem from "../../components/assets/AssetItem";
import Page from "../../components/Page";
import { ProjectDataContext } from "../../contexts/project/ProjectDataContext";
import { MassFormatter, MoneyFormatter } from "../../utilities/Formatters";
import Refresher from "../../components/Refresher";
import BrandText from "../../components/menu/components/BrandText";

export interface IProjectAssets {
  assets: [IAssetTypeData];
  totals: {
    status: string;
    discountPrice: {
      amount: string;
      currency: string;
    };
    price: {
      amount: string;
      currency: string;
    };
    mass: number;
  };
}

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
  let content;
  if (
    projectData.FINANCIALS &&
    projectData.FINANCIALS.assetsAssigned &&
    Object.keys(projectData.FINANCIALS.assetsAssigned).length > 0
  ) {
    const assets: JSX.Element[] = [];

    for (const [assetTypeKey, assetTypeValue] of Object.entries(
      projectData.FINANCIALS.assetsAssigned,
    )) {
      if (assetTypeValue) {
        const typedAsset = assetTypeValue as IProjectAssets;
        //append list to main asset list
        assets.push(
          <IonAccordionGroup multiple={true} key={assetTypeKey}>
            <IonAccordion value={assetTypeKey}>
              <IonItem slot="header">
                <IonGrid>
                  <IonRow>
                    <IonCol size="2">
                      <IonLabel>
                        {typedAsset.assets.length}x{" "}
                        {typedAsset.assets[0].assetTypes_name}
                      </IonLabel>
                    </IonCol>
                    <IonCol size="4">{typedAsset.totals.status}</IonCol>
                    <IonCol size="1">
                      {MassFormatter(typedAsset.totals.mass)}
                    </IonCol>
                    <IonCol size="1">
                      {MoneyFormatter(
                        typedAsset.totals.price.currency,
                        typedAsset.totals.price.amount,
                      )}
                    </IonCol>
                    <IonCol size="1">
                      {MoneyFormatter(
                        typedAsset.totals.discountPrice.currency,
                        typedAsset.totals.discountPrice.amount,
                      )}
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonItem>
              <IonList slot="content">
                {
                  //generate list of individual assets
                  typedAsset.assets.map((item: any) => {
                    return (
                      <AssetItem
                        key={item.assets_id}
                        AssetTypeId={assetTypeKey}
                        item={item}
                      />
                    );
                  })
                }
              </IonList>
            </IonAccordion>
          </IonAccordionGroup>,
        );
      }
    }
    content = (
      <>
        <IonCardHeader>
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
        <IonCardContent>{assets}</IonCardContent>
      </>
    );
  } else {
    content = (
      <IonCardHeader>
        <IonCardTitle>No Assets Assigned to this Project</IonCardTitle>
      </IonCardHeader>
    );
  }
  return (
    <Page title="Project Assets">
      <Refresher onRefresh={doRefresh} />
      <IonCard>{content}</IonCard>
    </Page>
  );
};

export default ProjectAssets;
