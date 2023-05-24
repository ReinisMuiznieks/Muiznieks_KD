import React from "react";
import './register.scss';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import NavbarTop from "../../components/navbar/Navbar.jsx";
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
    const uppercaseRegex = /[A-Z]/;

    if(!name || name.length <3 || name.length >12){
      toast.error('Name must be between 3-12 characters.')
    }
    else if(!email){
      toast.error('Email is required.')
    }
    else if(!password || password.length <6){
      toast.error('Password must be at least 6 symbols long.')
    }
    else if (!uppercaseRegex.test(password)) {
      toast.error("Password must contain at least one capital letter.");
    }
    else if (password !== password2) {
      toast.error('Password do not match!')
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
                    <h3 id="form-title" className="text-center">Register</h3> {/* Reģistrācija */}
                    <div className="text-center">Already have an account?{" "} {/* Esiet jau reģistrēti? */}
                        <a className="link-primary" id="login-href" href="/log-in">Login</a>
                    </div>
    
                    <Form.Group className="mb-3 pt-3">
                    <Form.Label>Name</Form.Label> {/* Vārds */}
                    <div className='form-group'>
                    <input
                        type='text'
                        className='form-control'
                        id='name'
                        name='name'
                        value={name}
                        placeholder='Enter name' /* Ievadiet vārdu */
                        onChange={onChange}
                    />
                      </div>
                    </Form.Group>
    
                    <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label> {/* E-pasts */}
                    <div className='form-group'>
                    <input
                        type='email'
                        className='form-control'
                        id='email'
                        name='email'
                        value={email}
                        placeholder='Enter email' /* Ievadiet e-pastu */
                        onChange={onChange}
                    />
                    </div>
                    </Form.Group>
    
                    <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label> {/* Parole */}
                    <div className='form-group'>
                    <input
                        type='password'
                        className='form-control'
                        id='password'
                        name='password'
                        value={password}
                        placeholder='Enter password' /* Ievadiet paroli */
                        onChange={onChange}
                    />
                    </div>
                    </Form.Group>
    
                    <Form.Group className="mb-3">
                    <Form.Label>Confirm password</Form.Label> {/* Apstiprināt paroli */}
                    <div className='form-group'>
                    <input
                        type='password'
                        className='form-control'
                        id='password2'
                        name='password2'
                        value={password2}
                        placeholder='Confirm password' /* Apstipriniet paroli */
                        onChange={onChange}
                    />
                    </div>
                    </Form.Group>
                    <Button variant="primary" type="submit" id="submit-form">Register</Button> {/* Reģistrēties */} 
                  </Form>
            </Col>
        </Row>
    </Container>
    
    </>

)
}

export default Register;
