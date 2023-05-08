import * as React from 'react';
import Sidebar from './components/AdminSidebar';
import TestsTable from './components/tables/TestsTable';
import TestForm from './components/forms/TestForm';

function TestPanel() {

  return (
    <>
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ paddingLeft: '10px', width: '100%' }}>
        <TestForm/>
        <TestsTable/>
      </div>
    </div>
    </>
  );
}

export default TestPanel;