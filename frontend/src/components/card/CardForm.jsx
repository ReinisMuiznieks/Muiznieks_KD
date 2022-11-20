import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createCard } from '../../features/card/cardSlice'
import { toast } from 'react-toastify'
import { PickerOverlay } from "filestack-react";

function CardForm() {
    const [isPicker, setIsPicker] = useState(false);
    const [image, setImage] = useState("");
    const [title, setTitle] = useState("");

    const dispatch = useDispatch()

      const onSubmit = (e) => {
        e.preventDefault()
    
        if (title.trim().length !== 0 && image) {
          dispatch(createCard({ title, image: image.filesUploaded[0].url }))
          setTitle('')
          setImage('')
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