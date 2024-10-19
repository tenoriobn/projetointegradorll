import React, { useEffect, useState } from "react";
import { useUser } from "../../contexts/UserContext";
import {
  atualizarVeiculo,
  cadastrarManutencaoProgramada,
  searchModelos,
  searchStatusVeiculo,
  searchVeiculoModelo,
  searchVeiculoPlaca,
} from "../../services/veiculoService";
import * as F from "./../../styles/forms";

const CadastrarManutencaoForm = ({
  showPopupMessage,
  onFormSubmitted,
  veiculo,
  placa,
  onUserCreated,
}) => {
  const [modelos, setModelos] = useState([]);
  const [veiculoStatusList, setVeiculoStatusList] = useState([]);
  const idUsuario = useUser(); // Acessando o idUsuario do contexto
  const [veiculos, setVeiculos] = useState([]);

  console.log('placa: ', placa)

  // Inicializa NewVeiculo com base na presença do veiculo
  const [NewVeiculo, setNewVeiculo] = useState({
    idVeiculo: veiculo ? veiculo.idVeiculo : null,
    dataManutencao: veiculo ? veiculo.dataManutencao : "",
    kmManutencao: veiculo ? veiculo.kmManutencao : "",
    placa: veiculo ? veiculo.placa : placa && placa.trim() !== "" ? placa : "", // Inicializa com a placa se fornecida
    kmAtual: veiculo ? veiculo.kmAtual : "",
    modelo: veiculo ? veiculo.modelo : "",
    statusVeiculo: veiculo ? veiculo.statusVeiculo : "",
    idUsuario: idUsuario,
    descricaoManutencao: veiculo ? veiculo.descricaoManutencao : "",
  });

  console.log('newVeiculo: ', NewVeiculo)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Busca modelos e status de veículo
        const modelosResponse = await searchModelos();
        const statusResponse = await searchStatusVeiculo();

        if (veiculo === null) {
          const veiculos = await searchVeiculoModelo(placa);
          setVeiculos(veiculos)

          if (veiculos.length === 0) {
            const buscarInfosPlaca = await searchVeiculoPlaca(placa);

            setNewVeiculo({
              ...NewVeiculo,
              idVeiculo: buscarInfosPlaca[0].idVeiculo
            })

          }
        }

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
    setNewVeiculo((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      idVeiculo: NewVeiculo.idVeiculo,
      dataManutencao: NewVeiculo.dataManutencao,
      descricaoManutencao: NewVeiculo.descricaoManutencao,
      kmManutencao: NewVeiculo.kmManutencao
    }

    try {
      if (veiculo) {
        // Se estiver editando, chama a função de atualização
        // await atualizarVeiculo(formData);
        // showPopupMessage(
        //   "Sucesso",
        //   "Veículo atualizado com sucesso!",
        //   "success"
        // );

        console.log('Aqui será feito requisição para atualizar os dados de manutenção')
        setNewVeiculo({})

      } else {
        // Caso contrário, chama a função de cadastro
        await cadastrarManutencaoProgramada(formData);
        showPopupMessage(
          "Sucesso",
          "Veículo cadastrado com sucesso!",
          "success"
        );

        setVeiculos([]);
        setNewVeiculo({})
      }
      // Limpa o formulário após o cadastro
      setNewVeiculo({
        idVeiculo: null,
        dataManutencao: "",
        kmManutencao: "",
        placa: "",
        kmAtual: "",
        modelo: "",
        statusVeiculo: "",
        descricaoManutencao: "",
      });
      if (onUserCreated) onUserCreated(); // Chama a função de callback para redirecionar ou executar outra ação
    } catch (error) {
      showPopupMessage("Erro", "Erro ao salvar veículo", "error");
    }
  };

  return (
    <F.FormContainer onSubmit={handleSubmit}>
      <F.Row>
        <F.FormGroup>
          <label>Data da Manutenção:</label>
          <input
            type="date"
            name="dataManutencao"
            value={NewVeiculo.dataManutencao}
            onChange={handleInputChange}
            required
          />
        </F.FormGroup>

        <F.FormGroup>
          <label>KM da última Manutenção:</label>
          <input
            type="number"
            name="kmManutencao"
            value={NewVeiculo.kmManutencao}
            onChange={handleInputChange}
            required
          />
        </F.FormGroup>

        {/* {veiculo && */}
          <F.FormGroup>
            <label>{placa && veiculos.length > 0 ? 'Modelo:' : 'Placa:'}</label>
            <input
              type="text"
              name="placa"
              value={NewVeiculo.placa}
              onChange={handleInputChange}
              required
              disabled={!!veiculo} // Desabilita o campo de placa em modo de edição
            />
          </F.FormGroup>
        {/* } */}
      </F.Row>
      
      {veiculo &&
        <F.Row>
          <F.FormGroup>
            <label>KM Atual:</label>
            <input
              type="number"
              name="kmAtual"
              value={NewVeiculo.kmAtual}
              onChange={handleInputChange}
              required
            />
          </F.FormGroup>
          <F.FormGroup>
            <label>Modelo:</label>
            <select
              name="modelo"
              value={NewVeiculo.modelo}
              onChange={handleInputChange}
              disabled
              required
            >
              <option value="">Selecione o Modelo</option>
              {modelos.map((modelo) => (
                <option key={modelo.modelo} value={modelo.modelo}>
                  {modelo.modelo}
                </option>
              ))}
            </select>
          </F.FormGroup>
        </F.Row>
      }
      <F.Row>
      <F.FormGroup>
        <label>Descrição da Manutenção:</label>
          <input
            type="text"
            name="descricaoManutencao"
            value={NewVeiculo.descricaoManutencao}
            onChange={handleInputChange}
            required
          />
        </F.FormGroup>

        {placa && veiculos.length > 0 &&
          <F.FormGroup>
            <label>Placa:</label>

            <select
              name="idVeiculo"
              value={NewVeiculo.idVeiculo || ''}
              onChange={handleInputChange}
              required
            >
              <option value="">Selecione a placa</option>
              {veiculos.map((veiculo, index) => (
                <option
                  key={index}
                  value={veiculo.idVeiculo || ''}
                >
                  {veiculo.placa}
                </option>
              ))}
            </select>
          </F.FormGroup>
        }
      </F.Row>

      <F.SubmitButton type="submit">
        {veiculo ? "Atualizar Veículo" : "Cadastrar Veículo"}
      </F.SubmitButton>
    </F.FormContainer>
  );
};

export default CadastrarManutencaoForm;
