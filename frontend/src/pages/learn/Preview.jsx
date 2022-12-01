import React, { useEffect, useState } from "react";
import './learn.scss';
import NavbarTop from "../../components/navbar/navbar.jsx";
import Footer from "../../components/footer/footer.jsx";
import { useSelector, useDispatch } from 'react-redux'
import {getCategories} from '../../features/categories/categorySlice'
import {getCards} from '../../features/card/cardSlice'
// import Flashcard from "../../components/flashcard/flashcard";
import axios from 'axios'
import { useLocation } from "react-router";
import DisplayCategories from "../../components/categories/displayCategories";
import categoryService from "../../features/categories/categoryService";
import CardItem from "../../components/card/CardItem";

const Learn = () => {
    const location = useLocation();
    const [cards, setCards] = useState([]);
    const cat = location.pathname.split("/")[2];

    useEffect(() => {
        const getCards = async () => {
          try {
            const res = await axios.get(
              cat
                ? `https://verbum-server-kd.onrender.com/api/cards?category=${cat}`
                : "https://verbum-server-kd.onrender.com/api/cards"
            );
            setCards(res.data);
          } catch (err) {}
        };
        getCards();
      }, [cat]);

    return (
<>
<NavbarTop />

<section className="content">
        {cards.length > 0 ? (
            <div className="cards">
                {cards.map((card) => (
                    <CardItem key={card._id} card={card} category={card.category.name}/>
                ))}
            </div>
        ) : (<h3>No cards</h3>)}
    </section>
<Footer/>

</>
    )
}

export default Learn;
