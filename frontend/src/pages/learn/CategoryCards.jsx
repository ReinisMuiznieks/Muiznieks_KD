import React, { useEffect, useState } from "react";
import './learn.scss';
import NavbarTop from "../../components/navbar/Navbar.jsx";
import Footer from "../../components/footer/Footer.jsx";
import axios from 'axios'
import { useLocation } from "react-router";
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

const CategoryCards = () => {
    const dispatch = useDispatch()
    const location = useLocation();
    const [cards, setCards] = useState([]);
    const cat = location.pathname.split("/")[2];
    const [isLoading, setIsLoading] = useState(true);
    const [currentCard, setCurrentCard] = useState(0);
    const [showResults, setShowResults] = useState(false);

    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true);
    const { user } = useSelector((state) => state.auth)
    const [isAdmin, setIsAdmin] = useState(false);

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

    const onDelete = () => {
      dispatch(deleteCard(cards[currentCard]._id))
      window.location.reload();
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
  {isAdmin ? (
  <>
              <Modal show={showDelete} onHide={handleCloseDelete}>
                <Modal.Header closeButton>
                  <Modal.Title>Delete category</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete <b>{cards[currentCard].lv_word}</b> category?</Modal.Body>
                <Modal.Footer>
                  <Button variant="outline-secondary" onClick={handleCloseDelete}>
                    Cancel
                  </Button>
                  <Button variant="outline-danger" onClick={onDelete}>
                    Delete
                  </Button>
                </Modal.Footer>
              </Modal>
              </>
    ) : (
      <>
      </>
    )}
 
            <Container>
                
                <Stack id="learn-stack">
        
                <Card>
                    <Card.Img variant="top" id="card-image" className="pt-4" src={cards[currentCard].image} alt={cards[currentCard].lv_word} />
                    <a href="/credits" className="img-attrib">Credits</a>


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
                </Card>
                <div className="buttons">
                    <Button id="continue-button" onClick={displayCard}>Continue</Button>
                    {isAdmin ? (
                      <>
                        <button onClick={handleShowDelete} className="close mt-2" id="delete-button">Delete <b>{cards[currentCard].lv_word}</b></button>
                      </>
                    ) : (
                      <>
                      </>
                    )}
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
