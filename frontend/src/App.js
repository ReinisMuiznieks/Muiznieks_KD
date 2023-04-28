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
import Test from "./pages/test/Test";
import TestQuestions from "./pages/test/TestQuestions";
import QuizController from "./pages/test/TestQuizController2";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

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
                <Route path="/test" element={<Test/>}/>
                <Route path="/learn/test" element={<Learn/>}/>
                <Route path="/admin" element={<Admin/>}/>
                <Route path="/admin/test" element={<TestForm/>}/>
                <Route path="/admin/card" element={<CardForm/>}/>
                <Route path="/admin/question" element={<QuestionForm/>}/>
                <Route path="/admin/testing" element={<TestingForm/>}/>
                <Route path="/category/:id" element={<CategoryCards/>}/>
                <Route path="/test/:id" element={<TestQuestions/>}/>
                <Route path="/credits" element={<Credits/>}/>
                <Route path="/quiz/:id" element={<QuizController/>} />
            </Routes>
        </BrowserRouter>
        <ToastContainer />
        </>
  );
}

export default App;