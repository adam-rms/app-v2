import { Box } from "native-base";
import { InterfaceBoxProps } from "native-base/lib/typescript/components/primitives/Box";

const Card = ({
  children,
  ...wrapperProps
}: React.PropsWithChildren<InterfaceBoxProps>) => {
  return (
    <Box alignContent="center" m="2" maxW="full" {...wrapperProps}>
      <Box
        minW="full"
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="1"
        _dark={{
          borderColor: "coolGray.600",
          backgroundColor: "gray.700",
        }}
        _web={{
          shadow: 2,
          borderWidth: 0,
        }}
        _light={{
          backgroundColor: "gray.50",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Card;
