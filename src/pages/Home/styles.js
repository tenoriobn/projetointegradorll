import styled from "styled-components";
import { Link } from "react-router-dom"; // Import Link do react-router-dom

export const Container = styled.div`
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main";
  grid-template-columns: 250px 1fr;
  grid-template-rows: 60px 1fr;
  height: 100vh;

  @media (max-width: 768px) {
    grid-template-areas:
      "header"
      "main";
    grid-template-columns: 1fr;
    grid-template-rows: 60px 1fr;
  }
`;


export const Main = styled.main`
  grid-area: main;
  padding: 20px;
  overflow-y: auto;
`;

export const Title = styled.h1`
  font-size: 18px;
  margin: 0;
`;

export const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;


export const Content = styled.div`
  height: 100 %;
  padding: 5px;
  
 
`;

export const UserInfo = styled.div`
  margin-bottom: 20px;
`;

export const LogoutButton = styled.button`
  background-color: #046ee5;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;

  &:hover {
    background-color: #0356b3;
  }
`;

export const SidebarLink = styled(Link)`
  text-decoration: none;
  color: #000;
  padding: 10px 0;
  display: block;
  &:hover {
    color: #046ee5;
  }
`;
export const Sidebar = styled.nav`
  width: 250px;
  background-color: #fff;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 100%; /* Sidebar ocupa 100% da largura em telas pequenas */
    display: none; /* Esconde a sidebar por padrão */
  }

  &.active {
    display: block; /* Adiciona classe para mostrar sidebar ao ativá-la */
  }
`;

export const Header = styled.header`
  grid-area: header;
  background-color: #046ee5;
  color: white;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const FontControls = styled.div`
  display: flex;
  gap: 10px;
`;

export const FontButton = styled.button`
  background-color: white;
  color: #046ee5;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;

  &:hover {
    background-color: #e0e0e0;
  }
`;