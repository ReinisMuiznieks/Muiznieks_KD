import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createCategory } from '../../../../features/category/categorySlice'
import { toast } from 'react-toastify'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Stack } from 'react-bootstrap';
import {Container} from 'react-bootstrap';

function CategoryForm() {
    const [name, setName] = useState('')
  
    const dispatch = useDispatch()
  
    const onSubmit = (e) => {
      e.preventDefault()
  
      if (name.trim().length !== 0) {
        dispatch(createCategory({ name }))
        toast.success(`Successfully created catagory ${name}`)
        setName('')
      } else {
        toast.error('Invalid category name!')
      }
    }
  
    const onReset = () => {
      setName('')
    }

    return (
<>
<Container className='pt-5'>
    <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Category name</Form.Label>
        <Form.Control
          type='text'
          name='name'
          id='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>
      <Stack direction="horizontal" gap={3} className="pt-5 d-flex justify-content-end">
        <Button variant="success" type="submit">Submit</Button>
        <div className="vr" />
        <Button variant="danger" onClick={onReset}>Reset</Button>
      </Stack>
    </Form>
  </Container>
</>
    )
  }
  
  export default CategoryForm