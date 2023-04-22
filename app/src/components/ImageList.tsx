import {
  IonAvatar,
  IonImg,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItem,
  IonLabel,
  IonList,
} from "@ionic/react";
import StyledIonSkeletonText from "./styled/StyledIonSkeletonText";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

export type ImageListItemType = {
  image?: {
    url: string;
    alt: string;
  };
  mainContent: any;
  endContent?: any;
  link?: string;
};

type ImageListType = {
  items?: ImageListItemType[];
  isLoading?: boolean;
  onIonInfinite?: (event?: any) => void;
  loadingCount?: number;
};

/**
 * Creates a list of items with images similar to the NavList
 * but with images instead of icons. Also supports infinite scroll if passed
 *
 * Image and Content are required
 *
 * @param items The list as defined above or in NavListItemType[]
 * @param isLoading This is boolean and if set to true, it will provide
 *                  a number (based off loadingCount) of skeletons for loading
 * @param onIonInfinite This is a function that will be called for infinite scroll
 * @param loadingCount defaults to 7. The number of skeleton items to display
 *                     when isLoading is set to true
 */
const ImageList: React.FC<ImageListType> = ({
  items = [],
  isLoading = false,
  onIonInfinite = null,
  loadingCount = 7,
}) => {
  const generateContent = (list: ImageListItemType[]) => {
    return list.map((item: ImageListItemType, index: number) => {
      return (
        <IonItem key={index} routerLink={item.link} button detail={true}>
          <ThumbnailContainer>
            {item.image && item.image.url ? (
              <IonAvatar slot="start">
                <IonImg src={item.image.url} alt={item.image.alt} />
              </IonAvatar>
            ) : (
              <FontAwesomeIcon icon={faQuestionCircle} size="2x" />
            )}
          </ThumbnailContainer>
          <IonLabel>{item.mainContent}</IonLabel>
          <IonLabel slot="end">
            {item.endContent ? item.endContent : null}
          </IonLabel>
        </IonItem>
      );
    });
  };

  if (isLoading) {
    items = [...Array(loadingCount)].map((index) => {
      return {
        mainContent: <StyledIonSkeletonText animated key={index} />,
      };
    });
  }
  // Return a Ionic list with the content
  return (
    <div>
      <IonList>{generateContent(items)}</IonList>
      {onIonInfinite && (
        <IonInfiniteScroll onIonInfinite={onIonInfinite} threshold="100px">
          <IonInfiniteScrollContent
            loadingSpinner="bubbles"
            loadingText="Loading more assets..."
          />
        </IonInfiniteScroll>
      )}
    </div>
  );
};

const ThumbnailContainer = styled.div`
  margin: 10px;
`;

export default ImageList;
