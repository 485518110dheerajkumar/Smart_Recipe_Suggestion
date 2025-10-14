import React from "react";

export default function Rating({ value = 0, onRate }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          onClick={() => onRate(n)}
          className={`text-xl ${n <= value ? "text-yellow-500" : "text-gray-300"}`}
        >
        ★
        </button>
      ))}
    </div>
  );
}
