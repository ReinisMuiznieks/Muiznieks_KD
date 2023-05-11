import axios from "axios";
import { useEffect, useState } from "react";
import Quiz from "./TestQuiz2";
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux";
import NoQuestions from "../../components/card/NoQuestions";
import Spinner from "../../components/spinner/Spinner";

const QuizController = (CUId) => {
    const { user } = useSelector((state) => state.auth)
    const headers = { 'Authorization': `Bearer ${user.token}` };
    const [questions, setQuestions] = useState([]);
    const [score, setScore] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [exam_id, setExam_id] = useState("");

    const params = useParams();
    const id = params;

    useEffect(() => {
        getExams();

    }, [])

    const getExams = async () => {
        const { data } = await axios.get(`http://localhost:5000/api/questions?test=${id.id}`, { headers });
        setQuestions(data);
        setIsLoading(false);
    }

    if (isLoading) {
        return (
            <>
                <Spinner/>
            </>)
    }
    return (
        <div>
        {questions.length > 0 ? (
            <Quiz
            questions={questions}
            score={score}
            setScore={setScore}
            setQuestions={setQuestions}
            exam_id={id}
            />
        ) : (<NoQuestions/>)}
        </div>
    );
}

export default QuizController;