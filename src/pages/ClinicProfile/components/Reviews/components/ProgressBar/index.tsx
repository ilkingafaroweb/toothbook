import React, { useEffect, useState } from "react";

interface ProgressBarProps {
    percent: number
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percent }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            setProgress(percent);
        }, 500);
    }, []);

    return (
        <div className="w-32 bg-gray-300 rounded-full h-4">
            <div
                className="bg-brandPrimary h-4 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${progress}%` }}
            ></div>
        </div>
    );
};

export default ProgressBar;
