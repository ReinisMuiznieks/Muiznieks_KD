import '../card/card.scss';
import './learn.scss';
import '../test/test.scss';
import React, { useEffect, useState, useRef } from "react";
import NavbarTop from "../navbar/Navbar.jsx";
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
import AttributionIcon from '@mui/icons-material/Attribution';

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
    setCards,
    userLearnId,
  }) => { // saņem mainīgos no Learn komponenta
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useSelector((state) => state.auth)
    const headers = { 'Authorization': `Bearer ${user.token}` };
    const [showResults, setShowResults] = useState(false);
    const navigate = useNavigate()
    const params = useParams();
    const id = params;
    const audioRef = useRef(null);

    // funkcija kas atskaņo audio
    const handlePlay = () => {
      audioRef.current.play();
    };
        
    // funkcija kas notiek kad lietotājs izvēlas nevigēt uz nākamo vārda kartiņu
    const handleNext = async () => {
      // ja pēdējā kartiņa
        if (currCard >= cards.length - 1) {             
          submitLearn();
          setShowResults(true);
        } else {
          // citādi atjaunināt lietotāja progresu
          try {
            const updatedProgress = currCard+1;
            await axios.patch(
              `https://verbum-server-kd.onrender.com/api/userlearn/${userLearnId}`,
              { progress: updatedProgress },
              { headers }
            );
            // piešķirt currCard mainīgajam vērtību kā nākamo kartiņu
            setCurrCard(currCard + 1);
          } catch (error) {
            console.log(error);
            setError(true);
          }
        }
      };
          
      // funckija kas notiek kad lietotājs ir apguvis visas mācību kartiņas
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

      // funkcija kas notiek kad lietotājs izvēlas nevigēt uz iepriekšējo vārda kartiņu
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
          `https://verbum-server-kd.onrender.com/api/cards?category=${id.id}`,{headers}
        );
        setCards(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    useEffect(() => {
      getCards();
    }, [])
      
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
                  </div>
    
                  <div id="card-legend">
                    <Card id="question-card">
                      <AttributionIcon id="attribution-icon" alt="credits" onClick={() => navigate("/credits")} />
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

      </>
    );
    

}

export default LearnCard;
