import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux";
import NoCards from "../../components/card/NoCards";
import Spinner from "../../components/spinner/Spinner";
import Learn2 from "./Learn2";

const LearnController = (CUId) => {
    const { user } = useSelector((state) => state.auth)
    const headers = { 'Authorization': `Bearer ${user.token}` };
    const [cards, setCards] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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
            />
        ) : (<NoCards/>)}
        </div>
    );
}

export default LearnController;