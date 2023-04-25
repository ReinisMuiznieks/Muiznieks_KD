import { useDispatch } from 'react-redux';
import React from "react";
import '../../pages/learn/learn.scss';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';

function QuestionItem({question}) {
    const dispatch = useDispatch()

    return (
<>
  <div id="learn-legend">
    <Container>
        <Stack id="learn-stack">

        <Card>
            <Card.Body>
                <Card.Text id="card-text">
                {question}
                </Card.Text>
            </Card.Body>
        </Card>
        </Stack>
    </Container>
</div>

</>
    )
}

export default QuestionItem;
