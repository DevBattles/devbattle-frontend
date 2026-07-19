import { motion } from "framer-motion";

function Glow() {
  return (
    <motion.div
      animate={{
        scale: [1, 1.15, 1],
        opacity: [0.35, 0.6, 0.35],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
      }}
      className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500 blur-[160px]"
    />
  );
}

export default Glow;