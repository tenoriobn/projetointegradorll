import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
`;

export const Content = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 5px;
  height: 100 %;
`;

export const Title = styled.h2`
  margin-bottom: 20px;
  text-align: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const Input = styled.input`
  /* Você pode remover os estilos que agora estão no global.js */
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;

// Estilos para alinhamento de botões
export const AlignRight = styled.div`
  display: flex;
  justify-content: flex-end;
`;
