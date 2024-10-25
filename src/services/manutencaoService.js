import api from "./api.js";

export const cadastrarManutencaoProgramada = async (manutProgData) => {
  try {
    const response = await api.post(
      "manutencao/programada/cadastrar",
      manutProgData
    );
    return response.data;
  } catch (error) {
    throw new Error("Erro ao cadastrar Manutenção programada:", error);
  }
};

export const searchManutProgIdVeiculo = async (idVeiculo) => {
  try {
    const response = await api.get(
      `manutencao/programada/search/idveiculo/${idVeiculo}`
    );
    return response.data;
  } catch (error) {
    throw new Error(
      "Erro ao buscar manutenção progrmada pelo id veiculo:",
      error
    );
  }
};

export const baixarManutencaoProgramada = async (manutProgData) => {
  try {
    const response = await api.put(
      "/manutencao/programada/baixar",
      manutProgData
    );
    return response.data;
  } catch (error) {
    throw new Error("Erro ao cadastrar modelos de veículo:", error);
  }
};

export const cadastrarManutencaoCorretiva = async (manutCorretivaData) => {
  try {
    const response = await api.post(
      "manutencao/corretiva/cadastrar",
      manutCorretivaData
    );
    return response.data;
  } catch (error) {
    throw new Error("Erro ao cadastrar Manutenção Corretiva:", error);
  }
};

export const searchManutCorretivaIdVeiculo = async (idVeiculo) => {
  try {
    const response = await api.get(
      `manutencao/corretiva/search/idveiculo/${idVeiculo}`
    );
    return response.data;
  } catch (error) {
    throw new Error(
      "Erro ao buscar manutenção corretiva pelo id veiculo:",
      error
    );
  }
};
