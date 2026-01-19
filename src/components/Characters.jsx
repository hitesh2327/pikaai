import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

// Hook to track mouse position
const useMousePosition = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (event) => {
            setMousePos({ x: event.clientX, y: event.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return mousePos;
};

// Reusable Eye Component with tracking logic
// Added isNeutral prop to force eyes to center
const Eye = ({ mousePos, parentRef, isLookingAway, isNeutral = false, size = "w-5 h-5", pupilSize = "w-2 h-2" }) => {
    const eyeRef = useRef(null);
    const [pupilPos, setPupilPos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (!eyeRef.current) return;

        if (isNeutral) {
            setPupilPos({ x: 0, y: 0 });
            return;
        }

        const eyeRect = eyeRef.current.getBoundingClientRect();
        const eyeCenterX = eyeRect.left + eyeRect.width / 2;
        const eyeCenterY = eyeRect.top + eyeRect.height / 2;

        let targetX = mousePos.x;
        let targetY = mousePos.y;

        if (isLookingAway) {
            // For looking away, we might want a specific direction, 
            // but the original code did targetX=0, targetY=0 which is top-left.
            // Keeping original behavior for isLookingAway for compatibility if used,
            // but for 'static' we use isNeutral.
            targetX = 0;
            targetY = 0;
        }

        const angle = Math.atan2(targetY - eyeCenterY, targetX - eyeCenterX);
        const distance = Math.min(6, Math.hypot(targetX - eyeCenterX, targetY - eyeCenterY) / 10);

        setPupilPos({
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance,
        });

    }, [mousePos, isLookingAway, isNeutral]);

    return (
        <div ref={eyeRef} className={`${size} bg-white rounded-full flex items-center justify-center overflow-hidden`}>
            <motion.div
                className={`${pupilSize} bg-black rounded-full`}
                animate={{ x: pupilPos.x, y: pupilPos.y }}
                transition={{ type: "spring", stiffness: 150, damping: 15 }}
            />
        </div>
    );
};

const LogoMascot = ({ color, className, mousePos, isTracking, style }) => {
    return (
        <motion.div
            className={`absolute flex items-center justify-center ${className}`}
            style={style}
            whileHover={{
                scale: 1.05,
                y: -2,
                transition: { type: "spring", stiffness: 300, damping: 15 }
            }}
        >
            <div className={`relative ${color} rounded-full flex items-center justify-center gap-1 shadow-sm`}>
                {/* Eyes for the logo mascot. 
                    They track if isTracking is true, otherwise they are neutral.
                  */}
                <Eye mousePos={mousePos} isNeutral={!isTracking} size="w-3 h-3" pupilSize="w-1 h-1" />
                <Eye mousePos={mousePos} isNeutral={!isTracking} size="w-3 h-3" pupilSize="w-1 h-1" />
            </div>
        </motion.div>
    );
};

const BrandHeader = ({ mousePos }) => {
    const headerRef = useRef(null);
    const [isTracking, setIsTracking] = useState(false);

    useEffect(() => {
        if (!headerRef.current) return;

        // Scoped eye tracking logic:
        // Check if cursor is near the logo section (approx top-left area)
        const checkDistance = () => {
            if (!mousePos) return;

            // Define the logo area roughly 
            const logoX = 100; // rough center X of logo area
            const logoY = 100; // rough center Y of logo area
            const threshold = 300; // Radius of interaction

            const dist = Math.hypot(mousePos.x - logoX, mousePos.y - logoY);
            setIsTracking(dist < threshold);
        };

        checkDistance();
    }, [mousePos]);

    return (
        <div ref={headerRef} className="absolute top-8 left-8 z-50 flex flex-col items-start select-none">
            <div className="relative">
                {/* Logo Text */}
                <h1 className="text-5xl font-bold text-yellow-400" style={{ fontFamily: '"Caveat", cursive' }}>
                    PikaAI
                </h1>

                {/* Tagline */}
                <p className="text-sm text-gray-500 font-sans tracking-wide ml-1 mt-1">
                    Conversations that get work done
                </p>

                {/* Logo Mascots Positioned around */}

                {/* 1. Above text */}
                <LogoMascot
                    color="bg-purple-500"
                    className="-top-8 left-10"
                    style={{ width: '32px', height: '32px' }}
                    mousePos={mousePos}
                    isTracking={isTracking}
                />

                {/* 2. Near 'P' */}
                <LogoMascot
                    color="bg-orange-500"
                    className="top-2 -left-8"
                    style={{ width: '28px', height: '28px' }}
                    mousePos={mousePos}
                    isTracking={isTracking}
                />

                {/* 3. Near 'AI' */}
                <LogoMascot
                    color="bg-blue-500"
                    className="-right-8 top-1"
                    style={{ width: '30px', height: '30px' }}
                    mousePos={mousePos}
                    isTracking={isTracking}
                />
            </div>
        </div>
    );
};

export const CharacterScene = ({ focusedInput }) => {
    const mousePos = useMousePosition();
    const isLookingAway = focusedInput === 'password';

    return (
        <div className="flex h-full w-full relative bg-[#F3F4F6] dark:bg-gray-900 overflow-hidden items-center justify-center transition-colors duration-300">

            {/* Brand Header with Scoped Interactions */}
            <BrandHeader mousePos={mousePos} />

            {/* Container for characters - Scaled up via larger dimensions */}
            {/* Added tilt animation to the wrapper div */}
            <motion.div
                className="relative flex items-end mb-20 origin-bottom"
                animate={{ rotate: isLookingAway ? -10 : 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >

                {/* Orange Character - Big Semicircle (Front-Left) */}
                <div className="relative z-20 -mr-6">
                    <div className="w-48 h-36 bg-orange-500 rounded-t-full flex justify-center pt-12 gap-5">
                        <Eye mousePos={mousePos} isLookingAway={isLookingAway} size="w-6 h-6" pupilSize="w-2.5 h-2.5" />
                        <Eye mousePos={mousePos} isLookingAway={isLookingAway} size="w-6 h-6" pupilSize="w-2.5 h-2.5" />
                        {/* Bigger Smile */}
                        <div className="absolute top-20 w-8 h-4 border-b-4 border-black rounded-b-full opacity-60"></div>
                    </div>
                </div>

                {/* Purple Character - Tall Rectangle (Back-Middle) */}
                <div className="relative z-10 -mr-8">
                    <div className="w-36 h-72 bg-purple-600 rounded-3xl flex flex-col items-center pt-10 gap-3">
                        <div className="flex gap-4">
                            <Eye mousePos={mousePos} isLookingAway={isLookingAway} size="w-6 h-6" pupilSize="w-2.5 h-2.5" />
                            <Eye mousePos={mousePos} isLookingAway={isLookingAway} size="w-6 h-6" pupilSize="w-2.5 h-2.5" />
                        </div>
                        {/* Mouth */}
                        <div className="w-6 h-2 bg-black rounded-full opacity-40 mt-2"></div>
                    </div>
                </div>

                {/* Black Character - Medium Rectangle (Back-Right) */}
                <div className="relative z-0 -mr-4 mb-0">
                    <div className="w-28 h-44 bg-[#1a1a1a] rounded-t-2xl rounded-b-none flex justify-center pt-8 gap-3">
                        <Eye mousePos={mousePos} isLookingAway={isLookingAway} size="w-5 h-5" pupilSize="w-2 h-2" />
                        <Eye mousePos={mousePos} isLookingAway={isLookingAway} size="w-5 h-5" pupilSize="w-2 h-2" />
                    </div>
                </div>

                {/* Yellow Character - Tombstone (Front-Right) */}
                <div className="relative z-20">
                    <div className="w-32 h-48 bg-yellow-400 rounded-t-full rounded-b-xl flex flex-col items-center pt-12 gap-3">
                        <div className="flex gap-4 pl-4">
                            <Eye mousePos={mousePos} isLookingAway={isLookingAway} size="w-5 h-5" pupilSize="w-2 h-2" />
                            <Eye mousePos={mousePos} isLookingAway={isLookingAway} size="w-5 h-5" pupilSize="w-2 h-2" />
                        </div>
                        {/* Side Mouth */}
                        <div className="absolute right-6 top-24 w-6 h-1 bg-black opacity-60"></div>
                    </div>
                </div>

            </motion.div>
        </div>
    )
}
