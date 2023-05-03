import '../learn/learn.scss';
import NavbarTop from "../../components/navbar/Navbar.jsx";
import Footer from "../../components/footer/Footer.jsx";
import DisplayTests from './DisplayTests';
import Container from 'react-bootstrap/Container';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useState } from 'react';
import React, { useEffect } from "react";
import axios from 'axios'
import { useSelector } from 'react-redux';

const Test = () => {
    const { user } = useSelector((state) => state.auth)
    const [score, setScore] = useState(0);
    const [completedDate, setCompletedDate] = useState(" ");
    const [iscompleted, setisCompleted] = useState(false);

    // useEffect(() => {

    //     getExamNames();
    //     // getColor();
    //     }, [])
      
    //     const getExamNames = async () => {
      
    //       try {
    //         const { data } = await axios.get(`http://localhost:5000/api/usertests/user/${user._id}`, {
    //           headers: {
    //               'Authorization': `Bearer ${user.token}`
    //           },
    //         },);
            
    //         const myData = await Promise.all(data.map((d) => d.test))
    //         for (let i = 0; i <= myData.length; i++) {
    //             if (myData[i] === test._id) {
    //                 setisCompleted(true);
    //                 // setCompletedDate(myDataDate[i]);
    //                 console.log(myData[i])
    //                 // setScore(myDataScore[i]);
    //             }
    //         }
      
    //       } catch (err) {
    //           console.log(err);
    //       }
    //     }

    return (
<>
<NavbarTop />
<Container>
    {/* <h1>Test</h1>
    <ProgressBar now={60} label={`${60}%`} /> */}
</Container>


        <DisplayTests/>

<Footer/>

</>
    )
}

export default Test;
