import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Bot, Send, User } from "lucide-react";

import AgentLoading from "@/components/dashboard/AgentLoading";

function Agent() {
  const navigate = useNavigate();

  const bottomRef = useRef(null);

  const [pageLoading, setPageLoading] = useState(true);

  const [prompt, setPrompt] = useState("");

  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      text: "👋 Welcome to DevBattles AI.\n\nAsk me anything related to DSA, Web Development, React, Node.js, JavaScript or Interview Preparation.",
    },
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const handleSend = () => {
    if (!prompt.trim()) return;

    const userPrompt = prompt;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "user",
        text: userPrompt,
      },
    ]);

    setPrompt("");
    setLoading(true);

    // TODO:
    // const res = await api.post("/agent/chat",{prompt:userPrompt})

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "ai",
          text:
            "🚧 AI Backend is currently under development.\n\nFrontend → Backend workflow is ready.\n\nYour prompt has been received successfully.\n\nOnce the backend is integrated, the AI generated response will appear here.",
        },
      ]);

      setLoading(false);
    }, 1500);
  };

  if (pageLoading) {
    return (
      <div className="min-h-screen bg-[#050816] text-white">
        <AgentLoading />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050816] text-white">

      {/* Header */}

      <header className="sticky top-0 z-50 border-b border-slate-800 bg-[#0F172A]/90 backdrop-blur">

        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">

          <div>

            <h1 className="text-3xl font-bold">
              DevBattles AI
            </h1>

            <p className="text-slate-400">
              Intelligent Coding Assistant
            </p>

          </div>

          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 rounded-xl border border-slate-700 px-5 py-2 hover:bg-slate-800"
          >
            <ArrowLeft size={18} />
            Dashboard
          </button>

        </div>

      </header>

      {/* Chat */}

      <main className="mx-auto flex h-[calc(100vh-88px)] max-w-6xl flex-col px-6 py-6">

        <div className="flex-1 space-y-6 overflow-y-auto rounded-2xl border border-slate-700 bg-[#111827] p-6">

          {messages.map((message) => (

            <div
              key={message.id}
              className={`flex ${
                message.sender === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >

              <div
                className={`flex max-w-[80%] gap-3 rounded-2xl px-5 py-4 ${
                  message.sender === "user"
                    ? "bg-emerald-500 text-black"
                    : "bg-[#1E293B] text-white"
                }`}
              >

                {message.sender === "ai" ? (
                  <Bot className="mt-1 shrink-0" size={20} />
                ) : (
                  <User className="mt-1 shrink-0" size={20} />
                )}

                <p className="whitespace-pre-wrap leading-7">
                  {message.text}
                </p>

              </div>

            </div>

          ))}

          {loading && (

            <div className="flex">

              <div className="rounded-xl bg-[#1E293B] px-5 py-4">

                <p className="animate-pulse">
                  AI is thinking...
                </p>

              </div>

            </div>

          )}

          <div ref={bottomRef} />

        </div>

        {/* Input */}

        <div className="mt-6 flex gap-4">

          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSend();
              }
            }}
            placeholder="Ask anything about coding..."
            className="flex-1 rounded-xl border border-slate-700 bg-[#111827] px-5 py-4 outline-none transition focus:border-emerald-400"
          />

          <button
            onClick={handleSend}
            disabled={loading}
            className="rounded-xl bg-emerald-500 px-6 transition hover:bg-emerald-400 disabled:opacity-50"
          >
            <Send className="text-black" />
          </button>

        </div>

      </main>

    </div>
  );
}

export default Agent;