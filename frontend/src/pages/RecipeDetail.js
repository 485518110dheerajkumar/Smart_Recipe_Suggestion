import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipe, rateRecipe } from "../api/api";
import Rating from "../components/Rating";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import axios from "axios";

export default function RecipeDetail({ userId }) {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [servings, setServings] = useState(2);
  const [avg, setAvg] = useState(0);
  const [setIsFav] = useState(false);

  
  // Load recipe details and check if it's in favorites
  useEffect(() => {
    (async () => {
      try {
        const data = await getRecipe(id);
        const r = data.recipe;
        setRecipe(r);
        setServings(r.servings || 2);
        if (r.avgRating) setAvg(r.avgRating);

        // Check if it's in MongoDB favorites
        const favRes = await axios.get(`/api/favorites/${userId}`);
        const favIds = favRes.data.map((f) => f._id || f.externalId);
        setIsFav(favIds.includes(r._id || r.externalId));
      } catch (err) {
        console.error(err);
      }
    })();
  }, [id, userId,setIsFav]);

  // Handle rating
  async function handleRate(val) {
    if (!recipe || !recipe._id) {
      alert("Rating works only for local recipes");
      return;
    }
    try {
      const res = await rateRecipe(recipe._id, val);
      setAvg(res.avgRating || 0);
      alert("Thanks for rating!");
    } catch (err) {
      console.error(err);
    }
  }

  // Handle add/remove favorite
  


  if (!recipe)
    return (
      <>
        <Navbar />
        <main className="p-4 max-w-4xl mx-auto mt-5 text-center text-gray-500 dark:text-gray-200">
          Loading...
        </main>
      </>
    );

  return (
    <>
    <Navbar />
    <div className="mt-14">
      
      <main className="max-w-5xl mx-auto p-4 mt-10 mb-10">
        <div className="bg-gradient-to-br from-rose-50 to-white dark:to-gray-900 p-6 rounded-2xl shadow-lg transition-colors duration-300">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Recipe Image */}
            <img
              src={
                recipe.image && recipe.image !== ""
                  ? recipe.image
                  : "https://via.placeholder.com/300?text=No+Image"
              }
              alt={recipe.title}
              className="w-full md:w-64 h-64 object-cover rounded-lg shadow-lg"
            />

            {/* Recipe Info */}
            <div className="flex-1 flex flex-col">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3">
                <h2 className="text-2xl font-bold text-red-500 dark:text-red-400">
                  {recipe.title}
                </h2>
                
              </div>

              <div className="flex flex-wrap items-center gap-4 mb-3">
                <div>
                  <label className="text-sm font-medium mr-2 dark:text-gray-300">
                    Servings:
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={servings}
                    onChange={(e) => setServings(Number(e.target.value))}
                    className="border p-1 w-20 rounded focus:outline-none focus:ring-2 focus:ring-rose-400"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm dark:text-gray-300">
                    Avg rating: {avg ? avg.toFixed(1) : "—"}
                  </span>
                  <Rating value={0} onRate={handleRate} />
                </div>
              </div>

              {recipe.nutrition && (
                <div className="mt-2 text-sm dark:text-gray-300">
                  <span>Calories: {recipe.nutrition.calories}</span> |{" "}
                  <span>Protein: {recipe.nutrition.protein}g</span> |{" "}
                  <span>Fat: {recipe.nutrition.fat}g</span>
                </div>
              )}
            </div>
          </div>

          {/* Ingredients & Steps */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-lg dark:text-white mb-2">Ingredients</h3>
              <ul className="list-disc ml-5 text-gray-700 dark:text-gray-300">
                {recipe.ingredients && recipe.ingredients.length > 0 ? (
                  recipe.ingredients.map((ing, idx) => (
                    <li key={idx}>
                      {ing.quantity ? `${ing.quantity} ` : ""}
                      {ing.name}
                    </li>
                  ))
                ) : (
                  <li>No ingredients listed.</li>
                )}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg dark:text-white mb-2">Steps</h3>
              <ol className="list-decimal ml-5 text-gray-700 dark:text-gray-300">
                {recipe.steps && recipe.steps.length > 0 ? (
                  recipe.steps.map((s, idx) => (
                    <li key={idx} className="mb-1">
                      {s}
                    </li>
                  ))
                ) : (
                  <li>No steps provided.</li>
                )}
              </ol>
            </div>
          </div>
        </div>
      </main>
      </div>
      <Footer />
    </>
  );
}
