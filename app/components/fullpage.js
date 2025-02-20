"use client"; 

import { useState, useEffect } from "react";
import Level from "./level";
import Beach from "./beach";
import Game from "./game";
import Wind from "./wind";
import Footer from "./footer";
import Points from "./points";


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

const windTypes = {
    "Level 1": "Offshore Wind",
    "Level 2": "Onshore Wind",
    "Level 3": "Cross-Shore Wind",
    "Level 4": "Cross Offshore Wind",
    "Level 5": "Tornado",
};

export default function FullPage() {
    const [level, setLevel] = useState(1); 
    const [selectedLevel, setSelectedLevel] = useState("Level 1");
    const [isOpen, setIsOpen] = useState(false);
    const [points, setPoints] = useState(0); 
    const [previousPoints, setPreviousPoints] = useState(0); 
    const [currentDirection, setCurrentDirection] = useState(direction); 
    const [directionCounter, setDirectionCounter] = useState(1);
    const [noGoZone, setNoGoZone] = useState(false); 

    useEffect(() => {
        if (selectedLevel === "Level 5") {
            const interval = setInterval(() => {
                setCurrentDirection(directionCounter);
                setDirectionCounter(prev => (prev < 360 ? prev + 1 : 1)); 
            }, 100); 

            return () => clearInterval(interval); 
        }
    }, [selectedLevel, directionCounter]); 


    const resetPoints = () => {
        setPreviousPoints(points);
        setPoints(0); 
    };

    const flashNoGo = () => {
        setNoGoZone(true); 
        setTimeout(() => {
            setNoGoZone(false); 
        }, 2000); 
    };
    

    const handleLevelChange = (levelName) => {
        resetPoints();
        setLevel(levelSpeeds[levelName]); 
        setSelectedLevel(levelName);
        if (levelName !== "Level 5") {
            setCurrentDirection(levelDirections[levelName]); 
        }
        setIsOpen(false);
    };

    const windType = windTypes[selectedLevel]; 

    return (
        <div>
            
            <Game level={level} direction={currentDirection} setPoints={setPoints} resetPoints={resetPoints} flashNoGo={flashNoGo}/>
            <Beach windType={windType} noGoZone={noGoZone} />
            <Wind level={level} direction={currentDirection}/>
            <Points points={points} previousPoints={previousPoints}/>
            <Level selectedLevel={selectedLevel} onLevelChange={handleLevelChange} isOpen={isOpen} setIsOpen={setIsOpen} />
            <Footer />
        </div>
    );
}
