import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import './navbar.scss'

import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../../features/auth/authSlice'

function NavbarTop() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (    
<Navbar>
<Container>
  <Navbar.Brand href="/" id="nav-brand">Verbum</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="me-auto">
      <Nav.Link href="/" id="nav-link">Home</Nav.Link> {/* Sākums */}
      {user ? (
        <>
        <Nav.Link href="/learn" id="nav-link">Learn</Nav.Link> {/* Mācies */}
        </>
      ) : (
        <>
        </>   
        )}
    </Nav>

      <Nav className="ms-auto">
      {user ? (
        <>
        {/* <Nav.Item id="user">Logged in as {user.name}!</Nav.Item> */}
        <Button variant="outline-secondary" id="nav-btn" href="/log-in" onClick={onLogout}>Logout</Button>
        </>
      ) : (
        <><Button variant="outline-secondary" id="nav-btn" href="/sign-up">Register</Button><Button variant="outline-secondary" id="nav-btn" href="/log-in">Login</Button></>   
        )}
      </Nav>

  </Navbar.Collapse>
  <Navbar.Toggle />
</Container>
</Navbar>
  );
}

export default NavbarTop;