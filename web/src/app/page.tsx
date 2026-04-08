"use client";

import { useState } from "react";

export default function Home() {
  const [brand, setBrand] = useState("");
  const [goals, setGoals] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<{id: number, copy: string}[] | null>(null);

  const handleGenerate = async () => {
    if (!brand || !goals) {
      alert("Please enter a Brand Name and Target Goals!");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call to our Python LangGraph or Next.js backend
    setTimeout(() => {
      setResults([
        { id: 1, copy: `🌟 Discover the difference with ${brand}! Designed for ${goals.substring(0, 30)}... Shop our exclusive drop today via the link in bio! #Innovation #${brand.replace(/\s+/g, '')}` },
        { id: 2, copy: `🔥 Elevate your everyday. ${brand} brings you ultimate comfort. Don't miss out on the summer sale. Tap to shop now! 🛍️` },
        { id: 3, copy: `✨ Ready to crush your goals? ${brand} has your back. Join thousands of happy customers today. Click here to learn more! 👇` }
      ]);
      setIsLoading(false);
    }, 2500);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 md:p-24 bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white relative overflow-hidden">
      {/* Decorative background blurs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-50 animate-blob"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-50 animate-blob animation-delay-2000"></div>

      <div className="z-10 max-w-6xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-5xl md:text-7xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 mb-6 drop-shadow-lg">
          AI-Native Ad Agency
        </h1>
        <p className="text-center text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-12 font-sans font-light">
          Submit your brief and our AI pipelines will deliver multi-variant ad creatives in minutes, with a human-in-the-loop QA gate.
        </p>
        
        <div className="flex flex-col md:flex-row gap-8 items-start justify-center">
          
          {/* Form Section */}
          <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl w-full max-w-md transition-all duration-300 hover:border-purple-500/30">
            <h2 className="text-3xl font-bold mb-6 font-sans">New Creative Brief</h2>
            <form className="flex flex-col gap-5 font-sans">
              <div className="space-y-1">
                <label className="text-sm text-gray-400 font-medium">Brand Name</label>
                <input 
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full bg-black/40 border border-gray-700/50 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all" 
                  placeholder="e.g. Nimbus Shoes" 
                  type="text" 
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm text-gray-400 font-medium">Target Audience & Goals</label>
                <textarea 
                  value={goals}
                  onChange={(e) => setGoals(e.target.value)}
                  className="w-full bg-black/40 border border-gray-700/50 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all min-h-[120px] resize-none" 
                  placeholder="Targeting amateur runners. Highlight our lightweight foam technology." 
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm text-gray-400 font-medium">Pipeline Route</label>
                <select className="w-full bg-black/40 border border-gray-700/50 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none">
                  <option>Ad Creative Variant Pipeline</option>
                  <option>Legal Contract Pipeline</option>
                </select>
              </div>

              <button 
                type="button" 
                onClick={handleGenerate}
                disabled={isLoading}
                className="mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(219,39,119,0.4)] disabled:opacity-50 disabled:cursor-not-allowed group flex justify-center items-center gap-2"
              >
                {isLoading ? (
                  <span className="animate-pulse">Generating Magic...</span>
                ) : (
                  <>
                    Generate Magic
                    <span className="group-hover:translate-x-1 transition-transform">✨</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Results Section */}
          {results && (
            <div className="bg-black/40 backdrop-blur-md p-8 rounded-3xl border border-pink-500/30 shadow-[0_0_30px_rgba(219,39,119,0.1)] w-full max-w-md animate-in fade-in slide-in-from-bottom-8 duration-700 font-sans">
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                <span className="text-pink-400">●</span> Ready for QA
              </h2>
              <p className="text-gray-400 mb-6 text-sm">3 variants generated by AI pipeline.</p>
              
              <div className="flex flex-col gap-4">
                {results.map((res) => (
                  <div key={res.id} className="bg-white/5 border border-white/10 p-5 rounded-2xl hover:bg-white/10 transition-colors">
                    <p className="text-gray-200 leading-relaxed text-sm">{res.copy}</p>
                    <div className="mt-4 flex gap-2">
                      <button className="text-xs font-semibold py-1.5 px-3 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors">Approve</button>
                      <button className="text-xs font-semibold py-1.5 px-3 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors">Reject</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}
