import api from "./api";

export const searchPersonName = async (personData) => {
  try {
    const response = await api.get(`/pessoas/search/nome/like/${personData}`);
    return response.data;
  } catch (error) {
    throw new Error("Erro ao buscar pessoas:", error);
  }
};

export const searchPersonCpf = async (personData) => {
  try {
    const response = await api.get(`/pessoas/search/cpf/like/${personData}`);
    return response.data;
  } catch (error) {
    throw new Error("Erro ao buscar pessoas:", error);
  }
};

export const searchPessoaIdPessoa = async (idPessoa) => {
  try {
    const response = await api.get(`/pessoas/search/idpessoa/${idPessoa}`);
    return response.data;
  } catch (error) {
    throw new Error("Erro ao buscar usuario:", error);
  }
};
