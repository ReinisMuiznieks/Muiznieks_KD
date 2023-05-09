import React from "react";
import '../../pages/learn/learn.scss';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import icon from '../../images/question_mark.svg'
import Popover from 'react-bootstrap/Popover';

function CardItem({card}) {

    return (
<>
  <div id="learn-legend">
    <Container>
        <Stack id="learn-stack">

        <Card>
            <Card.Img variant="top" id="card-image" className="pt-4" src={card.image} alt={card.lvword} />


            <Card.Body>
                <Card.Text id="card-text">
                {card.lv_word}
                
                
                <OverlayTrigger
                placement="top"
                overlay={
                    <Popover id="popover-contained">
                    <Popover.Body id="eng-word">
                      <strong>{card.eng_word}</strong>
                    </Popover.Body>
                  </Popover>
                }
                >
                    {({ ref, ...triggerHandler }) => (
                        <Button
                        {...triggerHandler}
                        className="d-inline-flex align-items-center"
                        id="image-button"
                        >
                        <Image id="image"
                            ref={ref}
                            roundedCircle
                            src={icon}
                        />
                        </Button>
                    )}
                </OverlayTrigger>
                </Card.Text>
            </Card.Body>
        </Card>
        <div className="buttons">
            <Button id="continue-button">Continue</Button>
        </div>
        </Stack>
    </Container>
</div>

</>
    )
}

export default CardItem;
