import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import NavbarTop from '../../components/navbar/Navbar';
import axios from 'axios'
import { useSelector } from 'react-redux';
import { useEffect } from "react";
import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/esm/Container';

function TestsTable() {
    const [rows, setRows] = useState([]);
    const { user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [showDelete, setShowDelete] = useState(true);
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true);
    
    useEffect(() => {
      if(!user){
          navigate('/sign-up')
      }

      if(user.role !== 'admin'){
          navigate('/')
      }
  }, [user, navigate])

    useEffect(() => {
        getExamNames();
        }, [])

    const getExamNames = async () => {
        const { data } = await axios.get(`http://localhost:5000/api/tests`, {
        headers: {
            'Authorization': `Bearer ${user.token}`
        },
        },);
        setRows(data);
    }

    const handleCellClick = (param, event) => {
      event.stopPropagation();
    }

    const columns = [
      { field: '_id', headerName: 'ID', width: 100 },
      {
        field: 'testname',
        headerName: 'Test',
        width: 150,
        editable: true,
      },
      {
        field: 'createdAt',
        headerName: 'Created',
        width: 150,
        editable: false,
      },
      {
        field: 'Delete',
        headerName: 'Delete',
        renderCell: (cellValues) => {
          return (
            <button onClick={(event) => {deleteTest(cellValues)}}>
              Delete
            </button>
          )
        }
      },
      {
        field: 'Edit',
        headerName: 'Edit',
        renderCell: (cellValues) => {
          return (
            <button onClick={(event) => {updateTest(event, cellValues);}}>
              Edit
            </button>
          )
        }
      },
    ];
    
    const deleteTest = (event, cellValues) => {
      axios.delete(`http://localhost:5000/api/tests/${cellValues.id}`, 
          {headers: {'Authorization': `Bearer ${user.token}`}},
          ).then((response) => {
              console.log(response.data);
          });
      window.location.reload();
    }

    const updateTest = (event, cellValues) => {
      const newData = {
        testname: cellValues.testname
      }
      axios.put(`http://localhost:5000/api/tests/${cellValues.id}`,newData,
          {headers: {'Authorization': `Bearer ${user.token}`}},
          ).then((response) => {
              console.log(response.data);
          });
      // window.location.reload();
    }


  return (
    <>
    <Container className='mt-5'>
    <Box sx={{ height: 400, width: '100%',
    borderColor: 'primary.light',
    '& .MuiDataGrid-cell:hover': {
      color: 'primary.main',
    },}}>
      <DataGrid
        getRowId={(row) => row._id}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        // checkboxSelection
        disableRowSelectionOnClick
        onCellClick={handleCellClick}
      />
      
    </Box>
    </Container>
    
    </>
  );
}

export default TestsTable;