import React, { useState } from "react";
import axios from "axios";

export default function AiCommentary() {
  const [commentary, setCommentary] = useState("");
  const [loading, setLoading] = useState(false);

  const generateCommentary = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:4000/ai/commentary");
      setCommentary(res.data.commentary);
    } catch (error) {
      console.error("Error generating commentary:", error);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 min-h-[100px] flex items-center justify-center text-center">
        {commentary ? (
          <p className="text-lg text-emerald-300 font-medium italic">
            "{commentary}"
          </p>
        ) : (
          <p className="text-gray-500">Click generate to get AI insights...</p>
        )}
      </div>
      
      <button
        onClick={generateCommentary}
        disabled={loading}
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-lg shadow-emerald-900/20 disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading ? (
          <span>Generating...</span>
        ) : (
          <>
            <span>✨ Generate Commentary</span>
          </>
        )}
      </button>
    </div>
  );
}
