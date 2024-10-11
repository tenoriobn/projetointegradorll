import styled from "styled-components";

export const FormContainer = styled.form`
  /* Adicione os estilos desejados */
`;

export const FormGroup = styled.div`
  margin-bottom: 15px;

  label {
    margin-right: 10px;
  }

  input,
  select {
    padding: 8px;
    font-size: 1rem;
  }
`;

export const SubmitButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #45a049;
  }
`;
