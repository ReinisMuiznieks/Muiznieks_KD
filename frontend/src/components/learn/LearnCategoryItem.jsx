import './learnCategory.scss';
import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import axios from 'axios';
import noCards from '../../images/no_cards.svg'
import diamond from '../../images/gem_purple.png'
import spinner from '../../images/spinner.gif'

function LearnCategoryItem({ category }) {
  const { user } = useSelector((state) => state.auth);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [cardCount, setCardCount] = useState(0);
  const [cardImage, setCardImage] = useState('');
  const headers = { 'Authorization': `Bearer ${user.token}` };

  useEffect(() => {
    getUserProgress();
  }, []);

  // dabūt lietotāja progresu katrai kategorijai
  const getUserProgress = async () => {
    try {
      const { data } = await axios.get(
        `https://verbum-server-kd.onrender.com/api/userlearn/user/${user._id}`,{headers}
      );

      // iziet cauri katrai kategorijai un piešķirt categorijas id myData mainīgajam
      const myData = await Promise.all(data.map((d) => d.category));

      // iziet cauri katrai kategorijai un piešķirt lietotāja progresu myDataProgress mainīgajam
      const myDataProgress = await Promise.all(data.map((d) => d.progress));

      // iziet cauri visiem lietotāja progresa kategorijām un pārbaudīt vai tās id ir vienāds ar šobrīdējo kategorijas id
      // ja ir tad piešķirt isCompleted mainīgajam - true un progress piešķirt datumu no myDataProgress
      for (let i = 0; i < myData.length; i++) {
        if (myData[i] === category._id) {
          setIsCompleted(true);
          setProgress(myDataProgress[i]);
        }
      }

      const response = await axios.get(
        `https://verbum-server-kd.onrender.com/api/cards/?category=${category._id}`,{headers}
      );
      // piešķirt cardCount mainīgajam response data garumu lai zinātu cik vārda kartiņas ir katrā kategorijā
      setCardCount(response.data.length);

      // ja ir response ir data tad piešķirt kategorijas bildi kā pirmo vārda kartiņas bildi kategorijā
      if (response.data.length > 0) {
        const firstCardImage = response.data[0].image;
        setCardImage(firstCardImage);
      // ja kategorijā nav nevienas vārda kartiņas, piešķirt cardImage bildi noCards
      } else {
        setCardImage(noCards);
      }
      // piešķirt mainīgajam isLoading - false, jo visas bildes ir piešķirtas
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div id="card-legend">
        <Container>
          <Stack id="learn-stack">
            <Link to={`/learn/${category._id}`} id='learn-link'>
              <div id="stack-card">
                <div id="image-container">
                  {/* pārbaudīt, vai piešķirtais attēls tiek ielādēts, ja tie joprojām tiek ielādēti, parādīt attēlu kā ielādes spinner gif */}
                  {isLoading ? (
                    <img src={spinner} alt="Image" className="stack-image" />
                  ) : (
                    // pretējā gadījumā iestatiet kategorijas attēlu uz tai piešķirto attēlu
                    <img src={cardImage} alt="Image" className="stack-image" />
                  )}
                </div>
                <div className="divider-left"></div>
                <Card.Body id="stack-chapter">{category.name}</Card.Body>
                <div className="footer-container">
                  <Card.Body id="stack-footer">
                    <img src={diamond} alt="Icon" className="footer-icon" />
                    {/* ja karte ir pabeigta, iestatiet progresu atbilstoši tās lietotāju progresam, pretējā gadījumā vienkārši "-" */}
                    {isCompleted ? `${progress} / ${cardCount}` : `- / ${cardCount}`}
                  </Card.Body>
                </div>
              </div>
            </Link>
          </Stack>
        </Container>
      </div>
    </>
  );
}

export default LearnCategoryItem;
