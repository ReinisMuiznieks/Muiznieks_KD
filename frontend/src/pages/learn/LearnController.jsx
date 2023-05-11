import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import { useSelector } from "react-redux";
import NoCards from "../../components/card/NoCards";
import Spinner from "../../components/spinner/Spinner";
import Learn2 from "./Learn2";

const LearnController = () => {
    const { user } = useSelector((state) => state.auth)
    const headers = { 'Authorization': `Bearer ${user.token}` };
    const [cards, setCards] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [userLearnId, setUserLearnId] = useState();

    const params = useParams();
    const id = params;

    useEffect(() => {
        getCards();
    }, [])

    const getCards = async () => {
        const { data } = await axios.get(`http://localhost:5000/api/cards?category=${id.id}`, { headers });
        setCards(data);
        setIsLoading(false);
    }

    const securityData = async () => {
        const dummyData = {
            user: user._id,
            category: id.id,
            progress: 0,
            completed: false,
        };
        const response = await axios.post("http://localhost:5000/api/userlearn/", dummyData, { headers });
        console.log(response.status);
        console.log(response.data);
        setUserLearnId(response.data._id);
    }

    useEffect(() => {
        if (!isLoading) {
            securityData();
        }
    }, [isLoading]);

    if (isLoading) {
        return (
            <>
                <Spinner/>
            </>)
    }
    return (
        <div>
        {cards.length > 0 ? (
            <Learn2
            cards={cards}
            setCards={setCards}
            category_id={id}
            userLearnId={userLearnId}
            />
        ) : (<NoCards/>)}
        </div>
    );
}

export default LearnController;
