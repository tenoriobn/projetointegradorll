import api from './api';

export const searchPersonName = async (personData) =>{
    try {
        const response = await api.get(`/pessoas/search/nome/${personData}`);
        return response.data;
      } catch (error) {
        throw new Error('Erro ao buscar pessoas:', error);
      }


};

export const searchPersonCpf = async (personData) =>{
    try {
        const response = await api.get(`/pessoas/search/like/cpf/${personData}`);
        return response.data;
      } catch (error) {
        throw new Error('Erro ao buscar pessoas:', error);
      }


};