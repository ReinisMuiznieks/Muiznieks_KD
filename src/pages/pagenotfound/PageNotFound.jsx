import React from "react";
import NavbarTop from "../../components/navbar/navbar.jsx";
import Footer from "../../components/footer/footer.jsx";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
// import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import './pagenotfound.scss'


const PageNotFound = () => {
    return (
<>
<NavbarTop />
    <Container>
        <Stack id="notfound-stack">
            <img src="https://svgur.com/i/nTL.svg" alt="404" id="notfound-image"></img>
            <h3 id="notfound-title" className="text-center">Lapa Nav Atrasta</h3>
            <Button variant="outline-secondary" id="notfound-button" href="/">Atpakaļ uz sākumlapu</Button>
        </Stack>
    </Container>
    
<Footer />
</>
        )
}

export default PageNotFound;