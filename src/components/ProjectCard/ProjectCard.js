import React, { useState } from 'react'
import { Link } from 'react-router-dom'

// assets
import linkIcon from '../../assets/link-icon.png'
import editIcon from '../../assets/edit-icon.png'
import deleteIcon from '../../assets/delete-icon.png'
import hideIcon from '../../assets/hide-icon.png'

// styles
import './ProjectCard.css'

const ProjectCard = (props) => {
  const { project, deleteDoc, isOpen, toggleEditbar, getId } = props
  const [ showProject, setShowProject ] = useState(true)
  
  const handleHideProject = () => {
    setShowProject(!showProject)
  }

  const editDocument = (id) => {
    toggleEditbar(!isOpen)
    getId(id)
  }

  const handleTags = () => {
    const tagArr = []
    project.tags.replaceAll(',', '').split(' ').forEach(tag => tagArr.push(`#${tag} `))
    return tagArr
  }

  return (
      showProject && (
      <li 
        className='project-elem' 
        style={{ 
                backgroundImage: `url(${project.imgUrl})`,
                backgroundSize: "cover",
                backgroundRepeat: 'no-repeat', 
                backgroundPosition: 'center'
              }} 
      >  
        <div style={{ zIndex: '-100' }}>
               <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <h1>{project.name}</h1>
                <Link to={project.projectURL} target='_blank' className='utility-btn' ><img className='icon' src={linkIcon} alt='link-icon' /></Link>
               </div>
               <h2>{handleTags()}</h2>
              <div className='bottom-utility'>
                <button onClick={ handleHideProject } className='utility-btn'><img className='icon' src={hideIcon} alt='hide-icon' /></button>
                <button onClick={ () => editDocument(project.id) } className='utility-btn'><img className='icon' src={editIcon} alt='edit-icon' /></button>
                <button onClick={ () => deleteDoc(project.id) } className='utility-btn'><img className='icon' src={deleteIcon} alt='delete-icon' /></button>
              </div>   
        </div>    
      </li>
  ))
}

export default ProjectCard

