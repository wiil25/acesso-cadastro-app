import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cadastro from '../components/Cadastro';
import Login from '../components/Login';
import Principal from '../components/Principal';
import AdicionarPessoa from '../components/AdicionarPessoa';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/principal" element={<Principal />} />
        <Route path="/adicionar" element={<AdicionarPessoa />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
