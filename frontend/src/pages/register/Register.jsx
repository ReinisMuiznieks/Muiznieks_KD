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

import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register, reset } from '../../features/auth/authSlice'

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

   const { name, email, password, password2 } = formData

   const navigate = useNavigate()
   const dispatch = useDispatch()

  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (password !== password2) {
      toast.error('Paroles nesakrīt!')
    } else {
      const userData = {
        name,
        email,
        password,
      }

      dispatch(register(userData))
    }
  }
    
return (
    <><NavbarTop/>
    
    <Container id="register-container">
        <Row className="full-form">
            <Col>
            <img src={image} alt="sign-up" id="register-image"></img>
            
            </Col>
    
            <Col>
                <Form id="register-form" onSubmit={onSubmit}>
                    <h3 id="form-title" className="text-center">Reģistrācija</h3>
                    <div className="text-center">Esiet jau reģistrēti?{" "}
                        <a className="link-primary" id="login-href" href="/log-in">Pieslēgties</a>
                    </div>
    
                    <Form.Group className="mb-3 pt-3">
                    <Form.Label>Vārds</Form.Label>
                    <div className='form-group'>
                    <input
                        type='text'
                        className='form-control'
                        id='name'
                        name='name'
                        value={name}
                        placeholder='Ievadiet vārdu'
                        onChange={onChange}
                    />
                      </div>
                    </Form.Group>
    
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
    
                    <Form.Group className="mb-3">
                    <Form.Label>Apstiprināt paroli</Form.Label>
                    <div className='form-group'>
                    <input
                        type='password'
                        className='form-control'
                        id='password2'
                        name='password2'
                        value={password2}
                        placeholder='Apstipriniet paroli'
                        onChange={onChange}
                    />
                    </div>
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
