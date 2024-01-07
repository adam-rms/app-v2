import { Card } from "native-base";
import SkeletonText from "./SkeletonText";

const SkeletonCard = () => {
  return (
    <Card>
      <SkeletonText />
      <SkeletonText />
      <SkeletonText />
      <SkeletonText />
      <SkeletonText />
    </Card>
  );
};

export default SkeletonCard;
