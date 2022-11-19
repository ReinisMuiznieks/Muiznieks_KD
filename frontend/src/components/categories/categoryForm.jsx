import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createCategory } from '../../features/categories/categorySlice'
import { toast } from 'react-toastify'

function CategoryForm() {
    const [name, setName] = useState('')
  
    const dispatch = useDispatch()
  
    const onSubmit = (e) => {
      e.preventDefault()
  
      if (name.trim().length !== 0) {
        dispatch(createCategory({ name }))
        setName('')
      } else {
        toast.error('Input value is empty!')
      }
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