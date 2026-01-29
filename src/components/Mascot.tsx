import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import useMousePosition from '../hooks/useMousePosition';
import { EyeProps, MascotProps } from '../types/mascot';

const Eye: React.FC<EyeProps> = ({ lookAt, isLookingAway, size = 12, pupilSize = 4 }) => {
    const eyeRef = useRef<HTMLDivElement>(null);
    const [pupilPos, setPupilPos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (!eyeRef.current || !lookAt) return;

        // If isLookingAway is true (e.g. typing/password), look down/away
        if (isLookingAway) {
            setPupilPos({ x: 0, y: 2 });
            return;
        }

        const eyeRect = eyeRef.current.getBoundingClientRect();
        const eyeCenterX = eyeRect.left + eyeRect.width / 2;
        const eyeCenterY = eyeRect.top + eyeRect.height / 2;

        const deltaX = lookAt.x - eyeCenterX;
        const deltaY = lookAt.y - eyeCenterY;
        const angle = Math.atan2(deltaY, deltaX);

        // Limit movement radius within the eye
        const maxDist = (size - pupilSize) / 2;
        const distance = Math.min(maxDist, Math.hypot(deltaX, deltaY) / 10); // Dampening factor

        setPupilPos({
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance,
        });

    }, [lookAt, isLookingAway, size, pupilSize]);

    return (
        <div
            ref={eyeRef}
            className="bg-white rounded-full flex items-center justify-center overflow-hidden relative"
            style={{ width: size, height: size }}
        >
            <motion.div
                className="bg-black rounded-full"
                style={{ width: pupilSize, height: pupilSize }}
                animate={{ x: pupilPos.x, y: pupilPos.y }}
                transition={{ type: "spring", stiffness: 150, damping: 15 }}
            />
        </div>
    );
};

const Mascot: React.FC<MascotProps> = ({
    emotion = 'idle', // idle, happy, thinking, neutral, surprise
    size = 40,
    color = 'bg-yellow-400',
    target = null, // {x, y} to override cursor
    className = ''
}) => {
    const mousePos = useMousePosition();
    const [lookAt, setLookAt] = useState({ x: 0, y: 0 });
    const [isBlinking, setIsBlinking] = useState(false);

    // Determine what to look at
    useEffect(() => {
        if (target) {
            setLookAt(target);
        } else {
            setLookAt(mousePos);
        }
    }, [mousePos, target]);

    // Random Blink Logic
    useEffect(() => {
        const blinkLoop = () => {
            const nextBlink = Math.random() * 4000 + 2000; // 2-6 seconds
            const timer = setTimeout(() => {
                setIsBlinking(true);
                setTimeout(() => setIsBlinking(false), 150);
                blinkLoop();
            }, nextBlink);
            return timer;
        };
        const timer = blinkLoop();
        return () => clearTimeout(timer);
    }, []);

    // Animation Variants
    const containerVariants: Variants = {
        idle: { y: 0 },
        hover: { y: -5, scale: 1.05 },
        thinking: {
            rotate: [0, 5, -5, 0],
            transition: { repeat: Infinity, duration: 2 }
        },
        happy: { scale: 1.1, transition: { type: 'spring' } }
    };

    return (
        <motion.div
            className={`relative rounded-full flex flex-col items-center justify-center shadow-lg select-none ${color} ${className}`}
            style={{ width: size, height: size * 1.2, borderRadius: `${size}px ${size}px ${size / 2}px ${size / 2}px` }} // Pill shape roughly
            variants={containerVariants}
            animate={emotion}
            whileHover="hover"
        >
            {/* Eyes Container */}
            <div className="flex gap-1 relative z-10 mt-2">
                <AnimatePresence>
                    {!isBlinking && (
                        <motion.div key="eyes" className="flex gap-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scaleY: 0 }}>
                            <Eye lookAt={lookAt} size={size * 0.25} pupilSize={size * 0.1} />
                            <Eye lookAt={lookAt} size={size * 0.25} pupilSize={size * 0.1} />
                        </motion.div>
                    )}
                    {isBlinking && (
                        <motion.div key="blink" className="flex gap-1 absolute top-1/2 -translate-y-1/2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <div className="bg-black/80 rounded-full" style={{ width: size * 0.25, height: 2 }}></div>
                            <div className="bg-black/80 rounded-full" style={{ width: size * 0.25, height: 2 }}></div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Mouth */}
            <div className="mt-1">
                {emotion === 'happy' && (
                    <motion.div
                        initial={{ scale: 0 }} animate={{ scale: 1 }}
                        className="border-b-2 border-black/60 rounded-full"
                        style={{ width: size * 0.3, height: size * 0.15 }}
                    />
                )}
                {emotion === 'neutral' && (
                    <div className="bg-black/60 rounded-full" style={{ width: size * 0.2, height: 2 }}></div>
                )}
                {emotion === 'surprise' && (
                    <div className="bg-black/60 rounded-full" style={{ width: size * 0.15, height: size * 0.15 }}></div>
                )}
                {/* Thinking often has no mouth or small dot */}
            </div>

        </motion.div>
    );
};

export default Mascot;
