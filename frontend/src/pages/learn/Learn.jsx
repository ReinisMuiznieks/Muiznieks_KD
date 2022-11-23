import React from "react";
import './learn.scss';
import NavbarTop from "../../components/navbar/navbar.jsx";
import Footer from "../../components/footer/footer.jsx";

// import Flashcard from "../../components/flashcard/flashcard";

import DisplayCategories from "../../components/categories/displayCategories";

const Learn = () => {
    return (
<>
<NavbarTop />
        <DisplayCategories/>

<Footer/>

</>
    )
}

export default Learn;
