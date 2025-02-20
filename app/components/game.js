import { useState, useEffect } from "react";
import Player from "./player";
import CollectibleBuoy from "./collectableCircle";
import RedBuoyGate from "./RedBuoyGate";

const Game = ({ level, direction, setPoints, resetPoints, flashNoGo }) => {
    const [playerPosition, setPlayerPosition] = useState({ x: 100, y: 100 });
    const [targetPosition, setTargetPosition] = useState({ x: 100, y: 100 });
    const [rotation, setRotation] = useState(0);
    const [isMoving, setIsMoving] = useState(false);
    const [buoyPosition, setBuoyPosition] = useState(null); 
    const [gatePosition, setGatePosition] = useState({
        x: window.innerWidth,
        y: Math.random() * (window.innerHeight - 400) + 100, // Initial random position
      });

      const handlePass = () => {
        setPoints((prev) => prev + 2);
    
        // Generate a new gate when the current one is passed
        setGatePosition({
          x: window.innerWidth,
          y: Math.random() * (window.innerHeight - 400) + 100,
        });
      };

    const speed = level;

    const rotationSpeed = 0.08;

    const generateBuoyPosition = () => {
        const gameContainer = document.querySelector('.game-container').getBoundingClientRect();
        const x = Math.random() * (gameContainer.width - 50);
        const y = Math.random() * (gameContainer.height - 50); 
        return { x, y };
    };

    const checkCollision = (buoy, player) => {
        const distance = Math.sqrt(
            Math.pow(buoy.x - player.x, 2) + Math.pow(buoy.y - player.y, 2)
        );
        return distance < 30; 
    };

    const handleClick = (event) => {
        const gameContainer = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - gameContainer.left;
        const y = event.clientY - gameContainer.top;

        const dx = x - playerPosition.x;
        const dy = y - playerPosition.y;
        const clickDirection = Math.atan2(dy, dx) * (180 / Math.PI); 

        const normalizedClickDirection = (clickDirection + 360) % 360;

        const normalizedCurrentDirection = (direction + 360) % 360;

        let angleDifference = Math.abs((normalizedClickDirection - 90) - normalizedCurrentDirection);

        if (angleDifference > 180) {
            angleDifference = 360 - angleDifference;
        }

    if (angleDifference > 22) {
        setTargetPosition({ x, y });
        setIsMoving(true);
    } else {
        flashNoGo(); 
    }
};

    useEffect(() => {
        const interval = setInterval(() => {
            setPlayerPosition((prev) => {
                let newX = prev.x;
                let newY = prev.y;

                
                const directionInRadians = ((direction - 90) * Math.PI) / 180;

                if (!isMoving) {
                    
                    newX += Math.cos(directionInRadians) * speed / 5;
                    newY += Math.sin(directionInRadians) * speed / 5;
                }

                if (isMoving) {
                    const dx = targetPosition.x - prev.x;
                    const dy = targetPosition.y - prev.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < speed) {
                        setIsMoving(false);
                        return targetPosition;
                    }

                    const angle = Math.atan2(dy, dx);
                    setRotation((prevRotation) => {
                    
                        const diff = angle - prevRotation;
                        const rotationDelta = (diff + Math.PI) % (2 * Math.PI) - Math.PI;
                        return prevRotation + Math.min(Math.max(rotationDelta, -rotationSpeed), rotationSpeed);
                    });

                    newX = prev.x + (dx / distance) * speed;
                    newY = prev.y + (dy / distance) * speed;
                }

                const margin = 10;
                const gameContainer = document.querySelector('.game-container').getBoundingClientRect();
                if (
                    newX <= margin || newX >= gameContainer.width - margin ||
                    newY <= margin || newY >= gameContainer.height - margin
                ) {
                     setTimeout(() => {
                        resetPoints();
                    }, 200); 

                    return { x: 100, y: 100 };
                     
                }

                return { x: newX, y: newY };
            });

            if (buoyPosition && checkCollision(buoyPosition, playerPosition)) {
                setBuoyPosition(null); 
                setPoints(prevPoints => prevPoints + 1); 
            }
        }, 16);

        return () => clearInterval(interval);
    }, [targetPosition, speed, direction, isMoving, buoyPosition, playerPosition]);

    useEffect(() => {
        if (!buoyPosition) {
            setBuoyPosition(generateBuoyPosition());
        }
    }, [buoyPosition]);

   

    return (
        <div
            className="game-container absolute w-full h-[88%] mt-20 fixed bg-blue-500"
            style={{
                backgroundImage: "radial-gradient(circle, rgba(0, 105, 148, 0.9) 10%, rgba(0, 110, 137, 0.7) 50%, rgba(0, 77, 94, 0.6) 90%)",
                backgroundSize: "cover",
                filter: "brightness(1.1) contrast(1.2)",
                position: "absolute",
            }}
            onClick={handleClick}
        >
            <Player 
            direction={direction}
            position={playerPosition} 
            rotation={rotation}
            isMoving={isMoving} />

            {buoyPosition && <CollectibleBuoy position={buoyPosition} />}

            <RedBuoyGate 
        speed={(level/3)} 
        onPass={handlePass} 
        playerPosition={playerPosition}
      />

        </div>
    );
};

export default Game;
