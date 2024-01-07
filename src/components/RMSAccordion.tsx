import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { HStack, Box, Container } from "native-base";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import Accordion from "react-native-collapsible/Accordion";

interface IAccordionSection {
  header: JSX.Element;
  content: JSX.Element;
}

const RMSAccordion = ({ sections }: { sections: IAccordionSection[] }) => {
  const [activeSections, setActiveSections] = useState<number[]>([]);

  const renderHeader = (section: any, _: any, isActive: boolean) => {
    return (
      <HStack
        p="2"
        borderBottomColor="gray.300"
        borderBottomStyle="solid"
        borderBottomWidth="1"
      >
        <Box>{section.header}</Box>
        <Box my="auto" ml="auto" mr="2">
          {isActive ? (
            <FontAwesomeIcon icon={faChevronUp} />
          ) : (
            <FontAwesomeIcon icon={faChevronDown} />
          )}
        </Box>
      </HStack>
    );
  };

  const RenderContent = (section: any) => {
    return (
      <Container
        p="2"
        w="full"
        borderColor="gray.300"
        borderStyle="solid"
        borderWidth="1"
        borderTopWidth="0"
        borderBottomRadius="md"
      >
        {section.content}
      </Container>
    );
  };

  return (
    <Box width="full">
      <Accordion
        activeSections={activeSections}
        sections={sections}
        expandMultiple={true}
        touchableComponent={TouchableOpacity}
        renderHeader={renderHeader}
        renderContent={RenderContent}
        onChange={setActiveSections}
      />
    </Box>
  );
};

export default RMSAccordion;
