import { useCallback, useEffect, useState } from "react";
import { useUser } from "../../contexts/UserContext";
import {
  cadastrarManutencaoCorretiva,
  searchManutCorretivaIdVeiculo,
} from "../../services/manutencaoService";
import { searchPersonMecanico } from "../../services/personService";
import * as F from "../../styles/forms";

const InputField = ({
  label,
  type,
  value,
  onChange,
  required,
  children,
  name,
}) => (
  <F.FormGroup>
    <label>{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      name={name} // Adicionado o atributo name
    />
    {children}
  </F.FormGroup>
);

const CadastrarManutCorretivaForm = ({
  showPopupMessage,
  onUserCreated,
  veiculo,
}) => {
  const idUsuario = useUser();

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
    idUsuario: null, // Inicialize como null
  });

  // Adicione este useEffect para atualizar o idUsuario quando ele estiver disponível
  useEffect(() => {
    if (idUsuario) {
      setNewManutencao((prev) => ({
        ...prev,
        idUsuario: idUsuario,
      }));
    }
  }, [idUsuario]);

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
      const result = await searchManutCorretivaIdVeiculo(veiculo.idVeiculo);
      setManutencoes(result);
    } catch (error) {
      showPopupMessage("Erro", "Erro ao buscar manutenções", "error");
    }
  }, [veiculo, showPopupMessage]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const buscarMecanicos = async (nome) => {
    try {
      const result = await searchPersonMecanico(nome);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewManutencao((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await cadastrarManutencaoCorretiva(newManutencao);
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
        <F.FormGroup>
          <label>Descrição da Manutenção:</label>
          <input
            type="text"
            name="descricaoManutencao"
            value={newManutencao.descricaoManutencao}
            onChange={handleInputChange}
            required
          />
        </F.FormGroup>

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

      <F.Title>Manutenções :</F.Title>
      {manutencoes.length > 0 ? (
        <F.StyledList>
          {manutencoes.slice(0, 3).map((manutencao) => (
            <F.ListItem key={manutencao.id}>
              <strong>Data:</strong> {manutencao.dataManutencao}
              <strong> KM:</strong> {manutencao.kmManutencao}
              <strong> Descrição:</strong> {manutencao.descricaoManutencao}
              {!manutencao.manutencaoOk ? (
                <F.SubmitButton
                  type="button"
                  onClick={() => {
                    setShowBaixarPopup(true);
                    setNewManutencao(manutencao);
                  }}
                >
                  Baixar
                </F.SubmitButton>
              ) : (
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
    </F.FormContainer>
  );
};

export default CadastrarManutCorretivaForm;
