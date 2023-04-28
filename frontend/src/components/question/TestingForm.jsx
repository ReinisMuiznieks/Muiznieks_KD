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
import Navbar from '../../components/navbar/Navbar'
import {getTests} from '../../features/test/testSlice'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
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
    const [answer, setAnswer] = useState([]);
    const [answerId, setAnswerId] = useState([]);
    const [radioValue, setRadioValue] = useState('1');
    const [correct, setCorrect] = useState(false);

    const radios = [
      { name: 'False', value: '1' },
      { name: 'True', value: '2' },
    ];

    useEffect(() => {
      if(radioValue==2)
      {
        setCorrect(true)
      }
      else{setCorrect(false)}
    })

    useEffect(() => {
        if(!user){
            navigate('/sign-up')
        }

        if(user.role !== 'admin'){
            navigate('/')
        }

        dispatch(getTests())
    }, [user, navigate, isError, message, dispatch])

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

        // const getAnswers = async () => {
        //   try {
        //     const res = await axios.get(
        //         `http://localhost:5000/api/answers?question=${question}`, { headers }
        //     );
        //     setAnswers(res.data);
        //   } catch (err) {}
        // };

        // const getAnswerById = async () => {
        //   try {
        //     const res = await axios.get(
        //         `http://localhost:5000/api/answers/${answerId}`, { headers }
        //     );
        //     setAnswer(res.data);
        //   } catch (err) {}
        // };
        var validTest = mongoose.Types.ObjectId.isValid(test);
        if(validTest)
        {
          getQuestions();
        }

        // var validQuestion = mongoose.Types.ObjectId.isValid(question);
        // if(validQuestion)
        // {
        //   getAnswers();
        // }

        // var validAnswer = mongoose.Types.ObjectId.isValid(answer);
        // if(validAnswer)
        // {
        //   getAnswerById();
        //   console.log(getAnswerById);
        // }
        // else{
        // }

        //getQuestions();
      }, [test, question, answerId]);
      
      const [isShown, setIsShown] = useState(false);

      const handleClick = () => {
        setIsShown(current => !current);
      };

      if(isLoading) {
        return <Spinner/>
    }

    const onSubmit = (e) => {
      e.preventDefault()

      if (answer.trim().length !== 0 && test && question) {
        // axios post create new test
        const answerData = {
          question: question,
        };
        const option = {
          options: {
              option: answer,
              isCorrect: correct
          }
      }
      axios.post("http://localhost:5000/api/answers",answerData,option, {
          headers: {
              'Authorization': `Bearer ${user.token}`
          },
        })

        // setTest('')
        // setQuestion('')
        toast.success(`Test ${answer} has been created!`)
      } else {
        toast.error('Please fill out all of the fields!')
      }
    }

    const onReset = () => {
      setAnswer('')
      setTest('')
      setQuestion('')
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


          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Answer</Form.Label>
                <Form.Control 
                type='text'
                name='answer'
                required
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Answer"
                />
              </Form.Group>
            </Col>

            <ButtonGroup>
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant={idx % 2 ? 'outline-success' : 'outline-danger'}
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => setRadioValue(e.currentTarget.value)}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
          </Row>
            <>
            <Stack direction="horizontal" gap={3} className="pt-5 d-flex justify-content-end">
                <Button variant="outline-success" type="submit" onClick={onSubmit}>Submit</Button>
                <div className="vr" />
                <Button variant="outline-danger" onClick={onReset}>Reset</Button>
          </Stack>
        </>

      </Container>

      
      </>
      );
  }
  
  export default TestingForm