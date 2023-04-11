import { useState, useEffect } from "react";

function Timer({ duration }) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (!timeLeft) return;

    const timeoutId = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000 * (timeLeft / duration));

    return () => clearTimeout(timeoutId);
  }, [timeLeft, duration]);

  const timeFraction = timeLeft / duration;
  const strokeDashoffset = -((1 - timeFraction) * 192);

  const strokeColor = timeFraction < 0.5 ? "green" : "red";

  return (
    <div className="relative inline-block">
      <svg
        className="animate-rotate"
        viewBox="0 0 100 100"
        width="100"
        height="100"
      >
        <circle
          className="stroke-current text-gray-300"
          cx="50"
          cy="50"
          r="45"
          strokeWidth="10"
          fill="none"
        />
        <circle
          className={`stroke-current stroke-${strokeColor}-500 transition-all ease-linear duration-1000`}
          cx="50"
          cy="50"
          r="45"
          strokeWidth="10"
          fill="none"
          strokeDasharray="192"
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-gray-700 text-xl font-bold">
        {timeLeft}
      </span>
    </div>
  );
}

export default Timer;
