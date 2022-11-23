import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {getCategories,reset} from '../../features/categories/categorySlice'
import CategoryItem from "./categoryItem.jsx";
import Preview from "../../pages/learn/Preview.jsx"

function DisplayCategories() {
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
    <section className="content">
        {categories.length > 0 ? (
            <div className="categories">
                {categories.map((category) => (
                    <CategoryItem key={category._id} category={category}/>
                ))}
            </div>
        ) : (<h3>No categories</h3>)}
    </section>
    </>

)
}

export default DisplayCategories;