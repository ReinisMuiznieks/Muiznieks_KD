import React from "react";
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import image from '../../images/no_cards.svg'
import Button from 'react-bootstrap/Button';
import NavbarTop from "../navbar/Navbar";

function NoTests() {

    return (
<>
  <div id="learn-legend">
    <Container>
        <Stack id="notfound-stack">
            <img src={image} alt="404" id="notfound-image"></img>
            <h3 id="notfound-title" className="text-center">No completed tests found!</h3>
            <Button variant="outline-secondary" id="notfound-button" href="/">Home</Button>
        </Stack>
    </Container>
</div>

</>
    )
}

export default NoTests;
