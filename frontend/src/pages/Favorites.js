import React, { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Favorites() {
  const userId = localStorage.getItem("userId");
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(()=>{

  // })
  // const fetchFavorites = async () => {
  

  useEffect(() => {
      if (!userId) return;
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/favorites/${userId}`);
        const favData = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data.favorites)
          ? res.data.favorites
          : [];

        setFavorites(favData.map(f => f.recipe || f));
      } catch (err) {
        console.error("Failed to fetch favorites", err);
        setFavorites([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [userId]);

  // Optimistically update local favorites when a recipe is unfavorited
  const handleFavoritesUpdate = (updatedFavorites) => {
    setFavorites(updatedFavorites);
  };

  if (loading) {
    return (
      <div className="dark:bg-gray-900 min-h-screen">
        <Navbar />
        <main className="flex items-center justify-center min-h-screen">
          <p className="text-gray-600 dark:text-gray-200 text-lg animate-pulse">
            Loading favorites...
          </p>
        </main>
        <Footer />
      </div>
      
    );
  }

  if (!favorites.length) {
    return (
      <div className="dark:bg-gray-900 min-h-screen flex flex-col">
        <Navbar />
        <main className="min-h-screen flex flex-col items-center justify-center flex-grow">
          <h2 className="text-2xl font-bold text-gray-700 dark:text-white mb-2">
            No favorites yet ❤️
          </h2>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="mt-8 dark:bg-gray-900 min-h-screen flex flex-col">
      <Navbar />
      <main className="min-h-screen max-w-6xl mx-auto px-6 py-10 flex-grow">
        <h2 className="text-3xl font-bold text-red-500 mb-8 text-center">
          ❤️ Your Favorite Recipes
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favorites.map(recipe => (
            <RecipeCard
              key={recipe._id || recipe.externalId || recipe.idMeal}
              recipe={recipe}
              userId={userId}
              isFav={true}
              setFavorites={handleFavoritesUpdate}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
