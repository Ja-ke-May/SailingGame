"use client"; 

const CollectibleBuoy = ({ position }) => {
  return (
    <div
      className="absolute w-4 h-4 md:w-8 md:h-8 bg-yellow-500 rounded-full animate-pulse"
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
      }}
    ></div>
  );
};

export default CollectibleBuoy;
