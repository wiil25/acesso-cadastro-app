import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Principal = () => {
  const [pessoas, setPessoas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchPessoas = async () => {
    const user = auth.currentUser; // Pega o usuário autenticado
    if (user) {
      const pessoasRef = collection(db, `users/${user.uid}/pessoas`);
      const snapshot = await getDocs(pessoasRef);
      const pessoasList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPessoas(pessoasList);
    } else {
      navigate('/login'); // Redireciona para a página de login se o usuário não estiver autenticado
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPessoas();
  }, []);

  return (
    <div className="app-container">
      <h1>Bem-vindo!</h1>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <>
          <h2>Pessoas Adicionadas</h2>
          <button onClick={fetchPessoas}>Mostrar Pessoas</button>
          <ul>
            {pessoas.map(pessoa => (
              <li key={pessoa.id}>
                {pessoa.nome} {pessoa.sobrenome} - {pessoa.dataNascimento}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Principal;
