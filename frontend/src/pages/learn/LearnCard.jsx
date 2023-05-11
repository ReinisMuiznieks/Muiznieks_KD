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
import '../test/test.scss'
import styled from "styled-components"
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import ProgressBar from 'react-bootstrap/ProgressBar';
import '../../components/card/cards.scss'
import CardCompleted from "../../components/card/CardCompleted";

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
    // const [currCard, setCurrCard] = useState(0);

    // const [userTestId, setUserTestId] = useState('');

        const navigate = useNavigate()
      
        const params = useParams();
        const id = params;

        const handleNext = async () => {
          console.log(userLearnId);
            if (currCard >= cards.length - 1) {             
              submitLearn();
              setShowResults(true);
            } else {
              try {
                const updatedProgress = currCard+1;
                await axios.patch(
                  `http://localhost:5000/api/userlearn/${userLearnId}`,
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
                  `http://localhost:5000/api/userlearn/${userLearnId}`,
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
            `http://localhost:5000/api/cards?category=${id.id}`,
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
                    <ProgressBar now={currCard + 1} label={currCard + 1 + "/" + cards.length} max={cards.length} />
                    {/* <ProgressBar now={currQues + 1} label={Math.round((100 / questions.length) * [currQues+1])+ "%"} max={questions.length}/> */}
                  </div>
    
                  <div id="card-legend">
                    <Card id="question-card">
                      <Card.Body>
                        <Card.Text id="card-text">
                          {cards[currCard].lv_word}
                        </Card.Text>
                      </Card.Body>
                      <Card.Img variant="top" id="card-image" src={cards[currCard].image} alt="card" />
                    </Card>
                  </div>
    
                  <Container id="answer_container">
                    <Row>
                      <Col>
                        <Button
                          id="next_incorrect_question_button"
                          variant="contained"
                          color="primary"
                          size="large"
                          style={{ width: 185 }}
                          onClick={handlePrevious}
                        >
                          {currCard === 0 ? (<span>Back</span>) : (<span>Previous</span>)}
                        </Button>
    
                        <Button
                          id="next_incorrect_question_button"
                          variant="contained"
                          color="primary"
                          size="large"
                          style={{ width: 185 }}
                          onClick={handleNext}
                        >
                          {currCard >= (cards.length - 1) ? (<span>Done</span>) : (<span>Next Card</span>)}
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
