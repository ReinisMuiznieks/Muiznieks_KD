import { useDispatch } from 'react-redux'
import { deleteCategory } from '../../features/category/categorySlice'
import React from "react";
import '../../pages/category/category.scss';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";

function CategoryItem({category, length}) {
    const dispatch = useDispatch()

  return (
    // <div className="category">
    //     <h2>{category.name}</h2>
    //     <button onClick={() => dispatch(deleteCategory(category._id))}className="close">Delete</button>
    // </div>

<>
  <div id="learn-legend">
    <Container>
      <Link to={`/category/${category._id}`}  id='learn-link'>
        <Stack id="learn-stack">
            <button id="stack-card">
              
                <Card.Body id="stack-chapter" > {category.name} </Card.Body>
                {/* <Card.Body id="stack-title">Iepazīšanās</Card.Body> */}
              
              {/* <button onClick={() => dispatch(deleteCategory(category._id))}className="close">Delete</button> */}
            </button>
        </Stack>
      </Link>
    </Container>
</div>
</>
  )
}

export default CategoryItem
