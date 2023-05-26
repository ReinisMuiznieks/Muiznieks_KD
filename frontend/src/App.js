import React from "react"

import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import {ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import PageNotFound from "./pages/pagenotfound/PageNotFound";
import Learn from './pages/learn/Learn';
import AdminPage from "./pages/admin/Admin";
import Credits from "./pages/credits/Credits";
import TestPage from "./pages/test/Test";
import UsersPanel from "./pages/admin/UsersPanel";
import TestPanel from "./pages/admin/TestsPanel";
import QuestionsPanel from "./pages/admin/QuestionsPanel";
import CardsPanel from "./pages/admin/CardsPanel";
import CategoriesPanel from "./pages/admin/CategoriesPanel";
import ProfilePage from "./pages/profile/Profile";
import UserTests from "./pages/userTests/UserTests";
import TestCompleted from "./pages/test/TestCompleted";
import IncorrectAnswersPage from "./pages/test/IncorrectAnswers";

import TestController from "./components/testHandler/TestController";
import LearnController from "./components/learnHandler/LearnController";
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function App() {
    const user = useSelector((state) => state.auth.user);

    const RequireAuth = ({ children }) => {
        return user ? children : <Navigate to="/log-in" />;
      };

    const RequireAdmin = ({ children }) => {
    // pārbauda vai lietotājs ir autorizēts un vai viņam ir administratora loma
    const isAdmin = user && user.role === 'admin';
    return isAdmin ? children : <Navigate to="/" />;
    };

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
                <Route path="/learn" element={<RequireAuth><Learn/></RequireAuth>}/>
                <Route path="/test" element={<RequireAuth><TestPage/></RequireAuth>}/>
                <Route path="/test/:id" element={<RequireAuth><TestController/></RequireAuth>} />
                <Route path="/result/:id" element={<RequireAuth><TestCompleted/></RequireAuth>} />
                <Route path="/profile" element={<RequireAuth><ProfilePage/></RequireAuth>}/>
                <Route path="/incorrect/:id" element={<RequireAuth><IncorrectAnswersPage/></RequireAuth>}/>
                <Route path="/learn/:id" element={<RequireAuth><LearnController/></RequireAuth>}/>
                <Route path="/tests" element={<RequireAuth><UserTests/></RequireAuth>}/>

                {/* Admin access */}
                <Route path="/admin" element={<RequireAdmin><AdminPage/></RequireAdmin>}/>
                <Route path="/admin/tests" element={<RequireAdmin><TestPanel/></RequireAdmin>}/>
                <Route path="/admin/users" element={<RequireAdmin><UsersPanel/></RequireAdmin>}/>
                <Route path="/admin/questions" element={<RequireAdmin><QuestionsPanel/></RequireAdmin>}/>
                <Route path="/admin/cards" element={<RequireAdmin><CardsPanel/></RequireAdmin>}/>
                <Route path="/admin/categories" element={<RequireAdmin><CategoriesPanel/></RequireAdmin>}/>
            </Routes>
        </BrowserRouter>
        <ToastContainer />
        </>
  );
}

export default App;