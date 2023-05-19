import Container from 'react-bootstrap/Container';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useSelector } from 'react-redux';
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import diamond from '../../images/gem_purple.png'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Link } from "react-router-dom";
import '../../pages/userTests/userTests.scss';

function UserTestItem({test}) {
  const { user } = useSelector((state) => state.auth);
  const [categoryNames, setCategoryNames] = useState([]);
  const [testName, setTestName] = useState("");
  const [completedDate, setCompletedDate] = useState(" ");
  const headers = { 'Authorization': `Bearer ${user.token}` };

  useEffect(() => {
    getCategoryNames();
    getTestName();
    getCompletedDate();
  }, [])

  const getCategoryNames = async () => {
    try {
      const response = await axios.get(`https://verbum-server-kd.onrender.com/api/categories/${test.test}`, {headers});
      const categories = response.data.map((category) => category.name);
      setCategoryNames(categories);
    } catch (error) {
      console.log(error);
    }
  }

  const getCompletedDate = async () => {
    setCompletedDate(new Date(test.createdAt).toLocaleDateString(
        'en-gb',
        {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }
      ));
  }

  const getTestName = async () => {
    try {
      const response = await axios.get(`https://verbum-server-kd.onrender.com/api/tests/${test.test}`, {headers});
      setTestName(response.data[0].testname);
      console.log(response.data)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Container>
        <div id="card-legend">
          <Stack id="learn-stack">
            <Link to={`/incorrect/${test._id}`} id='learn-link'>
              <div id="stack-card" className='test-card'>
                <div id="image-container">
                  <CircularProgressbar className="stack-image" value={test.score} maxValue={100} text={test.score + '%'}
                    styles={buildStyles({
                      textColor: "#7678d2",
                      pathColor: "#95b8fe",
                      trailColor: "white"
                    })}
                  />
                </div>
                <div className="divider-left"></div>
                <Card.Body id="stack-chapter">
                  <span id="test-title">{testName}</span>
                  <div className="category-container">
                    {categoryNames.length > 0 && categoryNames.map(categoryName => (
                      <Card.Body key={categoryName} id="stack-chapter-category">{categoryName}</Card.Body>
                    ))}
                  </div>
                </Card.Body>
                <div className="footer-container">
                  <Card.Body id="stack-footer">
                    <img src={diamond} alt="Icon" className="footer-icon" />
                    {test.score} / {"100"}
                  </Card.Body>

                  <Card.Body id="stack-footer-left">
                  Completed on {completedDate}
                  </Card.Body>
                </div>
              </div>
            </Link>
          </Stack>
        </div>
      </Container>
    </>
  );
}

export default UserTestItem;
