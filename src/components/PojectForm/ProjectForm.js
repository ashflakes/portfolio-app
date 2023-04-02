import { useState, useEffect } from 'react'
import { useFirestore } from '../../hooks/useFirestore'

const ProjectForm = (props) => {
  const { formConfig, docId, toggleSidebar } = props;
  const { addDocument, updateDocument, response } = useFirestore('projects')

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState('')
  const [projectURL, setProjectURL] = useState('https://')
  const [coverImg, setCoverImg] = useState(null)
  const [coverImgError, setCoverImgError] = useState(null)
  const [coverPreview, setCoverPreview] = useState('')
 
  const handleSubmit = (e) => {
    e.preventDefault()
    if(formConfig.type === 'create'){
      addDocument({ 
        name, 
        description,
        projectURL,
        tags
      }, coverImg)
    } else if (formConfig.type === 'edit') {
      updateDocument(docId, {
        name,
        description,
        projectURL,
        tags
      }, coverImg)
    }
  }

  const handleFileChange = (e) => {
    setCoverPreview('')
    setCoverImg(null)
    let selected = e.target.files[0]

    if(!selected) {
      setCoverImgError('Please select a file.')
      return
    }

    if(!selected.type.includes('image')) {
      setCoverImgError('Selected file must be an image.')
      return
    }

    if(selected.size > 500000) {
      setCoverImgError('Image file size must be less than 500kb')
      return
    }

    
    setCoverImgError(null)
    setCoverImg(selected)
    setCoverPreview(URL.createObjectURL(selected))
  }

  useEffect(() => {
    if (response.success) {
      setName('')
      setDescription('')
      setTags('')
      setProjectURL('https://')
      setCoverImg(null)
      setCoverPreview('')
    }
  }, [response.success])

  return (
    <>
      <button className='close-sidebar' type="button" onClick={toggleSidebar}>x</button>
      <form onSubmit={handleSubmit} 
        style={{backgroundColor: formConfig.backgroundColor}}>
        <h4 style={{ color: 'white'}}>{formConfig.title}</h4>  
        <label>
          <span>Project name:</span>
          <input 
            type="text"
            required
            onChange={(e) => setName(e.target.value)} 
            value={name} 
          />
        </label>
        <label>
          <span>Tags:</span>
          <input
            type="text"
            onChange={(e) => setTags(e.target.value)} 
            value={tags} 
          />
        </label>
        <label>
          <span>Link:</span>
          <input
            type="text"
            required
            onChange={(e) => setProjectURL(e.target.value)} 
            value={projectURL} 
          />
        </label>
        <label>
          <span>Description:</span>
          <input
            type="text"
            required
            onChange={(e) => setDescription(e.target.value)} 
            value={description} 
          />
        </label>
        <label>
        <span>Project Cover:</span>
        <div className='upload-section'>
          <input 
            id='image-upload'
            required
            type="file" 
            onChange={handleFileChange}
          />
          {/* <label htmlFor='image-upload' className="image-upload-button">
            Upload Cover Image
          </label> */}
          { coverPreview && <img className='cover-preview' src={coverPreview} alt='cover-preview' />}
        </div>
        
        {coverImgError && <div className='error'>{coverImgError}</div>}
      </label>
        <button className="submit-button">{formConfig.submitText}</button>
      </form>
    </>
  )
}

export default ProjectForm