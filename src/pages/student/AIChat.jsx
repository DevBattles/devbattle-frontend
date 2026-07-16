import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Select, SelectItem } from "@/components/ui/Select";
import {
  Send,
  Bot,
  User,
  Code,
  Zap,
  MessageSquare,
  Trash2,
  Copy,
  Check,
} from "lucide-react";

function AIChat() {
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

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        role: "assistant",
        content: generateAIResponse(input, selectedTopic),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput, topic) => {
    const responses = {
      general: [
        "I'd be happy to help you with that! Could you provide more details about what you're trying to achieve?",
        "That's a great question. Let me break it down for you step by step.",
        "I can definitely assist with this. Here's what I recommend...",
      ],
      react: [
        "For React, I recommend using hooks like useState and useEffect for state management. Would you like me to show you an example?",
        "React components should be kept small and focused. Let me help you refactor this.",
        "For React performance, consider using useMemo and useCallback for expensive operations.",
      ],
      node: [
        "In Node.js, you can use the built-in fs module for file operations. Here's how...",
        "For Express.js, middleware functions are perfect for handling request processing.",
        "Node.js async/await makes handling asynchronous operations much cleaner.",
      ],
      javascript: [
        "JavaScript closures are powerful - they allow functions to access variables from their outer scope.",
        "ES6+ features like arrow functions and destructuring can make your code more concise.",
        "JavaScript promises and async/await are essential for handling asynchronous operations.",
      ],
      html: [
        "Semantic HTML elements like <header>, <nav>, and <main> improve accessibility and SEO.",
        "HTML5 introduced many new elements and APIs. Let me show you some useful ones.",
        "For forms, always use proper label elements and input types for better accessibility.",
      ],
      css: [
        "CSS Grid and Flexbox are powerful layout tools. Grid is great for 2D layouts, while Flexbox excels at 1D layouts.",
        "CSS custom properties (variables) make theming and maintenance much easier.",
        "For responsive design, always use relative units and media queries effectively.",
      ],
      tailwind: [
        "Tailwind's utility-first approach allows you to build designs directly in your HTML.",
        "You can extend Tailwind's theme in your tailwind.config.js file for custom values.",
        "Tailwind's @apply directive is useful for extracting common utility patterns.",
      ],
      debugging: [
        "Let me help you debug this. First, check the browser console for any error messages.",
        "Using console.log strategically can help identify where the issue occurs.",
        "The Chrome DevTools debugger is powerful for stepping through code execution.",
      ],
      "project-review": [
        "I'd be happy to review your project! Please share the code or describe the architecture.",
        "For project reviews, I look at code quality, performance, security, and best practices.",
        "Let me provide feedback on your project structure and suggest improvements.",
      ],
    };

    const topicResponses = responses[topic] || responses.general;
    return topicResponses[Math.floor(Math.random() * topicResponses.length)];
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
            {topics.map((topic) => (
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
            ))}
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
