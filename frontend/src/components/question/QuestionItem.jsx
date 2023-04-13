import { useDispatch } from 'react-redux'
import { deleteCard } from '../../features/card/cardSlice'
import React from "react";
import '../../pages/learn/learn.scss';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import icon from '../../images/question_mark.svg'
import Popover from 'react-bootstrap/Popover';

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
