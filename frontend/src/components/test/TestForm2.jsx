import {getTypes,reset} from '../../features/type/typeSlice'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom'

function TestForm2() {
    const [testName, setTestName] = useState("");
    const [type, setType] = useState('');
    const { types, isLoading, isError, message } = useSelector((state) => state.type)
    const { user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

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

        dispatch(getTypes())

        return () => { // clears when component unmounts
            dispatch(reset())
        }
    }, [user, navigate, isError, message, dispatch])

    const [isShown, setIsShown] = useState(false);

    const handleClick = () => {
      setIsShown(current => !current);
    };

    return (
        <div className="input-group mb-3">
              <Form.Select onChange={(e)=>setType(e.target.value)} id="type" name="cars" className="form-control select select-initialized"  value={type}>
                <option >Choose Type</option>
                {
                    types && types.map(type =>(
                        <option key={type._id}  value={type._id} type={type} >{type.name}</option>
                    ))
                    
                }
              </Form.Select>
              <Button className="btn btn-secondary" type="button" onClick={handleClick} id="button-addon2">Add type</Button>
                    {isShown && (

                        <></>

                    )}
            </div>
    )
}

export default TestForm2