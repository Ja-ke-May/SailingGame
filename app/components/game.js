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
    const [gatePosition, setGatePosition] = useState({ x: 0, y: 0 });
    const [showStartButton, setShowStartButton] = useState(true); // State to toggle start button visibility

    useEffect(() => {
        setGatePosition({
            x: window.innerWidth,
            y: Math.random() * (window.innerHeight - 400) + 100,
        });
    }, []); 

    const handlePass = () => {
        setPoints((prev) => prev + 2);
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
        if (showStartButton) return; 

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
                   
                    setShowStartButton(true); // Show the start button again if player touches edge
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

    const handleStartButtonClick = () => {
        // Reset the game when the start button is clicked
        resetPoints();
        setPoints(0);
        setPlayerPosition({ x: 100, y: 100 });
        setTargetPosition({ x: 100, y: 100 });
        setShowStartButton(false); // Hide the start button
    };

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

{!showStartButton && (
                <>
                    <Player 
                        direction={direction}
                        position={playerPosition} 
                        rotation={rotation}
                        isMoving={isMoving} 
                    />
                    {buoyPosition && <CollectibleBuoy position={buoyPosition} />}
                    <RedBuoyGate 
                        speed={level / 3} 
                        onPass={handlePass} 
                        playerPosition={playerPosition}
                    />
                </>
            )}

            {/* Start Button */}
            {showStartButton && (
                <div className="w-full h-full bg-white/50">
                    <div className="max-w-full h-full flex flex-col items-center text-center text-white rounded">
                        <div className="bg-blue-600/80 pb-2 pl-2 pr-2 md:pb-4 md:pl-2 md:pr-2 "
                        style={{
                            backgroundImage: "radial-gradient(circle, rgba(0, 105, 148, 0.9) 10%, rgba(0, 110, 137, 0.7) 50%, rgba(0, 77, 94, 0.6) 90%)",
                            backgroundSize: "cover",
                            filter: "brightness(1.1) contrast(1.2)",
                            position: "absolute",
                        }}>
                        <h1 className="text-2xl font-black underline mb-2 mt-2">Sailing Game</h1>
                        <p>Collect Yellow Buoys for 1 Point.</p>
                        <p>Pass through the Red Buoys for 2 Points.</p>
<p>Points Top Right</p>
<p>Wind Direction Top Left.</p>
                        <p>Avoid the No-Go Zone.</p>
                        <p>5 Levels with different wind directions and speeds.</p>
                        </div>
                        </div>
                <div 
                    className="start-button absolute flex items-center justify-center rounded-full w-16 h-16 md:w-32 md:h-32 bg-green-600 text-white text-xl md:text-3xl border-2 border-white font-bold cursor-pointer"
                    style={{
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)", 
                    }}
                    onClick={handleStartButtonClick}
                >
                    Start
                </div>
                </div>
            )}
        </div>
    );
};

export default Game;
