import React, { useEffect, useState } from "react";
import '../learn/learn.scss';
import NavbarTop from "../../components/navbar/Navbar.jsx";
import Footer from "../../components/footer/Footer.jsx";
import axios from 'axios'
import { useLocation } from "react-router";
import Spinner from "../../components/spinner/Spinner";
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { useSelector } from 'react-redux'
import Card from 'react-bootstrap/Card';
import { useDispatch } from 'react-redux'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './test.scss';
import TestCompleted from "../../components/test/TestCompleted";
import styled from "styled-components"
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom'


const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const SingleQuestion = styled.div`
  width: 95%;
  min-height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border: 5px solid grey;
  padding: 20px;
  margin-top: 10px;
`
const Options = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  align-items: center;
  justify-content: space-around;
  margin: 10px;
`
const SingleOption = styled.button`
  width: 46%;
  height: 50px;
  padding: 15px 20px;
  margin: 10px;
  box-shadow: 0 0 2px black;
`
const Control = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`
const Select = styled.div`
  background-color: rgb(7, 207, 0);
  color: white;
  box-shadow: 0 0 1px black;
`
const Wrong = styled.div`
  background-color: rgb(233, 0, 0);
  color: white;
  box-shadow: 0 0 1px black;
`

const TestQuestions2 = ({
    currQues,
    setCurrQues,
    questions,
    options,
    correct,
    setScore,
    score,
    setQuestions,
    userId,
    exam_id
  }) => {
    const [selected, setSelected] = useState();
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useSelector((state) => state.auth)
    const headers = { 'Authorization': `Bearer ${user.token}` };
      
        const navigate = useNavigate()
      
        const params = useParams();
        const id = params;

    const handleSelect = (i) => {
        if (selected === i && selected === correct) return "select";
        else if (selected === i && selected !== correct) return "wrong";
        else if (i === correct) return "select";
      };
    
      const handleCheck = (i) => {
        setSelected(i);
        if (i === correct) { setScore(score + 1); }
        setError(false);
      };
    
      const handleNext = () => {
        if (currQues >= (questions.length - 1)) {
          submitTest();
        navigate(`/result/${id.id}`);
        console.log("no more questions");
        } else if (selected) {
          setCurrQues(currQues + 1);
          setSelected();
        } else setError("Please select an option first");
      };

      const submitTest = () => {
        console.log(exam_id)

          const testData = {
            user: user._id,
            test: id.id,
            score: score,
            completed: true,
        };
        axios.post("http://localhost:5000/api/usertests/", testData, { headers }).then((response) => {
            console.log(response.status);
            console.log(response.data);
        });
      }

      // const handleReview = (i) => {
      //     const userOptions = {
      //       examReview: {
      //         qAnswers: i,
      //         qCorrect: correct,
      //         qTitle: questions[currQues].question,
      //       }
      //     };
      //     console.log(userOptions)
      //     axios.put("http://localhost:5000/api/usertests/" + "64511056583a17d834ae3031", userOptions, {
      //       headers: {
      //           'Authorization': `Bearer ${user.token}`
      //       },
      //     },).then((response) => {
      //       console.log(response.status);
      //       console.log(response.data);
      //     });
      // }
    if(isLoading) {
        return <Spinner/>
    }

    return (
<>
<NavbarTop />
<Container>
      <h1>Question {currQues + 1} :</h1>
      <SingleQuestion>
        <h2>{questions[currQues].question}</h2>
        <img src={questions[currQues].card} alt="test"></img>
        <Options>
          {error && {error}}
          {options &&
            options.map((option) => (
              <button className={`singleOption  ${selected && handleSelect(option.option)}`}
                key={option._id} 
                // creator
                onClick={() => { handleCheck(option.option) }}
                disabled={selected}>
                {option.option}
              </button>
            ))}
        </Options>
        <Control>
          <button
            variant="contained"
            color="primary"
            size="large"
            style={{ width: 185 }}
            onClick={handleNext}>
            {currQues >= (questions.length - 1) ? (<span >Submit</span>) : (<span>Next Question</span>)}
          </button>
        </Control>
      </SingleQuestion>
    </Container >

<Footer/>
</>
    )

}

export default TestQuestions2;
