import React, { useEffect } from "react";
import '../../pages/category/category.scss';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useState } from 'react';
import axios from 'axios'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function CategoryItem({category}) {
  const { user } = useSelector((state) => state.auth)
  const [iscompleted, setisCompleted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    getUserProgress();
    }, [])

  const getUserProgress = async () => {

    try {
      const { data } = await axios.get(`http://localhost:5000/api/userlearn/user/${user._id}`, {
        headers: {
            'Authorization': `Bearer ${user.token}`
        },
      },);
      
      // const myDataDate = await Promise.all(data.map((d) => d.updatedAt))
      const myDataProgress = await Promise.all(data.map((d) => d.progress))

      const myData = await Promise.all(data.map((d) => d.category))
      for (let i = 0; i <= myData.length; i++) {
          if (myData[i] === category._id) {
              setisCompleted(true);
              // setCompletedDate(new Date(myDataDate[i]).toLocaleDateString(
              //   'en-gb',
              //   {
              //     year: 'numeric',
              //     month: 'long',
              //     day: 'numeric'
              //   }
              // ));

              setProgress(myDataProgress[i]);
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
                  <Link to={`/learn/${category._id}`}  id='learn-link'>
                      <button id="stack-card-completed">
                        <Row>  
                          <Col>        
                            <Card.Body id="stack-chapter"> {category.name}</Card.Body>   
                          </Col>
                          <Col>
                            <>
                            <Card.Body id="stack-chapter-datetext">{"Progress"}</Card.Body>
                            <Card.Body id="stack-chapter-score-green">{progress}</Card.Body> 
                            </>
                          </Col>
                          <Col>
                            <Card.Body id="stack-chapter-datetext">{"Completed on"}</Card.Body>
                            {/* <Card.Body id="stack-chapter-date">{completedDate}</Card.Body>        */}
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
                <Link to={`/learn/${category._id}`}  id='learn-link'>
                    <button id="stack-card">             
                        <Card.Body id="stack-chapter" > {category.name} </Card.Body>        
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

export default CategoryItem
