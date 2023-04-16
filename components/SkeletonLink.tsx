import { HStack, Skeleton } from "native-base";
import SkeletonText from "./SkeletonText";

const SkeletonLink = () => {
  return (
    <HStack>
      <Skeleton rounded="full" />
      <SkeletonText lines={1} />
    </HStack>
  );
};

export default SkeletonLink;
