import React from "react";
import './learn.scss';
import NavbarTop from "../../components/navbar/navbar.jsx";
import Footer from "../../components/footer/footer.jsx";
import Container from 'react-bootstrap/Container';
// import Flashcard from "../../components/flashcard/flashcard";
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';

const Learn = () => {
    return (
<>
<NavbarTop />
  <div id="learn-legend">
    <Container>
        <h1 className="text-center">A1 Līmenis</h1>
          {/* <Flashcard></Flashcard> */}
        <Stack id="learn-stack">
            <Card id="stack-card">
                <Card.Body id="stack-chapter">1. Nodaļa</Card.Body>
                <Card.Body id="stack-title">Iepazīšanās</Card.Body>
            </Card>

            <Card id="stack-card">
                <Card.Body id="stack-chapter">1. Nodaļa</Card.Body>
                <Card.Body id="stack-title">Iepazīšanās</Card.Body>
            </Card>

            <Card id="stack-card">
                <Card.Body id="stack-chapter">1. Nodaļa</Card.Body>
                <Card.Body id="stack-title">Iepazīšanās</Card.Body>
            </Card>
            
        </Stack>
    </Container>
</div>
<Footer />
</>
    )
}

export default Learn;
