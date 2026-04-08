import api from "../api/axios";

export const getComments = async (id) => {
  const response = await api.get(`/posts/${id}/comments`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return response.data;
};

export const deleteComment = async (postid, commentid) => {
  const response = await api.delete(`/posts/${postid}/comments/${commentid}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return response.data;
};

export const putComment = async (postid, commentid, commentText) => {
  const response = await api.put(
    `/posts/${postid}/comments/${commentid}`,
    commentText,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    },
  );

  return response.data;
};
