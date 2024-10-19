import React, { useState } from 'react'
import { Container, Title } from '../../styles/gerenciar'
import ConsultarManutencaoProgramada from '../ConsultarManutencaoProgramada';
import CadastrarManutencaoForm from '../CadastrarManutencaoForm';

export default function ManutencaoProgramada({ showPopupMessage }) {
  const [activePage, setActivePage] = useState("consultarManutProgramadaVeiculo");
  const [selectedProgramacao, setSelectedProgramacao] = useState(null);
  const [selectedModelo, setSelectedModelo] = useState("");

  const handleProgramacaoSelected = (veiculo) => {
    setSelectedProgramacao(veiculo);
    setActivePage("cadastrarManutProgramadaForm");
  };

  const handleGoToCadastrar = (placa) => {
    setSelectedModelo(placa);

    setActivePage("cadastrarManutProgramadaForm");
  };

  const handleFormSubmitted = () => {
    setActivePage("consultarManutProgramadaVeiculo");
  }; 

  return (
    <Container>
      <Title>Manutenção Programada</Title>

      {activePage === "consultarManutProgramadaVeiculo" && (
        <ConsultarManutencaoProgramada
          showPopupMessage={showPopupMessage}
          onSelectManutencao={handleProgramacaoSelected}
          onGoToCadastrar={handleGoToCadastrar}
        />
      )}

      {activePage === "cadastrarManutProgramadaForm" && (
        <CadastrarManutencaoForm
          showPopupMessage={showPopupMessage}
          onFormSubmitted={handleFormSubmitted}
          veiculo={selectedProgramacao}
          placa={selectedModelo}
          onUserCreated={() => setActivePage("consultarManutProgramadaVeiculo")}
        />
      )}
    </Container>
  )
}
