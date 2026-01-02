import axios from "axios";
const USE_MOCK = false;
export const API_URL = "https://realworld.habsida.net/api";

export const getArticleBySlug = async (slug) => {
    if (USE_MOCK) {
    return MOCK_ARTICLES;
  }

  const response = await axios.get(
    `${API_URL}/articles/${slug}`
  );
  return response.data.article;
};

export const signUp = async (username, email, password) => {
  if (USE_MOCK) {
    return {
      username,
      email,
      token: "mock-token",
    };
  }
  const response = await axios.post(`${API_URL}/users`, {
    user: { username, email, password },
  });
  return  response.data.user;
};

export const signIn = async (email, password) => {
  if (USE_MOCK) {
    return {
      username: "mockUser",
      email,
      token: "mock-token",
    };
  }
  const response = await axios.post(`${API_URL}/users/login`, {
    user: { email, password },
  });
  return response.data.user;
};

export const updateArticle = async (slug, data, token) => {
  const response = await axios.put(
    `${API_URL}/articles/${slug}`,
    {
      article: {
        title: data.title,
        description: data.description,
        body: data.body,
      },
    },
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );

  return response.data.article;
};

export const updateUser = async (userData) => {
  const token = localStorage.getItem("token"); 

  const response = await axios.put(
    `${API_URL}/user`,
    
     userData,
  
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );

  return response.data.user;
};

const MOCK_ARTICLES = {
  articles: [
    {
      slug: "mock-article",
      title: "Mock Article",
      description: "API temporarily unavailable",
      body: "This is a mock article",
      tagList: ["mock"],
      createdAt: new Date().toISOString(),
      favoritesCount: 0,
      author: {
        username: "mockUser",
        image: null,
      },
    },
  ],
  articlesCount: 1,
};

export const getArticles = async (page = 1, limit = 4) => {
  if (USE_MOCK) {
    return MOCK_ARTICLES;
  }

  const offset = (page - 1) * limit;
  const response = await axios.get(
    `${API_URL}/articles?limit=${limit}&offset=${offset}`
  );

  return response.data;
};
export const createArticle = async (data, token) => {
  // data = { title, description, body, tagList }
  const response = await fetch(`${API_URL}/articles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({
      article: {
        title: data.title,
        description: data.description,
        body: data.body,
        tagList: data.tagList, // <- обязательно!
      },
    }),
  });

  const result = await response.json();
  return result.article;
};
export const getArticlesByAuthor = async (username) => {
  const response = await fetch(`${API_URL}/articles?author=${username}`);
  const data = await response.json();
  return data; // { articles: [...] }
};
export const favoriteArticle = async (slug, token) => {
  const response = await axios.post(
    `${API_URL}/articles/${slug}/favorite`,
    {},
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
  return response.data.article;
};

export const unfavoriteArticle = async (slug, token) => {
  const response = await axios.delete(
    `${API_URL}/articles/${slug}/favorite`,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
  return response.data.article;
};
