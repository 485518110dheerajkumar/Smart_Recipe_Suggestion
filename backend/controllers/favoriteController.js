import Favorite from "../models/Favorite.js";

// Get all favorites for a user
export const getFavorites = async (req, res) => {
  try {
    const { userId } = req.params;
    const favorites = await Favorite.find({ userId })
      .populate("recipe") // include recipe details
      .sort({ createdAt: -1 });
    res.json(favorites);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Toggle favorite (add if not exists, remove if exists)
export const toggleFavorite = async (req, res) => {
  try {
    const { userId, recipeId } = req.body;

    if (!userId || !recipeId) {
      return res.status(400).json({ message: "Missing userId or recipeId" });
    }

    // Check if already favorited
    const existing = await Favorite.findOne({ userId, recipe: recipeId });

    if (existing) {
      await Favorite.findOneAndDelete({ userId, recipe: recipeId });
      return res.json({ message: "Removed from favorites", isFavorite: false });
    }

    // Add as favorite
    const favorite = await Favorite.create({
      userId,
      recipe: recipeId,
    });

    res.status(201).json({ message: "Added to favorites", isFavorite: true, favorite });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
