import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-[#0a0a0a] flex justify-center items-center z-[9999]">
      <div className="text-[#ff6b00] font-['Consolas',_'Menlo',_'Monaco',_monospace] font-bold text-[100px] opacity-80">
        <style>
          {`
            @keyframes pulse {
              to {
                transform: scale(0.8);
                opacity: 0.5;
              }
            }
            .bracket {
              display: inline-block;
              animation: pulse 0.4s alternate infinite ease-in-out;
            }
            .bracket-delayed {
              animation-delay: 0.4s;
            }
          `}
        </style>
        <span className="bracket">{`{`}</span>
        <span className="bracket bracket-delayed">{`}`}</span>
      </div>
    </div>
  );
};

export default Loader;
