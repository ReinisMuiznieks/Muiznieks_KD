import NavbarTop from "../../components/navbar/Navbar.jsx";
import Footer from "../../components/footer/Footer.jsx";
import DisplayTests from '../../components/test/DisplayTests';
import Container from 'react-bootstrap/Container';
import ProgressBar from 'react-bootstrap/ProgressBar';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useSelector } from 'react-redux';
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import diamond from '../../images/gem_purple.png'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Link } from "react-router-dom";
import UserTestItem from "../../components/userTests/userTestItem.jsx";
import NoTests from "../../components/userTests/NoTests.jsx";

const UserTests = () => {
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);

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
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavbarTop />
      {data.length > 0 ? (
        <Container>
      {data.map((test) => (
          <UserTestItem key={test._id} test={test} />
        ))}
        </Container>
        ) : (
        <NoTests/>
        )}
      
      <Footer/>
    </>
  );
}

export default UserTests;
