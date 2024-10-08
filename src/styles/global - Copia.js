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
    font-size: ${({ fontSize }) => fontSize || '16px'}; /* Usando variável de tamanho de fonte */
    transition: font-size 0.3s ease; /* Transição suave ao mudar o tamanho da fonte */
  }

   button, input, select, textarea {
    font-size: inherit;
  }
`;

export default GlobalStyle;
