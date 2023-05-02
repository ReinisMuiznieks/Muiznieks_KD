import { useDispatch } from 'react-redux'
import { deleteCard } from '../../features/card/cardSlice'
import React, { useEffect } from "react";
import '../../pages/learn/learn.scss';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify'
import Modal from 'react-bootstrap/Modal';
import axios from 'axios'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import './test.scss';

function TestItem({test}) {
  const { user } = useSelector((state) => state.auth)
  const [iscompleted, setisCompleted] = useState(false);
  const dispatch = useDispatch()
  const [score, setScore] = useState(0);

  useEffect(() => {

  getExamNames();
  }, [])

  const getExamNames = async () => {

    try {
      const { data } = await axios.get(`http://localhost:5000/api/usertests/user/${user._id}`, {
        headers: {
            'Authorization': `Bearer ${user.token}`
        },
      },);
      const myData = await Promise.all(data.map((d) => d.test))
      for (let i = 0; i <= myData.length; i++) {
          if (myData[i] === test._id) {
              setisCompleted(true);
          }
      }

    } catch (err) {
        console.log(err);
    }
  }

    return (
        <>
        {iscompleted ? (
                <>
                <div id="card-legend">
                  <Container>
                      <Stack id="learn-stack">
                      <Link to={`/test/${test._id}`}  id='learn-link'>
                          <button id="stack-card-completed">             
                              <Card.Body id="stack-chapter"> {test.testname}</Card.Body>        
                          </button>
                      </Link>
                      </Stack>
                  </Container>
                </div>
                </>
              ) : (
                <>
                <div id="card-legend">
                  <Container>
                      <Stack id="learn-stack">
                      <Link to={`/test/${test._id}`}  id='learn-link'>
                          <button id="stack-card">             
                              <Card.Body id="stack-chapter" > {test.testname}</Card.Body>        
                          </button>
                      </Link>
                      </Stack>
                  </Container>
                </div>
                </>   
                )}
        </>
          )
}

export default TestItem;
