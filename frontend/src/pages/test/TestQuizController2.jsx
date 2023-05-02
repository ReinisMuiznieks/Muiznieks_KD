import axios from "axios";
import { useEffect, useState } from "react";
import Quiz from "./TestQuiz2";
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux";
import NoQuestions from "../../components/card/NoQuestions";

const QuizController = (CUId) => {
    const { user } = useSelector((state) => state.auth)
    const headers = { 'Authorization': `Bearer ${user.token}` };
    const [questions, setQuestions] = useState([]);
    const [score, setScore] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [exam_id, setExam_id] = useState("");
    const [timerData, setTimerData] = useState(0);

    const [cards, setCards] = useState([]);
    const navigate = useNavigate()

    const params = useParams();
    const id = params;

    useEffect(() => {
        getExams();

    }, [])

    const getExams = async () => {
        const { data } = await axios.get(`http://localhost:5000/api/questions?test=${id.id}`, { headers });
        setQuestions(data);
        // userCheck();
        setIsLoading(false);
    }

    // const securityData = async () => {
    //     axios.all([
    //         await axios.get('http://localhost:5000/api/users/' + "6376356f06515aae02bc2a91", { headers }),
    //         await axios.get('http://localhost:5000/api/tests/' + id.id, { headers })
    //     ]).then(axios.spread((data, data2) => {
    //         // if (data2.data[0].creatorUserId == CUId.CUId) {
    //         //     setTimerData(data2.data[0].time)
    //         //     console.log(data2.data[0].time)
    //         //     alert("You are in preview mode that means your question data will not be saved")
    //         // } else {
                // const dummyData = {
                //     user: user._id,
                //     test: id.id,
                //     score: 0,
                // };
                // axios.post("http://localhost:5000/api/usertests/", dummyData, { headers }).then((response) => {
                //     console.log(response.status);
                //     console.log(response.data);
                //     setExam_id(response.data._id)
                // });
    //         //     setTimerData(data2.data[0].time)
    //         // // }
    //         // setTimeout(() => {
    //         //     navigate("/result/" + id.id)
    //         // }, ((data2.data[0].time) * 60) + "000");
    //     }))
    // }

    // const userCheck = async () => {
    //     try {
    //         const { data } = await axios.get('http://localhost:5000/api/usertests/' + user._id, { headers });
    //         const myData = await Promise.all(data.map((d) => d.examId))
    //         for (let i = 0; i <= myData.length; i++) {
    //             if (myData[i] === id.id) {
    //                 // navigate("/dashboard")
    //                 alert("you have already took this exam")
    //                 return
    //             }
    //         }
    //         securityData();
    //         setIsLoading(false);
    //     } catch (err) {
    //         console.log(err);
    //         alert("you have already took this exam")
    //     }
    // }
    
    // console.log(questions);
    // console.log(score);
    // console.log(id);

    if (isLoading) {
        return (
            <>
                <h1>loading</h1>
            </>)
    }
    return (
        <div>
            {/* <CountDownTimer hoursMinSecs={hoursMinSecs}/> */}
            
            {/* <Quiz
                questions={questions}
                score={score}
                setScore={setScore}
                setQuestions={setQuestions}
                exam_id={id}
            /> */}

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