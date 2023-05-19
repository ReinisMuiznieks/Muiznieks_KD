import '../card/card.scss';
import './learn.scss';
import '../test/test.scss';
import React, { useEffect, useState, useRef } from "react";
import NavbarTop from "../navbar/Navbar.jsx";
import Footer from "../footer/Footer.jsx";
import axios from 'axios'
import Spinner from "../spinner/Spinner";
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { useSelector } from 'react-redux'
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styled from "styled-components"
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom'
import ProgressBar from 'react-bootstrap/ProgressBar';
import CardCompleted from "../learn/LearningCompleted";
import icon from '../../images/question_mark.svg';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Image from 'react-bootstrap/Image';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const LearnCard = ({
    currCard,
    setCurrCard,
    cards,
    category_id,
    setCards,
    userLearnId,
  }) => {
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useSelector((state) => state.auth)
    const headers = { 'Authorization': `Bearer ${user.token}` };
    const [cardCount, setCardCount] = useState(0);
    const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate()
  const params = useParams();
  const id = params;

        const audioRef = useRef(null);
        const handlePlay = () => {
          audioRef.current.play();
        };
        

        const handleNext = async () => {
          console.log(userLearnId);
            if (currCard >= cards.length - 1) {             
              submitLearn();
              setShowResults(true);
            } else {
              try {
                const updatedProgress = currCard+1;
                await axios.patch(
                  `https://verbum-server-kd.onrender.com/api/userlearn/${userLearnId}`,
                  { progress: updatedProgress },
                  { headers }
                );
                setCurrCard(currCard + 1);
              } catch (error) {
                console.log(error);
                setError(true);
              }
            }
          };
          
          const submitLearn = async () => {
            try {
                const updatedProgress = currCard+1;
                await axios.patch(
                  `https://verbum-server-kd.onrender.com/api/userlearn/${userLearnId}`,
                  { progress: updatedProgress, completed: true },
                  { headers }
                );
              } catch (error) {
                console.log(error);
                setError(true);
              }
          };

        const handlePrevious = () => {
            if (currCard == 0) {
              navigate(`/learn/`);
            } else {
              setCurrCard(currCard - 1);
            }
          };

      const getCards = async () => {
        setIsLoading(true);
        try {
          const { data } = await axios.get(
            `https://verbum-server-kd.onrender.com/api/cards?category=${id.id}`,
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          setCards(data);
          setCardCount(data.length);
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      };

      useEffect(() => {
        getCards();
      }, [setCardCount])
       

    if(isLoading) {
        return <Spinner/>
    }
    
    return (
      <>
        <NavbarTop />
    
        {showResults ? (
          <CardCompleted key={cards.length} words={cards.length} category={cards[currCard].category.name} />
        ) : (
          <>
            {cards.length > 0 ? (
              <Container>
                <Stack id="question-stack">
                  <div className="container">
                    <ProgressBar id="progress-bar" now={currCard + 1} label={currCard + 1 + "/" + cards.length} max={cards.length} />
                    {/* <ProgressBar now={currQues + 1} label={Math.round((100 / questions.length) * [currQues+1])+ "%"} max={questions.length}/> */}
                  </div>
    
                  <div id="card-legend">
                    <Card id="question-card">
                      <Card.Body>
                        <Card.Text id="card-text">
                          {cards[currCard].lv_word}

                          <OverlayTrigger
                            placement="top"
                            overlay={
                                <Popover id="popover-contained">
                                <Popover.Body id="eng-word">
                                  <strong>{cards[currCard].eng_word}</strong>
                                </Popover.Body>
                              </Popover>
                            }
                            >
                            {({ ref, ...triggerHandler }) => (
                                <Button
                                {...triggerHandler}
                                className="d-inline-flex align-items-center"
                                id="image-button"
                                >
                                <Image id="image"
                                    ref={ref}
                                    roundedCircle
                                    src={icon}
                                />
                                </Button>
                            )}
                          </OverlayTrigger>
                        </Card.Text>
                      </Card.Body>
                      <Card.Img variant="top" id="card-image" src={cards[currCard].image} alt="card" />

                        <div id="audio-player">
                          <audio ref={audioRef} src={cards[currCard].audio} type="audio/mpeg" />
                          <VolumeUpIcon id="play-audio-icon" onClick={handlePlay}/>
                        </div>

                    </Card>
                  </div>
    
                  <Container id="answer_container">
                    <Row>
                      <Col>
                        <Button
                          id="card_button"
                          variant="contained"
                          onClick={handlePrevious}
                        >
                          {currCard === 0 ? (<span>Back</span>) : (<span>Previous</span>)}
                        </Button>
    
                        <Button
                          id="card_button"
                          variant="contained"
                          onClick={handleNext}
                        >
                          {currCard >= (cards.length - 1) ? (<span>Done</span>) : (<span>Next</span>)}
                        </Button>
                      </Col>
                    </Row>
                  </Container>
                </Stack>
              </Container>
            ) : (<h3>No questions</h3>)}
          </>
        )}
    
        <Footer />
      </>
    );
    

}

export default LearnCard;
