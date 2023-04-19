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
import mongoose from 'mongoose';

function TestingForm() {
    const { user } = useSelector((state) => state.auth)
    const [questionTitle, setQuestionTitle] = useState("");
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [test, setTest] = useState("");
    const [question, setQuestion] = useState("");
    const { tests, isLoading, isError, message } = useSelector((state) => state.tests)
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);

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
            testid: test,
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
                `http://localhost:5000/api/questions?test=${test}`, { headers }
            );
            setQuestions(res.data);
          } catch (err) {}
        };


        const getAnswers = async () => {
          try {
            const res = await axios.get(
                `http://localhost:5000/api/answers?question=${question}`, { headers }
            );
            setAnswers(res.data);
            console.log(res.data);
            console.log(answers[0].createdAt);
          } catch (err) {}
        };

        var validTest = mongoose.Types.ObjectId.isValid(test);
        if(validTest)
        {
          //process your code here
          getQuestions();
        } else {
          //the id is not a valid ObjectId
        }

        var validQuestion = mongoose.Types.ObjectId.isValid(question);
        if(validQuestion)
        {
          //process your code here
          getAnswers();

        } else {
          //the id is not a valid ObjectId
        }

        //getQuestions();
      }, [test, question]);

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

            <div className="input-group mb-3">
              <Form.Select onChange={(e)=>setQuestion(e.target.value)} id="question" name="cars" className="form-control select select-initialized"  value={question}>
                <option >Choose Question</option>
                {
                    questions && questions.map(question =>(
                        <option key={question._id}  value={question._id} question={question} >{question.question} {}</option>
                    ))
                    
                }
              </Form.Select>
              <Button className="btn btn-secondary" type="button" onClick={handleClick} id="button-addon2">Add Question</Button>
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
                <h1>{question} answers</h1>
                {answers.map(answer => <h1 key={answer._id}>{answer.answer}</h1>)}
                </div>
            {/* ) : (<h3>No cards</h3>)} */}
        {/* </Section> */}
        </>

      </Container>
      </>
      );
  }
  
  export default TestingForm