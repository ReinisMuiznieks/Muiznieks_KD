import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import { useSelector } from "react-redux";
import NoCards from "../card/NoCards";
import Spinner from "../spinner/Spinner";
import Learn from "./Learn";

const LearnController = () => {
    const { user } = useSelector((state) => state.auth)
    const headers = { 'Authorization': `Bearer ${user.token}` };
    const [cards, setCards] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [userLearnId, setUserLearnId] = useState();
    const params = useParams();
    const id = params;
    const [currCard, setCurrCard] = useState(0);

    useEffect(() => {
        getCards();
      }, []);
    
      useEffect(() => {
        if (!isLoading) {
          checkUserLearn();
        }
      }, [isLoading]);

      // iegūstiet visas kartes no datu bāzes
    const getCards = async () => {
        const { data } = await axios.get(`https://verbum-server-kd.onrender.com/api/cards?category=${id.id}`, { headers });
        setCards(data);
        setIsLoading(false);
    }

    // iegūstiet lietotāja mācīšanās datus, izmantojot lietotāja ID un kategorijas ID
    const checkUserLearn = async () => {
        try {
            const response = await axios.get(`https://verbum-server-kd.onrender.com/api/userlearn?user=${user._id}&category=${id.id}`, { headers });
            // pārbaudiet, vai lietotāja izveides funkcija Learn jau ir palaista
            if (response.data.length > 0) {
                // jo no atbildes ir tikai 1 datu ievade, iestatiet to ar [0]
                const userLearnData = response.data[0];
                if(userLearnData.completed == false){
                    setUserLearnId(userLearnData._id);
                    // ja kategorija nav pabeigta, tad mainīgajas currCard piešķirt lietotāja progresa vērtību, lai kad lietotājs
                    // atgriežas kategorijā tas būtu pie vārda kartiņas pie kuras viņš izgāja
                    setCurrCard(userLearnData.progress);
                } else if (userLearnData.completed == true){
                    setUserLearnId(userLearnData._id);
                    // ja kategorija ir pabeigta, tad piešķirt pie pēdējās kartiņas kas būtu lietotāja progress - 1
                    setCurrCard(userLearnData.progress-1);
                }
                // ja nav vel piešķirti dati tad sagaidīt kamēr beidz strādāt createUserLearn funkcija
            } else {
                await createUserLearn();
            }
        } catch (error) {
            console.log(error);
        }
    }

    // funkcija piešķir sākuma datus
    const createUserLearn = async () => {
        const initialData = {
            user: user._id,
            category: id.id,
            progress: 0,
            completed: false,
        };
        // atgriež visus lietotāja testus no datu bāzes
        const response = await axios.post("https://verbum-server-kd.onrender.com/api/userlearn/", initialData, { headers });
        console.log(response.status);
        console.log(response.data);
        setUserLearnId(response.data._id);
    }

    if (isLoading) {
        return (<Spinner/>)
    }

    return (
        <div>
            {/* ja ir vārdu kartiņas kategorijā tad padod mainīgos uz Learn komponentu */}
        {cards.length > 0 ? (
            <Learn
            cards={cards}
            setCards={setCards}
            category_id={id}
            userLearnId={userLearnId}
            currCard={currCard}
            setCurrCard={setCurrCard}
            />
            // citādi, parādīt NoCard komponentu
        ) : (<NoCards/>)}
        </div>
    );
}

export default LearnController;
