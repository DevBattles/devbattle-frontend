import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Agent() {
  const navigate = useNavigate();

  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const handleSubmit = async () => {
    if (!prompt.trim()) return;

    setLoading(true);

    try {
      // TODO:
      // Replace this when AI backend is ready.
      // Example:
      // const res = await api.post("/agent/chat",{prompt});
      // setResponse(res.data.response);

      setTimeout(() => {
        setResponse(`Prompt Received

"${prompt}"

✅ Frontend → Backend workflow is ready.

🚧 AI Backend integration is currently under development.

Once connected, the AI-generated response will appear here.`);
        setLoading(false);
      }, 1500);

    } catch (error) {
      setLoading(false);
      setResponse("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white">

      {/* Header */}
      <header className="border-b border-slate-800 bg-[#0F172A]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">

          <div>
            <h1 className="text-2xl font-bold">
              AI Agent
            </h1>

            <p className="text-sm text-slate-400">
              DevBattles Assistant
            </p>
          </div>

          <button
            onClick={() => navigate("/dashboard")}
            className="rounded-lg border border-slate-600 px-4 py-2 hover:bg-slate-800"
          >
            Dashboard
          </button>

        </div>
      </header>

      <main className="mx-auto max-w-6xl px-8 py-10">

        <div className="rounded-2xl border border-slate-700 bg-[#111827] p-8">

          <h2 className="text-3xl font-bold">
            Ask AI
          </h2>

          <p className="mt-3 text-slate-400">
            Ask coding, debugging or web development questions.
          </p>

          <textarea
            rows={8}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Example: Explain Binary Search with code..."
            className="mt-8 w-full rounded-xl border border-slate-700 bg-[#0F172A] p-5 outline-none focus:border-emerald-400"
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="mt-6 rounded-xl bg-emerald-500 px-8 py-3 font-semibold text-black hover:bg-emerald-400 disabled:opacity-60"
          >
            {loading ? "Thinking..." : "Ask AI"}
          </button>

        </div>

        <div className="mt-8 rounded-2xl border border-slate-700 bg-[#111827] p-8">

          <h2 className="mb-5 text-2xl font-bold">
            Response
          </h2>

          {response ? (
            <pre className="whitespace-pre-wrap text-slate-300 leading-8">
              {response}
            </pre>
          ) : (
            <p className="text-slate-500">
              AI response will appear here.
            </p>
          )}

        </div>

      </main>

    </div>
  );
}

export default Agent;