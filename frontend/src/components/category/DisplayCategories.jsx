import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {getCategories,reset} from '../../features/category/categorySlice'
import CategoryItem from "./CategoryItem.jsx";
import Spinner from "../spinner/Spinner";
import Form from 'react-bootstrap/Form';
import "./category.scss"

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

        return () => { // clears when component unmounts
            dispatch(reset())
        }
    }, [user, navigate, isError, message, dispatch])

    if(isLoading) {
        return <Spinner/>
    }

return (
    <>
    <div id="category-legend">
    <Form>
    <Form.Control id="searchbar"
    
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search"
    />
    
    </Form>
    </div>

    <section className="content">
        {categories.length > 0 ? (
            <div className="categories">
                {categories.filter((item) => {
                    return search.toLowerCase() === '' ? item : item.name.toLowerCase().includes(search)
                }).map((category) => (
                    <CategoryItem key={category._id} category={category}/>
                ))}
            </div>
        ) : (<h1>No categories</h1>)}
    </section>
    </>

)
}

export default DisplayCategories;