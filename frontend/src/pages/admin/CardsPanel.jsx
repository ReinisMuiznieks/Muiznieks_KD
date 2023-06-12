import * as React from 'react';
import Sidebar from './components/AdminSidebar';
import CardForm from './components/forms/CardForm';
import CardsTable
 from './components/tables/CardsTable';
function CardsPanel() {

  return (
    <>
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ paddingLeft: '200px', width: '100%' }}>
        <CardForm/>
        <CardsTable/>
      </div>
    </div>
    </>
  );
}

export default CardsPanel;