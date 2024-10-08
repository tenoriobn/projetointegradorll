import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    width: 100vw;
    height: 100vh;
    background-color: #f0f2f5;
    font-family: Arial, Helvetica, sans-serif;
    font-size: ${({ fontSize }) => fontSize || "13px"};
    transition: font-size 0.3s ease;
  }

  button, input, select, textarea {
    font-size: inherit; // Mantém a herança do tamanho da fonte do body
    padding: 10px; // Define um padding padrão
    border: 1px solid #ccc; // Borda padrão
    border-radius: 5px; // Bordas arredondadas
  }

  input {
    background-color:  #f8f9fc; // Cor de fundo dos inputs
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
  }

  button {
    background-color: #046ee5; // Cor de fundo dos botões
    color: white; // Cor do texto dos botões
    cursor: pointer; // Mudança de cursor ao passar o mouse
  }

  button:hover {
    background-color: #0356b3; // Cor do botão ao passar o mouse
  }

  h2{
  font-size: inherit;};
  }
`;

export default GlobalStyle;
