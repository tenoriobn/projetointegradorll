import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import * as C from "./styles";
import CadastrarUsuario from "../CadastrarUsuario";
import ConsultarPessoa from "../ConsultarPessoa";

const Home = () => {
  const { signout, user } = useAuth();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("home");
  const [fontSize, setFontSize] = useState('16px');

  const handleSignout = () => {
    signout();
  };

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  const handleUserCreated = () => {
    setActivePage("home");
  };

  const increaseFontSize = () => {
    const newSize = parseInt(fontSize) + 2;
    setFontSize(`${newSize}px`);
  };

  const decreaseFontSize = () => {
    const newSize = parseInt(fontSize) - 2;
    if (newSize >= 12) {
      setFontSize(`${newSize}px`);
    }
  };

  const handleUserQueried = (queriedUser) => {
    // Ação a ser realizada após consultar o usuário
    console.log("Usuário consultado:", queriedUser);
  };

  return (
    <C.Container>
      <C.Header>
        <C.Title>MOTOCHEK</C.Title>
        <C.FontControls>
          <C.FontButton onClick={increaseFontSize}>A+</C.FontButton>
          <C.FontButton onClick={decreaseFontSize}>A-</C.FontButton>
        </C.FontControls>
        <C.MenuButton onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}>
          ☰
        </C.MenuButton>
      </C.Header>

      <C.Sidebar  style={{ fontSize: fontSize }}>
        <C.SidebarLink as={Link} to="#" onClick={() => handlePageChange("home")}>
          Home
        </C.SidebarLink>
        <C.SidebarLink as={Link} to="#" onClick={() => handlePageChange("cadastrarUsuario")}>
          Cadastrar Usuário
        </C.SidebarLink>
        <C.SidebarLink as={Link} to="#" onClick={() => handlePageChange("consultarPessoa")}>
          Consultar Pessoa
        </C.SidebarLink>
        <C.SidebarLink as={Link} to="#" onClick={handleSignout}>
          Sair
        </C.SidebarLink>
      </C.Sidebar>

      <C.Main>
        <C.Content style={{ fontSize: fontSize }}>
          {activePage === "home" && (
            <C.UserInfo>
              <h2>Bem-vindo, {user?.usuario}!</h2>
              <p>CPF: {user?.cpf}</p>
            </C.UserInfo>
          )}
          {activePage === "cadastrarUsuario" && (
            <CadastrarUsuario onUserCreated={handleUserCreated} fontSize={fontSize} />
          )} 
          {activePage === "consultarPessoa" && (
            <ConsultarPessoa onUserQueried={handleUserQueried} fontSize={fontSize} />
          )}
        </C.Content>
      </C.Main>
    </C.Container>
  );
};

export default Home;