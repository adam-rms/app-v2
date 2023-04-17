import { NavigationProp, useNavigation } from "@react-navigation/native";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  Avatar,
  Box,
  Container,
  FlatList,
  HStack,
  Heading,
  Pressable,
  Text,
} from "native-base";
import SkeletonText from "./SkeletonText";
import { RMSDrawerParamList } from "../utilities/Routing";
import Card from "./Card";

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
  onRefresh?: () => void;
  onInfiniteScroll?: (event?: any) => void;
  loadingCount?: number;
  ListEmptyComponent?: JSX.Element;
  ListFooterComponent?: JSX.Element;
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
 * @param onInfiniteScroll This is a function that will be called for infinite scroll
 * @param loadingCount defaults to 7. The number of skeleton items to display
 *                     when isLoading is set to true
 */
const ImageList: React.FC<ImageListType> = ({
  items = [],
  isLoading = false,
  onRefresh = null,
  onInfiniteScroll = null,
  loadingCount = 7,
  ListEmptyComponent = null,
  ListFooterComponent = null,
}) => {
  const navigation = useNavigation<NavigationProp<RMSDrawerParamList>>();

  const ImageListItem = (item: ImageListItemType) => (
    <Container
      p="2"
      borderBottomColor="gray.300"
      borderBottomStyle="solid"
      borderBottomWidth="1"
    >
      <Pressable
        onPress={() => (item.link ? navigation.navigate(item.link) : "")}
      >
        <HStack w="full">
          <Box m="4">
            {item.image && item.image.url ? (
              <Avatar size="lg" source={{ uri: item.image.url }} />
            ) : (
              <FontAwesomeIcon icon={faQuestionCircle} />
            )}
          </Box>
          <Heading flexShrink={1}>{item.mainContent}</Heading>
          <Text ml="auto" my="auto" mr="2">
            {item.endContent ? item.endContent : null}
          </Text>
        </HStack>
      </Pressable>
    </Container>
  );

  if (isLoading) {
    items = [...Array(loadingCount)].map((index) => {
      return {
        mainContent: <SkeletonText key={index} />,
      };
    });
  }
  // Return a List
  return (
    <Container h="full">
      <FlatList
        w="full"
        h="full"
        data={items}
        renderItem={({ item }) => ImageListItem(item)}
        keyExtractor={(item, index) => index.toString()}
        onRefresh={onRefresh ?? undefined}
        refreshing={isLoading}
        onEndReached={onInfiniteScroll ?? undefined}
        onEndReachedThreshold={0.2}
        ListEmptyComponent={ListEmptyComponent ?? undefined}
        ListFooterComponent={ListFooterComponent ?? undefined}
      />
    </Container>
  );
};

export default ImageList;
