import styled from "styled-components";

export const Container = styled.div`
  padding: 10px;
  max-width: 100%;
  margin: 0 auto;
`;

export const Input = styled.input`
  padding: 10px;
`;

export const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;

export const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin: 0.8% 0;
  cursor: pointer;

  &:hover {
    background-color: #ececec;
  }

  p {
    margin: 0;
  }
`;
export const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;
export const NoResultsContainer = styled.div`
  padding: 10px;
  max-width: 100%;
  margin: 0 auto;
`;
