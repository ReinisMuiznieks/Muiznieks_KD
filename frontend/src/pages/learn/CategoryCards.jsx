import React, { useEffect, useState } from "react";
import './learn.scss';
import NavbarTop from "../../components/navbar/Navbar.jsx";
import Footer from "../../components/footer/Footer.jsx";
import axios from 'axios'
import { useLocation } from "react-router";
import CardItem from "../../components/card/CardItem";
import Spinner from "../../components/spinner/Spinner";

const CategoryCards = () => {
    const location = useLocation();
    const [cards, setCards] = useState([]);
    const cat = location.pathname.split("/")[2];
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getCards = async () => {
          try {
            const res = await axios.get(
              cat
                ? `https://verbum-server-kd.onrender.com/api/cards?category=${cat}`
                : "https://verbum-server-kd.onrender.com/api/cards"
            );
            setIsLoading(false);
            setCards(res.data);
          } catch (err) {}
        };
        getCards();
      }, [cat]);

      if(isLoading) {
        return <Spinner/>
    }

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

export default CategoryCards;
