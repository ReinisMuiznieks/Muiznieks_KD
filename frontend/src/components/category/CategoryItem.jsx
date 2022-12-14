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
import axios from 'axios'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function CategoryItem({category}) {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const [isAdmin, setIsAdmin] = useState(false);
    const [name, setName] = useState('')

    const [showDelete, setShowDelete] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);

    const handleCloseDelete = () => setShowDelete(false);
    const handleCloseUpdate = () => setShowUpdate(false);

    const handleShowUpdate = () => setShowUpdate(true);
    const handleShowDelete = () => setShowDelete(true);


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

  const onUpdate = async (e) => {
    e.preventDefault()

    if (name.trim().length !== 0) {
      toast.success(`Successfully updated catagory ${name}`)
      setName('')
    } else {
      toast.error('Invalid category name!')
    }

    try {
      const response = await axios.put(`https://verbum-server-kd.onrender.com/api/categories/${category._id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: {
          name: name
        }
      })
      return response

    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

  

  return (
<>
  <div id="card-legend">
    <Container>
        <Stack id="learn-stack">
        <Link to={`/category/${category._id}`}  id='learn-link'>
            <button id="stack-card">             
                <Card.Body id="stack-chapter" > {category.name} </Card.Body>        
            </button>
        </Link>
        {isAdmin ? (
        <>      
        <Row>
          <Col>
            <button onClick={handleShowDelete} className="close" id="delete-button">Delete <b>{category.name}</b></button>
          </Col>
          <Col>
            <button onClick={handleShowUpdate} className="close" id="update-button">Update <b>{category.name}</b></button>
          </Col>
        </Row>

        

        <Modal show={showDelete} onHide={handleCloseDelete}>
          <Modal.Header closeButton>
            <Modal.Title>Delete category</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete <b>{category.name}</b> category?</Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={handleCloseDelete}>
              Cancel
            </Button>
            <Button variant="outline-danger" onClick={() => dispatch(deleteCategory(category._id))}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>

        

      <Modal show={showUpdate} onHide={handleCloseUpdate}>
        <Modal.Header closeButton>
          <Modal.Title>Edit category</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to edit <b>{category.name}</b> category?
        <Form onSubmit={onUpdate}>
      <Form.Group className="mb-3">
        <Form.Label>Category name</Form.Label>
        <Form.Control
          type='text'
          name='name'
          id='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
        />
      </Form.Group>
    </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleCloseUpdate}>
            Cancel
          </Button>
          <Button variant="outline-warning" onClick={onUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
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
