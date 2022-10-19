
import { axios } from ".";

export const getAllPins = async () => {
  const { data } = await axios.get(
    "/pins", {
      params: {
        limit: 25,
        offset: 0,
      },
    },
  );
  return data;
};

export const getPinById = async (id) => {
  const {
    data,
  } = await axios.get(`/pins/${id}`);
  return data;
};

export const savePin = async ({ id, title, date, fav, description, userId }) => {
  const method = id ? "put" : "post";
  const url = `/pins/${id ?? ""}`;
  const { data } = await axios({ method, url, data: { title, date, fav, description,userId } });
  return data;
};
export const deletePin = async (id) => {
  await axios.delete(`/pins/${id}`);
};
