"use client"; 

import { useState, useEffect } from "react";
import Level from "./level";
import Beach from "./beach";
import Game from "./game";
import Wind from "./wind";
import Footer from "./footer";
import Points from "./points";


useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-ZG3EYE9D4F';
    script.async = true;
    document.body.appendChild(script);
  
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
  
    gtag('config', 'G-ZG3EYE9D4F');
  
    return () => {
      document.body.removeChild(script);
    };
  }, []);


let direction = 180;

const levelSpeeds = {
    "Level 1": 1,
    "Level 2": 2,
    "Level 3": 4,
    "Level 4": 8,
    "Level 5": 16,
};

const levelDirections = {
    "Level 1": 180,
    "Level 2": 0,
    "Level 3": 90,
    "Level 4": 140,
    "Level 5": 200,
};

export default function FullPage() {
    const [level, setLevel] = useState(1); // Default to Level 1 speed
    const [selectedLevel, setSelectedLevel] = useState("Level 1");
    const [isOpen, setIsOpen] = useState(false);
    const [points, setPoints] = useState(0); 
    const [previousPoints, setPreviousPoints] = useState(0); 
    const [currentDirection, setCurrentDirection] = useState(direction); // For dynamically updating direction
    const [directionCounter, setDirectionCounter] = useState(1);

    useEffect(() => {
        if (selectedLevel === "Level 5") {
            const interval = setInterval(() => {
                setCurrentDirection(directionCounter);
                setDirectionCounter(prev => (prev < 360 ? prev + 1 : 1)); // Reset to 1 after 360
            }, 100); // Update direction every 100ms or as needed

            return () => clearInterval(interval); // Cleanup on unmount or level change
        }
    }, [selectedLevel, directionCounter]); 


    const resetPoints = () => {
        setPreviousPoints(points);
        setPoints(0); 
    };

    const handleLevelChange = (levelName) => {
        resetPoints();
        setLevel(levelSpeeds[levelName]); // Update the speed based on the level
        setSelectedLevel(levelName);
        if (levelName !== "Level 5") {
            setCurrentDirection(levelDirections[levelName]); // Static direction for other levels
        }
        setIsOpen(false);
    };

    

    return (
        <div>
            
            <Game level={level} direction={currentDirection} setPoints={setPoints} resetPoints={resetPoints}/>
            <Beach />
            <Wind level={level} direction={currentDirection}/>
            <Points points={points} previousPoints={previousPoints}/>
            <Level selectedLevel={selectedLevel} onLevelChange={handleLevelChange} isOpen={isOpen} setIsOpen={setIsOpen} />
            <Footer />
        </div>
    );
}
