import NavbarTop from "../../components/navbar/Navbar.jsx";
import DisplayTests from '../../components/test/DisplayTests';
import React from "react";

const TestPage = () => {
    return (
<>
    <NavbarTop />
    <div className="item-container">
       <DisplayTests/>  
    </div>
</>
    )
}

export default TestPage;
