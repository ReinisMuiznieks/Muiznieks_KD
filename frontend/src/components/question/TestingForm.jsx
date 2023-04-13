import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createCard } from '../../features/card/cardSlice'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import {getCategories,reset} from '../../features/category/categorySlice'
import Spinner from '../spinner/Spinner';
import '../card/card.scss'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import axios from 'axios'
import Navbar from '../../components/navbar/Navbar'
import TestForm from '../test/TestForm'
import {getTests} from '../../features/test/testSlice'
import QuestionItem from './QuestionItem'

function TestingForm() {
    const { user } = useSelector((state) => state.auth)
    const [questionTitle, setQuestionTitle] = useState("");
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [test, setTest] = useState("");
    const { tests, isLoading, isError, message } = useSelector((state) => state.tests)
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        if(!user){
            navigate('/sign-up')
        }

        if(user.role !== 'admin'){
            navigate('/')
        }

        dispatch(getTests())
    }, [user, navigate, isError, message, dispatch])


      const onSubmit = (e) => {
        e.preventDefault()
    
        if (questionTitle.trim().length !== 0) {
          // axios post create new test
          const questionData = {
            testname: test,
            question: questionTitle
          };
        axios.post("http://localhost:5000/api/questions",questionData, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            },
          })

          setTest('')
          setQuestionTitle('')
          toast.success(`Test ${test} has been created!`)
        } else {
          toast.error('Please fill out all of the fields!')
        }
      }

      useEffect(() => {
        const headers = { 'Authorization': `Bearer ${user.token}` };
        const getQuestions = async () => {
          try {
            const res = await axios.get(
                'http://localhost:5000/api/questions', { headers }
            );
            setQuestions(res.data);
          } catch (err) {}
        };
        getQuestions();
      }, [test]);

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
        <Navbar/>
        <Container className='card-legend pt-5'>
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

            <>
        {/* <Section className="content"> */}
            {/* {cards.length > 0 ? ( */}
                {/* <div className="cards">
                    {questions.map((question) => (
                        // <QuestionItem key={question._id} question={question} test={question.test}/>
                        <h1 key={question._id}>{question}</h1>
                    ))}
                </div> */}

                <div className="col">
                <h1>Mi Casa</h1>
                <p>This is my house y&apos;all!</p>
                {questions.map(question => <h1 key={question._id}>{question.question}</h1>)}
                </div>
            {/* ) : (<h3>No cards</h3>)} */}
        {/* </Section> */}
        </>

      </Container>
      </>
      );
  }
  
  export default TestingForm