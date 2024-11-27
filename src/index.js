import React from 'react';
import ReactDOM from 'react-dom/client';
import './DiagramOrganisasi/styles/index.css';
import StrukturOrganisasiPage from './DiagramOrganisasi/DiagramOrganisasi';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <StrukturOrganisasiPage />
  </React.StrictMode>
);
