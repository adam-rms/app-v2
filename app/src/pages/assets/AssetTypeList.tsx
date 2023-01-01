import { faQuestionCircle, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  IonAvatar,
  IonCard,
  IonCardTitle,
  IonImg,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItem,
  IonLabel,
  IonList,
  useIonRouter,
} from "@ionic/react";
import styled from "styled-components";
import { useContext, useEffect } from "react";
import { AssetTypeContext } from "../../contexts/asset/AssetTypeContext";
import { LocationContext } from "../../contexts/location/LocationContext";
import Page from "../../components/Page";
import Refresher from "../../components/Refresher";
import GetAssetFromBarcode from "../../utilities/barcode/GetAssetFromBarcode";
import { useRMSToast } from "../../hooks/useRMSToast";

/**
 * Asset Type List Page
 * Lists all asset types for a business
 */
const AssetTypeList = () => {
  const { AssetTypes, refreshAssetTypes, getMoreAssets } =
    useContext(AssetTypeContext);
  const { getRMSLocation } = useContext(LocationContext);
  const router = useIonRouter();
  const [present] = useRMSToast();

  const buttons = [
    {
      icon: faSearch,
      onClick: () => {
        getRMSLocation(true).then((location: ILocation) => {
          GetAssetFromBarcode(location).then((asset: IAsset) => {
            if (asset) {
              router.push(
                "/assets/" + asset.assetTypes_id + "/" + asset.assets_id,
              );
            } else {
              if (location.value) {
                //if there is a valid location, the asset couldn't be found
                present("Asset Not found");
              } else {
                present(
                  "Please set your location before searching for an asset",
                );
              }
            }
          });
        });
      },
    },
  ];

  function doRefresh(event: CustomEvent) {
    refreshAssetTypes().then(() => {
      event.detail.complete();
    });
  }

  function loadData(event: any) {
    getMoreAssets().then(() => {
      event.target.complete();
    });
  }

  //Get data from API
  useEffect(() => {
    refreshAssetTypes();
  }, []);

  if (AssetTypes) {
    return (
      <Page title="Asset List" buttons={buttons}>
        <Refresher onRefresh={doRefresh} />
        <IonCard>
          <IonList>
            {AssetTypes.assets.map((item: IAssetTypeData) => {
              return (
                <IonItem
                  key={item.assetTypes_id}
                  routerLink={"/assets/" + item.assetTypes_id}
                >
                  <ThumbnailContainer>
                    {item.thumbnails.length > 0 && (
                      <IonAvatar slot="start">
                        <IonImg
                          src={item.thumbnails[0].url}
                          alt={item.assetTypes_name}
                        />
                      </IonAvatar>
                    )}
                    {item.thumbnails.length == 0 && (
                      <FontAwesomeIcon icon={faQuestionCircle} size="2x" />
                    )}
                  </ThumbnailContainer>
                  <IonLabel>
                    <h2>{item.assetTypes_name}</h2>
                    <p>{item.assetCategories_name}</p>
                  </IonLabel>
                  <IonLabel slot="end">
                    <p>x{item.tags.length}</p>
                  </IonLabel>
                </IonItem>
              );
            })}
          </IonList>
          <IonInfiniteScroll onIonInfinite={loadData} threshold="100px">
            <IonInfiniteScrollContent
              loadingSpinner="bubbles"
              loadingText="Loading more assets..."
            />
          </IonInfiniteScroll>
        </IonCard>
      </Page>
    );
  } else {
    //If there isn't an asset, refresh context to see if that helps
    refreshAssetTypes();
    //If there is still no assets, it's probably a network issue
    return (
      <Page title="Asset List">
        <Refresher onRefresh={doRefresh} />
        <IonCard>
          <IonCardTitle>No Assets found</IonCardTitle>
        </IonCard>
      </Page>
    );
  }
};

const ThumbnailContainer = styled.div`
  margin: 10px;
`;

export default AssetTypeList;
