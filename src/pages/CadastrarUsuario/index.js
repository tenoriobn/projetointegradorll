import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import { createUser, updateUser } from "../../services/userService";
import * as C from "./styles";

const CadastrarUsuario = ({ pessoa, cpf, onUserCreated }) => {
  const [newUser, setNewUser] = useState({
    nome: "",
    cpf: cpf || "",
    rg: "",
    idPessoa: "",
  });
  const [createUserError, setCreateUserError] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (pessoa) {
      setNewUser({
        nome: pessoa.nome,
        cpf: pessoa.cpf,
        rg: pessoa.rg,
        idPessoa: pessoa.idPessoa,
      });
      setIsEditing(true);
    } else if (cpf) {
      setNewUser((prevState) => ({ ...prevState, cpf: cpf }));
      setIsEditing(false);
    }
  }, [pessoa, cpf]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateUser(newUser);
        alert("Usuário atualizado com sucesso!");
      } else {
        await createUser(newUser);
        alert("Usuário criado com sucesso!");
      }
      if (onUserCreated) onUserCreated();
    } catch (error) {
      setCreateUserError(error.message);
    }
  };

  return (
    <C.Content>
      <C.Title>
        {isEditing ? "Editar Usuário" : "Cadastrar Novo Usuário"}
      </C.Title>
      <C.Form onSubmit={handleSubmit}>
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
          readOnly={!!cpf || isEditing}
        />
        <C.Input
          type="text"
          placeholder="RG"
          value={newUser.rg}
          onChange={(e) => setNewUser({ ...newUser, rg: e.target.value })}
          required
        />
        <C.AlignRight>
          <Button
            Text={isEditing ? "Editar Usuário" : "Criar Usuário"}
            Type="submit"
          />
        </C.AlignRight>
        {createUserError && <C.ErrorMessage>{createUserError}</C.ErrorMessage>}
      </C.Form>
    </C.Content>
  );
};

export default CadastrarUsuario;
