import React, { useEffect, useState } from 'react';

// --- Constants & Configuration ---
const ARC_RADIUS = 330;
const CENTER_X = 300;
const CENTER_Y = 300;
const DURATION = 1500; // ms per step/rotation

// Define the **visual positions** (deg, size, op) 
// Index 0: Top-left, Index 1: Center, Index 2: Bottom-right
const POSITIONS = [
    { deg: 145, size: 24, op: 0.41 }, // Top position
    { deg: 96,  size: 92, op: 1.0 },  // Center position (Highlighted)
    { deg: 35,  size: 24, op: 0.41 }, // Bottom position
];

// Define all numbers. We'll use more data points than visible positions.
const ALL_ARC_DATA = [
    { id: 0, number: '00', label: 'Label 00', subject: 'Subject 00' },
    { id: 1, number: '01', label: 'Label 01', subject: 'Subject 01' },
    { id: 2, number: '02', label: 'Label 02', subject: 'Subject 02' },
    { id: 3, number: '03', label: 'Label 03', subject: 'Subject 03' },
    { id: 4, number: '04', label: 'Label 04', subject: 'Subject 04' },
    { id: 5, number: '05', label: 'Label 05', subject: 'Subject 05' },
];

// --- Utility Function ---
function getArcCoord(deg, radius, cx = CENTER_X, cy = CENTER_Y) {
    // Converts degree to Cartesian coordinates on the circle
    const radians = (deg - 90) * (Math.PI / 180);
    return {
        x: cx + radius * Math.cos(radians),
        y: cy + radius * Math.sin(radians)
    };
}

// --- Preloader Component ---
const Preloader = () => {
    // The index of the item that is currently in the center (from ALL_ARC_DATA)
    const [centerIndex, setCenterIndex] = useState(1); // Start with '01' in center

    // Create the array of VISIBLE numbers based on the centerIndex
    // This array will hold the 3 numbers currently visible on the arc
    const visibleArcNumbers = [];
    const totalItems = ALL_ARC_DATA.length;

    // Determine the three visible indices in the ALL_ARC_DATA array
    // Top index (index 0) is one step before the center index
    const topIndex = (centerIndex - 1 + totalItems) % totalItems;
    // Center index (index 1) is the current centerIndex
    // Bottom index (index 2) is one step after the center index
    const bottomIndex = (centerIndex + 1) % totalItems;

    // Map the data to the visible positions (top, center, bottom)
    [topIndex, centerIndex, bottomIndex].forEach((dataIdx, posIdx) => {
        const item = ALL_ARC_DATA[dataIdx];
        const positionStyle = POSITIONS[posIdx];
        visibleArcNumbers.push({
            ...item,
            ...positionStyle,
            isCenter: posIdx === 1 // True if this is the center position
        });
    });

    // Autoplay loop using setInterval (simpler for step-by-step logic)
    useEffect(() => {
        const intervalId = setInterval(() => {
            // Move to the next center number, looping back to 0 after the last one
            setCenterIndex(prevIdx => (prevIdx + 1) % totalItems);
        }, DURATION);

        return () => clearInterval(intervalId); // Cleanup
    }, [totalItems]);

    // Calculate coordinates for the static arc curve (using the visible positions)
    const topCoord = getArcCoord(visibleArcNumbers[0].deg, ARC_RADIUS);
    const bottomCoord = getArcCoord(visibleArcNumbers[2].deg, ARC_RADIUS);

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                background: "#f7f7f8",
                zIndex: 9999,
                width: "100vw",
                height: "110vh",
                overflow: "hidden"
            }}
        >
            <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
                <svg width="100vw" height="100vh" style={{ position: "absolute", left: 0, top: 0 }}>
                    {/* Static arc curve drawn between the current top and bottom positions */}
                    <path
                        d={`M${topCoord.x},${topCoord.y}
                            A${ARC_RADIUS},${ARC_RADIUS} 0 0,0 ${bottomCoord.x},${bottomCoord.y}`}
                        fill="none"
                        stroke="#dedee0"
                        strokeWidth="4"
                    />
                    {/* Dot at the center position (uses the static 96deg for the dot) */}
                    <circle
                        cx={getArcCoord(POSITIONS[1].deg, ARC_RADIUS).x}
                        cy={getArcCoord(POSITIONS[1].deg, ARC_RADIUS).y}
                        r={6.5}
                        fill="#b7b7bc"
                    />
                </svg>

                {/* Arc numbers container */}
                <div style={{ position: "absolute", left: 0, top: 0, width: "100vw", height: "100vh" }}>
                    {visibleArcNumbers.map(({ number, deg, size, op, id, isCenter }) => {
                        const { x, y } = getArcCoord(deg, ARC_RADIUS);
                        
                        return (
                            <span
                                // Use 'id' for a stable key across rotations
                                key={id} 
                                style={{
                                    position: "absolute",
                                    left: x,
                                    top: y,
                                    fontWeight: 700,
                                    // Use 'isCenter' to define style
                                    fontSize: size,
                                    color: isCenter ? "#19191c" : "#bcbcc1", // Black for center
                                    opacity: op,
                                    transform: "translate(-50%, -50%)",
                                    userSelect: "none",
                                    letterSpacing: "2.5px",
                                    fontFamily: "inherit",
                                    marginLeft: 60,
                                    // Add transition for smooth movement between steps
                                    transition: `all ${DURATION * 0.4}ms ease-in-out`, 
                                }}
                            >
                                {number}
                            </span>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Preloader;