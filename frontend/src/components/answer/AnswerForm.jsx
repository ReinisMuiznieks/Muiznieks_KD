import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Spinner from '../spinner/Spinner';
import '../card/card.scss'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import axios from 'axios'
import { getQuestions } from '../../features/question/questionSlice'

function AnswerForm() {
    const { user } = useSelector((state) => state.auth)
    const [questionTitle, setQuestionTitle] = useState("");
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [test, setTest] = useState("");
    const { questions, isLoading, isError, message } = useSelector((state) => state.questions);
    const { tests } = useSelector((state) => state.tests);

    useEffect(() => {
        if(!user){
            navigate('/sign-up')
        }

        if(user.role !== 'admin'){
            navigate('/')
        }

        dispatch(getQuestions())
    })


      const onSubmit = (e) => {
        e.preventDefault()
    
        if (questionTitle.trim().length !== 0) {
          // axios post create new test
          const questionData = {
            test: test,
            question: questionTitle
          };
        axios.post("http://localhost:5000/api/questions",questionData, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            },
          })
          setTest('')
          setQuestionTitle('')
          toast.success(`Question ${test} has been created!`)
        } else {
          toast.error('Please fill out all of the fields!')
        }
      }

      const onReset = () => {
        setTest('')
        setQuestionTitle('')
      }

      const [isShown, setIsShown] = useState(false);

      const handleClick = () => {
        setIsShown(current => !current);
      };

      if(isLoading) {
        return <Spinner/>
    }

      return (
        <>
        <Container className='card-legend pt-5'>
        <Form onSubmit={onSubmit}>
          <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Question</Form.Label>
              <Form.Control 
              type='text'
              name='questionTitle'
              required
              onChange={(e) => setQuestionTitle(e.target.value)}
              placeholder="Question"
              />
            </Form.Group>
          </Col>

          </Row>

          <Row>
          <Col>

          </Col>

          <Col>
          
            <div className="input-group mb-3">
              <Form.Select onChange={(e)=>setTest(e.target.value)} id="test" name="cars" className="form-control select select-initialized"  value={test}>
                <option >Choose Test</option>
                {
                    tests && tests.map(test =>(
                        <option key={test._id}  value={test._id} test={test} >{test.testname}</option>
                    ))
                    
                }
              </Form.Select>
              <Button className="btn btn-secondary" type="button" onClick={handleClick} id="button-addon2">Add Test</Button>
                    {isShown && (

                       <>
                       </>

                    )}
            </div>
          </Col>

          </Row>
          

          <Stack direction="horizontal" gap={3} className="pt-5 d-flex justify-content-end">
                <Button variant="outline-success" type="submit">Submit</Button>
                <div className="vr" />
                <Button variant="outline-danger" onClick={onReset}>Reset</Button>
          </Stack>

      </Form>
      </Container>
      <h1>testr</h1>

      </>
      );
  }
  
  export default AnswerForm