const Beach = () => {
    return (
      <div
        className="w-full h-20 top-0 fixed bg-yellow-400 border-b-4 border-b-white/60"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(194, 178, 128, 0.9) 10%, rgba(184, 163, 118, 0.7) 50%, rgba(168, 150, 110, 0.6) 90%)`,
          backgroundSize: "cover",
          filter: "brightness(0.95) contrast(1.2)",
        }}
      />
    );
  };
  
  export default Beach;
  