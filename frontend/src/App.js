import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import RecipeDetail from "./pages/RecipeDetail";
import Favorites from "./pages/Favorites";
import Landpage from "./pages/Landpage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import About from "./pages/About";
import ProtectedRoute from "./components/ProtectedRoute"; // ✅ Import this

function App() {
  return (
    
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landpage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />

        {/* ✅ Protected Routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recipe/:id"
          element={
            <ProtectedRoute>
              <RecipeDetail />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
    </div>
    
  );
}

export default App;
