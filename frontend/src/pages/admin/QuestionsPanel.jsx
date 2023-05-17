import * as React from 'react';
import Sidebar from './components/AdminSidebar';
import QuestionForm from './components/forms/QuestionForm';
import QuestionsTable from './components/tables/QuestionsTable';

function QuestionsPanel() {

  return (
    <>
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ paddingLeft: '10px', width: '100%' }}>
        <QuestionForm/>
        {/* <QuestionsTable/> */}
      </div>
    </div>
    </>
  );
}

export default QuestionsPanel;