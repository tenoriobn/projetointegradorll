
import React, { useState } from "react";
import Button from "../../components/Button";
import { createUser } from "../../services/userService";
import * as C from "./styles";

const CadastrarUsuario = ({ onUserCreated, fontSize }) => {
  const [newUser, setNewUser] = useState({ nome: "", cpf: "", rg: "" });
  const [createUserError, setCreateUserError] = useState("");

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      await createUser(newUser); // Usando o serviço de criação de usuário
      setNewUser({ nome: "", cpf: "", rg: "" });
      alert("Usuário criado com sucesso!");
      if (onUserCreated) onUserCreated();
    } catch (error) {
      setCreateUserError(error.message);
    }
  };

  return (
    <C.Content style={{ fontSize: fontSize }}>
      <C.Title>Cadastrar Novo Usuário</C.Title>
      <C.Form onSubmit={handleCreateUser} style={{ fontSize: fontSize }}>
        <C.Input
          type="text"
          placeholder="Nome"
          value={newUser.nome}
          onChange={(e) => setNewUser({ ...newUser, nome: e.target.value })}
          required
        />
        <C.Input
          type="text"
          placeholder="CPF"
          value={newUser.cpf}
          onChange={(e) => setNewUser({ ...newUser, cpf: e.target.value })}
          required
        />
        <C.Input
          type="text"
          placeholder="RG"
          value={newUser.rg}
          onChange={(e) => setNewUser({ ...newUser, rg: e.target.value })}
          required
        />
        <C.AlignRight>
          <Button Text="Criar Usuário" Type="submit" />
        </C.AlignRight>
        {createUserError && <C.ErrorMessage>{createUserError}</C.ErrorMessage>}
      </C.Form>
    </C.Content>
  );
};

export default CadastrarUsuario;
