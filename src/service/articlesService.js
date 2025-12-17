import axios from "axios";

const API_URL = "https://realworld.habsida.net/api";

export const getArticles = async (page = 1, limit = 4) => {
    const offset = (page - 1) * limit;
    const response = await axios.get(
        `${API_URL}/articles?limit=${limit}&offset=${offset}`
    );
    return response.data;
};

export const getArticleBySlug = async (slug) => {
    const response = await axios.get(
        `${API_URL}/articles/${slug}`
    );
    return response.data.article;
};

export const singUp = async (username, email, password) => {
  const response = await axios.post(`${API_URL}/users`, {
    user: { username, email, password },
  });
  return response.data.user;
};

export const singIn = async (email, password) => {
  const response = await axios.post(`${API_URL}/users/login`, {
    user: { email, password },
  });
  return response.data.user;
};