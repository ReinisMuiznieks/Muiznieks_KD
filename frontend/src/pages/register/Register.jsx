import React from "react";
import './register.scss';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import NavbarTop from "../../components/navbar/navbar.jsx";
import Footer from "../../components/footer/footer.jsx";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import image from '../../images/register_image.svg'

const Register = () => {
    return (
<><NavbarTop/>

<Container id="register-container">
    <Row className="full-form">
        <Col>
        <img src={image} alt="sign-up" id="register-image"></img>
        
        </Col>

        <Col>
            <Form id="register-form">
                <h3 id="form-title" className="text-center">Reģistrācija</h3>
                <div className="text-center">Esiet jau reģistrēti?{" "}
                    <a className="link-primary" id="login-href" href="/log-in">Pieslēgties</a>
                </div>

                <Form.Group className="mb-3 pt-3" controlId="formEmail">
                <Form.Label>Epasts</Form.Label>
                <Form.Control type="email" placeholder="Ievadiet e-pastu" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Vārds</Form.Label>
                <Form.Control type="name" placeholder="Ievadiet vārdu" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Parole</Form.Label>
                <Form.Control type="password" placeholder="Ievadiet paroli" />
                </Form.Group>

                <Button variant="primary" type="submit" id="submit-form">Reģistrēties</Button>

            </Form>
        </Col>
    </Row>
</Container>

<Footer/></>

    )
}

export default Register;
