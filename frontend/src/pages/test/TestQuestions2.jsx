import React, { useEffect, useState } from "react";
import '../learn/learn.scss';
import NavbarTop from "../../components/navbar/Navbar.jsx";
import Footer from "../../components/footer/Footer.jsx";
import axios from 'axios'
import Spinner from "../../components/spinner/Spinner";
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { useSelector } from 'react-redux'
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './test.scss';
import styled from "styled-components"
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import ProgressBar from 'react-bootstrap/ProgressBar';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Options = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  align-items: center;
  justify-content: space-around;
  margin: 10px;
`

const TestQuestions2 = ({
    currQues,
    setCurrQues,
    questions,
    options,
    correct,
    setScore,
    score,
    setQuestions,
    userId,
    exam_id
  }) => {
    const [selected, setSelected] = useState();
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useSelector((state) => state.auth)
    const headers = { 'Authorization': `Bearer ${user.token}` };
    const [questioncount, setQuestioncount] = useState(0);

        const navigate = useNavigate()
      
        const params = useParams();
        const id = params;

    const handleSelect = (i) => {
        if (selected === i && selected === correct) return "select";
        else if (selected === i && selected !== correct) return "wrong";
        else if (i === correct) return "select";
      };
    
      const handleCheck = (i) => {
        setSelected(i);
        if (i === correct) { setScore(score + 1); }
        setError(false);
      };
    
      const handleNext = () => {
        if (currQues >= (questions.length - 1)) {
          submitTest();
          navigate(`/result/${id.id}`);
        } else if (selected) {
          setCurrQues(currQues + 1);
          setSelected();
        } else 
          toast.error("Please select an option");
      };

      const getQuestions = async () => {
        const { data } = await axios.get(`http://localhost:5000/api/questions?test=${id.id}`, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            },
          },);
        setQuestioncount(data.length);
      }

      useEffect(() => {
        getQuestions();
      }, [setQuestioncount])

      const submitTest = () => {
        console.log(exam_id)

          const testData = {
            user: user._id,
            test: id.id,
            score: Math.round(score/questioncount*100),
            completed: true,
        };
        axios.post("http://localhost:5000/api/usertests/", testData, { headers }).then((response) => {
            console.log(response.status);
            console.log(response.data);
        });
      }

    if(isLoading) {
        return <Spinner/>
    }
    return (
<>
<NavbarTop />
<ProgressBar now={[currQues+1]} label={Math.round((100 / questions.length) * [currQues+1])+ "%"} max={questions.length}/>
{questions.length > 0 ? (
  <Container>
    
    <Stack id="question-stack">

      <Card id="question-card">
        <Card.Body>
          <Card.Text id="card-text">
          {questions[currQues].question}
          </Card.Text>
        </Card.Body>
          <Card.Img variant="top" id="card-image" className="pt-4" src={questions[currQues].card} alt="card"/>
      </Card>

      <Container id="answer_container">
        <Row>
        <Col>
        <Options>
          {error && {error}}
          {options &&
            options.map((option) => (
              <Button 
                id="answer_button" 
                className={`singleOption  ${selected && handleSelect(option.option)}`}
                key={option._id} 
                // creator
                onClick={() => { handleCheck(option.option) }}
                disabled={selected}>
                {option.option}
              </Button>
            ))}
        </Options>
        </Col>
        </Row>
        <Row>
          <Col>
              <Button
                id="next_question_button"
                variant="contained"
                color="primary"
                size="large"
                style={{ width: 185 }}
                onClick={handleNext}>
                {currQues >= (questions.length - 1) ? (<span >Submit</span>) : (<span>Next Question</span>)}
              </Button>
          </Col>
        </Row>
      </Container>

      <div className="buttons">
      {/* <Button id="continue-button" onClick={displayQuestion}>Continue</Button> */}
      {/* {isAdmin ? (
      <>
      <button onClick={handleShowDelete} className="close mt-2" id="delete-button">Delete <b>{cards[currentCard].lv_word}</b></button>
      </>
      ) : (
      <>
      </>
      )} */}
      {/* <Button id="answer_button" onClick={displayQuestion}>Continue</Button> */}
      </div>
    </Stack>
  </Container>

  ) : (<h3>No questions</h3>)}







<Footer/>
</>
    )

}

export default TestQuestions2;
