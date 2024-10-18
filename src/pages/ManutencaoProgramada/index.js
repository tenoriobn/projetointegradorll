import React, { useState } from 'react'
import { Container, Title } from '../../styles/gerenciar'
import ConsultarVeiculo from '../ConsultarVeiculo';
import CadastrarVeiculoForm from '../CadastrarVeiculoForm';

export default function ManutencaoCorretiva(showPopupMessage) {
  const [activePage, setActivePage] = useState("consultarManutProgramadaVeiculo");
  const [selectedVeiculo, setSelectedVeiculo] = useState(null);
  const [selectedPlaca, setSelectedPlaca] = useState("");

  const handleVeiculoSelected = (veiculo) => {
    setSelectedVeiculo(veiculo);
    setActivePage("cadastrarManutProgramadaVeiculoForm");
  };

  const handleGoToCadastrar = (placa) => {
    setSelectedPlaca(placa);
    setActivePage("cadastrarManutProgramadaVeiculoForm");
  };

  const handleFormSubmitted = () => {
    setActivePage("consultarManutProgramadaVeiculo");
  };

  return (
    <Container>
      <Title>Manutenção Programada</Title>

      {activePage === "consultarManutProgramadaVeiculo" && (
        <ConsultarVeiculo
          showPopupMessage={showPopupMessage}
          onSelectVeiculo={handleVeiculoSelected}
          onGoToCadastrar={handleGoToCadastrar}
        />
      )}

      {activePage === "cadastrarManutProgramadaVeiculoForm" && (
        <CadastrarVeiculoForm
          showPopupMessage={showPopupMessage}
          onFormSubmitted={handleFormSubmitted}
          veiculo={selectedVeiculo}
          placa={selectedPlaca}
          onUserCreated={() => setActivePage("consultarManutProgramadaVeiculo")}
        />
      )}
    </Container>
  )
}
