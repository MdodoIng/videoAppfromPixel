import axios from "axios";

const BASE_URL_PIXELS = "https://api.pexels.com/";
const option = {
  headers: { Authorization: process.env.REACT_APP_PIXELS_API_KEY },
};

export const fetchPixelsAPI = async (url) => {
  const { data } = await axios.get(`${BASE_URL_PIXELS}/${url}`, option);
  return data;
};
