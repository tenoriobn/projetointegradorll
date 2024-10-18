import React, { useState } from 'react'
import { Container, Title } from '../../styles/gerenciar'
import ConsultarVeiculo from '../ConsultarVeiculo';
import CadastrarVeiculoForm from '../CadastrarVeiculoForm';

export default function ManutencaoCorretiva(showPopupMessage) {
  const [activePage, setActivePage] = useState("consultarManutCorretivaVeiculo");
  const [selectedVeiculo, setSelectedVeiculo] = useState(null);
  const [selectedPlaca, setSelectedPlaca] = useState("");

  const handleVeiculoSelected = (veiculo) => {
    setSelectedVeiculo(veiculo);
    setActivePage("cadastrarManutCorretivaVeiculoForm");
  };

  const handleGoToCadastrar = (placa) => {
    setSelectedPlaca(placa);
    setActivePage("cadastrarManutCorretivaVeiculoForm");
  };

  const handleFormSubmitted = () => {
    setActivePage("consultarManutCorretivaVeiculo");
  };

  return (
    <Container>
      <Title>Manutenção Corretiva</Title>

      {activePage === "consultarManutCorretivaVeiculo" && (
        <ConsultarVeiculo
          showPopupMessage={showPopupMessage}
          onSelectVeiculo={handleVeiculoSelected}
          onGoToCadastrar={handleGoToCadastrar}
        />
      )}

      {activePage === "cadastrarManutCorretivaVeiculoForm" && (
        <CadastrarVeiculoForm
          showPopupMessage={showPopupMessage}
          onFormSubmitted={handleFormSubmitted}
          veiculo={selectedVeiculo}
          placa={selectedPlaca}
          onUserCreated={() => setActivePage("consultarManutCorretivaVeiculo")}
        />
      )}
    </Container>
  )
}
