import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createCard } from '../../features/card/cardSlice'
import { toast } from 'react-toastify'

function CardForm() {

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image:'',
      })

    const { title, description, image } = formData

    const dispatch = useDispatch()

    const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
      }

    const onSubmit = (e) => {
        e.preventDefault()
    
        const formData = {
          title,
          description,
          image
        }

        if(title.length !== 0 && description.length !== 0 && image){
          dispatch(createCard(formData))
        } else {
          alert("error")
        }
      }

    return (
        <>
      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <label htmlFor='text'>Card</label>
            <input
              type='text'
              name='title'
              id='text'
              value={title}
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='text'>Description</label>
            <input
              type='text'
              name='description'
              id='text'
              value={description}
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='text'>Image</label>
            <input
              type='file'
              name='image'
              id='text'
              value={image}
              onChange={onChange}
            />
          </div>

          
          <div className='form-group'>
            <button className='btn btn-block' type='submit'>
              Add Card
            </button>
          </div>
        </form>
      </section>


        </>
    )
  }
  
  export default CardForm