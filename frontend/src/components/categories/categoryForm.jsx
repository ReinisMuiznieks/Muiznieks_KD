import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createCategory } from '../../features/categories/categorySlice'

function CategoryForm() {
    const [name, setName] = useState('')
  
    const dispatch = useDispatch()
  
    const onSubmit = (e) => {
      e.preventDefault()
  
      dispatch(createCategory({ name }))
      setName('')
    }
  
    return (
      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <label htmlFor='text'>Category</label>
            <input
              type='text'
              name='text'
              id='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <button className='btn btn-block' type='submit'>
              Add category
            </button>
          </div>
        </form>
      </section>
    )
  }
  
  export default CategoryForm