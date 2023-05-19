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
import AdminPage from "./pages/admin/Admin";
import Credits from "./pages/credits/Credits";
import TestPage from "./pages/test/Test";
import QuizController from "./components/testHandler/TestQuizController2";
import TestCompleted from "./components/test/TestCompleted";
import UsersPanel from "./pages/admin/UsersPanel";
import TestPanel from "./pages/admin/TestsPanel";
import QuestionsPanel from "./pages/admin/QuestionsPanel";
import CardsPanel from "./pages/admin/CardsPanel";
import CategoriesPanel from "./pages/admin/CategoriesPanel";
import ProfilePage from "./pages/profile/Profile";
import IncorrectAnswersPage from "./components/testHandler/IncorrectAnswers";
import LearnController from "./components/learnHandler/LearnController";
import UserTests from "./pages/userTests/UserTests";

function App() {

    return (
        <>
        <BrowserRouter>
            <Routes>
                {/* Visitor access */}
                <Route path="/" element={<Home/>}/>
                <Route path="/log-in" element={<Login/>}/>
                <Route path="/sign-up" element={<Register/>}/>
                <Route path="/*" element={<PageNotFound/>}/> 
                <Route path="/credits" element={<Credits/>}/>

                {/* User access */}
                <Route path="/learn" element={<Learn/>}/>
                <Route path="/test" element={<TestPage/>}/>
                <Route path="/test/:id" element={<QuizController/>} />
                <Route path="/result/:id" element={<TestCompleted/>} />
                <Route path="/profile" element={<ProfilePage/>}/>
                <Route path="/incorrect/:id" element={<IncorrectAnswersPage/>}/>
                <Route path="/learn/:id" element={<LearnController/>}/>
                <Route path="/tests" element={<UserTests/>}/>

                {/* Admin access */}
                <Route path="/admin" element={<AdminPage/>}/>
                <Route path="/admin/tests" element={<TestPanel/>}/>
                <Route path="/admin/users" element={<UsersPanel/>}/>
                <Route path="/admin/questions" element={<QuestionsPanel/>}/>
                <Route path="/admin/cards" element={<CardsPanel/>}/>
                <Route path="/admin/categories" element={<CategoriesPanel/>}/>
            </Routes>
        </BrowserRouter>
        <ToastContainer />
        </>
  );
}

export default App;