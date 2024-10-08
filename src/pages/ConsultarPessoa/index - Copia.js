import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchPersonName, searchPersonCpf } from '../../services/personService'
import * as C from './styles';

const ConsultarPessoa = () => {
  const [nome, setNome] = useState('');
  const [pessoas, setPessoas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [createUserError, setCreateUserError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPessoas = async () => {
      if (nome.length > 2) {
        setLoading(true);
        try {
           // Verifica se é uma string composta apenas por números (tratado como CPF)
          if (/^\d+$/.test(nome)) {
            // Se for uma string de números, trata como CPF
            const result = await searchPersonCpf(nome);
            setPessoas(result);
          } else {
            // Se não for uma string de números, trata como nome
            const result = await searchPersonName(nome);
            setPessoas(result);
          }
            
          } catch (error) {
            setCreateUserError(error.message);
            setPessoas([]);
          }
        setLoading(false);
      } else {
        setPessoas([]);
      }
    };

    fetchPessoas();
  }, [nome]);

  const handleClick = (idPessoa) => {
    navigate(`/editar/${idPessoa}`);
  };

  return (
    <C.Container>
      <C.Input
        type="text"
        placeholder="Digite o nome ou cpf(somente números) para buscar"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      {loading && <p>Carregando...</p>}
      {createUserError && <C.ErrorMessage>{createUserError}</C.ErrorMessage>}
      <C.List>
        {pessoas.map((pessoa) => (
          <C.ListItem key={pessoa.idPessoa} onClick={() => handleClick(pessoa.idPessoa)}>
            <p>{pessoa.nome}</p>
            <p>{pessoa.cpf}</p>
          </C.ListItem>
        ))}
      </C.List>
    </C.Container>
  );
};

export default ConsultarPessoa;
