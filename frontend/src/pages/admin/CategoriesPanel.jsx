import * as React from 'react';
import Sidebar from './components/AdminSidebar';
import CategoryForm from './components/forms/CategoryForm'
import CategoriesTable from './components/tables/CategoriesTable';

function CategoriesPanel() {

  return (
    <>
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ paddingLeft: '10px', width: '100%' }}>
        <CategoryForm/>
        {/* <CategoriesTable/> */}
      </div>
    </div>
    </>
  );
}

export default CategoriesPanel;