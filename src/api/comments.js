
import { axios } from ".";

export const getAllComments = async () => {
  const { data } = await axios.get(
    "/comments", {
      params: {
        limit: 25,
        offset: 0,
      },
    },
  );
  return data;
};

export const getCommentById = async (id) => {
  const {
    data,
  } = await axios.get(`/comments/${id}`);
  return data;
};

export const saveComment = async ({ id, comment, date, pinId }) => {
  const method = id ? "put" : "post";
  const url = `/comments/${id ?? ""}`;
  const { data } = await axios({ method, url, data: { comment,date, pinId } });
  return data;
};
export const deleteComment = async (id) => {
  await axios.delete(`/comments/${id}`);
};
