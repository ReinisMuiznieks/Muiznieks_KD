import React, { useEffect } from "react";
import NavbarTop from "../../components/navbar/navbar.jsx";
import Footer from "../../components/footer/footer.jsx";
import Container from 'react-bootstrap/Container';

import { UseEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import CategoryForm from "../../components/categories/categoryForm.jsx";
import {getCategories,reset} from '../../features/categories/categorySlice'
import CategoryItem from "../../components/categories/categoryItem.jsx";


function AdminDashboard() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const { user } = useSelector((state) => state.auth)
    const { categories, isLoading, isError, message } = useSelector((state) => state.categories)

    useEffect(() => {

        if(isError) {
            console.log(message)
        }

        if(!user){
            navigate('/sign-up')
        }

        if(user.role !== 'admin'){
            navigate('/')
        }

        dispatch(getCategories())

        return () => { // clears when component unmounts
            dispatch(reset())
        }
    }, [user, navigate, isError, message, dispatch])

return (
    <>
    <NavbarTop/>
    
    <section className="heading">
        <h1>Welcome { user && user.name }</h1>
    </section>
    
    <CategoryForm/>

    <section className="content">
        {categories.length > 0 ? (
            <div className="categories">
                {categories.map((category) => (
                    <CategoryItem key={category._id} category={category}/>
                ))}
            </div>
        ) : (<h3>No categories</h3>)}
    </section>
    <Footer/>
    </>

)
}

export default AdminDashboard;