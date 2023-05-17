import * as React from 'react';
import Sidebar from './components/AdminSidebar';
import UsersTable from './components/tables/UsersTable';

function UsersPanel() {

  return (
    <>
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ paddingLeft: '10px', width: '100%' }}>
        {/* <UsersTable/> */}
      </div>
    </div>
    </>
  );
}

export default UsersPanel;