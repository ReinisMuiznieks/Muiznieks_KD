import { useEffect, useState } from "react";
import TestQuestion from "./TestQuestion";

const Test = ({ questions, score, setScore, setQuestions, exam_id }) => {
  const [options, setOptions] = useState();
  const [currQues, setCurrQues] = useState(0);
  const [correct, setCorrect] = useState();

  useEffect(() => {
    startFunction();
  }, [currQues, questions]);

  const startFunction = () => {
    var data;
    var dataOptions;

    data = questions[currQues].options;
    setOptions(data);

    for (let k = 0; k < data.length; k++) {
      dataOptions = data[k].isCorrect;
      if (dataOptions === true) {
        setCorrect(data[k].option);
      }
    }
  };

  return (
    <div className="quiz">
      {questions ? (
        <>
          <div className="quizInfo">
          </div>
          <TestQuestion
            currQues={currQues}
            setCurrQues={setCurrQues}
            questions={questions}
            options={options}
            correct={correct}
            score={score}
            setScore={setScore}
            setQuestions={setQuestions}
            exam_id={exam_id}
          />
        </>
      ) : (
        <div>Sorry we couldn't find any question</div>
      )}
    </div>
  );
};
export default Test;
