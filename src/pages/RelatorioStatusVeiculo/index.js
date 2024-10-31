import { useState } from "react";
import * as C from "../../styles/gerenciar.js";
import CadastrarManutProgramadaForm from "../CadastrarManutProgramadaForm/index.js";
import ConsultarRelatorioStatusVeiculo from "../ConsultarRelatorioStatusVeiculo/index.js";

const RelatorioStatusVeiculo = ({ showPopupMessage }) => {
  const [activePage, setActivePage] = useState("consultarVeiculo");
  const [selectedVeiculo, setSelectedVeiculo] = useState(null);

  const handleVeiculoSelected = (veiculo) => {
    setSelectedVeiculo(veiculo);
    setActivePage("cadastrarStatusVeiculoForm");
  };

  const handleFormSubmitted = () => {
    setActivePage("consultarVeiculo");
  };

  return (
    <C.Container>
      <C.Title>Relatório de Status dos Veículos</C.Title>
      {activePage === "consultarVeiculo" && (
        <ConsultarRelatorioStatusVeiculo
          showPopupMessage={showPopupMessage}
          onSelectVeiculo={handleVeiculoSelected}
        />
      )}
      {activePage === "cadastrarStatusVeiculoForm" && (
        <CadastrarManutProgramadaForm
          showPopupMessage={showPopupMessage}
          onFormSubmitted={handleFormSubmitted}
          veiculo={selectedVeiculo}
          onUserCreated={() => setActivePage("consultarVeiculo")}
        />
      )}
    </C.Container>
  );
};

export default RelatorioStatusVeiculo;
