import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; // Importando as funções necessárias do Firebase
import { auth } from '../firebase'; // Certifique-se de que 'auth' esteja corretamente exportado

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook para navegar entre as páginas

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Tentando login com:", { email, senha }); // Log dos dados de login
    try {
      // Use a função importada diretamente
      await signInWithEmailAndPassword(auth, email, senha);
      console.log("Login bem-sucedido!"); // Log de sucesso
      navigate('/adicionar'); // Redireciona para a página Adicionar Pessoa após login bem-sucedido
    } catch (error) {
      console.error("Erro ao fazer login:", error); // Log de erro
      setError('Usuário não cadastrado ou senha incorreta.');
    }
  };

  return (
    <div className="app-container" style={{ textAlign: 'center' }}>
      <h1>Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
          required
        />
        <input
          type="password"
          id="senha"
          name="senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Senha"
          required
        />
        <button type="submit">Login</button>
      </form>
      <button onClick={() => navigate('/cadastro')} style={{ marginTop: '10px' }}>
        Cadastre-se
      </button>
    </div>
  );
};

export default Login;
