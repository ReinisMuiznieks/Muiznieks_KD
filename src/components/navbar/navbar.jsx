import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import './navbar.scss'

const NavbarTop = () => {
  return (    
<Navbar>
<Container>
  <Navbar.Brand href="#home" id="nav-brand">Verbum</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="me-auto">
      <Nav.Link href="#home" id="nav-link">Sākums</Nav.Link> {/* Home */}
      <Nav.Link href="#link" id="nav-link">Kategorijas</Nav.Link> {/* Categories */}
          <NavDropdown title="Dropdown" className="basic-nav-dropdow" id="nav-link">
          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
    </Nav> 
      <Nav className="ms-auto">
        <Button variant="outline-secondary" id="get-started" href="#sign-up">Reģistrēties</Button> {/* Get started */}
        <Button variant="outline-secondary" id="nav-btn" href="#log-in">Pieslēgties</Button> {/* Log in */}
      </Nav>
     
  </Navbar.Collapse>
  <Navbar.Toggle />

</Container>
</Navbar>
  );
}

export default NavbarTop;