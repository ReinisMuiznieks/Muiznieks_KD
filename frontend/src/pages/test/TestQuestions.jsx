import React, { useEffect, useState } from "react";
import '../learn/learn.scss';
import NavbarTop from "../../components/navbar/Navbar.jsx";
import Footer from "../../components/footer/Footer.jsx";
import axios from 'axios'
import { useLocation } from "react-router";
import Spinner from "../../components/spinner/Spinner";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import { useSelector } from 'react-redux'
import Card from 'react-bootstrap/Card';
import { useDispatch } from 'react-redux'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './test.scss';
import TestCompleted from "../../components/test/TestCompleted";

const TestQuestions = () => {
    const dispatch = useDispatch()
    const location = useLocation();
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const cat = location.pathname.split("/")[2];
    const [isLoading, setIsLoading] = useState(true);
    const [currentCard, setCurrentCard] = useState(0);
    const [showResults, setShowResults] = useState(false);

    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true);
    const { user } = useSelector((state) => state.auth)
    const [isAdmin, setIsAdmin] = useState(false);
    const [cards, setCards] = useState([]);

    const [score, setScore] = useState(0);
    const [answer, setAnswer] = useState(0);

    const headers = { 'Authorization': `Bearer ${user.token}` };
    useEffect(() => {
      checkRole();
    })

    const checkRole = () => {
      if(user && user.role === 'admin'){
      setIsAdmin(true)
    }
    else{
      setIsAdmin(false)
    }
  }

    useEffect(() => {
        const getQuestions = async () => {
          try {
            const res = await axios.get(
              cat
                ? `http://localhost:5000/api/questions?test=${cat}`
                : "http://localhost:5000/api/questions", { headers }
            );
            setIsLoading(false);
            setQuestions(res.data);
          } catch (err) {}
        };
        getQuestions();
      }, [cat]);

      const displayQuestion = async () => {
        try {
          const res = await axios.get(
               `http://localhost:5000/api/questions?test=${cat}`, { headers }
          );

        if (currentCard + 1 < (res.data).length) {
          setCurrentCard(currentCard + 1);
        } else {
          setShowResults(true);
        }  
        } catch (err) {}
      };

      useEffect(() => {
        const getAnswers = async () => {
            try {
              const res = await axios.get(
                questions
                  ? `http://localhost:5000/api/answers?question=${questions[currentCard]._id}`
                  : "http://localhost:5000/api/answers?question", { headers }
              );
              setIsLoading(false);
              setAnswers(res.data);
            } catch (err) {}
          };

          getAnswers();
        });

        useEffect(() => {
          const getCard = async () => {
              try {
                const res = await axios.get(
                  questions
                    ? `http://localhost:5000/api/cards/${questions[currentCard].card}`
                    : "http://localhost:5000/api/cards", { headers }
                );
                setIsLoading(false);
                setCards(res.data);
              } catch (err) {}
            };
            getCard();
          });

      // const displayAnswers = async () => {
      //   const headers = { 'Authorization': `Bearer ${user.token}` };
      //   try {
      //     const res = await axios.get(
      //       cat
      //         ? `http://localhost:5000/api/questions?test=$${questions[currentCard]._id}`
      //         : "http://localhost:5000/api/questions", { headers }
      //     );

      //   if (currentCard + 1 < (res.data).length) {
      //     setCurrentCard(currentCard + 1);
      //   } else {
      //     setShowResults(true);
      //   }  
      //   } catch (err) {}
      // };

      if(isLoading) {
        return <Spinner/>
    }

    const getAnswer = async () => {
      try {
        const res = await axios.get(
          questions
            ? `http://localhost:5000/api/answers?question=${questions[currentCard]._id}`
            : "http://localhost:5000/api/answers?question", { headers }
        );
        setIsLoading(false);
        setAnswers(res.data);
      } catch (err) {}
    };

    const displayCard = async () => {
      try {
        const res = await axios.get(
          cat
            ? `http://localhost:5000/api/questions?test=${cat}`
            : "http://localhost:5000/api/questions", { headers}
        );

      if (currentCard + 1 < (res.data).length) {
        setCurrentCard(currentCard + 1);
      } else {
        setShowResults(true);
      }
      
      } catch (err) {}

    };

    return (
<>
<NavbarTop />

<section className="content">
  { showResults ? (
    <>
      <TestCompleted key={questions.length} words={questions.length} question={questions[currentCard].test.testname}/>
    </>
  ) : (
    <>
      {questions.length > 0 ? (
        
            <div id="learn-legend">
  {isAdmin ? (
  <>
              </>
    ) : (
      <>
      </>
    )}
    {/* <Button id="continue-button" onClick={displayCard}>Continue</Button> */}
            <Container>
                
                <Stack id="learn-stack">
        
                <Card>
                <Card.Body>
                        <Card.Text id="card-text">
                        {questions[currentCard].question}
                        </Card.Text>
                    </Card.Body>

                <Card.Img variant="top" id="card-image" className="pt-4" src={cards.image} alt={questions[currentCard].card} />
                </Card>



    <Container id="answer_container">
        <Row>
                {answers.map(answer => 
                <Col><Button id="answer_button" onClick={displayCard} key={answer._id}>{answer.answer}</Button></Col>)}
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
        </div>
        ) : (<h1>test</h1>)}
    </>
  )} 
    </section>
    
<Footer/>
</>
    )

}

export default TestQuestions;
