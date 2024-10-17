import { useState } from "react";
import * as C from "../../styles/gerenciar";
import CadastrarVeiculoForm from "../CadastrarVeiculoForm";
import ConsultarModeloVeiculo from "../ConsultarModeloVeiculo";

const CadastrarModelo = ({ showPopupMessage }) => {
  const [activePage, setActivePage] = useState("consultarModeloVeiculo");
  const [selectedModelo, setSelectedModelo] = useState(null);

  const handleModeloSelected = (modelo) => {
    setSelectedModelo(modelo); // E aqui
    setActivePage("cadastrarVeiculoForm");
  };

  const handleFormSubmitted = () => {
    setActivePage("consultarModeloVeiculo"); // Corrigido aqui
  };

  const handleGoToCadastrar = (modelo) => {
    setSelectedModelo(modelo);
    setActivePage("cadastrarModeloForm");
  };

  return (
    <C.Container>
      <C.Title>Cadastrar Modelo de Veículo</C.Title>
      {activePage === "consultarModeloVeiculo" && (
        <ConsultarModeloVeiculo
          showPopupMessage={showPopupMessage}
          onSelectVeiculo={handleModeloSelected}
          onGoToCadastrar={handleGoToCadastrar}
        />
      )}
      {activePage === "cadastrarVeiculoForm" && (
        <CadastrarVeiculoForm
          showPopupMessage={showPopupMessage}
          onFormSubmitted={handleFormSubmitted}
          veiculo={selectedModelo}
          onUserCreated={() => setActivePage("consultarModeloVeiculo")}
        />
      )}
    </C.Container>
  );
};

export default CadastrarModelo;
