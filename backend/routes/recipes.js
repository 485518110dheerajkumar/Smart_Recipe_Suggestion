import express from"express";
const router = express.Router();
import * as ctrl from "../controllers/recipeController.js";

// these must all be functions exported by recipeController.js

import recipeController from "../controllers/recipeController.js";

router.get("/", recipeController.getRecipes);
router.get("/external", recipeController.externalSearch);
router.get("/:id", recipeController.getRecipeById);
router.post("/:id/rate", express.json(), recipeController.rateRecipe);

export default router;