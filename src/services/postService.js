import api from "../api/axios";

export const getPosts = async () => {
  const response = await api.get("/posts", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return response.data;
};

export const getPost = async (id) => {
  const response = await api.get(`/posts/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return response.data;
};

export const putPublish = async (id, status) => {
  const response = await api.put(`/posts/${id}/publish`, status, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return response.data;
};
