import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import {reset} from '../../../../features/category/categorySlice'
import '../../../../components/card/card.scss'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import axios from 'axios'
import Select from 'react-select';

function TestForm() {
    const [category, setCategory] = useState([]);
    const { user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [testName, setTestName] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [categories, setCategories] = useState([]);
    const headers = { 'Authorization': `Bearer ${user.token}` };

    useEffect(() => {

        if(!user){
            navigate('/sign-up')
        }

        if(user.role !== 'admin'){
            navigate('/')
        }

        return () => { // clears when component unmounts
            dispatch(reset())
        }
    }, [user, navigate, dispatch])

      const onSubmit = (e) => {
        e.preventDefault()
    
        if (testName.trim().length !== 0 && category) {
          // axios post create new test
          const testData = {
            testname: testName,
            categories: selectedCategories.map((categoryId) => ({ category: categoryId }))
          };
          
          console.log(testData);

          axios.post("http://localhost:5000/api/tests",testData,{headers})

          setCategory('')
          setTestName('')
          toast.success(`Test ${testName} has been created!`)
        } else {
          toast.error('Please fill out all of the fields!')
        }
      }

      const onReset = () => {
        setCategory('')
        setTestName('')
      }
  
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://verbum-server-kd.onrender.com/api/categories", {headers});

          const categoriesData = response.data;
          setCategories(categoriesData);
        } catch (error) {
          console.log(error);
        }
    }; 

    
    useEffect(() => {
      fetchCategories();
    }, []);
    
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
              <Select
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