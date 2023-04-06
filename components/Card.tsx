import { Box } from "native-base";

interface CardProps {
  children: React.ReactNode;
}

const Card = (props: CardProps) => {
  return (
    <Box alignContent="center" m="2" maxW="full">
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
        {props.children}
      </Box>
    </Box>
  );
};

export default Card;
