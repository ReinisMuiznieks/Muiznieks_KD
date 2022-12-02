import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createCategory } from '../../features/category/categorySlice'
import { toast } from 'react-toastify'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function CategoryForm() {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    const [name, setName] = useState('')
  
    const dispatch = useDispatch()
  
    const onSubmit = (e) => {
      e.preventDefault()
  
      if (name.trim().length !== 0) {
        dispatch(createCategory({ name }))
        toast.success(`Successfully created catagory ${name}`)
        setName('')
        setShow(false);
      } else {
        toast.error('Invalid category name!')
      }
    }
  
    return (
      // <section className='form'>
      //   <form onSubmit={onSubmit}>
      //     <div className='form-group'>
      //       <label htmlFor='text'>Category</label>
      //       <input
              // type='text'
              // name='text'
              // id='text'
              // value={name}
              // onChange={(e) => setName(e.target.value)}
      //       />
      //     </div>
      //     <div className='form-group'>
      //       <button className='btn btn-block' type='submit'>
      //         Add category
      //       </button>
      //     </div>
      //   </form>
      // </section>

<>
<Modal show={show} onHide={handleClose}>
  <Modal.Header closeButton>
    <Modal.Title>Add category</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Category name</Form.Label>
        <Form.Control
          type='text'
          name='text'
          id='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
        />
      </Form.Group>
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleClose}>
      Close
    </Button>
    <Button variant="primary" onClick={onSubmit}>
      Add
    </Button>
  </Modal.Footer>
</Modal>
</>
    )
  }
  
  export default CategoryForm