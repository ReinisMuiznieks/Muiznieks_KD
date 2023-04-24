import React, { useEffect, useState } from "react";
import '../learn/learn.scss';
import NavbarTop from "../../components/navbar/Navbar.jsx";
import Footer from "../../components/footer/Footer.jsx";
import axios from 'axios'
import { Navigate, useLocation } from "react-router";
import Spinner from "../../components/spinner/Spinner";
import NoCards from "../../components/card/NoCards";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import { useSelector } from 'react-redux'
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import icon from '../../images/question_mark.svg'
import Popover from 'react-bootstrap/Popover';
import CardCompleted from "../../components/card/CardCompleted";
import { useDispatch } from 'react-redux'
import { deleteCard } from '../../features/card/cardSlice'
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
    const [answer, setAnswer] = useState([]);
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
            cat
              ? `http://localhost:5000/api/questions?test=${cat}`
              : "http://localhost:5000/api/questions", { headers }
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
                  `http://localhost:5000/api/answers?question=${questions[currentCard]._id}`, { headers }
              );
              setIsLoading(false);
              setAnswers(res.data);
            } catch (err) {}
          };

          getAnswers();

        //   const getAnswerById = async () => {
        //     try {
        //       const res = await axios.get(
        //           `http://localhost:5000/api/answers/${answer._id}`, { headers }
        //       );
        //       setAnswer(res.data);
        //     } catch (err) {}
        //   };
        //   getAnswerById();
        });

      const displayAnswers = async () => {
        const headers = { 'Authorization': `Bearer ${user.token}` };
        try {
          const res = await axios.get(
            cat
              ? `http://localhost:5000/api/questions?test=$${questions[currentCard]._id}`
              : "http://localhost:5000/api/questions", { headers }
          );

        if (currentCard + 1 < (res.data).length) {
          setCurrentCard(currentCard + 1);
        } else {
          setShowResults(true);
        }  
        } catch (err) {}
      };

      if(isLoading) {
        return <Spinner/>
    }


    return (
<>
<NavbarTop />

<section className="content">
  { showResults ? (
    //<CardCompleted key={tests.length} words={tests.length} category={cards[currentCard].category.name}/>
    <>
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
 
            <Container>
                
                <Stack id="learn-stack">
        
                <Card>
                    <Card.Body>
                        <Card.Text id="card-text">
                        {questions[currentCard].question}
                        </Card.Text>
                    </Card.Body>
                </Card>


    <>
    <Container>
        <div className="col">
                {answers.map(answer => 
                <Button variant="outline-primary" key={answer._id}>{answer.answer}</Button>)}
        </div>
    </Container>
    </>
                <div className="buttons">
                    <Button id="continue-button" onClick={displayQuestion}>Continue</Button>
                    {/* {isAdmin ? (
                      <>
                        <button onClick={handleShowDelete} className="close mt-2" id="delete-button">Delete <b>{cards[currentCard].lv_word}</b></button>
                      </>
                    ) : (
                      <>
                      </>
                    )} */}
                </div>
                </Stack>
            </Container>
        </div>
        ) : (<NoCards/>)}
    </>
  )} 
    </section>
    
<Footer/>
</>
    )

}

export default TestQuestions;
