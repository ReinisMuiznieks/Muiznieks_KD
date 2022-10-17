import React from "react";
import NavbarTop from "../../components/navbar/navbar.jsx";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import './home.scss'

const Home = () => {
    return (
<>
<NavbarTop />
  <div id="legend">
    <Container>
          <Row>
            <Col>
                <h1 id="home-slogan">Latviešu valodas apguve internēta</h1>
                <p id="home-text">Apgūsti latviešu valodu sev vispiemērotākajā laikā no jebkuras vietas. Paplašiniet savu vārdu krājumu un novērtējiet savas zināšanas testu veidā un sekojoiet līdzi savam progresam.
                
                </p>
                <Button variant="outline-secondary" id="get-started-home" href="#sign-up">Reģistrēties</Button>

            </Col>
            <Col id="test">
                <img src="https://svgur.com/i/nSG.svg" alt="learning" id="home-image"></img>

            </Col>
          </Row>
          <Row>
            <Col></Col>
            <Col></Col>
            <Col></Col>
          </Row>
    </Container>
</div> 
    
</>
        )
}

export default Home;