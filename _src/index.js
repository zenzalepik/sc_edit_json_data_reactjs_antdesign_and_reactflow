import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import OrgChartApp from './form/OrgChartApp';
import EmployeeTable from './form/EmployeeTable';
import StrukturOrganisasiPage from './page';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <StrukturOrganisasiPage />
  </React.StrictMode>
);
