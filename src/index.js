import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import EmployeeTable from './form/EmployeeTable';
import OrgChart from './form/OrgChart';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <OrgChartApp /> */}
    <EmployeeTable />
    <OrgChart />
  </React.StrictMode>
);
