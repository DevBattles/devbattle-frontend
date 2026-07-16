import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Editor from "@monaco-editor/react";
import {
  Play,
  RefreshCw,
  Download,
  Upload,
  Maximize2,
  Minimize2,
  FileCode,
  Folder,
  X,
  Check,
  Send,
  Terminal,
  Eye,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";

function Workspace() {
  const { id } = useParams();
  const [activeFile, setActiveFile] = useState("index.html");
  const [files, setFiles] = useState({
    "index.html": {
      name: "index.html",
      language: "html",
      code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Project</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Hello World!</h1>
        <p>Welcome to DevBattles Workspace</p>
        <button id="clickMe">Click Me</button>
    </div>
    <script src="script.js"></script>
</body>
</html>`,
    },
    "style.css": {
      name: "style.css",
      language: "css",
      code: `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.container {
    background: white;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
    text-align: center;
    max-width: 400px;
}

h1 {
    color: #333;
    margin-bottom: 1rem;
}

p {
    color: #666;
    margin-bottom: 1.5rem;
}

button {
    background: #667eea;
    color: white;
    border: none;
    padding: 0.75rem 2rem;
    border-radius: 0.5rem;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.3s ease;
}

button:hover {
    background: #764ba2;
    transform: translateY(-2px);
}`,
    },
    "script.js": {
      name: "script.js",
      language: "javascript",
      code: `document.getElementById('clickMe').addEventListener('click', function() {
    alert('Hello from DevBattles!');
    this.textContent = 'Clicked!';
    this.style.background = '#764ba2';
});`,
    },
  });
  const [previewHtml, setPreviewHtml] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState([]);
  const [showConsole, setShowConsole] = useState(true);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    updatePreview();
  }, [files]);

  const updatePreview = () => {
    const html = files["index.html"]?.code || "";
    const css = files["style.css"]?.code || "";
    const js = files["script.js"]?.code || "";

    const fullHtml = html
      .replace('href="style.css"', "")
      .replace('src="script.js"', "")
      .replace("</head>", `<style>${css}</style></head>`)
      .replace("</body>", `<script>${js}</script></body>`);

    setPreviewHtml(fullHtml);
  };

  const handleFileChange = (fileName, newCode) => {
    setFiles((prev) => ({
      ...prev,
      [fileName]: {
        ...prev[fileName],
        code: newCode,
      },
    }));
  };

  const handleRun = () => {
    updatePreview();
    setConsoleOutput((prev) => [
      ...prev,
      { type: "info", message: "Running code...", timestamp: new Date().toLocaleTimeString() },
    ]);
  };

  const handleReset = () => {
    setFiles({
      "index.html": {
        name: "index.html",
        language: "html",
        code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Project</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Hello World!</h1>
        <p>Welcome to DevBattles Workspace</p>
        <button id="clickMe">Click Me</button>
    </div>
    <script src="script.js"></script>
</body>
</html>`,
      },
      "style.css": {
        name: "style.css",
        language: "css",
        code: `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.container {
    background: white;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
    text-align: center;
    max-width: 400px;
}

h1 {
    color: #333;
    margin-bottom: 1rem;
}

p {
    color: #666;
    margin-bottom: 1.5rem;
}

button {
    background: #667eea;
    color: white;
    border: none;
    padding: 0.75rem 2rem;
    border-radius: 0.5rem;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.3s ease;
}

button:hover {
    background: #764ba2;
    transform: translateY(-2px);
}`,
      },
      "script.js": {
        name: "script.js",
        language: "javascript",
        code: `document.getElementById('clickMe').addEventListener('click', function() {
    alert('Hello from DevBattles!');
    this.textContent = 'Clicked!';
    this.style.background = '#764ba2';
});`,
      },
    });
    setConsoleOutput([]);
  };

  const handleDownload = () => {
    const fileContent = Object.values(files)
      .map((file) => `/* ${file.name} */\n${file.code}\n\n`)
      .join("\n");
    const blob = new Blob([fileContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "project.txt";
    a.click();
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitModalOpen(false);
      setConsoleOutput((prev) => [
        ...prev,
        { type: "success", message: "Submitted successfully!", timestamp: new Date().toLocaleTimeString() },
      ]);
    }, 2000);
  };

  return (
    <div className={`flex h-screen flex-col ${isFullscreen ? "fixed inset-0 z-50" : ""}`}>
      {/* Header */}
      <header className="flex items-center justify-between border-b border-slate-700 bg-[#111827] px-4 py-3">
        <div className="flex items-center gap-4">
          <Link to="/student/homework" className="text-slate-400 hover:text-white">
            <X className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="font-semibold text-white">React Portfolio</h1>
            <p className="text-xs text-slate-400">Homework • Due: Jan 20, 2024</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={handleRun}
            className="flex items-center gap-2 bg-emerald-500 text-black hover:bg-emerald-400"
          >
            <Play className="h-4 w-4" />
            Run
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            className="border-slate-600 bg-slate-800/50 text-white hover:bg-slate-800"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button
            onClick={handleDownload}
            variant="outline"
            className="border-slate-600 bg-slate-800/50 text-white hover:bg-slate-800"
          >
            <Download className="h-4 w-4" />
          </Button>
          <Button
            onClick={() => setIsSubmitModalOpen(true)}
            className="flex items-center gap-2 bg-blue-500 text-white hover:bg-blue-400"
          >
            <Send className="h-4 w-4" />
            Submit
          </Button>
          <Button
            onClick={() => setIsFullscreen(!isFullscreen)}
            variant="outline"
            className="border-slate-600 bg-slate-800/50 text-white hover:bg-slate-800"
          >
            {isFullscreen ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* File Explorer */}
        <aside className="w-64 border-r border-slate-700 bg-[#111827] p-4">
          <div className="mb-4 flex items-center gap-2 text-slate-300">
            <Folder className="h-4 w-4" />
            <span className="font-semibold">Project Files</span>
          </div>
          <ul className="space-y-1">
            {Object.values(files).map((file) => (
              <li key={file.name}>
                <button
                  onClick={() => setActiveFile(file.name)}
                  className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left transition ${
                    activeFile === file.name
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "text-slate-300 hover:bg-slate-800/50"
                  }`}
                >
                  <FileCode className="h-4 w-4" />
                  <span className="text-sm">{file.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Editor */}
        <div className="flex flex-1 flex-col">
          <div className="flex-1 overflow-hidden">
            <Editor
              height="100%"
              language={files[activeFile]?.language || "html"}
              value={files[activeFile]?.code || ""}
              onChange={(newCode) => handleFileChange(activeFile, newCode || "")}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: "on",
                roundedSelection: false,
                scrollBeyondLastLine: false,
                automaticLayout: true,
              }}
            />
          </div>

          {/* Console */}
          {showConsole && (
            <div className="border-t border-slate-700 bg-[#111827]">
              <div className="flex items-center justify-between border-b border-slate-700 px-4 py-2">
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <Terminal className="h-4 w-4" />
                  <span>Console</span>
                </div>
                <button
                  onClick={() => setShowConsole(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="h-32 overflow-y-auto p-4">
                {consoleOutput.length === 0 ? (
                  <p className="text-sm text-slate-500">No output yet</p>
                ) : (
                  consoleOutput.map((log, index) => (
                    <div
                      key={index}
                      className={`mb-2 text-sm ${
                        log.type === "error"
                          ? "text-red-400"
                          : log.type === "success"
                          ? "text-emerald-400"
                          : "text-slate-300"
                      }`}
                    >
                      <span className="text-slate-500">[{log.timestamp}]</span>{" "}
                      {log.message}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Preview */}
        <div className="flex w-1/2 flex-col border-l border-slate-700 bg-[#111827]">
          <div className="flex items-center justify-between border-b border-slate-700 px-4 py-2">
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Eye className="h-4 w-4" />
              <span>Live Preview</span>
            </div>
            <Badge variant="success" className="text-xs">
              Auto-refresh
            </Badge>
          </div>
          <div className="flex-1 overflow-auto bg-white">
            <iframe
              srcDoc={previewHtml}
              title="Preview"
              className="h-full w-full border-0"
              sandbox="allow-scripts"
            />
          </div>
        </div>
      </div>

      {/* Submit Modal */}
      <Modal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        title="Submit Assignment"
        size="md"
      >
        <div className="space-y-4">
          <div className="rounded-xl border border-slate-700/50 bg-slate-800/30 p-4">
            <h3 className="font-semibold text-white">React Portfolio</h3>
            <p className="text-sm text-slate-400">Homework Assignment</p>
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              GitHub Link (Optional)
            </label>
            <input
              type="text"
              placeholder="https://github.com/username/repo"
              className="w-full rounded-xl border border-slate-700 bg-[#0F172A] px-4 py-3 text-white outline-none focus:border-emerald-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Comments (Optional)
            </label>
            <textarea
              placeholder="Any notes about your submission..."
              className="w-full rounded-xl border border-slate-700 bg-[#0F172A] px-4 py-3 text-white outline-none focus:border-emerald-400 min-h-[100px]"
            />
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
            <Check className="h-5 w-5 text-emerald-400" />
            <p className="text-sm text-emerald-400">
              Your code will be reviewed by AI within minutes
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              onClick={() => setIsSubmitModalOpen(false)}
              variant="outline"
              className="border-slate-600 bg-slate-800/50 text-white hover:bg-slate-800"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-emerald-500 text-black hover:bg-emerald-400"
            >
              {isSubmitting ? "Submitting..." : "Submit Assignment"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Workspace;
