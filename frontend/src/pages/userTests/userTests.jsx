import NavbarTop from "../../components/navbar/Navbar.jsx";
import Container from 'react-bootstrap/Container';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useSelector } from 'react-redux';
import 'react-circular-progressbar/dist/styles.css';
import UserTestItem from "../../components/userTests/userTestItem.jsx";
import NoTests from "../../components/userTests/NoTests.jsx";

const UserTests = () => {
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const headers = { 'Authorization': `Bearer ${user.token}` };

  useEffect(() => {
    fetchUserTests();
  }, []);

  const fetchUserTests = async () => {
    try {
        const { data } = await axios.get(`https://verbum-server-kd.onrender.com/api/usertests/user/${user._id}`, {headers});
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
    </>
  );
}

export default UserTests;
