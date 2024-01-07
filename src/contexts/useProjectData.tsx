// Project Data

import { ReactNode, createContext, useContext, useMemo, useState } from "react";
import Api from "@utility/Api";
import { useToast } from "native-base";
import useInstances from "./useInstances";

/** Parameters returned from the context
 * @see useProjectData
 */
interface ProjectDataContextType {
  projectData: IProjectData;
  projectComments: IComment[];
  projectCrewRoles: IProjectCrewRole[];
  refreshProjectData: (id: number, event?: CustomEvent) => Promise<void>;
  refreshProjectCrewRoles: (id?: number) => Promise<void>;
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
  const toast = useToast();
  const { instancePermissionCheck } = useInstances();
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
  async function refreshProjectData(id: number, event?: CustomEvent) {
    if (instancePermissionCheck("PROJECTS:VIEW")) {
      const dataResponse = await Api("projects/data.php", { id: id });
      const commentsResponse = await Api("projects/getComments.php", {
        projects_id: id,
      });
      if (dataResponse.result) setProjectData(dataResponse.response);
      if (commentsResponse.result)
        setProjectComments(commentsResponse.response);

      //Check if user has permission to view crew roles
      if (
        instancePermissionCheck(
          "PROJECTS:PROJECT_CREW:VIEW:VIEW_AND_APPLY_FOR_CREW_ROLES",
        )
      ) {
        const crewRolesResponse = await Api(
          "projects/crew/crewRoles/list.php",
          {
            projects_id: id,
          },
        );
        if (crewRolesResponse.result)
          setprojectCrewRoles(crewRolesResponse.response);
      }

      if (event) event.detail.complete();
    } else {
      console.info("No permission to view projects");
    }
  }

  /**
   * Just refresh project crew roles
   * @param id project id to refresh
   */
  async function refreshProjectCrewRoles(id?: number) {
    if (
      instancePermissionCheck("PROJECTS:VIEW") &&
      instancePermissionCheck(
        "PROJECTS:PROJECT_CREW:VIEW:VIEW_AND_APPLY_FOR_CREW_ROLES",
      )
    ) {
      const crewRolesResponse = await Api("projects/crew/crewRoles/list.php", {
        projects_id: id,
      });
      if (crewRolesResponse.result) {
        setprojectCrewRoles(crewRolesResponse.response);
      } else {
        toast.show({
          title: "Error Loading Crew Roles",
          description: crewRolesResponse.error,
        });
      }
    }
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
    [projectData, projectComments, projectCrewRoles, instancePermissionCheck],
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
