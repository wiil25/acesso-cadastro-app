import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Cadastro from './components/Cadastro'; // ou './components/Cadastro.js'
import Adicionar from './components/AdicionarPessoa'; // ou './components/Adicionar.js'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/adicionar" element={<Adicionar />} /> {/* Adicione esta linha */}
      </Routes>
    </Router>
  );
};

export default App;
