import { useCallback, useEffect, useState } from "react";
import {
  baixarManutencaoProgramada,
  cadastrarManutencaoProgramada,
  searchManutProgIdVeiculo,
} from "../../services/manutencaoService";
import * as F from "../../styles/forms";
import * as P from "../../styles/popapform";

const CadastrarManutProgramadaForm = ({
  showPopupMessage,
  onFormSubmitted,
  veiculo,
  onUserCreated,
}) => {
  const [NewManutencao, setNewManutencao] = useState({
    id: null,
    idVeiculo: veiculo ? veiculo.idVeiculo : null,
    dataManutencao: "",
    dataFeitoManutencao: "",
    kmManutencao: "",
    kmFeitoManutencao: "",
    placa: veiculo ? veiculo.placa : "",
    kmAtual: veiculo ? veiculo.kmAtual : "",
    modelo: veiculo ? veiculo.modelo : "",
    statusVeiculo: veiculo ? veiculo.statusVeiculo : "",
    descricaoManutencao: "",
  });

  const [manutencoes, setManutencoes] = useState([]);
  const [showBaixarPopup, setShowBaixarPopup] = useState(false);
  const [dataFeitoManutencao, setDataFeitoManutencao] = useState("");
  const [kmFeitoManutencao, setKmFeitoManutencao] = useState("");

  const fetchData = useCallback(async () => {
    try {
      if (veiculo) {
        const result = await searchManutProgIdVeiculo(veiculo.idVeiculo);
        setManutencoes(result);
      }
    } catch (error) {
      showPopupMessage("Erro", "Erro ao buscar manutenções", "error");
    }
  }, [veiculo, showPopupMessage]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewManutencao((prevData) => ({
      ...prevData,
      [name]: typeof value === "string" ? value.toUpperCase() : value,
    }));
  };

  const handleBaixarManutencao = async (manutencao) => {
    const manutencaoData = {
      id: manutencao.id,
      dataFeitoManutencao,
      kmFeitoManutencao,
    };
    try {
      await baixarManutencaoProgramada(manutencaoData);
      showPopupMessage("Sucesso", "Manutenção baixada com sucesso!", "success");
      setShowBaixarPopup(false);
      fetchData(); // Recarrega a lista de manutenções
    } catch (error) {
      showPopupMessage("Erro", "Erro ao baixar manutenção", "error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (veiculo) {
        await cadastrarManutencaoProgramada(NewManutencao);
        showPopupMessage(
          "Sucesso",
          "Manutenção agendada com sucesso!",
          "success"
        );
        if (onUserCreated) onUserCreated();
      }
    } catch (error) {
      showPopupMessage("Erro", "Erro ao salvar manutenção", "error");
    }
  };

  return (
    <F.FormContainer onSubmit={handleSubmit}>
      {/* Formulário da manutenção */}
      <F.Title>Agendar Manutenção</F.Title>
      <F.Row>
        <F.FormGroup>
          <label>Modelo:</label>
          <p>{NewManutencao.modelo}</p>
        </F.FormGroup>
        <F.FormGroup>
          <label>Placa:</label>
          <p>{NewManutencao.placa}</p>
        </F.FormGroup>
        <F.FormGroup>
          <label>KM Atual:</label>
          {NewManutencao.kmAtual}
        </F.FormGroup>
      </F.Row>

      <F.Row>
        <F.FormGroup>
          <label>Data da Manutenção:</label>
          <input
            type="date"
            name="dataManutencao"
            value={NewManutencao.dataManutencao}
            onChange={handleInputChange}
            required
          />
        </F.FormGroup>
        <F.FormGroup>
          <label>KM para Manutenção:</label>
          <input
            type="number"
            name="kmManutencao"
            value={NewManutencao.kmManutencao}
            onChange={handleInputChange}
            required
          />
        </F.FormGroup>
      </F.Row>

      <F.Row>
        <F.FormGroup>
          <label>Descrição da Manutenção:</label>
          <input
            type="text"
            name="descricaoManutencao"
            value={NewManutencao.descricaoManutencao}
            onChange={handleInputChange}
            required
          />
        </F.FormGroup>
      </F.Row>

      <F.SubmitButton type="submit">
        {veiculo ? "Cadastrar Manutenção" : "Baixar Veículo"}
      </F.SubmitButton>

      {/* Lista de manutenções agendadas */}
      <F.Title>Manutenções Programadas:</F.Title>
      {manutencoes.length > 0 ? (
        <F.StyledList>
          {manutencoes.slice(0, 3).map((manutencao) => (
            <F.ListItem key={manutencao.id}>
              <strong>Data:</strong> {manutencao.dataManutencao}
              <strong>KM:</strong> {manutencao.kmManutencao}
              <strong>Descrição:</strong> {manutencao.descricaoManutencao}
              {!manutencao.manutencaoOk && (
                <F.SubmitButton
                  type="button"
                  onClick={() => {
                    setShowBaixarPopup(true);
                    setNewManutencao(manutencao);
                  }}
                >
                  Baixar
                </F.SubmitButton>
              )}
              {manutencao.manutencaoOk && (
                <>
                  <strong> Executada em:</strong>
                  {manutencao.dataFeitoManutencao}
                  <strong> KM:</strong>
                  {manutencao.kmFeitoManutencao}
                </>
              )}
            </F.ListItem>
          ))}
        </F.StyledList>
      ) : (
        <p>Não há manutenções agendadas.</p>
      )}

      {/* Popup para baixar manutenção */}
      {showBaixarPopup && (
        <P.Popup>
          <P.PopupContainer>
            <P.PopupTitle>Baixar Manutenção</P.PopupTitle>
            <F.FormGroup>
              <label>Data da Manutenção Feita:</label>
              <input
                type="date"
                value={dataFeitoManutencao}
                onChange={(e) => setDataFeitoManutencao(e.target.value)}
                required
              />
            </F.FormGroup>
            <F.FormGroup>
              <label>KM da Manutenção Feita:</label>
              <input
                type="number"
                value={kmFeitoManutencao}
                onChange={(e) => setKmFeitoManutencao(e.target.value)}
                required
              />
            </F.FormGroup>
            <F.SubmitButton
              onClick={() => handleBaixarManutencao(NewManutencao)}
            >
              Confirmar Baixa
            </F.SubmitButton>
            <F.SubmitButton onClick={() => setShowBaixarPopup(false)}>
              Cancelar
            </F.SubmitButton>
          </P.PopupContainer>
        </P.Popup>
      )}
    </F.FormContainer>
  );
};

export default CadastrarManutProgramadaForm;
