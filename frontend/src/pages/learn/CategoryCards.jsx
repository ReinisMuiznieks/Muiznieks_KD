import React, { useEffect, useState } from "react";
import './learn.scss';
import NavbarTop from "../../components/navbar/Navbar.jsx";
import Footer from "../../components/footer/Footer.jsx";
import axios from 'axios'
import { Navigate, useLocation } from "react-router";
import Spinner from "../../components/spinner/Spinner";
import NoCards from "../../components/card/NoCards";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import icon from '../../images/question_mark.svg'
import Popover from 'react-bootstrap/Popover';
import CardCompleted from "../../components/card/CardCompleted";

const CategoryCards = () => {
    const location = useLocation();
    const [cards, setCards] = useState([]);
    const cat = location.pathname.split("/")[2];
    const [isLoading, setIsLoading] = useState(true);
    const [currentCard, setCurrentCard] = useState(0);
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        const getCards = async () => {
          try {
            const res = await axios.get(
              cat
                ? `https://verbum-server-kd.onrender.com/api/cards?category=${cat}`
                : "https://verbum-server-kd.onrender.com/api/cards"
            );
            setIsLoading(false);
            setCards(res.data);
          } catch (err) {}
        };
        getCards();
      }, [cat]);


      const displayCard = async () => {
        try {
          const res = await axios.get(
            cat
              ? `https://verbum-server-kd.onrender.com/api/cards?category=${cat}`
              : "https://verbum-server-kd.onrender.com/api/cards"
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
    <CardCompleted key={cards.length} words={cards.length} category={cards[currentCard].category.name}/>
  ) : (
    <>
      {cards.length > 0 ? (
            <div id="learn-legend">
            <Container>
                
                {/* <h1 className="text-center pb-4">{category}</h1>  category vjg tikai prieks admin lapas */}
                <Stack id="learn-stack">
        
                <Card>
                    <Card.Img variant="top" id="card-image" className="pt-4" src={cards[currentCard].image} alt={cards[currentCard].lv_word} />
        
                    <Card.Body>
                        <Card.Text id="card-text">
                        {cards[currentCard].lv_word}
                        
                        <OverlayTrigger
                        placement="top"
                        overlay={
                            <Popover id="popover-contained">
                            <Popover.Body id="eng-word">
                              <strong>{cards[currentCard].eng_word}</strong>
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
                {/* <button onClick={() => dispatch(deleteCard(card._id))}className="close">Delete</button> */}
                </Card>
                <div className="buttons">
                    <Button id="continue-button" onClick={displayCard}>Continue</Button>
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

export default CategoryCards;
