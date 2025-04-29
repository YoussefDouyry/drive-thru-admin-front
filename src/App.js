import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './assets/vendor/fonts/boxicons.css';
import './assets/vendor/css/core.css';
import './assets/vendor/css/theme-default.css';
import './assets/css/demo.css';
import './assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css';
import UsersManagement from './components/usersManagement';
import { Route, Router, Routes } from 'react-router-dom';
import Layout from './components/Aside_menu';
import Dashboard from './components/Dashboard';
import ProductsManagement from './components/ProductsManagement';


function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/usersManagement" element={<UsersManagement />} />
          <Route path="/productsManagement" element={<ProductsManagement />} />
          
        </Routes>
      </Layout>
    </>
  );
}

export default App;
