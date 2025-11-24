import React, { useState } from "react";
import axios from "axios";

export default function SentimentAnalysis() {
  const [comments, setComments] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!comments.trim()) return;
    setLoading(true);
    try {
      const commentList = comments.split("\n").filter((c) => c.trim());
      const res = await axios.post("http://localhost:4000/sentiment/analyze", {
        comments: commentList,
      });
      setResult(res.data);
    } catch (error) {
      console.error("Error analyzing sentiment:", error);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <textarea
        className="w-full h-32 bg-gray-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
        placeholder="Paste fan comments here (one per line)..."
        value={comments}
        onChange={(e) => setComments(e.target.value)}
      />
      <button
        onClick={handleAnalyze}
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
      >
        {loading ? "Analyzing..." : "Analyze Sentiment"}
      </button>

      {result && (
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          <div className="bg-green-900/50 p-2 rounded-lg border border-green-700">
            <p className="text-xs text-gray-400 uppercase">Positive</p>
            <p className="text-xl font-bold text-green-400">{result.positive}</p>
          </div>
          <div className="bg-gray-700/50 p-2 rounded-lg border border-gray-600">
            <p className="text-xs text-gray-400 uppercase">Neutral</p>
            <p className="text-xl font-bold text-gray-300">{result.neutral}</p>
          </div>
          <div className="bg-red-900/50 p-2 rounded-lg border border-red-700">
            <p className="text-xs text-gray-400 uppercase">Negative</p>
            <p className="text-xl font-bold text-red-400">{result.negative}</p>
          </div>
        </div>
      )}
    </div>
  );
}
