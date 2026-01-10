export default function About() {
  return (
    <div className="min-h-screen bg-[#120707] text-white px-8 py-20">
      
      <div className="max-w-4xl mx-auto border border-red-600 bg-black/60 p-10 shadow-[0_0_40px_red] relative">

        {/* Classified Stamp */}
        <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-1 rotate-12 text-xs tracking-widest">
          CLASSIFIED
        </div>

        <h1 className="text-5xl font-extrabold text-red-600 mb-6 drop-shadow-[0_0_15px_red]">
          INTELLINA
        </h1>

        <p className="uppercase tracking-[0.3em] text-red-400 text-sm mb-8">
          Artificial Intelligence & Data Science Division
        </p>

        <div className="text-gray-300 leading-relaxed space-y-6">
          <p>
            Deep within the Department of AI & Data Science lies a secret experiment — 
            <span className="text-red-500 font-bold"> INTELLINA</span>.
            It is not just a symposium. It is a gateway to the future of intelligence.
          </p>

          <p>
            Here, students, researchers, and innovators gather to explore machine learning,
            deep neural networks, data intelligence, and the unknown territories of AI —
            just like scientists venturing into the <span className="text-red-500">Upside Down</span>.
          </p>

          <p>
            Through technical battles, non-technical missions, and flagship challenges,
            INTELLINA pushes every participant beyond limits, into a realm where
            logic meets imagination.
          </p>
        </div>

        {/* Status Bar */}
        <div className="mt-10 border-t border-red-600 pt-6 flex justify-between text-sm text-red-400 tracking-widest">
          <span>LAB STATUS: ACTIVE</span>
          <span>ACCESS LEVEL: STUDENT</span>
        </div>

      </div>

    </div>
  );
}
