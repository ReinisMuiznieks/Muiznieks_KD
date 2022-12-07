import React from "react";
import NavbarTop from "../../components/navbar/Navbar.jsx";
import Footer from "../../components/footer/Footer.jsx";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
// import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import './pagenotfound.scss'
import image from '../../images/404.svg'


const PageNotFound = () => {
    return (
<>
<NavbarTop />
    <Container>
        <Stack id="notfound-stack">
            <img src={image} alt="404" id="notfound-image"></img>
            <h3 id="notfound-title" className="text-center">Page Not Found!</h3>
            <Button variant="outline-secondary" id="notfound-button" href="/">Home</Button>
        </Stack>
    </Container>
    
<Footer />
</>
        )
}

export default PageNotFound;