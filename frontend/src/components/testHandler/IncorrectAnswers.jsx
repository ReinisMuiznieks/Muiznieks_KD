import '../test/test.scss';
import '../learn/learnCategory.scss';
import '../card/card.scss';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavbarTop from '../navbar/Navbar';
import { useNavigate } from "react-router-dom";
import ProgressBar from 'react-bootstrap/ProgressBar';

const IncorrectAnswersPage = () => {
  const { user } = useSelector((state) => state.auth);
  const headers = { 'Authorization': `Bearer ${user.token}` };
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
      const response = await axios.get(`https://verbum-server-kd.onrender.com/api/usertests/${id.id}`, {headers});

      setData(response.data);
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
      const response = await axios.get(`https://verbum-server-kd.onrender.com/api/questions`, {
        headers,
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
        <div className='container-div'>
          {data.length > 0 ? (
              <>       
              {questionDetails.length > 0 && ( 
          <div className='container-div'>
            <Stack id="question-stack">
              <div className="container-div">
                <ProgressBar id="progress-bar" now={currQues+1} label={currQues+1 + "/" + questionDetails.length} max={questionDetails.length}/>
              </div>
              <div id="card-legend">
                <Card id="question-card">
                  <Card.Body>
                    <Card.Text id="test-question">
                    {questionDetails[currQues].question}
                    </Card.Text>
                  </Card.Body>
                    <Card.Img variant="top" id="card-image" src={questionDetails[currQues].card} alt="card"/>
                </Card>
              </div>
                <div className='container-div' id="answer_container">
                  <Row>
                    <Col>
                      <div className='options-div'>
                      {questionDetails[currQues] && questionDetails[currQues].options && (
                      questionDetails[currQues].options.map((option) => (
                        <Button
                        id="answer_button_incorrect"
                        key={option._id}
                        style={{
                        borderColor: 
                        option.option === item.incorrectAnswers[currQues].userAnswer ? 'red' : 
                        option.option === item.incorrectAnswers[currQues].correctAnswer ? 'green' : ''

                        ,color: 
                        option.option === item.incorrectAnswers[currQues].userAnswer ? 'red' : 
                        option.option === item.incorrectAnswers[currQues].correctAnswer ? 'green' : ''
                        }}
                        >
                        {option.option}
                        </Button>
                      ))
                      )}
                      </div>
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
                </div>
            </Stack>
          </div>
          )}
          </>
          ): (
          <>
          </>
          )}
        </div>
        </>
  );
};

export default IncorrectAnswersPage;
