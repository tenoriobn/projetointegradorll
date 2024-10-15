import React, { useEffect, useState } from "react";

import {
  createPesrsoAndUser,
  generateUserAndPassword,
  resetPassword,
} from "../../services/userService";

import { searchPessoaIdPessoa } from "../../services/personService";
import * as C from "../../styles/forms";

const CadastrarPessoa = ({ pessoa, cpf, onUserCreated, showPopupMessage }) => {
  const [newPerson, setNewPerson] = useState({
    nome: pessoa ? pessoa.cpf : "",
    cpf: pessoa ? pessoa.cpf : cpf && cpf.trim() !== "" ? cpf : "",
    rg: pessoa ? pessoa.rg : "",
    idPessoa: pessoa ? pessoa.idPessoa : null,
    cargo: pessoa ? pessoa.cargo : "",
    idCargo: pessoa ? pessoa.idCargo : null,
  });
  const [PersonId, setPersonId] = useState(null); // Estado para armazenar o id do usuário
  const [action, setAction] = useState(""); // Estado para armazenar a ação ("gerar" ou "resetar" senha)

  useEffect(() => {
    const fetchUser = async () => {
     

        try {
          const person = await searchPessoaIdPessoa(pessoa.idPessoa);
          setPersonId(person.idPessoa); // Armazena o id da pessoa
          if (pess.idUsuario === null) {
            setAction("generate"); // Ação será "Gerar Senha"
          } else {
            setAction("reset"); // Ação será "Resetar Senha"
          }
        } catch (error) {
          //console.error(error);
          showPopupMessage(
            "Gerenciar Pessoa",
            "Erro ao buscar pessoa.",
            "error"
          );
        }
      } else if (cpf) {
        setNewUser((prevState) => ({ ...prevState, cpf: cpf }));
      }
    };

    fetchUser();
  }, [pessoa, cpf, showPopupMessage]);

  // Lógica para determinar o texto do botão e a ação
  let buttonText;
  let isEditing = false;
  let tituloForm = "";

  if (pessoa) {
    isEditing = true; // Permitindo editar
    if (userId === null) {
      tituloForm = "Gerar Usúario e Senha";
      buttonText = "Gerar Senha"; // Usuário não cadastrado mas pessoa esta cadastrada
    } else if (userId) {
      tituloForm = "Resetar Senha do Usúario";
      buttonText = "Resetar Senha"; // Usuário e pesssoa já cadastrado
    }
  } else if (cpf) {
    // Não há pessoa, somente CPF informado, cadastra-se um novo usuário e pessoa
    tituloForm = "Cadastrar Pessoa";
    buttonText = "Cadastrar Pessoa";
    isEditing = false; // Não permite edição ainda, é um cadastro
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!userId) {
        await createPesrsoAndUser(newUser); //função para criar pessoa e usuario
        showPopupMessage(
          "Gerenciar Usuario",
          "Usuário criado com sucesso!",
          "success"
        );

        //alert("Usuário criado com sucesso!");
        if (onUserCreated) onUserCreated();
      }
    } catch (error) {
      showPopupMessage(
        "Gerenciar Usuario",
        "Erro ao criar usuário. Tente novamente.",
        "error"
      );
      //setCreateUserError(error.message);
    }
  };

  const handlePasswordAction = async () => {
    try {
      if (action === "generate") {
        await generateUserAndPassword(newUser.idPessoa); // funcao para gerar usuario quando a pessoa ja existe
        //alert("Senha gerada com sucesso!");
        showPopupMessage(
          "Gerenciar Usuario",
          "Senha gerada com sucesso!",
          "success"
        );

        if (onUserCreated) onUserCreated();
      } else if (action === "reset") {
        await resetPassword(newUser.idPessoa); // função para resetar senha
        //alert("Senha resetada com sucesso!");
        showPopupMessage(
          "Gerenciar Usuario",
          "Senha resetada com sucesso!",
          "success"
        );
        if (onUserCreated) onUserCreated();
      }
    } catch (error) {
      //alert("Erro ao processar a ação de senha: " + error.message);
      showPopupMessage(
        "Gerenciar Usuario",
        "Erro ao processar a ação de senha." + error.message,
        "error"
      );
    }
  };

  return (
    <C.FormContainer onSubmit={handleSubmit}>
      <C.Title>{tituloForm}</C.Title>
      <C.Row>
        <C.FormGroup>
          <label>Nome:</label>
          <C.Input
            type="text"
            placeholder="Nome"
            value={newUser.nome}
            onChange={(e) => setNewUser({ ...newUser, nome: e.target.value })}
            required
          />
        </C.FormGroup>
      </C.Row>
      <C.Row>
        <C.FormGroup>
          <label>CPF:</label>
          <C.Input
            type="text"
            placeholder="CPF"
            value={newUser.cpf}
            onChange={(e) => setNewUser({ ...newUser, cpf: e.target.value })}
            required
            readOnly={!!cpf || isEditing}
          />
        </C.FormGroup>
        <C.FormGroup>
          <label>Rg:</label>
          <C.Input
            type="text"
            placeholder="RG"
            value={newUser.rg}
            onChange={(e) => setNewUser({ ...newUser, rg: e.target.value })}
            required
          />
        </C.FormGroup>
      </C.Row>

      {/* Se isEditing for true, exibe o botão para gerar ou resetar senha */}
      {isEditing ? (
        <C.SubmitButton type="button" onClick={handlePasswordAction}>
          {buttonText}
        </C.SubmitButton>
      ) : (
        // Se isEditing for false, exibe o botão de submissão do formulário
        <C.SubmitButton type="submit">Cadastrar Usuário</C.SubmitButton>
      )}
    </C.FormContainer>
  );
};

export default CadastrarPessoa;
