import React from "react";
import './learn.scss';
import NavbarTop from "../../components/navbar/navbar.jsx";
// import Footer from "../../components/footer/footer.jsx";
import Container from 'react-bootstrap/Container';
// import Flashcard from "../../components/flashcard/flashcard";
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';

import image from '../../images/login_image.svg';

const Learn = () => {
    return (
<>
<NavbarTop />
  <div id="learn-legend">
    <Container>
        
        <h1 className="text-center pb-4">Category name</h1>
          {/* <Flashcard></Flashcard> */}
        <Stack id="learn-stack">

        <Card>
        <Card.Img variant="top" id="card-image" className="pt-4" src={image} />

        <Card.Body>
            <Card.Text id="card-text">
            Durvis
            </Card.Text>
        </Card.Body>
        </Card>
        

        </Stack>
    </Container>
</div>

</>
    )
}

export default Learn;
