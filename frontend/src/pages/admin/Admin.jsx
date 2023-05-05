import * as React from 'react';
import NavbarTop from '../../components/navbar/Navbar';
import TestsTable from './Tests'; 
import UsersTable from './Users';


function AdminPage() {


  return (
    <>
    <NavbarTop/>
    <TestsTable/>   
    {/* <UsersTable/> */}
    </>
  );
}

export default AdminPage;