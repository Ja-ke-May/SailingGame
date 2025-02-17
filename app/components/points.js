
const Points = ({ points, previousPoints }) => {
  return (
    <div className="absolute top-0 right-0  w-20 h-20 flex items-center justify-center rounded-full border-4 border-white/50 bg-white/40">
      <span className="absolute top-2 text-2xl font-bold text-blue-900">{points}</span>
      <span className="absolute top-10 text-lg font-bold text-blue-900">{previousPoints}</span>
      <svg
        className="absolute"
        width="50"
        height="50"
        viewBox="0 0 32 32"
        style={{ transform: `fade-in-out)` }}
      >
        
      </svg>
      
    </div>
  );
};

export default Points;
