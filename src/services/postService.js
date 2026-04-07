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
