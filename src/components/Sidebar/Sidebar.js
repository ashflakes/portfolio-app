import React from 'react'

import ProjectForm from '../PojectForm/ProjectForm'

import styles from './Sidebar.module.css'
import './Sidebar.css'

const formType = {
    'create': {
        type: 'create',
        title: 'Add a New Project',
        backgroundColor: '#AA5656',
        submitText: 'Add Project'
    },
    'edit': {
        type: 'edit',
        title: 'Edit Project',
        backgroundColor: '#698269',
        submitText: 'Make Changes'
    }
      
}

const Sidebar = (props) => {
  const sidebarClass = props.isOpen ? "projectform open" : "projectform";

  const { sidebarType, docId, toggleSidebar } = props

  return (
    <div className={sidebarClass}>
        <div className={styles.sidebar}>
            <ProjectForm formConfig={formType[sidebarType]} docId={docId} toggleSidebar={toggleSidebar} />
        </div>
    </div>
  )
}

export default Sidebar