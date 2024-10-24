import { useCallback, useEffect, useState } from "react";
import {
  cadastrarManutencaoProgramada,
  searchManutProgIdVeiculo,
} from "../../services/manutencaoService";
import { searchPersonName } from "../../services/personService";
import * as F from "../../styles/forms";

const InputField = ({ label, type, value, onChange, required, children }) => (
  <F.FormGroup>
    <label>{label}</label>
    <input type={type} value={value} onChange={onChange} required={required} />
    {children}
  </F.FormGroup>
);

const CadastrarManutCorretivaForm = ({
  showPopupMessage,
  onUserCreated,
  veiculo,
}) => {
  const [newManutencao, setNewManutencao] = useState({
    id: null,
    idVeiculo: veiculo ? veiculo.idVeiculo : null,
    dataManutencao: "",
    kmManutencao: "",
    placa: veiculo ? veiculo.placa : "",
    kmAtual: veiculo ? veiculo.kmAtual : "",
    modelo: veiculo ? veiculo.modelo : "",
    descricaoManutencao: "",
    nomeMecanico: "",
    idMecanico: null,
  });

  const [manutencoes, setManutencoes] = useState([]);
  const [showBaixarPopup, setShowBaixarPopup] = useState(false);
  const [dataFeitoManutencao, setDataFeitoManutencao] = useState("");
  const [kmFeitoManutencao, setKmFeitoManutencao] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mecanicos, setMecanicos] = useState([]);
  const [nomeMecanicoBusca, setNomeMecanicoBusca] = useState("");

  const fetchData = useCallback(async () => {
    if (!veiculo) return;

    try {
      const result = await searchManutProgIdVeiculo(veiculo.idVeiculo);
      setManutencoes(result);
    } catch (error) {
      console.error(error);
      showPopupMessage("Erro", "Erro ao buscar manutenções", "error");
    }
  }, [veiculo, showPopupMessage]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const buscarMecanicos = async (nome) => {
    try {
      const result = await searchPersonName(nome);
      setMecanicos(result);
    } catch (error) {
      console.error("Erro ao buscar mecânicos:", error);
    }
  };

  const handleNomeMecanicoChange = (e) => {
    const nome = e.target.value;
    setNomeMecanicoBusca(nome);
    setNewManutencao((prevData) => ({ ...prevData, nomeMecanico: nome }));

    if (nome.length > 2) {
      buscarMecanicos(nome);
    } else {
      setMecanicos([]);
    }
  };

  const handleSelectMecanico = (mecanico) => {
    setNewManutencao((prevData) => ({
      ...prevData,
      nomeMecanico: mecanico.nome,
      idMecanico: mecanico.idPessoa,
    }));
    setNomeMecanicoBusca(mecanico.nome);
    setMecanicos([]);
  };

  const handleInputChange = ({ target: { name, value } }) => {
    setNewManutencao((prevData) => ({
      ...prevData,
      [name]: typeof value === "string" ? value.toUpperCase() : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await cadastrarManutencaoProgramada(newManutencao);
      showPopupMessage(
        "Sucesso",
        "Manutenção agendada com sucesso!",
        "success"
      );
      if (onUserCreated) onUserCreated();
    } catch (error) {
      console.error(error);
      showPopupMessage("Erro", "Erro ao salvar manutenção", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <F.FormContainer onSubmit={handleSubmit}>
      <F.Title>Iniciar Manutenção</F.Title>
      <F.Row>
        <F.FormGroup>
          <label>Modelo:</label>
          <p>{newManutencao.modelo}</p>
        </F.FormGroup>
        <F.FormGroup>
          <label>Placa:</label>
          <p>{newManutencao.placa}</p>
        </F.FormGroup>
        <F.FormGroup>
          <label>KM Atual:</label>
          <p>{newManutencao.kmAtual}</p>
        </F.FormGroup>
      </F.Row>

      <F.Row>
        <InputField
          label="Data da Manutenção:"
          type="date"
          name="dataManutencao"
          value={newManutencao.dataManutencao}
          onChange={handleInputChange}
          required
        />
        <InputField
          label="KM para Manutenção:"
          type="number"
          name="kmManutencao"
          value={newManutencao.kmManutencao}
          onChange={handleInputChange}
          required
        />
      </F.Row>

      <F.Row>
        <InputField
          label="Descrição da Manutenção:"
          type="text"
          name="descricaoManutencao"
          value={newManutencao.descricaoManutencao}
          onChange={handleInputChange}
          required
        />

        <InputField
          label="Nome do Mecânico:"
          type="text"
          name="nomeMecanico"
          value={nomeMecanicoBusca}
          onChange={handleNomeMecanicoChange}
          required
        >
          {mecanicos.length > 0 && (
            <F.AutocompleteDropdown>
              {mecanicos.map((mecanico) => (
                <F.AutocompleteOption
                  key={mecanico.idPessoa}
                  onClick={() => handleSelectMecanico(mecanico)}
                >
                  {mecanico.nome}
                </F.AutocompleteOption>
              ))}
            </F.AutocompleteDropdown>
          )}
        </InputField>
      </F.Row>

      <F.SubmitButton type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Cadastrando..." : "Cadastrar Manutenção"}
      </F.SubmitButton>
    </F.FormContainer>
  );
};

export default CadastrarManutCorretivaForm;
