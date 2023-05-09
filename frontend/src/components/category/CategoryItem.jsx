import React from "react";
import '../../pages/category/category.scss';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";

function CategoryItem({category}) {

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
        </Stack>
    </Container>
  </div>
</>
  )
}

export default CategoryItem
