"use client";

const Wind = ({ direction, level }) => {
  return (
    <div className="relative w-20 h-20 flex items-center justify-center rounded-full border-4 border-white/50 bg-white/40">
      <span className="absolute top-4 text-2xl font-bold text-white/50">Wind</span>
      <svg
        className="absolute"
        width="50"
        height="50"
        viewBox="0 0 32 32"
        style={{ transform: `rotate(${direction}deg)` }}
      >
        <polygon
          points="16,2 24,20 8,20"
          fill="red"
          opacity={.7}
        />
      </svg>
      
      {/* <span className="absolute bottom-2 text-lg font-bold text-red-900">{level}</span> */}
    </div>
  );
};

export default Wind;
