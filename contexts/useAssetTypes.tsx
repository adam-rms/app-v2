// Asset Type Data

import { ReactNode, createContext, useContext, useMemo, useState } from "react";
import Api from "../utilities/Api";
import { useToast } from "native-base";

/** Parameters returned from the context
 * @see useAssetTypes
 */
interface AssetTypeContextType {
  AssetTypes: IAssetType;
  refreshAssetTypes: (assetTypes_id?: number) => Promise<void>;
  getMoreAssets: () => Promise<void>;
}

// The actual context
export const AssetTypeContext = createContext<AssetTypeContextType>(
  {} as AssetTypeContextType,
);

//Create a provider wrapper to make the interaction with the context easier
export const AssetTypeProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const toast = useToast();
  //Create default state
  const [AssetTypes, setAssetTypes] = useState<IAssetType>({
    assets: [],
    pagination: {
      page: 0,
      total: 0,
    },
  });

  /**
   * Refresh Context
   * Replace all assets in context
   */
  async function refreshAssetTypes(assetTypes_id?: number) {
    if (assetTypes_id) {
      const assetList = await Api("assets/list.php", {
        assetTypes_id: assetTypes_id,
      });
      if (assetList.result) {
        setAssetTypes(assetList.response);
      } else {
        toast.show({
          title: "Error Loading Assets",
          description: assetList.error,
        });
      }
    } else {
      const assetList = await Api("assets/list.php", {
        all: true,
      });
      if (assetList.result) {
        setAssetTypes(assetList.response);
      } else {
        toast.show({
          title: "Error Loading Assets",
          description: assetList.error,
        });
      }
    }
  }

  /**
   * Extend Context
   * Add more assets to the list if available
   */
  async function getMoreAssets() {
    //check if there are more pages to get
    if (AssetTypes.pagination.page < AssetTypes.pagination.total) {
      //get assets
      const assetResponse = await Api("assets/list.php", {
        all: true,
        page: AssetTypes.pagination.page + 1,
      });
      if (assetResponse.result) {
        const newassets: IAssetType = assetResponse.response;
        newassets.assets = AssetTypes.assets.concat(newassets.assets);
        setAssetTypes(newassets);
      } else {
        toast.show({
          title: "Error Loading Assets",
          description: assetResponse.error,
        });
      }
    }
  }

  //Memoize the context to prevent unnecessary re-renders
  const memoedValue = useMemo(
    () => ({
      AssetTypes,
      refreshAssetTypes,
      getMoreAssets,
    }),
    [AssetTypes],
  );

  // Don't forget to add new functions to the value of the provider!
  return (
    <AssetTypeContext.Provider value={memoedValue}>
      {children}
    </AssetTypeContext.Provider>
  );
};

/**
 * Wraps the AssetTypeProvider
 * @returns An object containing:
 * - AssetTypes: IAssetType - the current list of assets
 * - refreshAssetTypes: (assetTypes_id?: number) => void - a function to refresh the asset list
 * - getMoreAssets: () => void - a function to get the next page of assets
 */
export default function useAssetTypes() {
  return useContext(AssetTypeContext);
}
