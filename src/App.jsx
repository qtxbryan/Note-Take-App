import {useState} from 'react';

import ProjectSidebar from "./components/ProjectSidebar";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import SelectedProject from "./components/SelectedProject";

function App() {

  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: []
    /* project array obj 
      [{
        id, title, description, dueDate
      }]
    */
  });

  function handleSelectProject(id){
    setProjectsState((prevProjectState) => {

      return {
        ...prevProjectState,
        selectedProjectId: id,
      }
    })
  }

  function handleAddingProject(){

    setProjectsState((prevProjectState) => {

      return {
        ...prevProjectState,
        selectedProjectId: null,
      }
    })
  }

  function handleCancelAddProject(){

    setProjectsState((prevProjectState) => {

      return {
        ...prevProjectState,
        selectedProjectId: undefined,
      }
    })
  }

  function handleAddProject(projectData) {

    setProjectsState((prevProjectState) => {
      const projectId = Math.random();

      const newProject = {
        ...projectData,
        id: projectId,
      }
      
      return {
        ...prevProjectState,
        selectedProjectId: undefined,
        projects: [...prevProjectState.projects, newProject]
      }
    })
  }

  const selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProjectId);

  let content = <SelectedProject project = {selectedProject} />

  if(projectsState.selectedProjectId === null){
    content = <NewProject handleAddProject={handleAddProject} handleCancelProject = {handleCancelAddProject}/>

  }else if (projectsState.selectedProjectId === undefined){
    content = <NoProjectSelected onAddProject={handleAddingProject}/>
  }

  return (
    <main className = "h-screen my-8 flex gap-8">
      <ProjectSidebar onAddProject= {handleAddingProject} projects = {projectsState.projects} handleSelectProject = {handleSelectProject}/>
      {content}
    </main>
  );
}

export default App;
