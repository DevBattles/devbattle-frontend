function ProblemPanel() {
    return (
      <div className="overflow-y-auto border-r border-slate-700 p-8">
  
        <span className="rounded-full bg-green-500 px-3 py-1 text-black">
          Easy
        </span>
  
        <h1 className="mt-5 text-4xl font-bold">
          Binary Search
        </h1>
  
        <p className="mt-6 leading-8 text-slate-400">
          Given a sorted array and a target value,
          return the index if the target exists,
          otherwise return -1.
        </p>
  
        <div className="mt-10">
  
          <h2 className="text-2xl font-bold">
            Example
          </h2>
  
          <pre className="mt-5 rounded-xl bg-[#111827] p-5">
  
  Input:
  nums=[1,2,3,4,5]
  target=4
  
  Output:
  3
  
          </pre>
  
        </div>
  
      </div>
    );
  }
  
  export default ProblemPanel;