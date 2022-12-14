import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createCard } from '../../features/card/cardSlice'
import { toast } from 'react-toastify'
import { PickerOverlay } from "filestack-react";
import { useNavigate } from 'react-router-dom'
import {getCategories,reset} from '../../features/category/categorySlice'
import Spinner from '../spinner/Spinner';
import './card.scss'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import CategoryForm from '../category/CategoryForm';

function CardForm() {
    const [isPicker, setIsPicker] = useState(false);
    const [image, setImage] = useState("");
    const [lv_word, setLvword] = useState("");
    const [eng_word, setEngword] = useState("");
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
    
        if (lv_word.trim().length !== 0 && eng_word.trim().length !== 0 && image) {
          dispatch(createCard({ lv_word, eng_word, image: image.filesUploaded[0].url, category }))
          setLvword('')
          setEngword('')
          setImage('')
          setCategory('')
          toast.success(`Card ${lv_word} has been created!`)
        } else {
          toast.error('Please fill out all of the fields!')
        }
      }

      const onReset = () => {
        setLvword('')
        setEngword('')
        setImage('')
        setCategory('')
      }

      const [isShown, setIsShown] = useState(false);

      const handleClick = () => {
        setIsShown(current => !current);
      };

      if(isLoading) {
        return <Spinner/>
    }

      return (
        
        <Container className='card-legend pt-5'>
        <Form onSubmit={onSubmit}>
          <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>LV</Form.Label>
              <Form.Control 
              type='text'
              name='lv_word'
              required
              onChange={(e) => setLvword(e.target.value)}
              placeholder="LV"
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className='pb-4'>
              <Form.Label>ENG</Form.Label>
              <Form.Control 
              type='text'
              name='eng_word'
              required
              onChange={(e) => setEngword(e.target.value)}
              placeholder="LV"
              />
            </Form.Group>
          </Col>
          </Row>

          <Row>
          <Col>

          {image ? (
              <img
                src={image && image.filesUploaded[0].url}
                alt="imageUploded"
                className="pb-3"
                name='image'
                id='card-image'
              />
            ) : (
              <Button
                onClick={() => (isPicker ? setIsPicker(false) : setIsPicker(true))}
                type="button"
                variant="secondary"
              >
                Choose Image
              </Button>  
            )}

          </Col>

          <Col>
          
            <div className="input-group mb-3">
              <Form.Select onChange={(e)=>setCategory(e.target.value)} id="category" name="cars" className="form-control select select-initialized"  value={category}>
                <option >Choose Category</option>
                {
                    categories && categories.map(category =>(
                        <option key={category._id}  value={category._id} category={category} >{category.name}</option>
                    ))
                    
                }
              </Form.Select>
              <Button className="btn btn-secondary" type="button" onClick={handleClick} id="button-addon2">Add category</Button>
                    {isShown && (

                        <CategoryForm/>

                    )}
            </div>
          </Col>

          </Row>

          <Stack direction="horizontal" gap={3} className="pt-5 d-flex justify-content-end">
                <Button variant="outline-success" type="submit">Submit</Button>
                <div className="vr" />
                <Button variant="outline-danger" onClick={onReset}>Reset</Button>
          </Stack>

          {/* Filestack */}
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

      </Form>
      </Container>
      );
  }
  
  export default CardForm