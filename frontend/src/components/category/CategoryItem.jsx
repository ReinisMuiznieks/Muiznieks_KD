import { deleteCategory, updateCategory } from '../../features/category/categorySlice'
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import '../../pages/category/category.scss';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function CategoryItem({category}) {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const [isAdmin, setIsAdmin] = useState(false);
    const [name, setName] = useState('')

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
      checkRole();
    })

    const checkRole = () => {
      if(user && user.role === 'admin'){
      setIsAdmin(true)
    }
    else{
      setIsAdmin(false)
    }
  }

  return (
<>
  <div id="learn-legend">
    <Container>
        <Stack id="learn-stack">
        <Link to={`/category/${category._id}`}  id='learn-link'>
            <button id="stack-card">             
                <Card.Body id="stack-chapter" > {category.name} </Card.Body>        
            </button>
        </Link>
        {isAdmin ? (
        <>
        <button onClick={handleShow} className="close" id="delete-button">Delete <b>{category.name}</b></button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete category</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete <b>{category.name}</b> category?</Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="outline-danger" onClick={() => dispatch(deleteCategory(category._id))}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>

        {/* <button onClick={handleShow} className="close" id="update-button">Update <b>{category.name}</b></button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit category</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to edit <b>{category.name}</b> category?
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
          <Button variant="outline-secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="outline-warning" onClick={() => dispatch(updateCategory(category._id))}>
            Update
          </Button>
        </Modal.Footer>
      </Modal> */}
        </>
      ) : (
        <>
        </>   
        )}
        </Stack>
    </Container>
  </div>
</>
  )
}

export default CategoryItem
