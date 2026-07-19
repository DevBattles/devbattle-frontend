import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import api from "@/services/api";
import {
  Send,
  Bot,
  User,
  Zap,
  Trash2,
  Copy,
} from "lucide-react";

function AIChat() {
  const [searchParams] = useSearchParams();
  const questionIdParam = searchParams.get("questionId");
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      content: "Hello! I'm your AI coding assistant. I can help you with React, Node.js, JavaScript, HTML, CSS, Tailwind, debugging, project reviews, and more. What would you like to work on today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("general");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const topics = [
    "general",
    "react",
    "node",
    "javascript",
    "html",
    "css",
    "tailwind",
    "debugging",
    "project-review",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (questionIdParam) {
      const fetchQuestion = async () => {
        try {
          const res = await api.get(`/questions/${questionIdParam}`);
          const q = res.data.data;
          setActiveQuestion(q);
          setSelectedTopic("Question Help");
          setMessages([
            {
              id: 1,
              role: "assistant",
              content: `Hello! I see you are working on the challenge "${q.title}" (${q.category || q.difficulty}). I am locked onto this challenge context. Ask me for hints, concept explanations, or bugs in your current code, and I will guide you!`,
              timestamp: new Date(),
            }
          ]);
        } catch (err) {
      console.error(err);

          console.error("Failed to load question details for chat", err);
    }
      };
      fetchQuestion();
    }
  }, [questionIdParam]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    try {
      const chatHistory = messages
        .filter((m) => m.id !== 1)
        .map((m) => ({
          role: m.role === "assistant" ? "model" : "user",
          content: m.content,
        }));

      const payload = {
        currentRole: "student",
        currentQuestion: activeQuestion ? {
          id: activeQuestion.id,
          title: activeQuestion.title,
          description: activeQuestion.description,
          category: activeQuestion.category,
          difficulty: activeQuestion.difficulty,
          requirements: activeQuestion.requirements,
          starterFiles: activeQuestion.starterFiles
        } : {
          title: selectedTopic,
          description: `General coding query about ${selectedTopic}.`,
        },
        currentContext: {
          type: activeQuestion ? "practice" : "chat",
          isActive: true,
        },
        chatHistory,
        message: input,
      };

      const response = await api.post("/ai/mentor/chat", payload);
      const resData = response.data?.data || response.data;

      const aiResponse = {
        id: newMessages.length + 1,
        role: "assistant",
        content: resData.response || resData.text || "Sorry, I could not generate an answer.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiResponse]);
    } catch (err) {
      console.error(err);

      console.warn("AI Backend request failed.", err);
      const errorMsg = err.response?.data?.error?.details || err.response?.data?.message || err.message || "Failed to reach AI Backend";
      const aiResponse = {
        id: newMessages.length + 1,
        role: "assistant",
        content: `Error: ${errorMsg}`,
        timestamp: new Date(),
    };
      setMessages((prev) => [...prev, aiResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 1,
        role: "assistant",
        content: "Chat cleared! How can I help you today?",
        timestamp: new Date(),
      },
    ]);
  };

  const handleCopyCode = (content) => {
    navigator.clipboard.writeText(content);
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">AI Chat</h1>
          <p className="text-slate-400">
            Get help with coding, debugging, and project reviews
          </p>
        </div>
        <Button
          onClick={handleClearChat}
          variant="outline"
          className="border-slate-600 bg-slate-800/50 text-white hover:bg-slate-800"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Clear Chat
        </Button>
      </div>

      {/* Chat Container */}
      <Card className="flex flex-1 flex-col overflow-hidden">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-4 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500/20">
                    <Bot className="h-5 w-5 text-emerald-400" />
                  </div>
                )}
                <div
                  className={`max-w-[70%] rounded-2xl p-4 ${
                    message.role === "user"
                      ? "bg-emerald-500 text-black"
                      : "bg-slate-800/50 text-white"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  <div className="mt-2 flex items-center justify-between gap-4">
                    <span className="text-xs opacity-60">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    {message.role === "assistant" && (
                      <button
                        onClick={() => handleCopyCode(message.content)}
                        className="opacity-60 hover:opacity-100"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
                {message.role === "user" && (
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/20">
                    <User className="h-5 w-5 text-blue-400" />
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-4 justify-start">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500/20">
                  <Bot className="h-5 w-5 text-emerald-400" />
                </div>
                <div className="rounded-2xl bg-slate-800/50 p-4">
                  <div className="flex gap-2">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-slate-400" />
                    <div className="h-2 w-2 animate-bounce rounded-full bg-slate-400 delay-100" />
                    <div className="h-2 w-2 animate-bounce rounded-full bg-slate-400 delay-200" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-slate-700 p-4">
          <div className="mb-3 flex flex-wrap gap-2">
            {activeQuestion ? (
              <span className="rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 text-xs font-semibold select-none">
                Locked Challenge Mode: {activeQuestion.title}
              </span>
            ) : (
              topics.map((topic) => (
                <button
                  key={topic}
                  onClick={() => setSelectedTopic(topic)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                    selectedTopic === topic
                      ? "bg-emerald-500 text-black"
                      : "bg-slate-800/50 text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  {topic.charAt(0).toUpperCase() + topic.slice(1).replace("-", " ")}
                </button>
              ))
            )}
          </div>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                placeholder="Ask me anything about coding..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                className="bg-slate-800/50"
              />
            </div>
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="bg-emerald-500 text-black hover:bg-emerald-400"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
            <Zap className="h-3 w-3" />
            <span>Powered by AI • Supports React, Node, JavaScript, HTML, CSS, Tailwind</span>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default AIChat;
