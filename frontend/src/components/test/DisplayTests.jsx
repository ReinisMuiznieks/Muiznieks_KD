import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {getTests,reset} from '../../features/test/testSlice'
import Spinner from "../spinner/Spinner";
import Form from 'react-bootstrap/Form';
import "./test.scss"
import TestItem from "../testHandler/TestItem";
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
    
    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
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
        
        axios.get('http://localhost:5000/api/categories',  { headers: { 'Authorization': `Bearer ${user.token}` } })
        .then(response => {
            setCategories(response.data);
            console.log(response.data);
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
    <div id="category-legend">
        <Form>
            <Form.Control id="searchbar"
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
            />

            <Form.Control as="select" id="category-select" value={selectedCategory} onChange={handleCategoryChange}>
                <option value="">All Categories</option>
                {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                        {category.name}
                    </option>
                ))}
            </Form.Control>
        </Form>
    </div>

    {tests.length > 0 ? (
    <div className="categories">
        {tests.filter((item) => {
            if (selectedCategory) {
                return item.category === selectedCategory &&
                    (search.toLowerCase() === '' || item.testname.toLowerCase().includes(search));
            } else {
                return search.toLowerCase() === '' || item.testname.toLowerCase().includes(search);
            }
        }).map((test) => (
            <TestItem key={test._id} test={test}/>
        ))}
    </div>
    ) : (
        <>
        </>
        )
    }
    </>

)
}

export default DisplayTests;