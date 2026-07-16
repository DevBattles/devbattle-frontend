import ProblemPanel from "@/components/editor/ProblemPanel";
import EditorPanel from "@/components/editor/EditorPanel";
import ConsolePanel from "@/components/editor/ConsolePanel";

function CodeEditor() {
  return (
    <div className="h-screen bg-[#050816] text-white">

      <div className="grid h-full lg:grid-cols-2">

        {/* Left */}

        <ProblemPanel />

        {/* Right */}

        <div className="flex flex-col">

          <EditorPanel />

          <ConsolePanel />

        </div>

      </div>

    </div>
  );
}

export default CodeEditor;