import React from "react";
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import image from '../../images/completed.svg'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './card.scss'
// import confetti from "https://cdn.skypack.dev/pin/canvas-confetti@v1.6.0-t438JJTXIbBReqvLtDua/mode=imports/optimized/canvas-confetti.js";

function CardCompleted({words, category}) {
    // confetti();

    return (
<>

  <div id="learn-legend">
    <Container>
        <Stack id="notfound-stack">
            <img src={image} alt="404" id="notfound-image"></img>
            <h3 id="complete-title" className="text-center">Lesson complete!</h3>
            <Card id="complete-card">
            <Container>
                <Row id="card-items">
                    <Col>Dictionary</Col>
                    <Col id="item">+{words}</Col>
                </Row>
            </Container>
                {/* <Card.Body >Dictionary + {words}</Card.Body> */}
            </Card>
            <Card id="complete-card">
            <Container>
                <Row id="card-items">
                    <Col>{category}</Col>
                    <Col id="item">100%</Col>
                </Row>
            </Container>
                {/* <Card.Body >Dictionary + {words}</Card.Body> */}
            </Card>

            <Button variant="outline-secondary" id="complete-button" href="/learn">Continue</Button>
        </Stack>
    </Container>
</div>

</>
    )
}

export default CardCompleted;