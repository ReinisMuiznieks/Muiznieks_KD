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
import AdminPage from "./pages/admin/Admin";
import Credits from "./pages/credits/Credits";
import Test from "./pages/test/Test";
import QuizController from "./pages/test/TestQuizController2";
import TestCompleted from "./components/test/TestCompleted";

import UsersPanel from "./pages/admin/UsersPanel";
import TestPanel from "./pages/admin/TestsPanel";
import QuestionsPanel from "./pages/admin/QuestionsPanel";
import CardsPanel from "./pages/admin/CardsPanel";
import CategoriesPanel from "./pages/admin/CategoriesPanel";
import ProfilePage from "./pages/profile/Profile";

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
                <Route path="/category/:id" element={<CategoryCards/>}/>
                <Route path="/credits" element={<Credits/>}/>
                <Route path="/test/:id" element={<QuizController/>} />
                <Route path="/result/:id" element={<TestCompleted/>} />

                <Route path="/admin" element={<AdminPage/>}/>
                <Route path="/admin/tests" element={<TestPanel/>}/>
                <Route path="/admin/users" element={<UsersPanel/>}/>
                <Route path="/admin/questions" element={<QuestionsPanel/>}/>
                <Route path="/admin/cards" element={<CardsPanel/>}/>
                <Route path="/admin/categories" element={<CategoriesPanel/>}/>

                <Route path="/profile" element={<ProfilePage/>}/>
            </Routes>
        </BrowserRouter>
        <ToastContainer />
        </>
  );
}

export default App;