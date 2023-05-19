import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import image from '../../images/completed.svg'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../../components/card/card.scss'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useSelector } from "react-redux";
import NavbarTop from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";

const TestCompleted = () => {
    const [data, setData] = useState([]);
    const { user } = useSelector((state) => state.auth)
    const params = useParams();
    const id = params;
    const navigate = useNavigate()

    useEffect(() => {
        getTest();
    }, []);

    const getTest = async () => {
        try {
            const response = await axios.get(`https://verbum-server-kd.onrender.com/api/usertests/${id.id}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            setData(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const seeMistakes = () => {
        navigate(`/incorrect/${id.id}`);
    };

    return (
        <>
        <NavbarTop />
        <div id="learn-legend">
            <Container>
                <Stack id="notfound-stack">
                    <img src={image} alt="404" id="notfound-image"></img>
                    <h3 id="complete-title" className="text-center">Test completed!</h3>
                    <Card id="complete-card">
                        <Container>
                            <Row id="card-items">
                                <Col>Score</Col>
                                <Col id="item">{data.length > 0 ? `${data[0].score}%` : ''}</Col>
                            </Row>
                        </Container>
                    </Card>
                    {data.length > 0 && data[0].score == 100 ? (
                    <>
                        <Button variant="outline-secondary" id="complete-button" href="/test">Home</Button>
                    </>
                    ) : (
                    <>
                        <Button variant="outline-secondary" id="complete-button"  className="see-mistakes" onClick={seeMistakes}>See mistakes</Button>
                        <Button variant="outline-secondary" id="complete-button" href="/test">Home</Button>
                    </>
                    )}
                </Stack>
            </Container>
        </div>

        </>
    )
}

export default TestCompleted;
