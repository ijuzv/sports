import React from "react";

interface MatchData {
  teamA: string;
  teamB: string;
  scoreA: string;
  scoreB: string;
  overs: string;
  topPlayer: string;
}

export default function MatchCard({ data }: { data: MatchData | null }) {
  if (!data) return <div className="text-center p-4">Loading match data...</div>;

  return (
    <div className="bg-gradient-to-r from-indigo-900 to-purple-900 p-6 rounded-xl shadow-2xl border border-indigo-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">Match Overview</h2>
        <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
          LIVE
        </span>
      </div>

      <div className="flex justify-between items-center text-center">
        <div>
          <h3 className="text-xl font-bold text-gray-300">{data.teamA}</h3>
          <p className="text-4xl font-bold text-white mt-2">{data.scoreA}</p>
        </div>

        <div className="text-gray-400">
          <p className="text-sm">Overs</p>
          <p className="text-xl font-semibold text-white">{data.overs}</p>
        </div>

        <div>
          <h3 className="text-xl font-bold text-gray-300">{data.teamB}</h3>
          <p className="text-4xl font-bold text-white mt-2">{data.scoreB}</p>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-indigo-700 flex justify-between items-center">
        <p className="text-gray-300">
          Top Player: <span className="text-yellow-400 font-bold">{data.topPlayer}</span>
        </p>
      </div>
    </div>
  );
}
