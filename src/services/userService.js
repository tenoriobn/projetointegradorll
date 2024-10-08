import api from "./api";

export const createUser = async (userData) => {
  try {
    const response = await api.post("/usuarios/create", userData);
    return response.data;
  } catch (error) {
    throw new Error("Erro ao criar usuário. Tente novamente.");
  }
};

export const updateUser = async (userData) => {
  try {
    const response = await fetch(`/api/users/${userData.idPessoa}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Failed to update user");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};
