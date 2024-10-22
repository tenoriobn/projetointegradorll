import styled from "styled-components";

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.1rem; /* Espaçamento entre os grupos de linhas */
  margin-top: 5vh; /* Espaço no topo usando 5% da altura da viewport */
  width: 100%;
  max-width: 1200px; /* Limita a largura máxima para telas grandes */
  margin-left: auto;
  margin-right: auto;
`;

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap; /* Permite que os campos quebrem para a próxima linha se necessário */
  gap: 1.5rem; /* Espaçamento entre os campos */

  @media (max-width: 768px) {
    flex-direction: column; /* Em telas menores, os campos ficam em coluna */
    gap: 1rem; /* Reduz o espaçamento entre os campos em telas menores */
  }
`;
export const Input = styled.input`
  /* estilos que agora estão no global.js */
`;

export const FormGroup = styled.div`
  flex: 1; /* Faz com que os campos se expandam igualmente */
  min-width: 200px; /* Define uma largura mínima para os campos */
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column; /* Coloca o label acima do input */

  label {
    margin-bottom: 0.1rem; /* Espaçamento entre o label e o input */
  }

  input,
  select {
    width: 100%; /* Certifica-se de que os inputs e selects ocupem toda a largura disponível */
  }

  @media only screen and(max-width: 768px) {
    min-width: 100%; /* Em telas menores, os campos ocupam toda a largura */
  }
`;

export const SubmitButton = styled.button`
  width: auto; /* Botão com largura automática */
  padding: 0.8rem 1.5rem; /* Padding ajustado */
  align-self: flex-end; /* Alinha o botão à direita */
`;

export const Title = styled.h2``;

// Estilo para a lista (ul)
export const StyledList = styled.ul`
  list-style-type: none; /* Remove bullets */
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(
    3,
    1fr
  ); /* Cria três colunas de largura igual */
  gap: 1rem; /* Espaçamento entre os itens */

  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* Em telas menores, cada item ocupa uma linha */
  }
`;

// Estilo para os itens da lista (li)
export const ListItem = styled.li`
  background-color: #f9f9f9;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  display: flex;
  flex-direction: column;

  /* Se você quiser que os valores fiquem alinhados horizontalmente, ajuste isso */
  @media (max-width: 768px) {
    /* Em telas menores, os itens ocupam toda a largura da tela */
    display: block;
  }

  strong {
    display: block;
    margin-bottom: 0.5rem;
  }
`;
