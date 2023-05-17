import NavbarTop from "../../components/navbar/Navbar.jsx";
import Footer from "../../components/footer/Footer.jsx";
import DisplayTests from '../../components/test/DisplayTests';
import Container from 'react-bootstrap/Container';
import ProgressBar from 'react-bootstrap/ProgressBar';
import React, { useEffect } from "react";
import axios from 'axios'
import { useSelector } from 'react-redux';

const TestPage = () => {
    const { user } = useSelector((state) => state.auth)


    return (
<>
<NavbarTop />
<Container>
    {/* <h1>Test</h1> */}
    {/* <ProgressBar now={60} label={`${60}%`} /> */}
</Container>


        <DisplayTests/>

<Footer/>

</>
    )
}

export default TestPage;
