import React from "react";
import "./login.scss";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import NavbarTop from "../../components/navbar/navbar.jsx";
import Footer from "../../components/footer/footer.jsx";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Login = () => {
    return (
<><NavbarTop/>

<Container id="login-container">
    <Row className="full-form">
        <Col>
        <img src="https://svgur.com/i/nUN.svg" alt="log-in" id="login-image"></img>
        
        </Col>

        <Col>
            <Form id="login-form">
                <h3 id="form-title" className="text-center">Pieslēgšanās</h3>
                <div className="text-center">Vēl neesiet reģistrēti?{" "}
                    <a className="link-primary" id="login-href" href="/sign-up">Reģistrēties</a>
                </div>

                <Form.Group className="mb-3 pt-3" controlId="formEmail">
                <Form.Label>Epasts</Form.Label>
                <Form.Control type="email" placeholder="Ievadiet e-pastu" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Parole</Form.Label>
                <Form.Control type="password" placeholder="Ievadiet paroli" />
                </Form.Group>

                <Button variant="primary" type="submit" id="submit-form">Pieslēgties</Button>
                <p className="text-center mt-2">Aizmirsāt <a href="/forgot-password">paroli?</a></p>
            </Form>
        </Col>
    </Row>
</Container>

<Footer/></>

    )
}

export default Login;
