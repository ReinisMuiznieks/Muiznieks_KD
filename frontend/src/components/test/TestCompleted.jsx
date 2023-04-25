import React from "react";
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import image from '../../images/completed.svg'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../card/card.scss'

function TestCompleted({questions, test}) {

    return (
<>
  <div id="learn-legend">
    <Container>
        <Stack id="notfound-stack">
            
            <img src={image} alt="404" id="notfound-image"></img>
            <h3 id="complete-title" className="text-center">Test completed!</h3>
            <Card id="complete-card">
            <Container>
                <Row id="card-items">
                    <Col>Questions</Col>
                    <Col id="item">{questions}</Col>
                </Row>
            </Container>
                {/* <Card.Body >Dictionary + {words}</Card.Body> */}
            </Card>
            <Card id="complete-card">
            <Container>
                <Row id="card-items">
                    <Col>{test}</Col>
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

export default TestCompleted;