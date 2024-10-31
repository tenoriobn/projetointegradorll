import { useState } from "react";
import * as C from "../../styles/gerenciar.js";
import CadastrarManutProgramadaForm from "../CadastrarManutProgramadaForm/index.js";
import ConsultarRelatorioManutCorretiva from "../ConsultarRelatorioManutCorretiva/index.js";

const RelatorioManutCorretiva = ({ showPopupMessage }) => {
  const [activePage, setActivePage] = useState("consultarVeiculo");
  const [selectedVeiculo, setSelectedVeiculo] = useState(null);

  const handleVeiculoSelected = (veiculo) => {
    setSelectedVeiculo(veiculo);
    setActivePage("cadastrarManutencaoCorretivaForm");
  };

  const handleFormSubmitted = () => {
    setActivePage("consultarVeiculo");
  };

  return (
    <C.Container>
      <C.Title>Relatório Manutenção Corretiva</C.Title>
      {activePage === "consultarVeiculo" && (
        <ConsultarRelatorioManutCorretiva
          showPopupMessage={showPopupMessage}
          onSelectVeiculo={handleVeiculoSelected}
        />
      )}
      {activePage === "cadastrarManutencaoCorretivaForm" && (
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

export default RelatorioManutCorretiva;
