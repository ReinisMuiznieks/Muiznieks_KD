import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {getCards, reset} from '../../features/card/cardSlice'
import Spinner from "../spinner/Spinner";

import CardItem from "./CardItem.jsx";

function DisplayCards() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const { user } = useSelector((state) => state.auth)
    const { cards, isLoading, isError, message } = useSelector((state) => state.cards)

    useEffect(() => {

        if(isError) {
            console.log(message)
        }

        if(!user){
            navigate('/sign-up')
        }

        dispatch(getCards())

        return () => { // clears when component unmounts
            dispatch(reset())
        }
    }, [user, navigate, isError, message, dispatch])

    if(isLoading) {
        return <Spinner/>
    }

return (
    <>
    <Section className="content">
        {cards.length > 0 ? (
            <div className="cards">
                {cards.map((card) => (
                    <CardItem key={card._id} card={card} category={card.category.name}/>
                ))}
            </div>
        ) : (<h3>No cards</h3>)}
    </Section>
    </>
)

}

export default DisplayCards;