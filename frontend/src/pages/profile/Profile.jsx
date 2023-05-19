import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Form } from 'react-bootstrap';
import NavbarTop from '../../components/navbar/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import image from '../../images/profile_page.svg'

function ProfilePage() {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
    <NavbarTop/>
      <Container id="login-container">
    <Row className="full-form">
        <Col className='m-5'>
        <img src={image} alt="log-in" id="login-image" style={{width: "80%"}}></img>      
        </Col>
        <Col>
            <Form id="login-form">
                <h3 id="form-title" className="text-center">Profile</h3>

                <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="email" value={user.name} readOnly />
                </Form.Group>

                <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <div className='form-group'>
                <Form.Control type="email" value={user.email} readOnly />
                </div>
                </Form.Group>
            </Form>
        </Col>
    </Row>
</Container>
    </>
  );
}

export default ProfilePage;
