import { useDispatch } from 'react-redux'
import { deleteCard } from '../../features/card/cardSlice'
import React, { useEffect } from "react";
import '../../pages/learn/learn.scss';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify'
import Modal from 'react-bootstrap/Modal';
import axios from 'axios'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import './test.scss';

function TestItem({test}) {
  const { user } = useSelector((state) => state.auth)
  const [iscompleted, setisCompleted] = useState(false);
  const dispatch = useDispatch()
  const [score, setScore] = useState(0);
  const [completedDate, setCompletedDate] = useState(" ");
  const [questions, setQuestions] = useState(0);
  const [scoreColor, setScoreColor] = useState(" ");

  useEffect(() => {

  getExamNames();
  // getColor();
  }, [])

  const getExamNames = async () => {

    try {
      const { data } = await axios.get(`http://localhost:5000/api/usertests/user/${user._id}`, {
        headers: {
            'Authorization': `Bearer ${user.token}`
        },
      },);
      
      const myDataDate = await Promise.all(data.map((d) => d.createdAt))
      const myDataScore = await Promise.all(data.map((d) => d.score))

      const myData = await Promise.all(data.map((d) => d.test))
      for (let i = 0; i <= myData.length; i++) {
          if (myData[i] === test._id) {
              setisCompleted(true);
              // setCompletedDate(myDataDate[i]);

              setCompletedDate(new Date(myDataDate[i]).toLocaleDateString(
                'en-gb',
                {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }
              ));

              setScore(myDataScore[i]);

              if(myDataScore[i] < 50)
              {
                setScoreColor("red");
              }
              else if(myDataScore[i] >= 50 && myDataScore[i] < 68)
              {
                setScoreColor("yellow");
              }
              else if(myDataScore[i] >= 68)
              {
                setScoreColor("green");
              }

          }
      }

    } catch (err) {
        console.log(err);
    }
  }

  // const getColor = async () => {
    // if(score < 50)
    // {
    //   console.log(score + "bad");
    //   setScoreColor("red");
    // }
    // else if(score > 50 && score < 69)
    // {
    //   console.log(score + "okay");
    //   setScoreColor("yellow");
    // }
    // else
    // {
    //   console.log(score + "good");
    //   setScoreColor("green");
    // }
  // }

    return (
        <>
        {iscompleted ? (
                <>
                <div id="card-legend">
                  <Container>
                      <Stack id="learn-stack">
                      <Link to={`/test/${test._id}`}  id='learn-link'>
                          <button id="stack-card-completed">
                            <Row>  
                              <Col>        
                                <Card.Body id="stack-chapter"> {test.testname}</Card.Body>   
                              </Col>
                              <Col>
                              {scoreColor == "red" ? (
                                <>
                                <Card.Body id="stack-chapter-datetext">{"Score"}</Card.Body>
                                <Card.Body id="stack-chapter-score-red">{score}%</Card.Body> 
                                </>
                              ) : (
                                <>
                                </>
                              )}

                              {scoreColor == "yellow" ? (
                                <>
                                <Card.Body id="stack-chapter-datetext">{"Score"}</Card.Body>
                                <Card.Body id="stack-chapter-score-yellow">{score}%</Card.Body> 
                                </>
                              ) : (
                                <>
                                </>
                              )}

                              {scoreColor == "green" ? (
                                <>
                                <Card.Body id="stack-chapter-datetext">{"Score"}</Card.Body>
                                <Card.Body id="stack-chapter-score-green">{score}%</Card.Body> 
                                </>
                              ) : (
                                <>
                                </>
                              )}
                                {/* <Card.Body id="stack-chapter-datetext">{"Score"}</Card.Body>
                                <Card.Body id="stack-chapter-score">{score}%</Card.Body>        */}
                              </Col>
                              <Col>
                                <Card.Body id="stack-chapter-datetext">{"Completed on"}</Card.Body>
                                <Card.Body id="stack-chapter-date">{completedDate}</Card.Body>       
                              </Col>
                               </Row>  
                          </button>
                      </Link>
                      </Stack>
                  </Container>
                </div>
                </>
              ) : (
                <>
                <div id="card-legend">
                  <Container>
                      <Stack id="learn-stack">
                      <Link to={`/test/${test._id}`}  id='learn-link'>
                          <button id="stack-card">             
                              <Card.Body id="stack-chapter" > {test.testname}</Card.Body>        
                          </button>
                      </Link>
                      </Stack>
                  </Container>
                </div>
                </>   
                )}
        </>
          )
}

export default TestItem;
