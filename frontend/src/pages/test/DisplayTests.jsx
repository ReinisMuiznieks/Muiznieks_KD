import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {getTests,reset} from '../../features/test/testSlice'
import Spinner from "../../components/spinner/Spinner";
import Form from 'react-bootstrap/Form';
import "./test.scss"
import TestItem from "./TestItem";

function DisplayTests() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const { tests, isLoading, isError, message } = useSelector((state) => state.tests)

    const [search, setSearch] = useState('');

    useEffect(() => {

        if(isError) {
            console.log(message)
        }

        if(!user){
            navigate('/sign-up')
        }

        dispatch(getTests())

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
        {tests.length > 0 ? (
            <div className="categories">
                {tests.filter((item) => {
                    return search.toLowerCase() === '' ? item : item.testname.toLowerCase().includes(search)
                }).map((test) => (
                    <TestItem key={test._id} test={test}/>
                ))}
            </div>
        ) : (<h1>No tests</h1>)}
    </section>
    </>

)
}

export default DisplayTests;