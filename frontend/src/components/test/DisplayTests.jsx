import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {getTests,reset} from '../../features/test/testSlice'
import Spinner from "../spinner/Spinner";
import Form from 'react-bootstrap/Form';
import "./test.scss"
import TestItem from "./TestItem";
import axios from 'axios'
import { useParams } from 'react-router-dom'

function DisplayTests() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const { tests, isLoading, isError, message } = useSelector((state) => state.tests)
    const params = useParams();
    const id = params;
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState([]);
    
    const [showAllCategories, setShowAllCategories] = useState(false);

    const visibleCategories = showAllCategories ? categories : categories.slice(0, 3);
  
    const toggleShowAllCategories = () => {
      setShowAllCategories(!showAllCategories);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event);
        setSearch('');
    };

    
    useEffect(() => {
        if(isError) {
            console.log(message)
        }

        if(!user){
            navigate('/sign-up')
        }

        dispatch(getTests())
        
        axios.get('https://verbum-server-kd.onrender.com/api/categories',  { headers: { 'Authorization': `Bearer ${user.token}` } })
        .then(response => {
            setCategories(response.data);
        })

        return () => { // clears when component unmounts
            dispatch(reset())
        }
        
    }, [user, navigate, isError, message, dispatch])

    if(isLoading) {
        return <Spinner/>
    }

return (
    <>

<div id="test-container">
<div id="category-legend">
        <Form>
            <Form.Control id="searchbar"
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
            />
        </Form>
    </div>
    <div id="category-legend">
        <div id="category-select">
            <button
            className={`category-button ${selectedCategory === "" ? "active" : ""}`}
            onClick={() => handleCategoryChange("")}>All Categories</button>
            {visibleCategories.map((category) => (
            <button
                key={category._id}
                className={`category-button ${selectedCategory === category._id ? "active" : ""}`}
                onClick={() => handleCategoryChange(category._id)}>
            {category.name}
            </button>
            ))}
            {categories.length > 3 && (
            <button className="more-button" onClick={toggleShowAllCategories}>
                {showAllCategories ? "Less" : "..."}
            </button>
            )}
        </div>
      </div>
    
      {tests.length > 0 ? (
        <div className="categories">
        {tests.filter((item) => {
        if (selectedCategory) {
            return item.categories.some((category) => category.category === selectedCategory) &&
            (search.toLowerCase() === '' || item.testname.toLowerCase().includes(search));
        } else {
            return search.toLowerCase() === '' || item.testname.toLowerCase().includes(search);
        }
        }).map((test) => (
        <TestItem key={test._id} test={test} />
        ))}
        </div>
        ) : (
        <>
        
        </>
        )
    }
    </div>
    </>

)
}

export default DisplayTests;