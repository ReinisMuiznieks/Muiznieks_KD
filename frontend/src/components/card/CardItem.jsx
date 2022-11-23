import { useDispatch } from 'react-redux'
import { deleteCard } from '../../features/card/cardSlice'
import React from "react";
import '../../pages/learn/learn.scss';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';

function CardItem({card, category}) {
    const dispatch = useDispatch()

    return (
<>
  <div id="learn-legend">
    <Container>
        
        {/* <h1 className="text-center pb-4">{category}</h1>  category vjg tikai prieks admin lapas */}
          {/* <Flashcard></Flashcard> */}
        <Stack id="learn-stack">

        <Card>
        <Card.Img variant="top" id="card-image" className="pt-4" src={card.image} alt={card.title} />

        <Card.Body>
            <Card.Text id="card-text">
            {card.title}
            </Card.Text>
        </Card.Body>
        {/* <button onClick={() => dispatch(deleteCard(card._id))}className="close">Delete</button> */}
        </Card>
        
        </Stack>
    </Container>
</div>

</>
    )
}

export default CardItem;
