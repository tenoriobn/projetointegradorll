import { useEffect, useState } from "react";
import {
  searchManutencaoProgramada,
  searchVeiculoPlaca,
} from "../../services/veiculoService";
import * as C from "../../styles/consulta";
import { isPlaca, verificarPlaca } from "../../utils/placaUtils";

const ConsultarManutencaoProgramada = ({ onSelectManutencao, onGoToCadastrar }) => {
  const [valorConsultado, setValorConsultado] = useState("");
  const [manutencoes, setManutencoes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [consultaManutencaoError, setConsultaManutencaoError] = useState("");

  useEffect(() => {
    const fetchVeiculo = async () => {
      if (valorConsultado.length >= 2) {
        setLoading(true);
        try {
          let resultado;

          if (isPlaca(valorConsultado)) {
            const veiculo = await searchVeiculoPlaca(valorConsultado);

            resultado = await searchManutencaoProgramada(veiculo[0].modelo);
          } else {
            resultado = await searchManutencaoProgramada(valorConsultado);
          }

          setManutencoes(resultado); // Atualiza o estado com os veículos retornados
        } catch (error) {
          setConsultaManutencaoError(error.message);
        } finally {
          setLoading(false);
        }
      } else {
        setManutencoes([]); // Corrigido para limpar o array quando a busca não for válida
      }
    };
    // Se o valorConsultado for apagado ou tiver menos de 2 caracteres, limpa a lista
    if (valorConsultado.length === 0) {
      setManutencoes([]); // Limpa a lista de veículos se o campo input estiver vazio
    } else if (valorConsultado.length > 2) {
      fetchVeiculo(); // Faz a busca apenas quando há mais de 2 caracteres
    }
  }, [valorConsultado]);

  return (
    <C.Container>
      <C.Input
        type="text"
        placeholder="Digite o modelo da moto"
        value={valorConsultado}
        onChange={(e) => setValorConsultado(e.target.value.toUpperCase())}
      ></C.Input>
      {consultaManutencaoError && (
        <C.ErrorMessage>{consultaManutencaoError}</C.ErrorMessage>
      )}
      {loading && <p>Carregando ...</p>}
      <C.List>
        {manutencoes.length > 0 && (
          <C.ListItemCab>
            <p>Modelo</p>
            <p>Placa</p>
          </C.ListItemCab>
        )}
        {manutencoes.map((veiculo) => (
          <C.ListItem
            key={veiculo.id}
            onClick={() => onSelectManutencao(veiculo)}
          >
            <p>{veiculo.modelo}</p>
            <p>{veiculo.placa}</p>
          </C.ListItem>
        ))}
        {manutencoes.length > 0 && (
          <C.ListItem onClick={() => onGoToCadastrar(valorConsultado)}>
            <p>
              Clique aqui para cadastrar uma nova manutenção.
            </p>
          </C.ListItem>
        )}
        {manutencoes.length === 0 &&
          !loading &&
          verificarPlaca(valorConsultado) && (
            <C.ListItem onClick={() => onGoToCadastrar(valorConsultado)}>
              <p>
                Nenhuma manutenção localizada. Clique aqui para cadastrar <b>{valorConsultado}</b>.
              </p>
            </C.ListItem>
          )}
      </C.List>
    </C.Container>
  );
};

export default ConsultarManutencaoProgramada;
