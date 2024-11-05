import axios from "axios";

const API_KEY = "3FImjmzjTR33XOk3M5wAd94nl6FLOhldWpXN7W2tJpM";
const BASE_URL = "https://api.unsplash.com/search/photos";

export const fetchImages = async (query, page, perPage) => {
  const response = await axios.get(BASE_URL, {
    headers: {
      Authorization: `Client-ID ${API_KEY}`,
    },
    params: {
      query,
      page,
      per_page: perPage,
    },
  });
  return response.data;
};
