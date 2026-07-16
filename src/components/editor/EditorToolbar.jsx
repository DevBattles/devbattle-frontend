function EditorToolbar() {
    return (
      <div className="flex items-center justify-between border-b border-slate-700 p-4">
  
        <select className="rounded-lg bg-[#111827] px-4 py-2">
  
          <option>C++</option>
          <option>Java</option>
          <option>Python</option>
          <option>JavaScript</option>
  
        </select>
  
        <div className="flex gap-3">
  
          <button className="rounded-lg bg-yellow-500 px-5 py-2 text-black">
            Run
          </button>
  
          <button className="rounded-lg bg-emerald-500 px-5 py-2 text-black">
            Submit
          </button>
  
        </div>
  
      </div>
    );
  }
  
  export default EditorToolbar;