import React, { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [theme, setTheme] = useState("light");
  const navigate = useNavigate();

  // Load theme and login state from localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="bg-white dark:bg-gray-900 dark:text-gray-100 shadow-md fixed top-0 left-0 right-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div
          onClick={() => navigate("/home")}
          className="text-2xl font-bold text-rose-500 tracking-tight cursor-pointer"
        >
          Smart<span className="text-gray-800 dark:text-gray-100">Recipe</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-700 dark:text-gray-200">
          <a href="/home" className="hover:text-rose-500 transition">
            Home
          </a>
          <a href="/favorites" className="hover:text-rose-500 transition">
            Favorites
          </a>
          <a href="/about" className="hover:text-rose-500 transition">
            About
          </a>
          <a href="/contact" className="hover:text-rose-500 transition">
            Contact
          </a>
        </div>

        {/* Right-side Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="rounded-full transition"
          >
            {theme === "light" ? (
              <Moon className="p-1 w-8 h-8 bg-gray-800 text-gray-400  hover:bg-gray-700 shadow-md shadow-gray-800 rounded-full" />
            ) : (
              <Sun className="p-1 w-8 h-8 text-yellow-500  shadow-md hover:shadow-lg hover:shadow-yellow-400 shadow-yellow-400 rounded-full" />
            )}
          </button>

          {/* Auth Buttons */}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-md text-sm hover:bg-red-600 transition"
            >
              Logout
            </button>
          ) : (
            <button className="bg-rose-500 text-white px-4 py-2 rounded-md text-sm hover:bg-rose-600 transition">
              <a href="/login">Login / Sign Up</a>
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gray-700 dark:text-gray-200 focus:outline-none"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-700 shadow-lg transition">
          <div className="flex flex-col px-6 py-4 space-y-3 text-gray-700 dark:text-gray-200 font-medium">
            <a href="/home" onClick={() => setOpen(false)} className="hover:text-rose-500">
              Home
            </a>
            <a href="/favorites" onClick={() => setOpen(false)} className="hover:text-rose-500">
              Favorites
            </a>
            <a href="/about" onClick={() => setOpen(false)} className="hover:text-rose-500">
              About
            </a>
            <a href="/contact" onClick={() => setOpen(false)} className="hover:text-rose-500">
              Contact
            </a>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="flex items-center space-x-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-3 py-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              <span>{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
            </button>

            {isLoggedIn ? (
              <button
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
                className="bg-red-500 text-white px-4 py-2 rounded-md text-sm hover:bg-red-600 transition"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => setOpen(false)}
                className="bg-rose-500 text-white px-4 py-2 rounded-md text-sm hover:bg-rose-600 transition"
              >
                <a href="/login">Login / Sign Up</a>
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
