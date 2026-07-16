import Editor from "@monaco-editor/react";
import { useState } from "react";

import EditorToolbar from "./EditorToolbar";

function EditorPanel() {

  const [code, setCode] = useState(`function binarySearch(nums,target){

}`);

  return (
    <div className="flex-1">

      <EditorToolbar />

      <Editor
        height="500px"
        theme="vs-dark"
        defaultLanguage="javascript"
        value={code}
        onChange={(value) => setCode(value)}
      />

    </div>
  );
}

export default EditorPanel;