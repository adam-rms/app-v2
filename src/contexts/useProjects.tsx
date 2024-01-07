// Project Listing

import { ReactNode, createContext, useContext, useMemo, useState } from "react";
import Api from "@utility/Api";
import { useToast } from "native-base";
import useInstances from "./useInstances";

/** Parameters returned from the context
 * @see useProjects
 */
interface ProjectContextType {
  projects: IProject[];
  refreshProjects: () => Promise<void>;
}

// The actual context
export const ProjectContext = createContext<ProjectContextType>(
  {} as ProjectContextType,
);

//Create a provider wrapper to make the interaction with the context easier
export const ProjectProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const toast = useToast();
  const { instancePermissionCheck } = useInstances();
  //Create default state
  const [projects, setProjects] = useState<IProject[]>([]);

  /**
   * Refresh Context
   * Replace all projects in context
   */
  async function refreshProjects() {
    if (instancePermissionCheck("PROJECTS:VIEW")) {
      const projectResponse = await Api("projects/list.php");
      if (projectResponse.result) {
        setProjects(projectResponse.response);
      } else {
        toast.show({
          title: "Error Loading Projects",
          description: projectResponse.error,
        });
      }
    }
  }

  //Memoize the context to prevent unnecessary re-renders
  const memoedValue = useMemo(
    () => ({
      projects,
      refreshProjects,
    }),
    [projects, instancePermissionCheck],
  );

  return (
    <ProjectContext.Provider value={memoedValue}>
      {children}
    </ProjectContext.Provider>
  );
};

/**
 * Wraps the ProjectContext
 * @returns An object containing:
 * - projects: IProject[] - the list of projects
 * - refreshProjects: () => void - a function to refresh the list of projects
 */
export default function useProjects() {
  return useContext(ProjectContext);
}
