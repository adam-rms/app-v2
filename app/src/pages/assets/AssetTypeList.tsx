import { faSearch } from "@fortawesome/free-solid-svg-icons";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  useIonRouter,
} from "@ionic/react";
import { useContext, useEffect, useState } from "react";
import { AssetTypeContext } from "../../contexts/asset/AssetTypeContext";
import { LocationContext } from "../../contexts/location/LocationContext";
import Page from "../../components/Page";
import Refresher from "../../components/Refresher";
import GetAssetFromBarcode from "../../utilities/barcode/GetAssetFromBarcode";
import { useRMSToast } from "../../hooks/useRMSToast";
import ImageList, { ImageListItemType } from "../../components/ImageList";

/**
 * Asset Type List Page
 * Lists all asset types for a business
 */
const AssetTypeList = () => {
  const { AssetTypes, refreshAssetTypes, getMoreAssets } =
    useContext(AssetTypeContext);
  const { getRMSLocation } = useContext(LocationContext);
  const [isLoading, setIsLoading] = useState(false);
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

  const doRefresh = async (event?: CustomEvent) => {
    setIsLoading(true);
    await refreshAssetTypes();
    setIsLoading(false);
    if (event) event.detail.complete();
  };

  function loadData(event: any) {
    getMoreAssets().then(() => {
      event.target.complete();
    });
  }

  const generateListItems = (assetTypes: IAssetType): ImageListItemType[] => {
    if (assetTypes && assetTypes.assets) {
      return assetTypes.assets.map((assetType: IAssetTypeData) => {
        let image;
        if (assetType.thumbnails.length > 0) {
          image = {
            url: assetType.thumbnails[0].url,
            alt: assetType.assetTypes_name,
          };
        }
        return {
          image: image,
          mainContent: (
            <>
              <h2>{assetType.assetTypes_name}</h2>
              <p>{assetType.assetCategories_name}</p>
            </>
          ),
          endContent: <p>x{assetType.tags.length}</p>,
          link: "/assets/" + assetType.assetTypes_id,
        };
      });
    } else {
      return [];
    }
  };

  //Get data from API
  useEffect(() => {
    doRefresh();
  }, []);

  let content;

  if (!AssetTypes && !isLoading) {
    //We have found no assets so show empty list
    content = (
      <IonCardHeader>
        <IonCardTitle>No Assets found</IonCardTitle>
      </IonCardHeader>
    );
  } else {
    content = (
      <ImageList
        items={generateListItems(AssetTypes)}
        isLoading={!AssetTypes && isLoading}
        onIonInfinite={loadData}
      />
    );
  }

  return (
    <Page title="Asset List" buttons={buttons}>
      <Refresher onRefresh={doRefresh} />
      <IonCard>{content}</IonCard>
    </Page>
  );
};

export default AssetTypeList;
