import './learnCategory.scss'
import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function LearnCategoryItem({ category }) {
  const { user } = useSelector((state) => state.auth);
  const [isCompleted, setIsCompleted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [cardCount, setCardCount] = useState(0);

  useEffect(() => {
    getUserProgress();
  }, []);

  const getUserProgress = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/userlearn/user/${user._id}`,
        {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        }
      );

      const myData = await Promise.all(data.map((d) => d.category));
      const myDataProgress = await Promise.all(data.map((d) => d.progress));

      for (let i = 0; i < myData.length; i++) {
        if (myData[i] === category._id) {
          setIsCompleted(true);
          setProgress(myDataProgress[i]);
        }
      }

      const response = await axios.get(
        `http://localhost:5000/api/cards/?category=${category._id}`,
        {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        }
      );
      setCardCount(response.data.length);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {isCompleted ? (
        <>
          <div id="card-legend">
            <Container>
              <Stack id="learn-stack">
                <Link to={`/learn/${category._id}`} id='learn-link'>
                  <button id="stack-card-completed">
                    <Row>
                      <Col>
                        <Card.Body id="stack-chapter">{category.name}</Card.Body>
                      </Col>
                      <Col>
                        <>
                          <Card.Body id="stack-chapter-datetext">{"Progress"}</Card.Body>
                          <Card.Body id="stack-chapter-score-green">{progress}/{cardCount}</Card.Body>
                        </>
                      </Col>
                      <Col>
                        {/* <Card.Body id="stack-chapter-datetext">{"Card Count"}</Card.Body> */}
                        {/* <Card.Body id="stack-chapter-date">{cardCount}</Card.Body> */}
                      </Col>
                    </Row>
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
                <Link to={`/learn/${category._id}`} id='learn-link'>
                  <button id="stack-card">
                    <Card.Body id="stack-chapter">{category.name}</Card.Body>
                  </button>
                </Link>
              </Stack>
            </Container>
          </div>
        </>
      )}
    </>
  );
}

export default LearnCategoryItem;
