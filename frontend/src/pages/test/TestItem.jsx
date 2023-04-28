import { useDispatch } from 'react-redux'
import { deleteCard } from '../../features/card/cardSlice'
import React from "react";
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

function TestItem({test}) {
    const dispatch = useDispatch()

    return (
        <>
          <div id="card-legend">
            <Container>
                <Stack id="learn-stack">
                <Link to={`/quiz/${test._id}`}  id='learn-link'>
                    <button id="stack-card">             
                        <Card.Body id="stack-chapter" > {test.testname} </Card.Body>        
                    </button>
                </Link>
                </Stack>
            </Container>
          </div>
        </>
          )
}

export default TestItem;
