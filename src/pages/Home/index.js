import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import CadastrarUsuario from "../CadastrarUsuario";
import ConsultarPessoa from "../ConsultarPessoa";
import GerenciarUsuario from "../GerenciarUsuario";
import Popup from "../Popup"; // Popup para exibir as mensagens
import * as C from "./styles";

const Home = () => {
  const { signout, user } = useAuth();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("home");
  const [fontSize, setFontSize] = useState("16px");

  // estado para gerenciar a mensagem do popup
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState(""); // Tipo de popup (sucesso ou erro)
  const [popupTitle, setPopupTitle] = useState("");

  const handleSignout = () => {
    signout();
  };

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  const handleUserCreated = () => {
    setActivePage("home");
  };
  const handleGoToCadastrar = () => {
    setActivePage("cadastrarUsuario");
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
    //console.log("Usuário consultado:", queriedUser);
  };

  // Função para exibir o popup
  const showPopupMessage = (title, message, type) => {
    setPopupMessage(message);
    setPopupType(type);
    setPopupTitle(title);
  };

  return (
    <C.Container>
      <C.Header>
        <C.Title>MOTOCHEK</C.Title>
        <C.FontControls>
          <C.FontButton onClick={increaseFontSize}>A+</C.FontButton>
          <C.FontButton onClick={decreaseFontSize}>A-</C.FontButton>
        </C.FontControls>
        <C.MenuButton
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        >
          ☰
        </C.MenuButton>
      </C.Header>

      <C.Sidebar style={{ fontSize: fontSize }}>
        <C.SidebarLink
          as={Link}
          to="#"
          onClick={() => handlePageChange("home")}
        >
          Home
        </C.SidebarLink>

        <C.SidebarLink
          as={Link}
          to="#"
          onClick={() => handlePageChange("gerenciarUsuario")}
        >
          Gerenciar Usuario
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
            <CadastrarUsuario
              onUserCreated={handleUserCreated}
              fontSize={fontSize}
              showPopupMessage={showPopupMessage} // Passando a função de exibir popup
            />
          )}
          {activePage === "consultarPessoa" && (
            <ConsultarPessoa
              onUserQueried={handleUserQueried}
              onGoToCadastrar={handleGoToCadastrar} // Passando a função
              fontSize={fontSize}
            />
          )}
          {activePage === "gerenciarUsuario" && (
            <GerenciarUsuario
              onUserCreated={handleUserCreated}
              fontSize={fontSize}
              showPopupMessage={showPopupMessage}
            />
          )}
        </C.Content>
      </C.Main>

      {/* Exibe o Popup apenas se houver uma mensagem */}
      {popupMessage && (
        <Popup
          title={popupTitle}
          message={popupMessage}
          type={popupType}
          onClose={() => setPopupMessage("")} // Fechar o popup ao clicar no botão de fechar
        />
      )}
    </C.Container>
  );
};

export default Home;
