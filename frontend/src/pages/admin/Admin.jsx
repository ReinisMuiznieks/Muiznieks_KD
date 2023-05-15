import * as React from 'react';
import NavbarTop from '../../components/navbar/Navbar';
// import TestsTable from './TestsTable'; 
// import UsersTable from './UsersTable';
import Sidebar from './components/AdminSidebar';
import './admin.scss'

function AdminPage() {


  return (
    <>
    <div style={{ display: 'flex' }} id='admin-legend'>
      <Sidebar />
      <div style={{ paddingLeft: '10px', width: '100%' }}>
        {/* <TestsTable />
        <UsersTable /> */}
      </div>
    </div>
    </>
  );
}

export default AdminPage;