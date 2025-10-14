import axios from "axios";

export const getCurrentUser = async () => {
  try {
    // Option 1: Try from localStorage (JWT)
    const savedUser = localStorage.getItem("user");
    if (savedUser) return JSON.parse(savedUser);

    // Option 2: Fallback to backend
    const res = await axios.get("/api/auth/me");
    return res.data;
  } catch {
    return null;
  }
};
