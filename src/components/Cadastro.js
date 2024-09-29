import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';

const Cadastro = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');

    const handleCadastro = async (e) => {
        e.preventDefault();

        // Validações simples
        if (!email || !senha || !nome || !sobrenome || !dataNascimento) {
            alert('Todos os campos devem ser preenchidos!');
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
            const uid = userCredential.user.uid;

            // Tente criar o documento no Firestore
            await setDoc(doc(db, "users", uid), {
                nome,
                sobrenome,
                dataNascimento,
                uid,
            });

            alert('Usuário cadastrado com sucesso!');
        } catch (error) {
            console.error('Erro ao cadastrar:', error);
            alert('Erro ao cadastrar: ' + error.message);
        }
    };

    return (
        <form onSubmit={handleCadastro}>
            <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="E-mail" 
                id="email" 
                name="email" 
            />
            <input 
                type="password" 
                value={senha} 
                onChange={(e) => setSenha(e.target.value)} 
                placeholder="Senha" 
                id="senha" 
                name="senha" 
            />
            <input 
                type="text" 
                value={nome} 
                onChange={(e) => setNome(e.target.value)} 
                placeholder="Nome" 
                id="nome" 
                name="nome" 
            />
            <input 
                type="text" 
                value={sobrenome} 
                onChange={(e) => setSobrenome(e.target.value)} 
                placeholder="Sobrenome" 
                id="sobrenome" 
                name="sobrenome" 
            />
            <input 
                type="date" 
                value={dataNascimento} 
                onChange={(e) => setDataNascimento(e.target.value)} 
                placeholder="Data de Nascimento" 
                id="dataNascimento" 
                name="dataNascimento" 
            />
            <button type="submit">Cadastrar</button>
        </form>
    );
};

export default Cadastro;
