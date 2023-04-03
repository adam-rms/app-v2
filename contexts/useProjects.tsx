// Project Listing

import { ReactNode, createContext, useContext, useMemo, useState } from "react";
import Api from "../utilities/Api";

/** Parameters returned from the context
 * @see useProjects
 */
interface ProjectContextType {
  projects: IProject[];
  refreshProjects: () => void;
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
  //Create default state
  const [projects, setProjects] = useState<IProject[]>([]);

  /**
   * Refresh Context
   * Replace all projects in context
   */
  async function refreshProjects() {
    setProjects(await Api("projects/list.php"));
  }

  //Memoize the context to prevent unnecessary re-renders
  const memoedValue = useMemo(
    () => ({
      projects,
      refreshProjects,
    }),
    [projects],
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
