"use client";

import { useEffect, useState } from "react";
import MatchCard from "@/components/MatchCard";
import SentimentAnalysis from "@/components/SentimentAnalysis";
import SentimentChart from "@/components/SentimentChart";
import AiCommentary from "@/components/AiCommentary";
import axios from "axios";

export default function Dashboard() {
  const [matchData, setMatchData] = useState<any>(null);

  useEffect(() => {
    // Fetch match data
    axios.get("http://localhost:4000/match").then((res) => {
      setMatchData(res.data);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Sports Sentiment Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {/* Match Overview */}
        <div className="md:col-span-2">
          <MatchCard data={matchData} />
        </div>

        {/* Sentiment Analysis */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">
            Sentiment Analysis
          </h2>
          <SentimentAnalysis />
        </div>

        {/* Sentiment Chart */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">
            Sentiment Distribution
          </h2>
          <SentimentChart />
        </div>

        {/* AI Commentary */}
        <div className="md:col-span-2 bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
          <h2 className="text-xl font-semibold mb-4 text-emerald-400">
            AI Commentary Generator
          </h2>
          <AiCommentary />
        </div>
      </div>
    </div>
  );
}
