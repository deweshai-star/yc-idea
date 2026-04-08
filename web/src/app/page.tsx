export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-br from-indigo-900 to-black">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mb-8">
          AI-Native Ad Agency
        </h1>
        <p className="text-center text-xl text-gray-300 max-w-2xl mx-auto mb-12">
          Submit your brief and our AI pipelines will deliver multi-variant ad creatives in minutes, with a human-in-the-loop QA gate.
        </p>
        
        <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-2xl max-w-md mx-auto">
          <h2 className="text-2xl font-semibold mb-6">New Creative Brief</h2>
          <form className="flex flex-col gap-4">
            <input className="bg-black/50 border border-gray-600 rounded p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Brand Name" type="text" />
            <textarea className="bg-black/50 border border-gray-600 rounded p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[100px]" placeholder="Target Audience & Output Goals" />
            <select className="bg-black/50 border border-gray-600 rounded p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option>Ad Creative Variant Pipeline</option>
              <option>Legal Contract Pipeline</option>
            </select>
            <button type="button" className="mt-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02]">
              Generate Magic
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
