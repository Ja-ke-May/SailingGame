import { useEffect, useState } from "react";

const RedBuoyGate = ({ speed, onPass, playerPosition }) => {
    const [position, setPosition] = useState({
        x: 0, // Initial value set to 0, since it will be updated in useEffect
        y: 0, // Initial value set to 0
      });

  const [passed, setPassed] = useState(false); // Track whether the gate has been passed
  const [opacity, setOpacity] = useState(1); // Track opacity for fade effect

  useEffect(() => {
    // This will only run client-side when window is available
    setPosition({
      x: window.innerWidth, // Update after mount
      y: Math.random() * (window.innerHeight - 400) + 100,
    });
  }, []); // Empty dependency array ensures this runs only once after the first render


  useEffect(() => {
    const moveInterval = setInterval(() => {
      setPosition((prev) => {
        const newX = prev.x - speed;

        // Reset gate if it moves off-screen
        if (newX < -50) {
          setPassed(false); // Reset passed state when the gate resets off-screen
          setOpacity(1); // Reset opacity for next gate
          return { x: window.innerWidth - 100, y: Math.random() * (window.innerHeight - 400) + 100 };
        }

        return { ...prev, x: newX };
      });
    }, 16);

    return () => clearInterval(moveInterval);
  }, [speed]);

  useEffect(() => {
    const gateLeftEdge = position.x;
    const gateRightEdge = position.x + 50; // Adjust based on gate size
    const gateTop = position.y - 50;
    const gateBottom = position.y + 50;

    const playerX = playerPosition.x;
    const playerY = playerPosition.y;

    // Check if player is inside the gate area and hasn't passed it yet
    if (
      !passed &&
      playerX > gateLeftEdge &&
      playerX < gateRightEdge &&
      playerY > gateTop &&
      playerY < gateBottom
    ) {
      setPassed(true); // Mark the gate as passed
      setOpacity(0); // Fade the gate out by setting opacity to 0
      onPass(); // Trigger pass and increase points
    }
  }, [playerPosition, position, onPass, passed]);

  return (
    <div className="max-h-[90%] w-full">
      {/* Top Red Buoy */}
      <div
        className="absolute w-4 h-4 bg-red-600 rounded-full"
        style={{
          top: `${position.y - 50}px`,
          left: `${position.x}px`,
          opacity: opacity, // Apply opacity for fade effect
          transition: "opacity 0.3s ease-out", // Faster fade transition
        }}
      />
      {/* Bottom Red Buoy */}
      <div
        className="absolute w-4 h-4 bg-red-600 rounded-full"
        style={{
          top: `${position.y + 50}px`,
          left: `${position.x}px`,
          opacity: opacity, // Apply opacity for fade effect
          transition: "opacity 0.3s ease-out", // Faster fade transition
        }}
      />
    </div>
  );
};

export default RedBuoyGate;
