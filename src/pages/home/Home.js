import React, { useState } from 'react'
import { useCollection } from '../../hooks/useCollection'
import { useFirestore } from '../../hooks/useFirestore'

// components
import ProjectCard from '../../components/ProjectCard/ProjectCard'
import Sidebar from '../../components/Sidebar/Sidebar'

// assets
import addIcon from '../../assets/add-icon.png'
import nameLogo from '../../assets/name-logo.png'
import gridIcon from '../../assets/gridview-icon.png'
import listIcon from '../../assets/listview-icon.png'
import githubIcon from '../../assets/github-icon.png'

// styles
import './Home.css'

const Home = () => {
  const [toggleView, setToggleView] = useState('grid-view')
  const [viewIcon, setViewIcon] = useState(listIcon)
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editbarOpen, setEditbarOpen] = useState(false);
  const [docId, setDocId] = useState('')

  const { deleteDocument } = useFirestore('projects')
  const { documents } = useCollection(
    'projects', ['createdAt', 'desc']
  )

  const handleViewSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    if(editbarOpen) setEditbarOpen(false)
  };

  const handleViewEditbar = () => {
    setEditbarOpen(!editbarOpen);
    if(sidebarOpen) setSidebarOpen(false)
  };
  
  const getId = (id) => {
    setDocId(id)
  }
 
  const handleDisplayToggle = () => {
    if(toggleView.includes('grid')) {
      setToggleView('list-view')
      setViewIcon(gridIcon)
    } else {
      setToggleView('grid-view')
      setViewIcon(listIcon)
    }
  }

  return (
    <div className='content' style={{ }}>
      <div className='side-content'>
        <button className='top-button' ><img src={nameLogo} alt='contact-icon' /></button>
        <div className='decoration'>
          
        </div>
        <button className='bottom-button' onClick={handleViewSidebar}><img src={addIcon} alt='add-project-icon' /></button>
      </div>
      <div className='main-content'>
        <ul className={toggleView}>
            {documents && documents.map(project => {
                return (
                    <ProjectCard 
                      key={project.id} 
                      project={project} 
                      deleteDoc={deleteDocument} 
                      getId={getId} 
                      isOpen={editbarOpen} 
                      toggleEditbar={handleViewEditbar}
                    />
                )
            })}
        </ul>
        </div>
      <div className='side-content'>
        <button id='toggle-display' className='top-button' onClick={() => handleDisplayToggle()}><img style={{ scale: '80%' }} src={viewIcon} alt='view-icon' /></button>
        <div className='decoration'>
          
        </div>
        <button className='bottom-button' ><a href='https://github.com/ashflakes/' target='_blank'><img src={githubIcon} alt='github-icon' /></a></button>
      </div>
        <Sidebar sidebarType='create' isOpen={sidebarOpen} toggleSidebar={handleViewSidebar} />
        <Sidebar sidebarType='edit' isOpen={editbarOpen} toggleSidebar={handleViewEditbar} docId={docId} />
      
    </div>
  )
}

export default Home