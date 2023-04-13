import React from "react"

import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import PageNotFound from "./pages/pagenotfound/PageNotFound";
import Category from "./pages/category/Category";
import {ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import Learn from './pages/learn/Learn';
import CategoryCards from "./pages/learn/CategoryCards";
import Admin from "./pages/admin/Admin";
import Credits from "./pages/credits/Credits";
import TestForm from "./components/test/TestForm";
import CardForm from "./components/card/CardForm";
import QuestionForm from "./components/question/QuestionForm";
import TestingForm from "./components/question/TestingForm";

function App() {

    return (
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/log-in" element={<Login/>}/>
                <Route path="/sign-up" element={<Register/>}/>
                <Route path="/*" element={<PageNotFound/>}/> 
                <Route path="/learn" element={<Learn/>}/>
                <Route path="/learn/test" element={<Learn/>}/>
                <Route path="/admin" element={<Admin/>}/>
                <Route path="/admin/test" element={<TestForm/>}/>
                <Route path="/admin/card" element={<CardForm/>}/>
                <Route path="/admin/question" element={<QuestionForm/>}/>
                <Route path="/admin/testing" element={<TestingForm/>}/>
                <Route path="/category/:id" element={<CategoryCards/>}/>
                <Route path="/credits" element={<Credits/>}/>
            </Routes>
        </BrowserRouter>
        <ToastContainer />
        </>
  );
}

export default App;