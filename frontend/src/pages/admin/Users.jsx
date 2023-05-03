import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import NavbarTop from '../../components/navbar/Navbar';
import axios from 'axios'
import { useSelector } from 'react-redux';
import { useEffect } from "react";
import { useState } from 'react';

const columns = [
  { field: '_id', headerName: 'ID', width: 100 },
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
    editable: false,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 150,
    editable: false,
  },
  {
    field: 'role',
    headerName: 'Role',
    width: 150,
    editable: true,
  },
];

function UsersTable() {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        getExamNames();
        }, [])

    const { user } = useSelector((state) => state.auth)

    const getExamNames = async () => {
        const { data } = await axios.get(`http://localhost:5000/api/users`, {
        headers: {
            'Authorization': `Bearer ${user.token}`
        },
        },);
        setRows(data);
    }

    console.log(rows);
  return (
    <>
    <Box sx={{ height: 400, width: '100%' }}>
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
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
    </>
  );
}

export default UsersTable;