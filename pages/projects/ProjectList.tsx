import { useEffect, useState } from "react";
import { Heading, Text, Container, VStack } from "native-base";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import useProjects from "../../contexts/useProjects";
import NavList, { NavListItemType } from "../../components/NavList";

const ProjectList = () => {
  const { projects, refreshProjects } = useProjects();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [listItems, setListItems] = useState<NavListItemType[]>([]);

  const doRefresh = async () => {
    setIsLoading(true);
    await refreshProjects();
    setIsLoading(false);
  };

  //Get data from API on page load
  useEffect(() => {
    doRefresh();
  }, []);

  useEffect(() => {
    if (!projects) return;
    const items = projects.map((project: IProject): NavListItemType => {
      return {
        id: project.projects_id,
        link: "Project", //`/projects/${project.projects_id}/`,
        linkAttributes: { projectId: project.projects_id },
        icon: project.thisProjectManager ? faStar : faCircle,
        content: (
          <VStack key={"project_" + project.projects_id + "_content"}>
            <Heading size="md">{project.projects_name}</Heading>
            <Text>{project.clients_name}</Text>
          </VStack>
        ),
      };
    });
    setListItems(items);
  }, [projects]);

  return (
    <Container w="full" maxW="full" minW="full" p="4">
      {!projects && !isLoading ? (
        <Text> No Projects Found</Text>
      ) : (
        <NavList
          items={listItems}
          isLoading={isLoading}
          onRefresh={doRefresh}
        />
      )}
    </Container>
  );
};

export default ProjectList;
