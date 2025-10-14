import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000/api";

export async function searchRecipes({ ingredients, difficulty, maxTime }) {
  const params = {};
  if (ingredients) params.ingredients = ingredients;
  if (difficulty) params.difficulty = difficulty;
  if (maxTime) params.maxTime = maxTime;
  const resp = await axios.get(`${API_BASE}/recipes`, { params });
  return resp.data;
}

export async function externalSearch(ingredient) {
  const resp = await axios.get(`${API_BASE}/recipes/external`, { params: { ingredient } });
  return resp.data;
}

export async function getRecipe(id) {
  const resp = await axios.get(`${API_BASE}/recipes/${id}`);
  return resp.data;
}

export async function rateRecipe(id, value) {
  const resp = await axios.post(`${API_BASE}/recipes/${id}/rate`, { value });
  return resp.data;
}
