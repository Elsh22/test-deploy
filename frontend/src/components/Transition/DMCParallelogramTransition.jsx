// DMCParallelogramTransition.jsx
import React, { useState, useEffect } from 'react';

const DMCParallelogramTransition = ({ isLoading, onTransitionProgress }) => {
  const [stage, setStage] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setShow(true);
      setStage(0);
      
      // Keep original animation sequence
      const stage1 = setTimeout(() => setStage(1), 100);  // Start slide in
      const stage2 = setTimeout(() => setStage(2), 1000); // Complete slide in
      const stage3 = setTimeout(() => setStage(3), 1200); // Show letters
      const stage4 = setTimeout(() => {
        setStage(4);
      }, 2500); // Start slide out
      
      // Add page transition trigger shortly after slide-out begins
      const triggerTransition = setTimeout(() => {
        onTransitionProgress && onTransitionProgress();
      }, 2700); // 200ms after slide-out begins
      
      const hideTransition = setTimeout(() => {
        setShow(false);
        setStage(0);  // Reset stage for next animation
      }, 3500);

      return () => {
        clearTimeout(stage1);
        clearTimeout(stage2);
        clearTimeout(stage3);
        clearTimeout(stage4);
        clearTimeout(triggerTransition);
        clearTimeout(hideTransition);
      };
    }
  }, [isLoading, onTransitionProgress]);

  if (!show) return null;

  const clipPaths = {
    0: 'polygon(-20% -20%, -20% -20%, -20% 120%, -20% 120%)',
    1: 'polygon(-20% -20%, 40% -20%, 20% 120%, -40% 120%)',
    2: 'polygon(-20% -20%, 120% -20%, 120% 120%, -20% 120%)',
    3: 'polygon(-20% -20%, 120% -20%, 120% 120%, -20% 120%)',
    4: 'polygon(80% -20%, 140% -20%, 120% 120%, 60% 120%)'
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden z-[100]">
      <div 
        className="absolute inset-0 bg-black transition-all transform-gpu"
        style={{
          clipPath: clipPaths[stage],
          transition: 'clip-path 1.5s cubic-bezier(0.645, 0.045, 0.355, 1.000)'
        }}
      />
      <div 
        className={`relative transform-gpu transition-all duration-1000 ${
          stage === 3 ? 'opacity-100 scale-100' : 
          stage === 4 ? 'opacity-0 translate-x-full' : 
          'opacity-0 scale-95'
        }`}
      >
        <div className="flex flex-col items-center space-y-8">
          <div className="flex space-x-4">
            {['D', 'M', 'C'].map((letter, index) => (
              <div
                key={letter}
                className="text-7xl font-bold transform-gpu transition-transform"
                style={{
                  color: '#FFD700',
                  textShadow: `0 0 20px rgba(255, 215, 0, ${stage === 3 ? '0.5' : '0'})`,
                  animation: stage === 3 
                    ? `letterGlow 3s ease-in-out infinite ${index * 0.3}s`
                    : 'none'
                }}
              >
                {letter}
              </div>
            ))}
          </div>
          <div 
            className="h-0.5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent transform-gpu"
            style={{
              width: '200px',
              animation: stage === 3 ? 'lineWidth 3s ease-in-out infinite' : 'none',
              opacity: stage === 3 ? 1 : 0,
              transition: 'opacity 0.8s ease-in-out'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DMCParallelogramTransition;