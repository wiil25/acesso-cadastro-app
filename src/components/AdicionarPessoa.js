import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { setDoc, doc, getDocs, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const AdicionarPessoa = () => {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [pessoas, setPessoas] = useState([]);
  const [mensagem, setMensagem] = useState(''); // Para mensagens de sucesso ou erro
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      navigate('/login');
    }
  }, [navigate]);

  const handleAddPerson = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (user) {
      try {
        await setDoc(doc(db, "users", user.uid, "pessoas", nome + sobrenome), {
          nome,
          sobrenome,
          dataNascimento,
        });
        setMensagem('Pessoa adicionada com sucesso!');
        setNome('');
        setSobrenome('');
        setDataNascimento('');
      } catch (error) {
        setMensagem('Erro ao adicionar pessoa: ' + error.message);
      }
    }
  };

  const handleShowPeople = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        const querySnapshot = await getDocs(collection(db, "users", user.uid, "pessoas"));
        const pessoasList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPessoas(pessoasList);
      } catch (error) {
        setMensagem('Erro ao buscar pessoas: ' + error.message);
      }
    }
  };

  return (
    <div className="app-container" style={{ textAlign: 'center' }}>
      <h1>Adicionar Pessoa</h1>
      {mensagem && <p style={{ color: 'red' }}>{mensagem}</p>}
      <form onSubmit={handleAddPerson}>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome"
          required
        />
        <input
          type="text"
          value={sobrenome}
          onChange={(e) => setSobrenome(e.target.value)}
          placeholder="Sobrenome"
          required
        />
        <input
          type="date"
          value={dataNascimento}
          onChange={(e) => setDataNascimento(e.target.value)}
          required
        />
        <button type="submit">Adicionar</button>
      </form>
      <button onClick={handleShowPeople} style={{ marginTop: '10px' }}>Mostrar Pessoas</button>
      <ul style={{ listStyleType: 'none', padding: 0, marginTop: '20px' }}>
        {pessoas.map((pessoa) => (
          <li key={pessoa.id}>
            {pessoa.nome} {pessoa.sobrenome} - {pessoa.dataNascimento}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdicionarPessoa;
