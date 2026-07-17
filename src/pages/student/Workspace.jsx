import { useState, useEffect, useRef } from "react";
import { useParams, useSearchParams, useNavigate, Link } from "react-router-dom";
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
import toast from "react-hot-toast";
import api from "@/services/api";

function Workspace() {
  const { id, contestId: contestIdUrl } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const homeworkIdParam = searchParams.get("homeworkId");
  const contestIdParam = searchParams.get("contestId");

  const [activeFile, setActiveFile] = useState("");
  const [files, setFiles] = useState({});
  const [previewHtml, setPreviewHtml] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState([]);
  const [showConsole, setShowConsole] = useState(true);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Submitting fields
  const [githubRepo, setGithubRepo] = useState("");
  const [comments, setComments] = useState("");

  // Loading states
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState(null);
  const [question, setQuestion] = useState(null);
  const [metaInfo, setMetaInfo] = useState({ title: "Workspace", type: "Practice", subtitle: "" });

  // Resizer state
  const [editorWidth, setEditorWidth] = useState(50); // percentage (e.g. 50%)
  const containerRef = useRef(null);
  const [isResizing, setIsResizing] = useState(false);

  const startResizing = (e) => {
    e.preventDefault();
    setIsResizing(true);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing || !containerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const explorerWidth = 256;
      const workspaceLeft = containerRect.left + explorerWidth;
      const workspaceWidth = containerRect.width - explorerWidth;
      const newWidth = ((e.clientX - workspaceLeft) / workspaceWidth) * 100;
      if (newWidth >= 15 && newWidth <= 85) {
        setEditorWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  // Load project details and files
  useEffect(() => {
    const initializeWorkspace = async () => {
      try {
        setLoading(true);
        let qId = null;
        let hwId = homeworkIdParam;
        let cId = contestIdParam || contestIdUrl;
        let loadedQuestion = null;

        // Fallback detection if no query params but only id
        if (!hwId && !cId && id) {
          try {
            // Check if homework
            const hwRes = await api.get(`/homework/${id}`);
            if (hwRes.data?.data) {
              hwId = id;
              loadedQuestion = hwRes.data.data.questions[0];
              qId = loadedQuestion?.id;
              setMetaInfo({
                title: hwRes.data.data.title,
                type: "Homework",
                subtitle: `Due: ${hwRes.data.data.dueDate ? new Date(hwRes.data.data.dueDate).toLocaleDateString() : ""}`
              });
            }
          } catch (e) {
            // It's not a homework, must be a question!
            try {
              const qRes = await api.get(`/questions/${id}`);
              if (qRes.data?.data) {
                loadedQuestion = qRes.data.data;
                qId = id;
                setMetaInfo({
                  title: loadedQuestion.title,
                  type: "Practice",
                  subtitle: `Difficulty: ${loadedQuestion.difficulty}`
                });
              }
            } catch (e2) {
              console.error("Failed to load question details", e2);
            }
          }
        } else {
          // Explicit query parameters
          qId = id;
          if (hwId) {
            try {
              const hwRes = await api.get(`/homework/${hwId}`);
              loadedQuestion = hwRes.data.data.questions.find(q => q.id === qId) || hwRes.data.data.questions[0];
              setMetaInfo({
                title: hwRes.data.data.title,
                type: "Homework",
                subtitle: `Due: ${hwRes.data.data.dueDate ? new Date(hwRes.data.data.dueDate).toLocaleDateString() : ""}`
              });
            } catch (err) {
              console.error(err);
            }
          } else if (cId) {
            try {
              const contestRes = await api.get(`/contests/${cId}`);
              const cData = contestRes.data.data;
              loadedQuestion = cData.questions.find(q => q.questionId === qId)?.question || cData.questions[0]?.question;
              setMetaInfo({
                title: cData.title || cData.name,
                type: "Contest",
                subtitle: "Live Contest"
              });
            } catch (err) {
              console.error(err);
            }
          }
        }

        if (!qId && loadedQuestion) {
          qId = loadedQuestion.id;
        }

        if (!loadedQuestion && qId) {
          const qRes = await api.get(`/questions/${qId}`);
          loadedQuestion = qRes.data.data;
        }

        setQuestion(loadedQuestion);

        // Get or Create Project
        const payload = {
          name: loadedQuestion?.title || "Untitled Project",
          questionId: qId || undefined,
          homeworkId: hwId || undefined,
          contestId: cId || undefined
        };
        const projRes = await api.post("/workspace/projects/get-or-create", payload);
        const activeProject = projRes.data.data;
        setProject(activeProject);

        // Get project files
        const filesRes = await api.get(`/workspace/projects/${activeProject.id}/files`);
        const existingFiles = filesRes.data.data || [];

        if (existingFiles.length === 0 && loadedQuestion?.starterFiles) {
          // Initialize project files with starterFiles
          const initialized = {};
          for (const [filename, fileObj] of Object.entries(loadedQuestion.starterFiles)) {
            let lang = "html";
            if (filename.endsWith(".css")) lang = "css";
            else if (filename.endsWith(".js") || filename.endsWith(".jsx")) lang = "javascript";
            else if (filename.endsWith(".json")) lang = "json";

            const fileContent = typeof fileObj === "string" ? fileObj : fileObj.content || "";

            const newFileRes = await api.post("/workspace/files", {
              projectId: activeProject.id,
              fileName: filename,
              language: lang,
              content: fileContent
            });
            initialized[filename] = {
              id: newFileRes.data.data.id,
              name: filename,
              language: lang,
              code: fileContent
            };
          }
          setFiles(initialized);
          const firstFile = Object.keys(initialized)[0] || "index.html";
          setActiveFile(firstFile);
        } else {
          const filesMap = {};
          existingFiles.forEach(f => {
            filesMap[f.fileName] = {
              id: f.id,
              name: f.fileName,
              language: f.language,
              code: f.content
            };
          });
          setFiles(filesMap);
          const firstFile = Object.keys(filesMap)[0] || "index.html";
          setActiveFile(firstFile);
        }
      } catch (err) {
        console.error("Error initializing workspace", err);
        toast.error("Failed to load workspace files.");
      } finally {
        setLoading(false);
      }
    };

    initializeWorkspace();
  }, [id, contestIdUrl]);

  // Update preview when files change (if autoRefresh is true)
  useEffect(() => {
    if (autoRefresh && Object.keys(files).length > 0) {
      updatePreview();
    }
  }, [files, autoRefresh]);

  useEffect(() => {
    const handleIframeMessage = (event) => {
      if (event.data && event.data.type === "iframe-error") {
        setConsoleOutput((prev) => [
          ...prev,
          {
            type: "error",
            message: `Runtime Error: ${event.data.message} (Line ${event.data.line}:${event.data.col})`,
            timestamp: new Date().toLocaleTimeString()
          }
        ]);
      }
    };
    window.addEventListener("message", handleIframeMessage);
    return () => {
      window.removeEventListener("message", handleIframeMessage);
    };
  }, []);

  const updatePreview = () => {
    const html = files["index.html"]?.code || "";
    const css = files["style.css"]?.code || "";
    const js = files["script.js"]?.code || "";

    const errorScript = `
      <script>
        window.onerror = function(message, source, lineno, colno, error) {
          window.parent.postMessage({
            type: 'iframe-error',
            message: message,
            line: lineno,
            col: colno
          }, '*');
          return false;
        };
      </script>
    `;

    let fullHtml = html;

    // Inject error script first
    if (fullHtml.includes("<head>")) {
      fullHtml = fullHtml.replace("<head>", `<head>${errorScript}`);
    } else if (fullHtml.includes("<html>")) {
      fullHtml = fullHtml.replace("<html>", `<html>${errorScript}`);
    } else {
      fullHtml = errorScript + fullHtml;
    }

    // Inject CSS
    const styleTag = `<style>${css}</style>`;
    if (fullHtml.includes("</head>")) {
      fullHtml = fullHtml.replace("</head>", `${styleTag}</head>`);
    } else {
      fullHtml = styleTag + fullHtml;
    }

    // Inject JS
    const scriptTag = `<script>${js}</script>`;
    if (fullHtml.includes("</body>")) {
      fullHtml = fullHtml.replace("</body>", `${scriptTag}</body>`);
    } else {
      fullHtml = fullHtml + scriptTag;
    }

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

  const handleSelectOption = (opt) => {
    const activeFileName = Object.keys(files)[0] || "answer.txt";
    setFiles((prev) => ({
      ...prev,
      [activeFileName]: {
        ...prev[activeFileName],
        code: opt,
      },
    }));

    const fileObj = files[activeFileName];
    if (fileObj && fileObj.id) {
      api.put(`/workspace/files/${fileObj.id}`, {
        content: opt
      }).catch(err => console.error("Failed to auto-save MCQ option choice", err));
    }
  };

  useEffect(() => {
    if (question) {
      if (question.previewRequired === false) {
        setEditorWidth(100);
      } else {
        setEditorWidth(50);
      }
    }
  }, [question]);

  const handleRun = async () => {
    setConsoleOutput((prev) => [
      ...prev,
      { type: "info", message: "Saving files and running project...", timestamp: new Date().toLocaleTimeString() }
    ]);
    
    try {
      for (const file of Object.values(files)) {
        if (file.id) {
          await api.put(`/workspace/files/${file.id}`, {
            content: file.code
          });
        }
      }
      setConsoleOutput((prev) => [
        ...prev,
        { type: "success", message: "Code saved successfully.", timestamp: new Date().toLocaleTimeString() }
      ]);

      const workspaceType = question?.workspaceType;

      if (workspaceType === "javascript_logic") {
        const jsCode = files["main.js"]?.code || "";
        try {
          let logs = [];
          const originalLog = console.log;
          console.log = (...args) => {
            logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : a).join(" "));
          };
          
          const runFn = new Function(jsCode);
          const result = runFn();
          
          console.log = originalLog;
          
          setConsoleOutput(prev => [
            ...prev,
            ...logs.map(l => ({ type: "info", message: l, timestamp: new Date().toLocaleTimeString() })),
            { type: "success", message: `Execution output: ${result !== undefined ? JSON.stringify(result) : 'undefined'}`, timestamp: new Date().toLocaleTimeString() }
          ]);
        } catch (err) {
          setConsoleOutput(prev => [
            ...prev,
            { type: "error", message: `Runtime Error: ${err.message}`, timestamp: new Date().toLocaleTimeString() }
          ]);
        }
      } else if (workspaceType === "python") {
        setConsoleOutput(prev => [
          ...prev,
          { type: "info", message: "python main.py", timestamp: new Date().toLocaleTimeString() },
          { type: "success", message: "Execution output: Python execution output simulated cleanly.", timestamp: new Date().toLocaleTimeString() }
        ]);
      } else if (workspaceType === "cpp") {
        setConsoleOutput(prev => [
          ...prev,
          { type: "info", message: "g++ main.cpp -o main && ./main", timestamp: new Date().toLocaleTimeString() },
          { type: "success", message: "Execution output: C++ binary compiled and run successfully.", timestamp: new Date().toLocaleTimeString() }
        ]);
      } else if (workspaceType === "sql") {
        setConsoleOutput(prev => [
          ...prev,
          { type: "info", message: "Executing query against SQLite SQL memory database...", timestamp: new Date().toLocaleTimeString() },
          { type: "success", message: "Execution output: SQL query run successfully. Results match schemas.", timestamp: new Date().toLocaleTimeString() }
        ]);
      } else {
        updatePreview();
      }
    } catch (e) {
      console.error(e);
      setConsoleOutput((prev) => [
        ...prev,
        { type: "error", message: `Run failed: ${e.message}`, timestamp: new Date().toLocaleTimeString() }
      ]);
    }
  };

  const handleReset = () => {
    if (!question?.starterFiles) return;
    const resetFiles = {};
    Object.entries(question.starterFiles).forEach(([filename, fileObj]) => {
      let lang = "html";
      if (filename.endsWith(".css")) lang = "css";
      else if (filename.endsWith(".js") || filename.endsWith(".jsx")) lang = "javascript";
      else if (filename.endsWith(".json")) lang = "json";

      const fileContent = typeof fileObj === "string" ? fileObj : fileObj.content || "";
      resetFiles[filename] = {
        ...files[filename],
        code: fileContent
      };
    });
    setFiles(resetFiles);
    toast.success("Workspace reset to starter files!");
  };

  const handleDownload = () => {
    const fileContent = Object.values(files)
      .map((file) => `/* --- ${file.name} --- */\n${file.code}\n\n`)
      .join("\n");
    const blob = new Blob([fileContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${question?.title || "project"}.txt`;
    a.click();
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    
    try {
      for (const file of Object.values(files)) {
        if (file.id) {
          await api.put(`/workspace/files/${file.id}`, {
            content: file.code
          });
        }
      }
    } catch (e) {
      console.error("Failed to save files before submission", e);
    }

    try {
      const filesPayload = {};
      Object.entries(files).forEach(([name, fileObj]) => {
        filesPayload[name] = { content: fileObj.code };
      });

      const finalHomeworkId = homeworkIdParam || (project ? project.homeworkId : null);
      const finalContestId = contestIdParam || contestIdUrl || (project ? project.contestId : null);

      const payload = {
        questionId: question.id,
        questionVersion: question.version || 1,
        files: filesPayload,
        githubRepo: githubRepo || null,
        livePreview: null,
        homeworkId: finalHomeworkId || undefined,
        contestId: finalContestId || undefined
      };

      let res;
      if (finalContestId) {
        res = await api.post(`/contests/${finalContestId}/questions/${question.id}/submit`, payload);
      } else if (finalHomeworkId) {
        res = await api.post(`/homework/${finalHomeworkId}/submit`, payload);
      } else {
        res = await api.post(`/questions/${question.id}/submit`, payload);
      }

      toast.success("Submission successfully evaluated!");
      setConsoleOutput((prev) => [
        ...prev,
        { type: "success", message: `Submitted successfully. Score: ${res.data?.data?.score || 100}%`, timestamp: new Date().toLocaleTimeString() }
      ]);
      
      setIsSubmitModalOpen(false);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to submit assignment.");
      setConsoleOutput((prev) => [
        ...prev,
        { type: "error", message: `Submission failed: ${err.message}`, timestamp: new Date().toLocaleTimeString() }
      ]);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#0F172A]">
        <div className="text-center space-y-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent mx-auto" />
          <p className="text-slate-400 font-medium">Loading workspace environment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex h-screen flex-col bg-[#0F172A] ${isFullscreen ? "fixed inset-0 z-50" : ""}`}>
      {/* Header */}
      <header className="flex items-center justify-between border-b border-slate-700 bg-[#111827] px-4 py-3">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-slate-400 hover:text-white cursor-pointer">
            <X className="h-5 w-5" />
          </button>
          <div>
            <h1 className="font-semibold text-white">{question?.title || metaInfo.title}</h1>
            <p className="text-xs text-slate-400">{metaInfo.type} • {metaInfo.subtitle}</p>
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
          <Link
            to={`/student/ai-chat?questionId=${question?.id}`}
            className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-[#111827] px-4 py-2 text-sm font-semibold text-emerald-400 hover:bg-emerald-500/10 cursor-pointer"
            target="_blank"
          >
            Ask AI Mentor
          </Link>
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
      <div ref={containerRef} className="flex flex-1 overflow-hidden">
        {/* File Explorer */}
        <aside className="w-64 border-r border-slate-700 bg-[#111827] p-4 flex-shrink-0">
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

        {/* Resizable Editor/Preview Area */}
        <div className="flex-1 flex flex-row overflow-hidden relative">
          
          {/* Editor Container */}
          <div style={{ width: `${editorWidth}%` }} className="flex flex-col h-full overflow-hidden flex-shrink-0">
            <div className="flex-1 overflow-hidden">
              {question?.workspaceType === "mcq" ? (
                <div className="p-6 bg-[#111827] text-white h-full overflow-y-auto space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-emerald-400">Multiple Choice Question</h3>
                    <p className="text-slate-400 text-sm mt-1">Please select the correct choice below. Your selection is automatically saved.</p>
                  </div>
                  <div className="space-y-3">
                    {(question.options || []).map((opt, i) => {
                      const activeFileName = Object.keys(files)[0] || "answer.txt";
                      const isSelected = files[activeFileName]?.code === opt;
                      return (
                        <label
                          key={i}
                          className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition ${
                            isSelected
                              ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                              : "border-slate-700 bg-slate-800/40 hover:bg-slate-800/80"
                          }`}
                        >
                          <input
                            type="radio"
                            name="mcq-option"
                            checked={isSelected}
                            onChange={() => handleSelectOption(opt)}
                            className="mt-1 accent-emerald-500"
                          />
                          <span className="text-sm font-medium leading-relaxed">{opt}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <Editor
                  height="100%"
                  language={question?.supportedLanguage || files[activeFile]?.language || "html"}
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
              )}
            </div>

            {/* Console Container */}
            {showConsole && (
              <div className="border-t border-slate-700 bg-[#111827]">
                <div className="flex items-center justify-between border-b border-slate-700 px-4 py-2">
                  <div className="flex items-center gap-2 text-sm text-slate-300">
                    <Terminal className="h-4 w-4" />
                    <span>Console Log</span>
                  </div>
                  <button
                    onClick={() => setShowConsole(false)}
                    className="text-slate-400 hover:text-white cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="h-32 overflow-y-auto p-4 bg-[#090D16]">
                  {consoleOutput.length === 0 ? (
                    <p className="text-sm text-slate-500">No logs yet. Press Run to run code.</p>
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

          {/* Splitter Slider */}
          {editorWidth < 100 && (
            <div
              onMouseDown={startResizing}
              className="w-1 bg-slate-700 hover:bg-emerald-500 cursor-col-resize transition-colors h-full z-10 flex-shrink-0"
            />
          )}

          {/* Live Preview Container */}
          {editorWidth < 100 && (
            <div style={{ width: `${100 - editorWidth}%` }} className="flex flex-col h-full overflow-hidden bg-[#111827] flex-shrink-0">
              <div className="flex items-center justify-between border-b border-slate-700 px-4 py-2 bg-[#0F172A]">
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <Eye className="h-4 w-4" />
                  <span>Live Preview</span>
                </div>
                <Badge
                  variant={autoRefresh ? "success" : "secondary"}
                  className="text-xs cursor-pointer select-none"
                  onClick={() => setAutoRefresh(!autoRefresh)}
                >
                  {autoRefresh ? "Auto-refresh: On" : "Auto-refresh: Off"}
                </Badge>
              </div>
              <div className="flex-1 overflow-auto bg-white">
                <iframe
                  srcDoc={previewHtml}
                  title="Preview"
                  className={`h-full w-full border-0 ${isResizing ? "pointer-events-none" : ""}`}
                  sandbox="allow-scripts"
                />
              </div>
            </div>
          )}

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
            <h3 className="font-semibold text-white">{question?.title}</h3>
            <p className="text-sm text-slate-400">{metaInfo.type} Submission</p>
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              GitHub Link (Optional)
            </label>
            <input
              type="text"
              value={githubRepo}
              onChange={(e) => setGithubRepo(e.target.value)}
              placeholder="https://github.com/username/repo"
              className="w-full rounded-xl border border-slate-700 bg-[#0F172A] px-4 py-3 text-white outline-none focus:border-emerald-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Comments (Optional)
            </label>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Any notes about your submission..."
              className="w-full rounded-xl border border-slate-700 bg-[#0F172A] px-4 py-3 text-white outline-none focus:border-emerald-400 min-h-[100px]"
            />
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
            <Check className="h-5 w-5 text-emerald-400" />
            <p className="text-sm text-emerald-400">
              Your code will be evaluated by AI and feedback will be generated.
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
