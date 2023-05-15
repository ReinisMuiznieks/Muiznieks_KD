import React from "react";
import NavbarTop from "../../components/navbar/Navbar.jsx";
import Footer from "../../components/footer/Footer.jsx";
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
                <h1 id="home-slogan">Learn <span className="gradient-accent">Latvian</span><br></br> Language Online</h1> {/* Latviešu valodas apguve internēta */}
                <p id="home-text">Learn Latvian at the best time for you from anywhere. Expand your vocabulary and measure your knowledge by doing tests & keep track of your progress.</p> {/* Apgūsti latviešu valodu sev vispiemērotākajā laikā no jebkuras vietas. Paplašiniet savu vārdu krājumu un novērtējiet savas zināšanas testu veidā un sekojoiet līdzi savam progresam. */}
                {user ? (
                  <>
                  <Button variant="outline-secondary" id="get-started-home" href="/learn">Get started</Button>
                  </>
                ) : (
                  <>
                  <Button variant="outline-secondary" id="get-started-home"  className="login-button"href="/sign-up">Get started</Button>
                  </>
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