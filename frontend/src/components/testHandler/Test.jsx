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

    // iet cauri katrai opcijai un ja tā ir isCorrect == true, tad to piešķir kā pareizo atbildi
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
        {/* ja ir vārdu jautājumi tad padod mainīgos uz TestQuestion komponentu */}
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
        // citādi atgriež tekstu
      ) : (
        <div>Sorry we couldn't find any question</div>
      )}
    </div>
  );
};
export default Test;
