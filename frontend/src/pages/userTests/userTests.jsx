import NavbarTop from "../../components/navbar/Navbar.jsx";
import Footer from "../../components/footer/Footer.jsx";
import DisplayTests from '../../components/test/DisplayTests';
import Container from 'react-bootstrap/Container';
import ProgressBar from 'react-bootstrap/ProgressBar';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useSelector } from 'react-redux';

const UserTests = () => {
  const { user } = useSelector((state) => state.auth);
  const [tests, setTests] = useState([]);

  useEffect(() => {
    fetchUserTests();
  }, []);

  const fetchUserTests = async () => {
    try {
        const { data } = await axios.get(`https://verbum-server-kd.onrender.com/api/usertests/user/${user._id}`, {
          headers: {
              'Authorization': `Bearer ${user.token}`
          },
        },);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavbarTop />
      <Container>
        {/* Display the fetched tests */}
        {/* <DisplayTests tests={tests} /> */}
      </Container>
      <Footer/>
    </>
  );
}

export default UserTests;
