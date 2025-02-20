const Player = ({ position, rotation, isMoving, direction }) => {
    const { x, y } = position;

    let windRelativeAngle = ((direction - (rotation * (180 / Math.PI)) - 270) + 360) % 360;
    if (windRelativeAngle > 180) windRelativeAngle -= 360;
    
    let adjustedSailAngle = windRelativeAngle;
    if (adjustedSailAngle > -20 && adjustedSailAngle < 20) {
        adjustedSailAngle = adjustedSailAngle < 0 ? -20 : 20;
    }

    const sailRotation = Math.max(-90, Math.min(90, adjustedSailAngle));

    return (
        <div
            className="absolute"
            style={{
                top: `${y}px`,
                left: `${x}px`,
                transform: `translate(-50%, -50%) rotate(${rotation + Math.PI / 2}rad)`, 
            }}
        >
            {/* Player Body (Triangle) */}
            <div className="w-0 h-0 
                border-l-[15px] border-r-[15px] md:border-l-[30px] md:border-r-[30px] 
                border-b-[40px] md:border-b-[80px] 
                border-transparent border-b-orange-600"
            />

            {/* Sail animation */}
            <div 
                className="absolute -top-[-5px] -left-[-10px] md:-top-[-8px] md:-left-[-24px] flex flex-col items-center"
            >
                <div id='mast' className="w-[6px] h-[6px] md:w-[10px] md:h-[10px] bg-black rounded-full"></div>
                <div 
                style={{
                    transform: `rotate(${sailRotation}deg)`,
                    transformOrigin: "top center", 
                }}>
                <div className={`w-[10px] h-[10px] bg-black/80 rounded ${!isMoving ? "small-waving-animation" : ""}`}></div>
                <div className={`w-[10px] h-[10px] bg-black/60 rounded ${!isMoving ? "waving-animation" : ""}`} style={{ animationDelay: "0.2s" }}></div>
                <div className={`w-[10px] h-[10px] bg-black/50 rounded ${!isMoving ? "medium-waving-animation" : ""}`} style={{ animationDelay: "0.3s" }}></div>
                <div className={`hidden md:block w-[10px] h-[10px] bg-black/40 rounded ${!isMoving ? "big-waving-animation" : ""}`} style={{ animationDelay: "0.2s" }}></div>
                </div>
            </div>
        </div>
    );
};

export default Player;