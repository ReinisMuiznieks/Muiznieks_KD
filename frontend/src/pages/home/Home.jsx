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
                <h1 id="home-slogan">Latviešu valodas apguve internēta</h1>
                <p id="home-text">Apgūsti latviešu valodu sev vispiemērotākajā laikā no jebkuras vietas. Paplašiniet savu vārdu krājumu un novērtējiet savas zināšanas testu veidā un sekojoiet līdzi savam progresam.
                
                </p>
                {user ? (
                  <></>
                ) : (
                  <Button variant="outline-secondary" id="get-started-home" href="/sign-up">Reģistrēties</Button>
                )}
                
            </Col>
            <Col id="test">
                <img src={image} alt="learning" id="home-image"></img>

            </Col>
          </Row>
    </Container>
</div>

{/* <div>
    <Container className="p-3 text-center">
      <h1>Tēmas</h1>
        <Row id="kateg">
          <Col>
          <p>1. Pamata frāzes</p>
          <p>2. Nedēļas dienas</p>
          <p>3. Norādes</p>
          <p>4. Norādījuu izpratne</p>
          <p>5. Dienas</p>
          </Col>
          <Col>
          <p>6. Nedēļas</p>
          <p>7. Mēneši</p>
          <p>8. Komunikācija</p>
          <p>9. Iepazīšanās</p>
          <p>10. Transports</p>
          </Col>
          <Col>
          <p>6. Nedēļas</p>
          <p>7. Mēneši</p>
          <p>8. Komunikācija</p>
          <p>9. Iepazīšanās</p>
          <p>10. Transports</p>
          </Col>
        </Row>
    </Container>
</div> */}
<Footer />
</>
        )
}

export default Home;