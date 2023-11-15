import React from 'react'
import NotFound from './not-found'

const Projects = ({ params }: any) => {
  const project_id = params.project_id;
  
  console.log('Project_id:', project_id)
  return (
    <div>Projects</div>
  )
}

export default Projects