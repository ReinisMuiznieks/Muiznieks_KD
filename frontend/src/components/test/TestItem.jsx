import '../test/test.scss';
import '../learn/learnCategory.scss';
import '../card/card.scss';
import React, { useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import axios from 'axios'
import { useSelector } from 'react-redux';
import { useState } from 'react';
import diamond from '../../images/gem_purple.png'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function TestItem({test}) {
  const { user } = useSelector((state) => state.auth)
  const [iscompleted, setisCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [categoryNames, setCategoryNames] = useState([]);

  useEffect(() => {
    getTestInfo();
    getCategoryNames();
  }, [])

  const getTestInfo = async () => {

    try {
      const { data } = await axios.get(`https://verbum-server-kd.onrender.com/api/usertests/user/${user._id}`, {
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

  const getCategoryNames = async () => {
    try {
      const response = await axios.get(`https://verbum-server-kd.onrender.com/api/categories/${test._id}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      const categories = response.data.map((category) => category.name);
      setCategoryNames(categories);
      console.log(categoryNames);
    } catch (error) {
      console.log(error);
    }
  }

    return (
        <>
          {iscompleted ? (
            <>
              <div id="card-legend">
                <Container>
                    <Stack id="learn-stack">
                      <Link to={`/test/${test._id}`} id='learn-link'>
                        <div id="stack-card" className='test-card'>
                          <div id="image-container">
                            <CircularProgressbar className="stack-image" value={score} maxValue={100} text={score + '%'}         
                            styles={buildStyles({
                              textColor: "#7678d2",
                              pathColor: "#95b8fe",
                              trailColor: "white"
                            })}
                          />    
                          </div>
                          <div className="divider-left"></div>
                          <Card.Body id="stack-chapter">
                          <span id="test-title">{test.testname}</span>                      
                          <div className="category-container">
                              {categoryNames.length > 0 && categoryNames.map(categoryName => (
                                  <Card.Body key={categoryName} id="stack-chapter-category">{categoryName}</Card.Body>
                              ))}
                          </div>
                        </Card.Body>
                          <div className="footer-container">
                            <Card.Body id="stack-footer">
                            <img src={diamond} alt="Icon" className="footer-icon" />
                              {score} / {"100"}
                            </Card.Body>
                          </div>
                        </div>
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
                      <Link to={`/test/${test._id}`} id='learn-link'>
                        <div id="stack-card" className='test-card'>
                          <div id="image-container">
                          <CircularProgressbar className="stack-image" value={0} maxValue={100} text={0} 
                          styles={buildStyles({
                            trailColor: "white"
                          })}
                          />
                          </div>
                          <div className="divider-left"></div>
                          <Card.Body id="stack-chapter">
                            <span id="test-title">{test.testname}</span>                      
                            <div className="category-container">
                                {categoryNames.length > 0 && categoryNames.map(categoryName => (
                                    <Card.Body key={categoryName} id="stack-chapter-category">{categoryName}</Card.Body>
                                ))}
                            </div>
                          </Card.Body>
                          <div className="footer-container">
                            <Card.Body id="stack-footer">
                            <img src={diamond} alt="Icon" className="footer-icon" />
                              {"-"} / {"100"}
                            </Card.Body>
                          </div>
                        </div>
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
