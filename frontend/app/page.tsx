import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-900 text-white">
      <h1 className="text-6xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-600">
        Sports Sentiment Dashboard
      </h1>
      <p className="text-xl mb-12 text-gray-300">
        Real-time analysis of fan sentiment and AI commentary.
      </p>
      <Link
        href="/dashboard"
        className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-full text-lg font-semibold transition-all shadow-lg hover:shadow-blue-500/50"
      >
        Go to Dashboard
      </Link>
    </main>
  );
}
