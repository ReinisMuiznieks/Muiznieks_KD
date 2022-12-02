import React from "react";
import NavbarTop from "../../components/navbar/navbar.jsx";
import Footer from "../../components/footer/footer.jsx";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import './home.scss'
import image from '../../images/home_image.svg'
import { useSelector } from 'react-redux'

function Home() {
  const { user } = useSelector((state) => state.auth)

    return (
<>
<NavbarTop />
  <div id="legend">
    <Container>
          <Row>
            <Col>
                <h1 id="home-slogan">Latvian language learning online</h1> {/* Latviešu valodas apguve internēta */}
                <p id="home-text">Learn Latvian at the best time for you from anywhere. Expand your vocabulary and measure your knowledge by doing tests & keep track of your progress.</p> {/* Apgūsti latviešu valodu sev vispiemērotākajā laikā no jebkuras vietas. Paplašiniet savu vārdu krājumu un novērtējiet savas zināšanas testu veidā un sekojoiet līdzi savam progresam. */}
                {user ? (
                  <></>
                ) : (
                  <Button variant="outline-secondary" id="get-started-home" href="/sign-up">Get started</Button>
                )}
                
            </Col>
            <Col id="test">
                <img src={image} alt="learning" id="home-image"></img>

            </Col>
          </Row>
    </Container>
</div>

<Footer />
</>
        )
}

export default Home;