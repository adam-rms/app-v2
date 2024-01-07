import { Box, Container, Image } from "native-base";
import { FlatList } from "react-native-gesture-handler";

interface ImageSlideshowProps {
  images: IThumbnail[];
}

const ImageSlideshow: React.FC<ImageSlideshowProps> = ({ images }) => {
  return (
    <Container mx="5" my="2">
      <FlatList
        horizontal
        data={images}
        contentContainerStyle={{ flex: 1, justifyContent: "center" }}
        renderItem={({ item }) => (
          <Box>
            <Image
              source={{ uri: item.url }}
              borderRadius="lg"
              alt={item.s3files_name}
              size="xl"
            />
          </Box>
        )}
      />
    </Container>
  );
};

export default ImageSlideshow;
