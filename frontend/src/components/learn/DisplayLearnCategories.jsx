import "./learnCategory.scss"
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {getCategories,reset} from '../../features/category/categorySlice'
import LearnCategoryItem from "./LearnCategoryItem";
import Spinner from "../spinner/Spinner";
import Form from 'react-bootstrap/Form';

function DisplayCategories() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const { categories, isLoading, isError, message } = useSelector((state) => state.categories)

    const [search, setSearch] = useState('');

    useEffect(() => {

        if(isError) {
            console.log(message)
        }

        if(!user){
            navigate('/sign-up')
        }

        dispatch(getCategories())

        return () => {
            dispatch(reset())
        }
    }, [user, navigate, isError, message, dispatch])

    if(isLoading) {
        return <Spinner/>
    }

return (
    <>
    <div id="learn-container">
    <div id="category-legend">
    <Form>
    <Form.Control id="searchbar"
    
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search"
    />
    
    </Form>
    </div>

    <section className="content">
        {/* parbaudīt vai ir kada kategorija */}
        {categories.length > 0 ? (
            <div className="categories">
                {/* filtrēt kategorijas ar tekstu no meklēšanas joslas */}
                {categories.filter((item) => {
                    return search.toLowerCase() === '' ? item : item.name.toLowerCase().includes(search)
                }).map((category) => (
                    // iziet cauri katrai kategorijai un izvadīt Learn category item komponentu
                    <LearnCategoryItem key={category._id} category={category}/>
                ))}
            </div>
            // Ja nav neviena kategorija izvadit ziņu
        ) : (<h1>No categories</h1>)}
    </section>
    </div>
    </>

)
}

export default DisplayCategories;