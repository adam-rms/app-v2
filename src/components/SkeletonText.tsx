import { Skeleton } from "native-base";

const SkeletonText = ({ lines = 12 }) => {
  return <Skeleton.Text my="2" size="5" lines={lines} rounded="full" />;
};

export default SkeletonText;
