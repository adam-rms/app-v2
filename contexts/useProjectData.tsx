// Project Data

import { ReactNode, createContext, useContext, useMemo, useState } from "react";
import Api from "../utilities/Api";

/** Parameters returned from the context
 * @see useProjectData
 */
interface ProjectDataContextType {
  projectData: IProjectData;
  projectComments: IComment[];
  projectCrewRoles: IProjectCrewRole[];
  refreshProjectData: (id?: number, event?: CustomEvent) => void;
  refreshProjectCrewRoles: (id: number) => void;
}

// The actual context
export const ProjectDataContext = createContext<ProjectDataContextType>(
  {} as ProjectDataContextType,
);

//Create a provider wrapper to make the interaction with the context easier
export const ProjectDataProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
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
  async function refreshProjectData(id?: number, event?: CustomEvent) {
    setProjectData(await Api("projects/data.php", { id: id }));
    setProjectComments(
      await Api("/projects/getComments.php", { projects_id: id }),
    );
    setprojectCrewRoles(
      await Api("/projects/crew/crewRoles/list.php", { projects_id: id }),
    );
    if (event) event.detail.complete();
  }

  /**
   * Just refresh project crew roles
   * @param id project id to refresh
   */
  async function refreshProjectCrewRoles(id: number) {
    setprojectCrewRoles(
      await Api("/projects/crew/crewRoles/list.php", { projects_id: id }),
    );
  }

  //Memoize the context to prevent unnecessary re-renders
  const memoedValue = useMemo(
    () => ({
      projectData,
      projectComments,
      projectCrewRoles,
      refreshProjectCrewRoles,
      refreshProjectData,
    }),
    [projectData, projectComments, projectCrewRoles],
  );

  // Don't forget to add new functions to the value of the provider!
  return (
    <ProjectDataContext.Provider value={memoedValue}>
      {children}
    </ProjectDataContext.Provider>
  );
};

/**
 * Wraps the ProjectContext
 * @returns An object containing:
 * - projectData: IProjectData - the project data
 * - projectComments: IComment[] - the project comments
 * - projectCrewRoles: IProjectCrewRole[] - the project crew roles
 * - refreshProjectData: (id?: number, event?: CustomEvent) => void - a function to refresh the project data
 * - refreshProjectCrewRoles: (id: number) => void - a function to refresh the project crew roles
 */
export default function useProjectData() {
  return useContext(ProjectDataContext);
}
