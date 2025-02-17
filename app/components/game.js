import { useState, useEffect } from "react";
import Player from "./player";
import CollectibleBuoy from "./collectableCircle";

const Game = ({ level, direction, setPoints, resetPoints }) => {
    const [playerPosition, setPlayerPosition] = useState({ x: 100, y: 100 });
    const [targetPosition, setTargetPosition] = useState({ x: 100, y: 100 });
    const [rotation, setRotation] = useState(0);
    const [isMoving, setIsMoving] = useState(false);
    const [buoyPosition, setBuoyPosition] = useState(null); // Store buoy position
    const speed = level;

    // Rotation speed (adjust to your needs)
    const rotationSpeed = 0.02;

    // Generate random buoy position
    const generateBuoyPosition = () => {
        const gameContainer = document.querySelector('.game-container').getBoundingClientRect();
        const x = Math.random() * (gameContainer.width - 50); // Random X position inside container
        const y = Math.random() * (gameContainer.height - 50); // Random Y position inside container
        return { x, y };
    };

    // Check if player touches buoy
    const checkCollision = (buoy, player) => {
        const distance = Math.sqrt(
            Math.pow(buoy.x - player.x, 2) + Math.pow(buoy.y - player.y, 2)
        );
        return distance < 30; // Adjust this threshold for touch detection
    };

    const handleClick = (event) => {
        const gameContainer = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - gameContainer.left;
        const y = event.clientY - gameContainer.top;

        // Calculate the direction of the click
        const dx = x - playerPosition.x;
        const dy = y - playerPosition.y;
        const clickDirection = Math.atan2(dy, dx) * (180 / Math.PI); // Convert to degrees

        // Normalize the direction (ensure it's between 0 and 360)
        const normalizedClickDirection = (clickDirection + 360) % 360;

        // Normalize the current direction (ensure it's between 0 and 360)
        const normalizedCurrentDirection = (direction + 360) % 360;

        // Calculate the difference between the two directions
        let angleDifference = Math.abs((normalizedClickDirection - 90) - normalizedCurrentDirection);

        // Ensure the angle is within a 180-degree range (smallest angle)
        if (angleDifference > 180) {
            angleDifference = 360 - angleDifference;
        }

        // If the click is within 22 degrees of the current direction (wind direction)
        if (angleDifference > 22) {
            setTargetPosition({ x, y });
            setIsMoving(true);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setPlayerPosition((prev) => {
                let newX = prev.x;
                let newY = prev.y;

                // Convert the direction to radians
                const directionInRadians = ((direction - 90) * Math.PI) / 180;

                if (!isMoving) {
                    // Calculate movement in both X and Y directions based on the angle
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
                        // Smooth rotation
                        const diff = angle - prevRotation;
                        const rotationDelta = (diff + Math.PI) % (2 * Math.PI) - Math.PI;
                        return prevRotation + Math.min(Math.max(rotationDelta, -rotationSpeed), rotationSpeed);
                    });

                    newX = prev.x + (dx / distance) * speed;
                    newY = prev.y + (dy / distance) * speed;
                }

                // Check if player is near the container's edges (set the threshold as 10px margin)
                const margin = 10;
                const gameContainer = document.querySelector('.game-container').getBoundingClientRect();
                if (
                    newX <= margin || newX >= gameContainer.width - margin ||
                    newY <= margin || newY >= gameContainer.height - margin
                ) {
                     // Use setTimeout to delay the reset
                     setTimeout(() => {
                        resetPoints();
                    }, 200); // Set the delay (500ms in this example)

                    return { x: 100, y: 100 };
                     
                }

                return { x: newX, y: newY };
            });

            // Check for collision with buoy
            if (buoyPosition && checkCollision(buoyPosition, playerPosition)) {
                setBuoyPosition(null); // Remove the buoy if touched
                setPoints(prevPoints => prevPoints + 1); 
            }
        }, 16);

        return () => clearInterval(interval);
    }, [targetPosition, speed, direction, isMoving, buoyPosition, playerPosition]);

    useEffect(() => {
        // Spawn a new buoy when the game starts or after a buoy is collected
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
            position={playerPosition} 
            rotation={rotation}
            isMoving={isMoving} />
            {buoyPosition && <CollectibleBuoy position={buoyPosition} />}
        </div>
    );
};

export default Game;
