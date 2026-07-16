function DifficultyBadge({ level }) {
    const colors = {
      Easy: "bg-green-500",
      Medium: "bg-yellow-500",
      Hard: "bg-red-500",
    };
  
    return (
      <span
        className={`rounded-full px-3 py-1 text-sm font-semibold text-black ${colors[level]}`}
      >
        {level}
      </span>
    );
  }
  
  export default DifficultyBadge;