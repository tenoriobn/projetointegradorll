import { useState } from "react";
import ConsultarVeiculo from "../ConsultarVeiculo";
import * as C from "../GerenciarUsuario/styles";

import CadastrarVeiculoForm from "../CadastrarVeiculoForm";

const CadastrarVeiculo = ({ showPopupMessage, onUserCreated }) => {
  const [activePage, setActivePage] = useState("consultarVeiculo");
  const [selectedVeiculo, setSelectedVeiculo] = useState(null);

  const handleVeiculoSelected = (veiculo) => {
    setSelectedVeiculo(veiculo);
    setActivePage("cadastrarVeiculoForm");
  };

  const handleGoToCadastrar = (placa) => {
    setActivePage("cadastrarVeiculoForm");
  };

  const handleFormSubmitted = () => {
    onUserCreated();
    setActivePage("consultarVeiculo");
  };

  return (
    <C.Container>
      <C.Title>Cadastrar Veículo</C.Title>
      {activePage === "consultarVeiculo" && (
        <ConsultarVeiculo
          showPopupMessage={showPopupMessage}
          onSelectVeiculo={handleVeiculoSelected}
          onGoToCadastrar={handleGoToCadastrar}
        />
      )}
      {activePage === "cadastrarVeiculoForm" && (
        <CadastrarVeiculoForm
          showPopupMessage={showPopupMessage}
          onFormSubmitted={handleFormSubmitted}
        />
      )}
    </C.Container>
  );
};

export default CadastrarVeiculo;
