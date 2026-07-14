import { CodeXml } from "lucide-react";

function Logo() {
  return (
    <div className="flex items-center gap-3 cursor-pointer">
      <CodeXml
        className="text-[#4ADE80]"
        size={32}
        strokeWidth={2.5}
      />

      <h2 className="text-3xl font-bold">
        <span className="text-white">Dev</span>
        <span className="text-[#4ADE80]">Battles</span>
      </h2>
    </div>
  );
}

export default Logo;