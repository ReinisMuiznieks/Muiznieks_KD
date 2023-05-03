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
];

function TestsTable() {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        getExamNames();
        }, [])

    const { user } = useSelector((state) => state.auth)

    const getExamNames = async () => {
        const { data } = await axios.get(`http://localhost:5000/api/tests`, {
        headers: {
            'Authorization': `Bearer ${user.token}`
        },
        },);
        setRows(data);
    }

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

export default TestsTable;