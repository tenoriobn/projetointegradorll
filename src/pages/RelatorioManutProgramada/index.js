import { useState } from "react";
import * as C from "../../styles/gerenciar.js";
import CadastrarManutProgramadaForm from "../CadastrarManutProgramadaForm/index.js";
import ConsultarRelatorioManutProgramada from "../ConsultarRelatorioManutProgramada/index.js";

const RelatorioManutProgramada = ({ showPopupMessage }) => {
  const [activePage, setActivePage] = useState("consultarVeiculo");
  const [selectedVeiculo, setSelectedVeiculo] = useState(null);

  const handleVeiculoSelected = (veiculo) => {
    setSelectedVeiculo(veiculo);
    setActivePage("cadastrarManutencaoProgramadaForm");
  };

  const handleFormSubmitted = () => {
    setActivePage("consultarVeiculo");
  };

  return (
    <C.Container>
      <C.Title>Relatório Manutenção Programada</C.Title>
      {activePage === "consultarVeiculo" && (
        <ConsultarRelatorioManutProgramada
          showPopupMessage={showPopupMessage}
          onSelectVeiculo={handleVeiculoSelected}
        />
      )}
      {activePage === "cadastrarManutencaoProgramadaForm" && (
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

export default RelatorioManutProgramada;
