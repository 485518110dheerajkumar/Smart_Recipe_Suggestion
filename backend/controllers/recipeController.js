import axios from"axios";
import mongoose from"mongoose";
import { Recipe } from "../models/Recipe.js";

const FORKIFY_BASE =
  process.env.FORKIFY_BASE || "https://forkify-api.herokuapp.com/api/v2";

/**
 * @desc Get recipes from local DB (and optionally from Forkify)
 * @route GET /api/recipes
 */
async function getRecipes(req, res) {
  const { ingredients = "", difficulty = "", maxTime } = req.query;
  const ingredientList = ingredients
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);

  const query = {};
  if (difficulty) query.difficulty = difficulty;
  if (maxTime) query.timeMinutes = { $lte: Number(maxTime) };
  if (ingredientList.length) query["ingredients.name"] = { $in: ingredientList };

  try {
    const local = await Recipe.find(query).limit(50);

    // If no local results, fetch from Forkify
    let external = [];
    if (!local.length && ingredientList.length) {
      const q = ingredientList[0];
      const resp = await axios.get(`${FORKIFY_BASE}/recipes`, {
        params: { search: q },
      });

      if (resp.data && resp.data.data && resp.data.data.recipes) {
        external = resp.data.data.recipes.map((r) => ({
          externalId: r.id,
          title: r.title,
          image: r.image_url,
          publisher: r.publisher,
          source: "forkify",
        }));
      }
    }

    return res.json({ local, external });
  } catch (err) {
    console.error("Error in getRecipes:", err);
    res.status(500).json({ error: "Server error" });
  }
}

/**
 * @desc Get recipe by ID (either from MongoDB or Forkify)
 * @route GET /api/recipes/:id
 */
async function getRecipeById(req, res) {
  const { id } = req.params;

  try {
    // Search in MongoDB first
    if (mongoose.Types.ObjectId.isValid(id)) {
      const r = await Recipe.findById(id);
      if (r) return res.json({ recipe: r });
    }

    // Fetch from Forkify API
    const resp = await axios.get(`${FORKIFY_BASE}/recipes/${id}`);

    if (resp.data && resp.data.data && resp.data.data.recipe) {
      const m = resp.data.data.recipe;
      const ingredients = m.ingredients.map((i) => ({
        name: i.description,
        quantity: i.quantity || "",
        unit: i.unit || "",
      }));

      return res.json({
        recipe: {
          externalId: m.id,
          title: m.title,
          publisher: m.publisher,
          image: m.image_url,
          source_url: m.source_url,
          servings: m.servings || 2,
          cookingTime: m.cooking_time || 30,
          ingredients,
        },
      });
    }

    res.status(404).json({ error: "Recipe not found" });
  } catch (err) {
    console.error("Error in getRecipeById:", err);
    res.status(500).json({ error: "Server error" });
  }
}

/**
 * @desc Rate a recipe (local DB only)
 * @route POST /api/recipes/:id/rate
 */
async function rateRecipe(req, res) {
  const { id } = req.params;
  const { value } = req.body;

  if (!value || value < 1 || value > 5) {
    return res.status(400).json({ error: "Invalid rating" });
  }

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ error: "Cannot rate external recipes (invalid ID)" });
    }

    const recipe = await Recipe.findById(id);
    if (!recipe) return res.status(404).json({ error: "Recipe not found" });

    recipe.ratings.push({ value: Number(value) });
    await recipe.save();

    res.json({ success: true, avgRating: recipe.avgRating });
  } catch (err) {
    console.error("Error in rateRecipe:", err);
    res.status(500).json({ error: "Server error" });
  }
}

/**
 * @desc Proxy search to Forkify API (for ingredient-based searches)
 * @route GET /api/recipes/external?ingredient=pasta
 */
async function externalSearch(req, res) {
  const { ingredient } = req.query;
  if (!ingredient) {
    return res.status(400).json({ error: "Missing ingredient parameter" });
  }

  try {
    const resp = await axios.get(`${FORKIFY_BASE}/recipes`, {
      params: { search: ingredient },
    });

    if (resp.data && resp.data.data && resp.data.data.recipes) {
      const results = resp.data.data.recipes.map((r) => ({
        id: r.id,
        title: r.title,
        image: r.image_url,
        publisher: r.publisher,
      }));

      return res.json({ meals: results });
    }

    res.json({ meals: [] });
  } catch (err) {
    console.error("Error in externalSearch:", err);
    res.status(500).json({ error: "External API error" });
  }
}


export default {
  getRecipes,
  getRecipeById,
  rateRecipe,
  externalSearch,
};
