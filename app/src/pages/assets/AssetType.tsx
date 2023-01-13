import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonRow,
  IonSlide,
  IonSlides,
} from "@ionic/react";
import { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fileExtensionToIcon, formatSize, s3url } from "../../utilities/Files";
import { AssetTypeContext } from "../../contexts/asset/AssetTypeContext";
import Page from "../../components/Page";
import AssetItem from "../../components/assets/AssetItem";
import Refresher from "../../components/Refresher";

/**
 * Asset Type Page
 * Lists details for an individual asset type
 */
const AssetType = () => {
  const { type } = useParams<{ type: string }>();
  const { AssetTypes, refreshAssetTypes } = useContext(AssetTypeContext);

  function doRefresh(event?: CustomEvent) {
    refreshAssetTypes();
    if (event) event.detail.complete();
  }

  useEffect(() => {
    doRefresh();
  }, []);

  //filter by requested asset type
  const thisAssetType: IAssetTypeData = AssetTypes.assets.find(
    (element: IAssetTypeData) => element.assetTypes_id == parseInt(type),
  );

  //if we've got the asset, show data
  if (thisAssetType) {
    //generate image carousel
    let images;
    if (thisAssetType.thumbnails && thisAssetType.thumbnails.length > 0) {
      images = (
        <IonSlides>
          {thisAssetType.thumbnails.map((image: any) => {
            return (
              <IonSlide key={image.s3files_name}>
                <IonImg src={image.url} alt={image.s3files_name} />
              </IonSlide>
            );
          })}
        </IonSlides>
      );
    }

    let files;
    //Generate file list
    if (thisAssetType.files && thisAssetType.files.length > 0) {
      files = (
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Asset Type Files</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              {thisAssetType.files.map((item: IFile) => {
                return (
                  <IonItem
                    button
                    key={item.s3files_id}
                    onClick={async () => {
                      window.open(
                        await s3url(item.s3files_id, item.s3files_meta_size),
                        "_system",
                      );
                    }}
                  >
                    <IonLabel slot="start" className="flex-02">
                      <FontAwesomeIcon
                        icon={fileExtensionToIcon(item.s3files_extension)}
                      />
                    </IonLabel>
                    <IonLabel>
                      <h2>{item.s3files_name}</h2>
                    </IonLabel>
                    <IonLabel slot="end">
                      {formatSize(item.s3files_meta_size)}
                    </IonLabel>
                  </IonItem>
                );
              })}
            </IonList>
          </IonCardContent>
        </IonCard>
      );
    }

    //return page layout
    return (
      <Page title={thisAssetType.assetTypes_name}>
        <Refresher onRefresh={doRefresh} />
        {images}
        <IonCard>
          <IonCardContent>
            <IonRow>
              <IonCol>
                <div className="container">
                  <IonCardSubtitle>Manufacturer</IonCardSubtitle>
                  <IonCardTitle>
                    {thisAssetType.manufacturers_name}
                  </IonCardTitle>
                </div>
                <div className="container">
                  <IonCardSubtitle>Category</IonCardSubtitle>
                  <IonCardTitle>
                    {thisAssetType.assetCategories_name}
                  </IonCardTitle>
                </div>
                {thisAssetType.assetTypes_productLink && (
                  <div className="container">
                    <IonCardSubtitle>Product Link</IonCardSubtitle>
                    <IonButton
                      href={thisAssetType.assetTypes_productLink}
                      target="_system"
                    >
                      Manufacturer Information
                      <div slot="end">
                        <FontAwesomeIcon icon="chevron-right"></FontAwesomeIcon>
                      </div>
                    </IonButton>
                  </div>
                )}
              </IonCol>
              <IonCol>
                <div className="container">
                  <IonCardSubtitle>Weight</IonCardSubtitle>
                  <IonCardTitle>
                    {thisAssetType.assetTypes_mass_format}
                  </IonCardTitle>
                </div>
                <div className="container">
                  <IonCardSubtitle>Value</IonCardSubtitle>
                  <IonCardTitle>
                    {thisAssetType.assetTypes_value_format}
                  </IonCardTitle>
                </div>
                <div className="container">
                  <IonCardSubtitle>Day Rate</IonCardSubtitle>
                  <IonCardTitle>
                    {thisAssetType.assetTypes_dayRate_format}
                  </IonCardTitle>
                </div>
                <div className="container">
                  <IonCardSubtitle>Week Rate</IonCardSubtitle>
                  <IonCardTitle>
                    {thisAssetType.assetTypes_weekRate_format}
                  </IonCardTitle>
                </div>
              </IonCol>
            </IonRow>
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Individual Assets</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              {thisAssetType.tags.map((item: any) => {
                return (
                  <AssetItem
                    key={item.assets_id}
                    AssetTypeId={thisAssetType.assetTypes_id}
                    item={item}
                  />
                );
              })}
            </IonList>
          </IonCardContent>
        </IonCard>
        {files}
      </Page>
    );
  } else {
    //If there isn't an asset, refresh context to see if that helps
    refreshAssetTypes();
    //If there is still no assets, it's probably a network issue
    //TODO: Handle network issues more gracefully

    return (
      <Page title="No Asset Found">
        <IonCardTitle>No Asset Found, Please Wait</IonCardTitle>
      </Page>
    );
  }
};

export default AssetType;
