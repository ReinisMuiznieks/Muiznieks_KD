import React from "react";
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import image from '../../images/completed.svg'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../card/card.scss'
import axios from 'axios'
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import { useSelector } from "react-redux";

const TestCompleted = () => {
    const [score, setScore] = useState(0);
    const [test, setTest] = useState(" ");
    const [questions, setQuestions] = useState(0);
    const { user } = useSelector((state) => state.auth)
    const params = useParams();
    const id = params;

    useEffect(() => {
        getExamNames();
        getTest();
        getQuestions();
      }, [setScore])
    
      const getExamNames = async () => {
        const { data } = await axios.get(`http://localhost:5000/api/usertests/test/${id.id}`, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            },
          },);
        setScore([data[data.length-1].score])
      } 

      const getTest = async () => {
        const { data } = await axios.get(`http://localhost:5000/api/tests/${id.id}`, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            },
          },);
        setTest(data[0].testname)
      }

      const getQuestions = async () => {
        const { data } = await axios.get(`http://localhost:5000/api/questions?test=${id.id}`, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            },
          },);
        setQuestions(data.length)
      }
      

    return (
<>
  <div id="learn-legend">
    <Container>
        <Stack id="notfound-stack">
            
            <img src={image} alt="404" id="notfound-image"></img>
            <h3 id="complete-title" className="text-center">Test completed!</h3>
            <Card id="complete-card">
            <Container>
                <Row id="card-items">
                    <Col>Score</Col>
                    <Col id="item">{score}/{questions}</Col>
                </Row>
            </Container>
                {/* <Card.Body >Dictionary + {words}</Card.Body> */}
            </Card>
            <Card id="complete-card">
            <Container>
                <Row id="card-items">
                    <Col>Test</Col>
                    <Col id="item">{test}</Col>
                </Row>
            </Container>
                {/* <Card.Body >Dictionary + {words}</Card.Body> */}
            </Card>
            
            <Button variant="outline-secondary" id="complete-button" href="/test">Continue</Button>
        </Stack>
    </Container>
</div>

</>
    )
}

export default TestCompleted;