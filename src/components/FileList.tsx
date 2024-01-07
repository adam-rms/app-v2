import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  Heading,
  Divider,
  FlatList,
  Box,
  Pressable,
  HStack,
} from "native-base";
import * as Linking from "expo-linking";
import { s3url, fileExtensionToIcon, formatSize } from "@utility/Files";
import Card from "./Card";

interface FileListProps {
  files: IFile[];
  cardTitle?: string;
}

const FileList: React.FC<FileListProps> = ({ files, cardTitle }) => {
  if (!files || files.length === 0) return null;
  return (
    <Card>
      <Heading>{cardTitle ? cardTitle : "Files"}</Heading>
      <Divider />
      <FlatList
        data={files}
        scrollEnabled={false}
        renderItem={({ item }: { item: IFile }) => {
          return (
            <Pressable
              key={item.s3files_id}
              onPress={async () => {
                Linking.openURL(
                  await s3url(item.s3files_id, item.s3files_meta_size),
                );
              }}
            >
              <HStack>
                <Box>
                  <FontAwesomeIcon
                    icon={fileExtensionToIcon(item.s3files_extension)}
                  />
                </Box>
                <Heading>{item.s3files_name}</Heading>
                <Box>{formatSize(item.s3files_meta_size)}</Box>
              </HStack>
            </Pressable>
          );
        }}
      />
    </Card>
  );
};

export default FileList;
