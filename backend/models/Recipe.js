import mongoose from'mongoose';

const IngredientSchema = new mongoose.Schema({
  name: String,
  quantity: String
});

const RecipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  cuisine: String,
  difficulty: { type: String, enum: ['Easy','Medium','Hard'], default: 'Easy' },
  timeMinutes: Number,
  servings: { type: Number, default: 2 },
  ingredients: [IngredientSchema],
  steps: [String],
  image: String,
  caloriesEstimate: Number,
  ratings: [{ value: Number, createdAt: { type: Date, default: Date.now } }],
  createdAt: { type: Date, default: Date.now }
});

RecipeSchema.virtual('avgRating').get(function() {
  if (!this.ratings || !this.ratings.length) return 0;
  const sum = this.ratings.reduce((s, r) => s + r.value, 0);
  return sum / this.ratings.length;
});

RecipeSchema.set('toJSON', { virtuals: true });
RecipeSchema.set('toObject', { virtuals: true });


export const Recipe = mongoose.model("Recipe", RecipeSchema);