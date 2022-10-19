import React from "react"

import {
    BrowserRouter,
    Routes,
    Route,
    HashRouter,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import PageNotFound from "./pages/pagenotfound/PageNotFound";


function App() {
    return (
        <BrowserRouter>
        <HashRouter basename="/">
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/log-in" element={<Login/>}/>
                <Route path="/sign-up" element={<Register/>}/>
                <Route path="/*" element={<PageNotFound/>}/> 
            </Routes>
        </HashRouter>
        </BrowserRouter>
  );
}

export default App;