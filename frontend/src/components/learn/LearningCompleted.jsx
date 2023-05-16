import '../card/card.scss'
import React from "react";
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import image from '../../images/completed.svg'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function LearningCompleted({words, category}) {

    return (
<>
  <div id="learn-legend">
    <Container>
        <Stack id="notfound-stack">
            
            <img src={image} alt="404" id="notfound-image"></img>
            <h3 id="complete-title" className="text-center">{category} Lesson Complete!</h3>
            <Card id="complete-card">
            <Container>
                <Row id="card-items">
                    <Col>New words</Col>
                    <Col id="item">+{words}</Col>
                </Row>
            </Container>
            </Card>
            <Card id="complete-card">
            <Container>
                <Row id="card-items">
                    <Col>{category}</Col>
                    <Col id="item">100%</Col>
                </Row>
            </Container>
            </Card>
            
            <Button variant="outline-secondary" id="complete-button" href="/learn">Continue</Button>
        </Stack>
    </Container>
</div>

</>
    )
}

export default LearningCompleted;