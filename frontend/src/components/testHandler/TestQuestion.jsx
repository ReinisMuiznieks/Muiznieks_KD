import '../test/test.scss';
import '../learn/learnCategory.scss';
import '../card/card.scss';
import React, { useEffect, useState } from "react";
import NavbarTop from "../navbar/Navbar.jsx";
import axios from 'axios'
import Spinner from "../spinner/Spinner";
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { useSelector } from 'react-redux'
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styled from "styled-components"
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import ProgressBar from 'react-bootstrap/ProgressBar';
import AttributionIcon from '@mui/icons-material/Attribution';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Options = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  align-items: center;
  justify-content: space-around;
  margin: 10px;
`

const TestQuestion = ({
    currQues,
    setCurrQues,
    questions,
    correct,
    setScore,
    score,
  }) => { //  saņem mainīgos no Test komponenta
    const [selected, setSelected] = useState();
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useSelector((state) => state.auth)
    const headers = { 'Authorization': `Bearer ${user.token}` };
    const [questioncount, setQuestioncount] = useState(0);
    const [incorrectAnswers, setIncorrectAnswers] = useState([]);
    const [userTestId, setUserTestId] = useState('');

        const navigate = useNavigate()
      
        const params = useParams();
        const id = params;

      // pārbauda vai atbilde ir pareiza vai nē un attiecīgi atgriež tekstu priekš className
        const handleSelect = (i) => {
          if (selected === i && selected === correct) return "select";
          else if (selected === i && selected !== correct) return "wrong";
          else if (correct && i === correct) return "select";
        };
        
      
      // pārbauda kādu atbildi lietotājs izvēlējās
        const handleCheck = (i) => {
          setSelected(i);
          // ja lietotājs izvēlējās pareizo atbildi, tad lietotāja rezultātu inkrementē par 1
          if (i === correct) {
            setScore(score + 1);
          }
          setError(false);
          // pārbauda vai lietotājs izvēlējās nepareizo atbildi
          if (questions[currQues] && questions[currQues].options) {
            // lietotāja atlasīto atbildi saglabā
            const selectedAnswer = questions[currQues].options.find((option) => option.option === i)?.option;
            // jautājuma pareizo atbildi saglabā
            const correctAnswer = questions[currQues].options.find((option) => option.option === correct)?.option;
            if (i !== correct) {
              // ja lietotājs atbildēja nepareizi uz jautājumu tad saglabā esošos datus
              setIncorrectAnswers((prevAnswers) => [
                ...prevAnswers,
                {
                  question: questions[currQues]._id,
                  correctAnswer: correctAnswer,
                  userAnswer: selectedAnswer,
                },
              ]);
            }
          }
        };
        
        // funkcija kas notiek kad lietotājs vēlas doties uz nākamo jautājumu
        const handleNext = () => {
          // pārbauda vai tas ir pēdējais jautājums
          if (currQues >= questions.length - 1) {
            submitTest();
          } else if (selected !== undefined) {
            setCurrQues(currQues + 1);
            setSelected(undefined);
            // pārbauda vai lietotājs ir izvēlējies atbildi
          } else {
            toast.error("Please select an option");
          }
        };
        
      useEffect(() => {
        setQuestioncount(questions.length);
      }, [setQuestioncount])

      // funkcija kas notiek kad lietotājs ir iesniedzis pēdējo atbildi
      const submitTest = () => {
        const incorrectAnsweredQuestions = incorrectAnswers.map((answer) => ({
          question: answer.question,
          correctAnswer: answer.correctAnswer,
          userAnswer: answer.userAnswer,
        }));
      
        const testData = {
          user: user._id,
          test: id.id,
          score: Math.round((score / questioncount) * 100), // rezultātu izrēķina procentos
          completed: true,
          incorrectAnswers: incorrectAnsweredQuestions,
        };
      
        console.log(testData);
        axios
          .post("https://verbum-server-kd.onrender.com/api/usertests/", testData, { headers })
          .then((response) => {
            console.log(response.status);
            console.log(response.data);
            setUserTestId(response.data._id);
            // navigē lietotāju uz rezultātu lapu
            navigate(`/result/${response.data._id}`);
          })
          .catch((error) => {
            console.log(error);
          });
      };
      
    if(isLoading) {
        return <Spinner/>
    }
    return (
<>
<NavbarTop />
{questions.length > 0 ? (
  <Container>
    <Stack id="question-stack">
    <div className="container">
        <ProgressBar id="progress-bar" now={currQues + 1} label={currQues+1 + "/" + questions.length} max={questions.length}/>
        {/* <ProgressBar now={currQues + 1} label={Math.round((100 / questions.length) * [currQues+1])+ "%"} max={questions.length}/> */}
    </div>

    <div id="card-legend">
      
      <Card id="question-card">
      <AttributionIcon id="attribution-icon" alt="credits" onClick={() => navigate("/credits")} />
        <Card.Body>
          <Card.Text id="test-question">
          {questions[currQues].question}
          </Card.Text>
        </Card.Body>
          <Card.Img variant="top" id="card-image" src={questions[currQues].card} alt="card"/>
      </Card>
    </div>
      <Container id="answer_container">
        <Row>
        <Col>
        <Options>
          {error && { error }}
          {questions[currQues] && questions[currQues].options && (
            questions[currQues].options.map((option) => (
              <Button
                id="answer_button"
                className={`singleOption  ${selected && handleSelect(option.option)}`} // className piešķir attiecīgi vai lietotājs ir izvēlējies atbildi vai nav
                key={option._id}
                onClick={() => {
                  handleCheck(option.option);
                }}
                disabled={selected}
              >
                {option.option}
              </Button>
            ))
          )}
        </Options>
        </Col>
        </Row>
        <Row>
          <Col>
              <Button
                id="next_question_button"
                variant="contained"
                color="primary"
                size="large"
                onClick={handleNext}>
                {/* ja jautājums nav pēdējais tad poga ir Next Question ja pēdējais tad Submit */}
                {currQues >= (questions.length - 1) ? (<span >Submit</span>) : (<span>Next Question</span>)}
              </Button>
          </Col>
        </Row>
      </Container>
    </Stack>
  </Container>

  ) : (<></>)}

</>
    )

}

export default TestQuestion;
