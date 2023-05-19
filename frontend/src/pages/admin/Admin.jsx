import * as React from 'react';
import Sidebar from './components/AdminSidebar';
import './admin.scss'

function AdminPage() {


  return (
    <>
    <div style={{ display: 'flex' }} id='admin-legend'>
      <Sidebar />
      <div style={{ paddingLeft: '10px', width: '100%' }}>
      </div>
    </div>
    </>
  );
}

export default AdminPage;