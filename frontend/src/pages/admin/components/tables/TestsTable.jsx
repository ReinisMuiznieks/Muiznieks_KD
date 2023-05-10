import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Modal, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import {Container} from 'react-bootstrap';

function TestsTable() {
  const { user } = useSelector((state) => state.auth);

  const [data, setData] = useState([]);
  const [editingItem, setEditingItem] = useState({});
  const [showModal, setShowModal] = useState(false);

  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    { field: "testname", headerName: "Test", width: 250 },
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
      .get("http://localhost:5000/api/tests", {
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
      .delete(`http://localhost:5000/api/tests/${item._id}`, {
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
    axios
      .put(`http://localhost:5000/api/tests/${editingItem._id}`, editingItem, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((response) => {
        setData(
          data.map((item) =>
            item._id === editingItem._id ? editingItem : item
          )
        );
        setEditingItem(null);
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
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                value={editingItem?.testname || ''}
                onChange={(event) =>
                  setEditingItem({ ...editingItem, testname: event.target.value })
                }
              />
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

export default TestsTable;