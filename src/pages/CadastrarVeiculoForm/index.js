import React, { useEffect, useState } from "react";
import {
  cadastrarVeiculo,
  searchModelos,
  searchStatusVeiculo,
} from "../../services/veiculoService";
import * as F from "./styles";

const CadastrarVeiculoForm = ({ showPopupMessage, onFormSubmitted }) => {
  const [formData, setFormData] = useState({
    ano: 2022,
    placa: "",
    dataAquisicao: "",
    distanciaDiaria: 0,
    idModelo: "",
    idVeiculoStatus: "",
    idUsuario: 2,
    vidaUtilKm: 100000,
    kmAtual: 0,
  });

  const [modelos, setModelos] = useState([]);
  const [veiculoStatusList, setVeiculoStatusList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const modelosResponse = await searchModelos();
        const statusResponse = await searchStatusVeiculo();
      

        setModelos(modelosResponse);
        setVeiculoStatusList(statusResponse);
      } catch (error) {
        showPopupMessage(
          "Erro",
          "Erro ao carregar dados de modelos ou status",
          "error"
        );
      }
    };
    fetchData();
  }, [showPopupMessage]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await cadastrarVeiculo(formData);
      showPopupMessage("Sucesso", "Veículo cadastrado com sucesso!", "success");
      onFormSubmitted(); // Chama função de callback para redirecionar ou executar outra ação
    } catch (error) {
      showPopupMessage("Erro", "Erro ao cadastrar veículo", "error");
    }
  };

return (
<F.FormContainer onSubmit={handleSubmit}>
  <F.Row>
  <F.FormGroup>
      <label>Placa:</label>
      <input
        type="text"
        name="placa"
        value={formData.placa}
        onChange={handleInputChange}
        required
      />
    </F.FormGroup>
    <F.FormGroup>
      <label>Ano:</label>
      <input
        type="number"
        name="ano"
        value={formData.ano}
        onChange={handleInputChange}
        required
      />
    </F.FormGroup>
    
    <F.FormGroup>
      <label>Data de Aquisição:</label>
      <input
        type="date"
        name="dataAquisicao"
        value={formData.dataAquisicao}
        onChange={handleInputChange}
        required
      />
    </F.FormGroup>
    
  </F.Row>

  <F.Row>
  <F.FormGroup>
      <label>Modelo:</label>
      <select
        name="idModelo"
        value={formData.idModelo}
        onChange={handleInputChange}
        required
      >
        <option value="">Selecione o Modelo</option>
        {modelos.map((modelo) => (
          <option key={modelo.idModelo} value={modelo.idModelo}>
            {modelo.modelo}
          </option>
        ))}
      </select>
    </F.FormGroup>
    
    
    <F.FormGroup>
      <label>Status do Veículo:</label>
      <select
        name="idVeiculoStatus"
        value={formData.idVeiculoStatus}
        onChange={handleInputChange}
        required
      >
        <option value="">Selecione o Status</option>
        {veiculoStatusList.map((status) => (
          <option key={status.idVeiculoStatus} value={status.idVeiculoStatus}>
            {status.statusVeiculo}
          </option>
        ))}
      </select>
    </F.FormGroup>
  </F.Row>

  <F.Row>
  <F.FormGroup>
      <label>KM Atual:</label>
      <input
        type="number"
        name="kmAtual"
        value={formData.kmAtual}
        onChange={handleInputChange}
        required
      />
    </F.FormGroup>
  
    <F.FormGroup>
      <label>Vida Útil (km):</label>
      <input
        type="number"
        name="vidaUtilKm"
        value={formData.vidaUtilKm}
        onChange={handleInputChange}
        required
      />
    </F.FormGroup>
    <F.FormGroup>
      <label>Distância Diária (km):</label>
      <input
        type="number"
        name="distanciaDiaria"
        value={formData.distanciaDiaria}
        onChange={handleInputChange}
        required
      />
    </F.FormGroup>
    
  </F.Row>

  <F.SubmitButton type="submit">Cadastrar Veículo</F.SubmitButton>
</F.FormContainer>

  );
};

export default CadastrarVeiculoForm;
