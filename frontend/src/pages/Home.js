import React, { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import { searchRecipes, externalSearch } from "../api/api";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import axios from "axios";

export default function Home() {
  const [ingredients, setIngredients] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [maxTime, setMaxTime] = useState("");
  const [localRecipes, setLocalRecipes] = useState([]);
  const [externalRecipes, setExternalRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  const [localPage, setLocalPage] = useState(1);
  const [externalPage, setExternalPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!userId) return;
      try {
        const res = await axios.get(`/api/favorites/${userId}`);
        setFavorites(res.data.map(f => f.recipe || f));
      } catch (err) {
        console.error(err);
      }
    };

    const fetchAllRecipes = async () => {
      try {
        setLoading(true);
        const data = await searchRecipes({});
        setLocalRecipes(data.local || []);
        setExternalRecipes(data.external || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
    fetchAllRecipes();
  }, [userId]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = await searchRecipes({ ingredients, difficulty, maxTime });
      setLocalRecipes(data.local || []);
      setExternalRecipes(data.external || []);

      if ((data.external || []).length === 0 && ingredients) {
        const ext = await externalSearch(ingredients.split(",")[0]);
        setExternalRecipes(ext.meals || []);
      }

      setLocalPage(1);
      setExternalPage(1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filterByIngredient = (recipe) => {
    if (!ingredients) return true;
    const ingArr = ingredients.toLowerCase().split(",").map(i => i.trim());
    const recipeIngredients = (recipe.ingredients || []).map(r => r.name.toLowerCase());
    return ingArr.every(i => recipeIngredients.some(ri => ri.includes(i)));
  };

  const paginatedLocal = localRecipes.filter(filterByIngredient)
    .slice((localPage - 1) * ITEMS_PER_PAGE, localPage * ITEMS_PER_PAGE);

  const paginatedExternal = externalRecipes.filter(recipe => {
    if (!ingredients) return true;
    const title = (recipe.title || recipe.strMeal || "").toLowerCase();
    return title.includes(ingredients.toLowerCase());
  }).slice((externalPage - 1) * ITEMS_PER_PAGE, externalPage * ITEMS_PER_PAGE);

  const totalLocalPages = Math.ceil(localRecipes.filter(filterByIngredient).length / ITEMS_PER_PAGE);
  const totalExternalPages = Math.ceil(externalRecipes.length / ITEMS_PER_PAGE);

  const nextLocalPage = () => { if (localPage < totalLocalPages) setLocalPage(localPage + 1); };
  const prevLocalPage = () => { if (localPage > 1) setLocalPage(localPage - 1); };
  const nextExternalPage = () => { if (externalPage < totalExternalPages) setExternalPage(externalPage + 1); };
  const prevExternalPage = () => { if (externalPage > 1) setExternalPage(externalPage - 1); };

  if (loading) return (
    <div className="dark:bg-gray-900 transition-colors duration-300 min-h-screen">
      <Navbar />
      <main className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600 dark:text-gray-200 animate-pulse">Loading recipes...</p>
      </main>
      <Footer/>
    </div>
  );

  return (
    <div className="dark:bg-gray-900 transition-colors duration-300 min-h-screen flex flex-col">
      <Navbar />
      <main className="mt-8 max-w-6xl mx-auto px-6 py-10 flex-grow bg-gradient-to-b from-rose-50 to-white dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">

        {/* Search */}
        <section className="bg-gradient-to-r from-rose-50 to-white dark:from-gray-700 dark:to-gray-800 shadow-xl rounded-2xl p-8 mb-8 border border-rose-100">
          <h2 className="text-2xl font-bold text-red-500 mb-6 text-center">Find Your Perfect Recipe 🍲</h2>
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <input
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="Ingredients (comma separated)"
              className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400"
            />
            <div className="flex gap-3">
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="p-3 border border-gray-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-rose-400"
              >
                <option value="">Any Difficulty</option>
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
              <input
                type="number"
                min={1}
                value={maxTime}
                onChange={(e) => setMaxTime(e.target.value)}
                placeholder="Max time (min)"
                className="p-3 border border-gray-300 rounded-xl w-32 focus:outline-none focus:ring-2 focus:ring-rose-400"
              />
            </div>
            <div className="flex justify-center md:justify-end">
              <button
                type="submit"
                className="px-6 py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 shadow-md transition duration-300"
              >
                Search Recipes
              </button>
            </div>
          </form>
        </section>

        {/* Local Recipes */}
        <section className="mb-8">
          <h2 className="dark:text-white text-xl font-semibold text-gray-800 mb-4 border-b border-rose-200 pb-2">Local Recipes</h2>
          {paginatedLocal.length ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {paginatedLocal.map(r => (
                <RecipeCard
                  key={r._id || r.externalId}
                  recipe={r}
                  userId={userId}
                  isFav={favorites.some(f => (f._id || f.externalId) === (r._id || r.externalId))}
                  setFavorites={setFavorites}
                />
              ))}
            </div>
          ) : <p className="dark:text-white text-gray-500 italic">No local recipes found.</p>}

          {totalLocalPages > 1 && (
            <div className="flex justify-center mt-4 gap-2">
              <button onClick={prevLocalPage} disabled={localPage === 1} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50">Prev</button>
              <span className="px-2">{localPage} / {totalLocalPages}</span>
              <button onClick={nextLocalPage} disabled={localPage === totalLocalPages} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50">Next</button>
            </div>
          )}
        </section>

        {/* External Recipes */}
        <section>
          <h2 className="dark:text-white text-xl font-semibold text-gray-800 mb-4 border-b border-rose-200 pb-2">External Suggestions</h2>
          {paginatedExternal.length ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {paginatedExternal.map(e => (
                <RecipeCard
                  key={e._id || e.externalId || e.idMeal}
                  recipe={{
                    ...e,
                    title: e.title || e.strMeal,
                    image: e.image || e.strMealThumb
                  }}
                  userId={userId}
                  isFav={favorites.some(f => (f._id || f.externalId || f.idMeal) === (e._id || e.externalId || e.idMeal))}
                  setFavorites={setFavorites}
                />
              ))}
            </div>
          ) : <p className="dark:text-white text-gray-500 italic">No external recipes available.</p>}

          {totalExternalPages > 1 && (
            <div className="flex justify-center mt-4 gap-2">
              <button onClick={prevExternalPage} disabled={externalPage === 1} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50">Prev</button>
              <span className="px-2">{externalPage} / {totalExternalPages}</span>
              <button onClick={nextExternalPage} disabled={externalPage === totalExternalPages} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50">Next</button>
            </div>
          )}
        </section>
      </main>
      <Footer/>
    </div>
  );
}
