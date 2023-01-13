import { IonItem, IonLabel, IonList, IonNote } from "@ionic/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import StyledIonSkeletonText from "./styled/StyledIonSkeletonText";
import { Fragment as ReactFragment } from "react";

export type NavListItemType = {
  icon?: IconProp;
  content: any;
  link?: string;
  subItems?: NavListItemType[];
};

type NavListType = {
  items?: NavListItemType[];
  isLoading?: boolean;
  loadingCount?: number;
};

/**
 * Creates a navigation list much like the example found at
 * https://ionicframework.com/docs/api/nav (although this page
 * talks about nav events, the example is what has been created here).
 *
 * Pass a list of items in the following format and it builds the rest
 * [
 *    {
 *      icon:
 *      content:
 *      link:
 *      subItems: []
 *    }
 * ]
 *
 * The only item that is required is content. The rest just add features
 * to the list item
 *
 * @param items The list as defined above or in NavListItemType[]
 * @param isLoading This is boolean and if set to true, it will provide
 *                  a number (based off loadingCount) of skeletons for loading
 * @param loadingCount defaults to 7. The number of skeleton items to display
 *                     when isLoading is set to true
 */
const NavList: React.FC<NavListType> = ({
  items = [],
  isLoading = false,
  loadingCount = 7,
}) => {
  /**
   * Use recursion to take a list of nav items and generate the content.
   * Because recursion of used the depth of sub items can be infinite.
   *
   * @param list The list of nav items
   * @param depth the depth that this list is
   */
  function generateItemsList(list: NavListItemType[], depth = 0): any {
    // Map the list if items
    return list.map((item: NavListItemType, index: number) => {
      return (
        <ReactFragment key={`${depth}-${index}`}>
          <IonItem routerLink={item.link} button detail={true}>
            {/*Generate the spacers or arrows if the depth is not 0*/}
            {[...Array(depth)].map((e, spacer_index) => {
              return (
                <IonNote
                  slot={"start"}
                  key={`${depth}-${index}-${spacer_index}`}
                >
                  {spacer_index == depth - 1 ? (
                    "↳"
                  ) : (
                    <FontAwesomeIcon
                      icon={
                        spacer_index == depth - 1
                          ? "arrow-alt-circle-down"
                          : "square"
                      }
                      color={"transparent"}
                    />
                  )}
                </IonNote>
              );
            })}

            {/*Generate the Icon, otherwise put a transparent placeholder in for width purposes*/}
            <IonNote slot={"start"}>
              <FontAwesomeIcon
                icon={item.icon ? item.icon : "square"}
                color={item.icon ? undefined : "transparent"}
              />
            </IonNote>

            {/*Add the content*/}
            <IonLabel>{item.content}</IonLabel>
          </IonItem>

          {/*Generate all the sub items using recursion*/}
          {item.subItems && generateItemsList(item.subItems, depth + 1)}
        </ReactFragment>
      );
    });
  }

  // Return a Ionic list with the content
  return (
    <IonList>
      {/*If is loading is set we want to generate a number of SkeletonTexts based off loadingCount */}
      {/*and display them. Otherwise we will generate the list items*/}
      {isLoading
        ? generateItemsList(
            [...Array(loadingCount)].map((e, index) => {
              return {
                content: <StyledIonSkeletonText animated key={index} />,
              };
            }),
          )
        : generateItemsList(items)}
    </IonList>
  );
};

export default NavList;
