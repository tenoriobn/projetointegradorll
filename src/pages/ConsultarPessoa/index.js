import React, { useEffect, useState } from "react";
import {
  searchPersonCpf,
  searchPersonName,
} from "../../services/personService";
import * as C from "./styles";

const validarCPF = (cpf) => {
  return /^\d{11}$/.test(cpf);
};

const ConsultarPessoa = ({ onSelectPessoa, onGoToCadastrar }) => {
  const [nome, setNome] = useState("");
  const [pessoas, setPessoas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [consultaPessoaError, setconsultaPessoaError] = useState("");

  useEffect(() => {
    const fetchPessoas = async () => {
      if (nome.length > 2) {
        setLoading(true);
        try {
          const result = /^\d+$/.test(nome)
            ? await searchPersonCpf(nome)
            : await searchPersonName(nome);
          setPessoas(result);
        } catch (error) {
          setconsultaPessoaError(error.message);
        }
        setLoading(false);
      } else {
        setPessoas([]);
      }
    };

    if (nome.length > 2) fetchPessoas();
  }, [nome]);

  return (
    <C.Container>
      <C.Input
        type="text"
        placeholder="Digite o nome ou CPF"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      {consultaPessoaError && (
        <C.ErrorMessage>{consultaPessoaError}</C.ErrorMessage>
      )}
      {loading && <p>Carregando...</p>}
      <C.List>
        {pessoas.map((pessoa) => (
          <C.ListItem
            key={pessoa.idPessoa}
            onClick={() => onSelectPessoa(pessoa)}
          >
            <p>{pessoa.nome}</p>
            <p>{pessoa.cpf}</p>
          </C.ListItem>
        ))}
      </C.List>
      {pessoas.length === 0 && !loading && validarCPF(nome) && (
        <C.ListItem onClick={() => onGoToCadastrar(nome)}>
          <p>Nenhuma pessoa encontrada. Clique aqui para cadastrar {nome} .</p>
        </C.ListItem>
      )}
    </C.Container>
  );
};

export default ConsultarPessoa;
