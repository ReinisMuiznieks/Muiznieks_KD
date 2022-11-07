import React from "react";
import "./login.scss";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import NavbarTop from "../../components/navbar/navbar.jsx";
import Footer from "../../components/footer/footer.jsx";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import image from '../../images/login_image.svg'
import {useState, useEffect} from 'react';

function Login(){
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const { email, password } = formData
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }) )
    }

    const onSubmit = (e) => {
        e.preventDefault()
    }

    return (
<><NavbarTop/>

<Container id="login-container">
    <Row className="full-form">
        <Col>
        <img src={image} alt="log-in" id="login-image"></img>
        
        </Col>

        <Col>
            <Form id="login-form" onSubmit={onSubmit}>
                <h3 id="form-title" className="text-center">Pieslēgšanās</h3>
                <div className="text-center">Vēl neesiet reģistrēti?{" "}
                    <a className="link-primary" id="login-href" href="/sign-up">Reģistrēties</a>
                </div>

                <Form.Group className="mb-3">
                <Form.Label>E-pasts</Form.Label>
                <div className='form-group'>
                <input
                    type='email'
                    className='form-control'
                    id='email'
                    name='email'
                    value={email}
                    placeholder='Ievadiet e-pastu'
                    onChange={onChange}
                />
                </div>
                </Form.Group>

                <Form.Group className="mb-3">
                <Form.Label>Parole</Form.Label>
                <div className='form-group'>
                <input
                    type='password'
                    className='form-control'
                    id='password'
                    name='password'
                    value={password}
                    placeholder='Ievadiet paroli'
                    onChange={onChange}
                />
                </div>
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
