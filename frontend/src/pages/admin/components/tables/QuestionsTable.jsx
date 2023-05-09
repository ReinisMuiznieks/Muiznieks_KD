import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Modal, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import {Container} from 'react-bootstrap';

function QuestionsTable() {
  const { user } = useSelector((state) => state.auth);

  const [data, setData] = useState([]);
  const [editingItem, setEditingItem] = useState({});
  const [showModal, setShowModal] = useState(false);

  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    { field: "question", headerName: "Question", width: 250 },
    {
      field: "options",
      headerName: "Options",
      width: 250,
      renderCell: (params) => {
        const options = params.value.map((option) => option.option);
        const correctOption = params.value.find((option) => option.isCorrect)?.option;
      
        if (options.length === 0) {
          return "";
        } else if (options.length === 1) {
          return options[0];
        } else {
          const displayOptions = options.map((option) =>
            option === correctOption ? `[${option}]` : option
          );
          return `${displayOptions.join(", ")}`;
        }
      },
    },      
    {
        field: "test",
        headerName: "Test",
        width: 250,
        renderCell: (params) => params.value ? params.value.testname || '' : '',
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 250,
      renderCell: (params) => {
        const onClickEdit = () => handleEdit(params.row);
        const onClickDelete = () => handleDelete(params.row);
        return (
          <>
            <Button variant="primary" onClick={onClickEdit}>
              Edit
            </Button>{" "}
            <Button variant="danger" onClick={onClickDelete} className='m-2'>
              Delete
            </Button>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/questions", {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
      
  }, []);


  const handleEdit = (item) => {
    setEditingItem(item);
    setShowModal(true);
  };

  const handleDelete = (item) => {
    axios
      .delete(`http://localhost:5000/api/questions/${item._id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((response) => {
        setData(data.filter((i) => i._id !== item._id));
      })
      .catch((error) => {
        console.error(error);
      });
  };

const handleSave = (event) => {
  event.preventDefault();
  const updatedItem = { ...editingItem };
  axios
    .put(`http://localhost:5000/api/questions/${editingItem._id}`, updatedItem, {
      headers: { Authorization: `Bearer ${user.token}` },
    })
    .then((response) => {
      setData(
        data.map((item) =>
          item._id === editingItem._id ? updatedItem : item  
        )
      );
      console.log(updatedItem);
      console.log(data);
      setEditingItem({});
      setShowModal(false);
    })
    .catch((error) => {
      console.error(error);
    });
};


  const handleCancel = () => {
    setEditingItem({});
    setShowModal(false);
  };
  const handleOptionChange = (index, value) => {
    const newOptions = [...editingItem.options];
    newOptions[index] = { ...newOptions[index], option: value };
    setEditingItem((prev) => ({ ...prev, options: newOptions }));
  };
  
  
  

  
  return (
    <Container className='pt-5'>
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={data}
        getRowId={(row) => row._id}
        columns={columns}
        pageSize={5}
        components={{
          Toolbar: GridToolbar,
        }}
        disableRowSelectionOnClick
      />
<Modal show={showModal} onHide={handleCancel}>
  <Modal.Header closeButton>
    <Modal.Title>Edit Item</Modal.Title>
  </Modal.Header>
  <Form onSubmit={handleSave}>
    <Modal.Body>
      <Form.Group controlId="formItemName">
        <Form.Label>Question:</Form.Label>
        <Form.Control
          type="text"
          value={editingItem?.question || ''}
          onChange={(event) =>
            setEditingItem({ ...editingItem, question: event.target.value })
          }
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Options:</Form.Label>
        {editingItem?.options?.map((option, index) => (
          <Form.Control
            key={option._id}
            type="text"
            value={option.option}
            onChange={(event) => handleOptionChange(index, event.target.value)}
            className={option.isCorrect ? 'font-weight-bold' : ''}
          />
        ))}
      </Form.Group>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleCancel}>
        Cancel
      </Button>
      <Button variant="primary" type="submit">
        Save
      </Button>
    </Modal.Footer>
  </Form>
</Modal>

    </div>
    </Container>
  );
}

export default QuestionsTable;
