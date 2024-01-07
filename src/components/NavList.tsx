import { useNavigation, NavigationProp } from "@react-navigation/native";
import { View, RefreshControl } from "react-native";
import {
  faArrowAltCircleDown,
  faChevronRight,
  faSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { RMSDrawerParamList } from "@utility/Routing";
import {
  Pressable,
  Container,
  HStack,
  FlatList,
  Skeleton,
  Text,
  VStack,
  Box,
} from "native-base";
import Card from "./Card";
import ScrollContainer from "./ScrollContainer";

export type NavListItemType = {
  id: number;
  icon?: IconProp;
  content: any;
  link?: keyof RMSDrawerParamList;
  linkAttributes?: any;
  subItems?: NavListItemType[];
};

type NavListType = {
  items?: NavListItemType[];
  isLoading?: boolean;
  loadingCount?: number;
  onRefresh?: () => void;
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
 * @param doRefresh A function that will be called when the user pulls down on the list
 *
 * @author Robert-Watts
 */
const NavList: React.FC<NavListType> = ({
  items = [],
  isLoading = true,
  loadingCount = 7,
  onRefresh,
}) => {
  const navigation = useNavigation<NavigationProp<RMSDrawerParamList>>();

  /**
   * Use recursion to take a list of nav items and generate the content.
   * Because recursion of used the depth of sub items can be infinite.
   *
   * @param list The list of nav items
   * @param depth the depth that this list is
   */
  const NavListItem = (item: NavListItemType, depth = 0) => (
    <Container w="full" maxW="full">
      <Pressable
        onPress={() => {
          if (item.link) {
            navigation.navigate(item.link, item.linkAttributes);
          }
        }}
      >
        <HStack
          minH="15"
          w="full"
          p="2"
          borderColor="coolGray.200"
          borderWidth="1"
        >
          <HStack my="auto" ml="2" mr="2">
            {/*Generate the spacers or arrows if the depth is not 0*/}
            {[...Array(depth)].map((e, spacer_index) => {
              return (
                <Box key={`${depth}-${item.id}-${spacer_index}`}>
                  {spacer_index == depth - 1 ? (
                    <Text bold>↳</Text>
                  ) : (
                    <Box>
                      <FontAwesomeIcon
                        icon={
                          spacer_index == depth - 1
                            ? faArrowAltCircleDown
                            : faSquare
                        }
                        color={"transparent"}
                      />
                    </Box>
                  )}
                </Box>
              );
            })}
            {/*Generate the Icon, otherwise put a transparent placeholder in for width purposes*/}
            <Box my="auto" mx={1}>
              <FontAwesomeIcon
                icon={item.icon ? item.icon : faSquare}
                color={item.icon ? undefined : "transparent"}
              />
            </Box>
          </HStack>
          {/*Add the content*/}
          <Container m="1">{item.content}</Container>
          <Container my="auto" ml="auto" mr="2">
            <FontAwesomeIcon icon={faChevronRight} />
          </Container>
        </HStack>
      </Pressable>
      {/*Generate all the sub items using recursion*/}
      {item.subItems?.map((subItem): JSX.Element => {
        return NavListItem(subItem, depth + 1);
      })}
    </Container>
  );

  // Return a list with the content
  return (
    <Container w="full" maxW="full" h="auto">
      <Card>
        <ScrollContainer
          refreshControl={
            <RefreshControl onRefresh={onRefresh} refreshing={isLoading} />
          }
        >
          {/*If is loading is set we want to generate a number of SkeletonTexts based off loadingCount */}
          {/*and display them. Otherwise we will generate the list items*/}
          {isLoading ? (
            <FlatList
              w="full"
              data={Array(loadingCount)}
              renderItem={() => {
                return <Skeleton h="20" my="0.5" />;
              }}
              keyExtractor={(item, index) => index.toString()}
              scrollEnabled={false}
            />
          ) : (
            <FlatList
              w="full"
              data={items}
              renderItem={({ item }) => NavListItem(item)}
              keyExtractor={(item) => "project_" + item.id}
              scrollEnabled={false}
            ></FlatList>
          )}
        </ScrollContainer>
      </Card>
    </Container>
  );
};

export default NavList;
