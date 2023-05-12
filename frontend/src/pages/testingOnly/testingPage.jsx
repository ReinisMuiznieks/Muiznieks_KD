import './testingStyle.scss'
import React from "react";
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function TestingPage({ category }) {

  return (
    <>
      <div id="card-legend">
        <Container>
          <Stack id="learn-stack">
            <Link to={`/learn`} id='learn-link'>
              <div id="stack-card">
                <div id="image-container">
                  <img src={"https://cdn.filestackcontent.com/iBgkvoGXTFSjQjGz0KR6"} alt="Image" className="stack-image" />
                </div>
                <Card.Body id="stack-chapter">{"Test"}</Card.Body>
                <div className="footer-container">
                  {/* <img src={"https://cdn.filestackcontent.com/iBgkvoGXTFSjQjGz0KR6"} alt="Icon" className="footer-icon" /> */}
                  <Card.Body id="stack-footer">{"10 / 10"}</Card.Body>
                </div>
              </div>
            </Link>
          </Stack>
        </Container>
      </div>
    </>
  );
}

export default TestingPage;
