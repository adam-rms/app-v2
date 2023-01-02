import { createContext, useState } from "react";
import Api from "../../utilities/Api";

// The actual context
export const ProjectDataContext = createContext<any>(null);

//Create a provider wrapper to make the interaction with the context easier
const ProjectDataProvider: React.FC<React.ReactNode> = ({ children }) => {
  //State for project data
  const [projectData, setProjectData] = useState<IProjectData>({
    project: {},
    files: [],
    assetsAssignmentsStatus: [],
    FINANCIALS: {},
  });

  //State for project comments
  const [projectComments, setProjectComments] = useState<IComment[]>([]);

  //State for Project Crew
  const [projectCrewRoles, setprojectCrewRoles] = useState<IProjectCrewRole[]>(
    [],
  );

  /**
   * Refresh Context
   * Replace all projects in context
   */
  async function refreshProjectData(id: number) {
    setProjectData(await Api("projects/data.php", { id: id }));
    setProjectComments(
      await Api("/projects/getComments.php", { projects_id: id }),
    );
    setprojectCrewRoles(
      await Api("/projects/crew/crewRoles/list.php", { projects_id: id }),
    );
  }

  // Don't forget to add new functions to the value of the provider!
  return (
    <ProjectDataContext.Provider
      value={{
        projectData,
        projectComments,
        projectCrewRoles,
        refreshProjectData,
      }}
    >
      {children}
    </ProjectDataContext.Provider>
  );
};

export default ProjectDataProvider;
