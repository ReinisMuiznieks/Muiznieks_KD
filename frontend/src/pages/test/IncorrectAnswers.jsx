import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styled from "styled-components"
import NavbarTop from '../../components/navbar/Navbar';
import './test.scss';
import '../learn/learn.scss';
import '../../components/card/cards.scss'
import { useNavigate } from "react-router-dom";
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


const IncorrectAnswersPage = () => {
  const { user } = useSelector((state) => state.auth);
  const params = useParams();
  const id = params;
  const [data, setData] = useState([]);
  const [questionDetails, setQuestionDetails] = useState([]);
  const [currQues, setCurrQues] = useState(0);
  const navigate = useNavigate()

  useEffect(() => {
    fetchIncorrectAnswers();
  }, []);

  const fetchIncorrectAnswers = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/usertests/${id.id}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      setData(response.data);
      console.log(response.data[0].incorrectAnswers);
      const incorrectAnswers = response.data[0].incorrectAnswers;
      if (incorrectAnswers) {
        const questionIds = incorrectAnswers.map((answer) => answer.question);
        const questionDetails = await fetchQuestionDetails(questionIds);
        setQuestionDetails(questionDetails);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchQuestionDetails = async (questionIds) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/questions`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        },
        params: {
          ids: questionIds
        }
      });
      // Filter the response data to only include questions with matching IDs
      const filteredQuestions = response.data.filter((question) => questionIds.includes(question._id));
      return filteredQuestions;
    } catch (error) {
      console.log(error);
      return [];
    }
  };
  

  const handleNext = () => {
    if (currQues >= questionDetails.length-1) {
      // submitTest();
    //   setCurrQues(currQues + 1);
      console.log("done");
      navigate(`/result/${id.id}`);
    } else {
      setCurrQues(currQues + 1);
    }
  };

  const handlePrevious = () => {
    if (currQues < data.length) {
      navigate(`/test/`);
    } else {
      setCurrQues(currQues - 1);
    }
  };

  const item = data[0];

  return (
    <>
    <NavbarTop/>
    <Container>
      {data.length > 0 ? (
        <>       
        {questionDetails.length > 0 && ( 
        <Container>
        
    <Stack id="question-stack">
    <div className="container">
        <ProgressBar now={currQues+1} label={currQues+1 + "/" + questionDetails.length} max={questionDetails.length}/>
        {/* <ProgressBar now={currQues + 1} label={Math.round((100 / questions.length) * [currQues+1])+ "%"} max={questions.length}/> */}
    </div>
    <div id="card-legend">
      <Card id="card">
        <Card.Body>
          <Card.Text id="card-text">
          {questionDetails[currQues].question}
          </Card.Text>
        </Card.Body>
          <Card.Img variant="top" id="card-image" src={questionDetails[currQues].card} alt="card"/>
      </Card>
      </div>

      <Container id="answer_container">
                <Row>
                <Col>
                <Options>
                {questionDetails[currQues] && questionDetails[currQues].options && (
                    questionDetails[currQues].options.map((option) => (
                    <Button
                        id="answer_button"
                        key={option._id}
                        style={{
                        backgroundColor: option.option === item.incorrectAnswers[currQues].userAnswer ? 'red' : 
                                        option.option === item.incorrectAnswers[currQues].correctAnswer ? 'green' : ''
                        }}
                    >
                        {option.option}

                    </Button>
                    ))
                )}
                </Options>
                </Col>
                </Row>
                <Row>
                <Col>
                    <Button
                        id="next_incorrect_question_button"
                        variant="contained"
                        color="primary"
                        size="large"
                        style={{ width: 185 }}
                        onClick={handlePrevious}>
                        {currQues < (data.length) ? (<span >Back</span>) : (<span>Previous</span>)}
                    </Button>


                    <Button
                        id="next_incorrect_question_button"
                        variant="contained"
                        color="primary"
                        size="large"
                        style={{ width: 185 }}
                        onClick={handleNext}>
                        {currQues >= (questionDetails.length-1) ? (<span >Done</span>) : (<span>Next Question</span>)}
                    </Button>
                </Col>
                </Row>
            </Container>
            </Stack>
            
        </Container>
        )}
        </>
    ): (<h3>No questions</h3>)}
    </Container>
    </>
  );
};

export default IncorrectAnswersPage;
