"use client";

const Level = ({ selectedLevel, onLevelChange, isOpen, setIsOpen }) => {
  const levels = ["Level 1", "Level 2", "Level 3", "Level 4", "Level 5"];

  return (
    <div className="w-full h-20 top-0 flex justify-center fixed text-white">
      <div className="max-w-80 h-10 m-0 pl-2 text-lg md:text-3xl font-black border-2 border-blue-600 text-center bg-blue-600/80 rounded flex items-center justify-between md:p-2 relative">
        <p>{selectedLevel}</p>
        <button
          className={`w-6 h-6 ml-4 mr-2 mb-2 border-t-4 border-r-4 border-black transform transition-transform duration-300 ${
            isOpen ? "rotate-90" : "rotate-[135deg]"
          } rounded-t rounded-r cursor-pointer`}
          onClick={() => setIsOpen(!isOpen)}
        ></button>
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-blue-600/80 rounded shadow-md">
            {levels
              .filter((level) => level !== selectedLevel)
              .map((level, index) => (
                <div
                  key={index}
                  className="p-2 hover:bg-blue-900 cursor-pointer rounded"
                  onClick={() => {
                    onLevelChange(level); // Notify parent of level change
                    setIsOpen(false);
                  }}
                >
                  {level}
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Level;
