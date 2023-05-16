import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import {getCategories,reset} from '../../../../features/category/categorySlice'
import Spinner from '../../../../components/spinner/Spinner';
import '../../../../components/card/card.scss'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import CategoryForm from './CategoryFormModal';
import axios from 'axios'
import {getTypes} from '../../../../features/type/typeSlice'
import Select from 'react-select';

function TestForm() {
    const [category, setCategory] = useState([]);
    const { user } = useSelector((state) => state.auth)
    // const { categories, isLoading, isError, message } = useSelector((state) => state.categories)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [testName, setTestName] = useState("");
    const [type, setType] = useState('');
    const { types } = useSelector((state) => state.type)

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [categories, setCategories] = useState([]);
    const [options, setOptions] = useState([]);

    useEffect(() => {

        if(!user){
            navigate('/sign-up')
        }

        if(user.role !== 'admin'){
            navigate('/')
        }

        // dispatch(getCategories())
        dispatch(getTypes())

        return () => { // clears when component unmounts
            dispatch(reset())
        }
    }, [user, navigate, dispatch])


      const onSubmit = (e) => {
        e.preventDefault()
    
        if (testName.trim().length !== 0 && category && type) {
          // axios post create new test
          const testData = {
            testname: testName,
            categories: selectedCategories.map((categoryId) => ({ category: categoryId })),
            type: type
          };
          
          console.log(testData);
        axios.post("http://localhost:5000/api/tests",testData,{
            headers: {
                'Authorization': `Bearer ${user.token}`
            },
          })

          setCategory('')
          setType('')
          setTestName('')
          toast.success(`Test ${testName} has been created!`)
        } else {
          toast.error('Please fill out all of the fields!')
        }
      }

      const onReset = () => {
        setCategory('')
        setType('')
        setTestName('')
      }

      const [isShown, setIsShown] = useState(false);

      const handleClick = () => {
        setIsShown(current => !current);
      };

    //   if(isLoading) {
    //     return <Spinner/>
    // }

  
    useEffect(() => {
      fetchCategories();
    }, []);
  
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://verbum-server-kd.onrender.com/api/categories", {
          headers: {
              'Authorization': `Bearer ${user.token}`
          },});

          const categoriesData = response.data;
          setCategories(categoriesData);
        } catch (error) {
          console.log(error);
        }
    }; 

    const handleCategoryChange = (selectedOptions) => {
      setSelectedCategories(selectedOptions.map((option) => option.value));
      console.log(selectedCategories)
    };

      return (
        <>
        <Container className='card-legend pt-5'>
        <Form onSubmit={onSubmit}>
          <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Test name</Form.Label>
              <Form.Control 
              type='text'
              name='test_name'
              required
              onChange={(e) => setTestName(e.target.value)}
              placeholder="Test name"
              />
            </Form.Group>
          </Col>

          </Row>

          <Row>
          <Col>

          </Col>

          <Col>
          
            {/* <div className="input-group mb-3">
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
            </div> */}
            <Select
              // defaultValue={[colourOptions[2], colourOptions[3]]}
              isMulti
              name="colors"
              options={categories.map((category) => ({
                value: category._id,
                label: category.name,
              }))}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={handleCategoryChange}
            />




            <div className="input-group mb-3">
              <Form.Select onChange={(e)=>setType(e.target.value)} id="type" name="cars" className="form-control select select-initialized"  value={type}>
                <option >Choose Type</option>
                {
                    types && types.map(type =>(
                        <option key={type._id}  value={type._id} type={type} >{type.name}</option>
                    ))
                    
                }
              </Form.Select>
            </div>
          </Col>

          

          </Row>
          

          <Stack direction="horizontal" gap={3} className="pt-5 d-flex justify-content-end">
                <Button variant="success" type="submit">Submit</Button>
                <div className="vr" />
                <Button variant="danger" onClick={onReset}>Reset</Button>
          </Stack>

      </Form>
      </Container>
      </>
      );
  }
  
  export default TestForm