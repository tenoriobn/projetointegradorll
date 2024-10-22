import styled from "styled-components";

export const PopupTitle = styled.h2`
  margin: 0; /* Remove margens padrão */
  font-size: 1.5rem; /* Tamanho da fonte do título */
  color: #333; /* Cor do texto do título */
  text-align: center; /* Centraliza o texto do título */
`;

export const Popup = styled.div`
  display: flex;
  justify-content: center; /* Centraliza horizontalmente */
  align-items: center; /* Centraliza verticalmente */
  position: fixed; /* Fixa a posição do popup */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* Fundo escurecido */
  z-index: 999; /* Garante que o popup fique acima de outros elementos */
`;
export const PopupContainer = styled.div`
  /* Renomeado para PopupContainer */
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 100%;
  margin: auto;
  z-index: 1000;
`;
