// import './learnCategory.scss';
import './learnCategoryUpdated.scss';
import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProgressBar from 'react-bootstrap/ProgressBar';
import noCards from '../../images/no_cards.svg'
import diamond from '../../images/gem_purple.png'

function LearnCategoryItem({ category }) {
  const { user } = useSelector((state) => state.auth);
  const [isCompleted, setIsCompleted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [cardCount, setCardCount] = useState(0);
  const [cardImage, setCardImage] = useState('');

  useEffect(() => {
    getUserProgress();
  }, []);

  const getUserProgress = async () => {
    try {
      const { data } = await axios.get(
        `https://verbum-server-kd.onrender.com/api/userlearn/user/${user._id}`,
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
        `https://verbum-server-kd.onrender.com/api/cards/?category=${category._id}`,
        {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        }
      );
      setCardCount(response.data.length);
      
      if (response.data.length > 0) {
        const firstCardImage = response.data[0].image;
        setCardImage(firstCardImage);
      } else {
        setCardImage(noCards);
      }
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
                  <div id="stack-card">
                    <div id="image-container">
                      <img src={cardImage} alt="Image" className="stack-image" id='started' />
                    </div>
                    <div className="divider-left"></div>
                    <Card.Body id="stack-chapter">{category.name}</Card.Body>
                    <div className="footer-container">
                      <Card.Body id="stack-footer">
                      <img src={diamond} alt="Icon" className="footer-icon" />
                        {progress} / {cardCount}
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
                  <Link to={`/learn/${category._id}`} id='learn-link'>
                    <div id="stack-card">
                      <div id="image-container">
                        <img src={cardImage} alt="Image" className="stack-image" />
                      </div>
                      <div className="divider-left"></div>
                      <Card.Body id="stack-chapter">{category.name}</Card.Body>
                      <div className="footer-container">
                        <Card.Body id="stack-footer">
                        <img src={diamond} alt="Icon" className="footer-icon" />
                          {"-"} / {cardCount}
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

    
  );
}

export default LearnCategoryItem;