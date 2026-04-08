import api from "../api/axios";

export const getComments = async (id) => {
  const response = await api.get(`/posts/${id}/comments`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return response.data;
};
