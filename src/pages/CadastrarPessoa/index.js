import React, { useEffect, useState } from "react";

import {
  generateUserAndPassword,
  resetPassword,
} from "../../services/userService";

import { searchCargo } from "../../services/personService";
import * as C from "../../styles/forms";

const CadastrarPessoa = ({ pessoa, cpf, onUserCreated, showPopupMessage }) => {
  const [cargos, setCargos] = useState([]);
  const [PersonId, setPersonId] = useState(null); // Estado para armazenar o id do usuário
  const [action, setAction] = useState(""); // Estado para armazenar a ação
  const [newPerson, setNewPerson] = useState({
    nome: pessoa ? pessoa.cpf : "",
    cpf: pessoa ? pessoa.cpf : cpf && cpf.trim() !== "" ? cpf : "",
    rg: pessoa ? pessoa.rg : "",
    idPessoa: pessoa ? pessoa.idPessoa : null,
    cargo: pessoa ? pessoa.cargo : "",
    idCargo: pessoa ? pessoa.idCargo : null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Busca modelos e status de veículo
        const cargosResponse = await searchCargo();

        setCargos(cargosResponse);
      } catch (error) {
        showPopupMessage("Erro", "Erro ao carregar dados dos cargos", "error");
      }
    };

    fetchData();
  }, [showPopupMessage]);

  // Lógica para determinar o texto do botão e a ação
  let buttonText;
  let isEditing = false;
  let tituloForm = "";

  if (pessoa) {
    isEditing = true; // Permitindo editar
    tituloForm = "Editar dados Pessoa";
    buttonText = "Editar Pessoa";
  } else if (cpf) {
    // Não há pessoa, somente CPF informado, cadastra-se uma nova e pessoa
    tituloForm = "Cadastrar Pessoa";
    buttonText = "Cadastrar Pessoa";
    isEditing = false; // Não permite edição ainda, é um cadastro
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!PersonId) {
        //await createPesrsoAndUser(newUser); //função para criar pessoa e usuario
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
        await generateUserAndPassword(newPerson.idPessoa); // funcao para gerar usuario quando a pessoa ja existe
        //alert("Senha gerada com sucesso!");
        showPopupMessage(
          "Gerenciar Usuario",
          "Senha gerada com sucesso!",
          "success"
        );

        if (onUserCreated) onUserCreated();
      } else if (action === "reset") {
        await resetPassword(newPerson.idPessoa); // função para resetar senha
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
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPerson((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
            value={newPerson.nome}
            onChange={(e) =>
              setNewPerson({ ...newPerson, nome: e.target.value })
            }
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
            value={newPerson.cpf}
            onChange={(e) =>
              setNewPerson({ ...newPerson, cpf: e.target.value })
            }
            required
            readOnly={!!cpf || isEditing}
          />
        </C.FormGroup>
        <C.FormGroup>
          <label>Rg:</label>
          <C.Input
            type="text"
            placeholder="RG"
            value={newPerson.rg}
            onChange={(e) => setNewPerson({ ...newPerson, rg: e.target.value })}
            required
          />
        </C.FormGroup>
      </C.Row>

      <C.Row>
        <C.FormGroup>
          <label>Cargo:</label>
          <select
            name="idCargo"
            value={newPerson.idCargo}
            onChange={handleInputChange}
            required
          >
            <option value="">Selecione o Cargo</option>
            {cargos.map((cargo) => (
              <option key={cargo.idCargo} value={cargo.cargo}>
                {cargo.cargo}
              </option>
            ))}
          </select>
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
