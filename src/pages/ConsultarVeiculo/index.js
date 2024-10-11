import { useEffect, useState } from "react";
import {
  searchVeiculoModelo,
  searchVeiculoPlaca,
} from "../../services/veiculoService";
import { verificarPlaca } from "../../utils/placaUtils";
import * as C from "../ConsultarPessoa/styles";

const ConsultarVeiculo = ({ onSelectVeiculo, onGoToCadastrar }) => {
  const [valorConsultado, setValorConsultado] = useState("");
  const [veiculos, setVeiculos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [consultaVeiculoError, setConsultaVeiculoError] = useState("");

  useEffect(() => {
    const fetchVeiculo = async () => {
      if (valorConsultado.length >= 2) {
        setLoading(true);
        try {
          let resultado;
          console.log(verificarPlaca(valorConsultado));

          if (verificarPlaca(valorConsultado)) {
            resultado = await searchVeiculoPlaca(valorConsultado); // Busca pela placa
          } else {
            resultado = await searchVeiculoModelo(valorConsultado); // Busca pelo modelo
          }
          setVeiculos(resultado); // Atualiza o estado com os veículos retornados
        } catch (error) {
          setConsultaVeiculoError(error.message);
        } finally {
          setLoading(false);
        }
      } else {
        setVeiculos([]); // Corrigido para limpar o array quando a busca não for válida
      }
    };
    if (valorConsultado.length > 2) fetchVeiculo();
  }, [valorConsultado]);

  return (
    <C.Container>
      <C.Input
        type="text"
        placeholder="Digite o modelo da moto ou placa"
        value={valorConsultado}
        onChange={(e) => setValorConsultado(e.target.value)}
      ></C.Input>
      {consultaVeiculoError && (
        <C.ErrorMessage>{consultaVeiculoError}</C.ErrorMessage>
      )}
      {loading && <p>Carregando ...</p>}
      <C.List>
        {veiculos.map((veiculo) => (
          <C.ListItem
            key={veiculo.idVeiculo}
            onClick={() => onSelectVeiculo(veiculo)}
          >
            <p>{veiculo.modelo}</p>
            <p>{veiculo.placa}</p>
          </C.ListItem>
        ))}
        {veiculos.length === 0 &&
          !loading &&
          verificarPlaca(valorConsultado) && (
            <C.ListItem onClick={() => onGoToCadastrar(valorConsultado)}>
              <p>
                Nenhuma moto localizada. Clique aqui para cadastrar
                {valorConsultado}.
              </p>
            </C.ListItem>
          )}
      </C.List>
    </C.Container>
  );
};

export default ConsultarVeiculo;
