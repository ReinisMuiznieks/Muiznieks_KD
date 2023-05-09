import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Form } from 'react-bootstrap';
import NavbarTop from '../../components/navbar/Navbar';

function ProfilePage() {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
    <NavbarTop/>
    <Container className='pt-5'>
      <h1>Profile Page</h1>
      <Form>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" value={user.name} readOnly />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={user.email} readOnly />
        </Form.Group>
      </Form>
    </Container>
    </>
  );
}

export default ProfilePage;
