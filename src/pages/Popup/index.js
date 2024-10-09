import React from "react";
import * as C from "./styles";

const Popup = ({ title, message, type, onClose }) => {
  return (
    <C.PopupOverlay>
      <C.PopupContainer type={type}>
        <C.Title>{title}</C.Title>
        <C.PopupMessage type={type}>{message}</C.PopupMessage>
        <C.CloseButton onClick={onClose}>X</C.CloseButton>
      </C.PopupContainer>
    </C.PopupOverlay>
  );
};

export default Popup;
