import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createCard } from '../../features/card/cardSlice'
import { toast } from 'react-toastify'
import { PickerOverlay } from "filestack-react";
import { useNavigate } from 'react-router-dom'
import {getCategories,reset} from '../../features/categories/categorySlice'

function CardForm() {
    const [isPicker, setIsPicker] = useState(false);
    const [image, setImage] = useState("");
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState('');
    const { user } = useSelector((state) => state.auth)
    const { categories, isLoading, isError, message } = useSelector((state) => state.categories)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {

        if(isError) {
            console.log(message)
        }

        if(!user){
            navigate('/sign-up')
        }

        if(user.role !== 'admin'){
            navigate('/')
        }

        dispatch(getCategories())

        return () => { // clears when component unmounts
            dispatch(reset())
        }
    }, [user, navigate, isError, message, dispatch])


      const onSubmit = (e) => {
        e.preventDefault()
    
        if (title.trim().length !== 0 && image) {
          dispatch(createCard({ title, image: image.filesUploaded[0].url, category }))
          setTitle('')
          setImage('')
          setCategory('')
          toast.success(`Card ${title} has been created!`)
        } else {
          toast.error('Input value is empty!')
        }
      }

      return (
        <div>
          <form
            onSubmit={onSubmit}
          >
            {image ? (
              <img
                src={image && image.filesUploaded[0].url}
                alt="imageUploded"
                className="w-full h-56 object-cover"
                name='image'
              />
            ) : (
              <button
                onClick={() => (isPicker ? setIsPicker(false) : setIsPicker(true))}
                type="button"
              >
                Choose Image
              </button>
            )}
    
            {/* input title */}
            <input
              type="text"
              name='title'
              required
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Image Title"
            />

            <div className="form-outline mb-1">
                <select  onChange={(e)=>setCategory(e.target.value)} id="category" name="cars" className="form-control select select-initialized"  value={category}>
                    <option value="" >Choose Category</option>
                    {
                        categories && categories.map(category =>(
                            <option key={category._id}  value={category._id} category={category} >{category.name}</option>
                        ))
                    }
                </select>
            </div>
            {/* submit button */}
            <button
              type="submit"
            >
              {"SUBMIT!"}
            </button>
            {/* Filestack */}
            <div className="mt-4 relative">
              {isPicker && (
                <PickerOverlay
                  apikey={process.env.REACT_APP_FILESTACK_API_KEY}
                  onSuccess={(res) => {
                    setImage(res);
                    setIsPicker(false);
                  }}
                  onError={(res) => alert(res)}
                  pickerOptions={{
                    maxFiles: 1,
                    accept: ["image/*"],
                    errorsTimeout: 2000,
                    maxSize: 1 * 1000 * 1000,
                  }}
                />
              )}
            </div>
          </form>
        </div>
      );
  }
  
  export default CardForm