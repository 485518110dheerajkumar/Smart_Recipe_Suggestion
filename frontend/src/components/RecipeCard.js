import React, { useState, useEffect } from "react";
import { Heart, Clock, Users } from "lucide-react";
import axios from "axios";

const RecipeCard = ({ recipe, userId, isFav, setFavorites }) => {
  const [fav, setFav] = useState(isFav);

  useEffect(() => {
    setFav(isFav);
  }, [isFav]);

  const toggleFav = async () => {
    if (!userId) {
      alert("Login to save favorites!");
      return;
    }

    try {
      const recipeId = recipe._id || recipe.externalId || recipe.idMeal;

      // Use single toggle endpoint
      const res = await axios.post("/api/favorites/toggle", { userId, recipeId });

      // Update local UI state
      setFav(res.data.isFavorite);

      // Refresh favorites list in parent
      const favRes = await axios.get(`/api/favorites/${userId}`);
      const favData = Array.isArray(favRes.data) ? favRes.data : [];
      setFavorites(favData.map(f => f.recipe || f));
    } catch (err) {
      console.error("Failed to toggle favorite", err);
    }
  };

  const prepTime = Number(recipe.time) || Number(recipe.prepTime) || 0;
  const cookTime = Number(recipe.cookTime) || 0;
  const totalTime = prepTime + cookTime;

  return (
    <div className="dark:text-white bg-gradient-to-r dark:from-red-600 dark:via-red-700 dark:to-red-800 dark:shadow-lg p-6 group bg-white border border-gray-100 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden relative">
      <div className="relative w-full h-48 overflow-hidden">
        <img
          src={recipe.image || recipe.strMealThumb || "https://via.placeholder.com/300x200?text=No+Image"}
          alt={recipe.title || recipe.strMeal || "Recipe"}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 rounded-md"
        />
        <button
          onClick={toggleFav}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 ${fav ? "bg-red-500 text-white" : "bg-white text-gray-600 hover:text-red-500 hover:bg-red-50"
            }`}
        >
          <Heart size={20} fill={fav ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="p-4 flex flex-col justify-between h-36">
        <h3 className="dark:text-white text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          {recipe.title || recipe.strMeal || "Untitled Recipe"}
        </h3>

        <div className="dark:text-white text-sm text-gray-500 flex flex-wrap gap-3 mb-2">
          {prepTime > 0 && (
            <span className="flex items-center gap-1"><Clock size={14} /> Prep: {prepTime} min</span>
          )}
          {cookTime > 0 && (
            <span className="flex items-center gap-1"><Clock size={14} /> Cook: {cookTime} min</span>
          )}
          {totalTime > 0 && (prepTime > 0 || cookTime > 0) && (
            <span className="flex items-center gap-1 font-medium"><Clock size={14} /> Total: {totalTime} min</span>
          )}
          {recipe.servings && (
            <span className="flex items-center gap-1"><Users size={14} /> Servings: {recipe.servings}</span>
          )}
        </div>

        <a
          href={`/recipe/${recipe._id || recipe.externalId || recipe.idMeal}`}
          className="mt-auto inline-block bg-red-500 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300 text-center"
        >
          View Recipe
        </a>
      </div>
    </div>
  );
};

export default RecipeCard;
