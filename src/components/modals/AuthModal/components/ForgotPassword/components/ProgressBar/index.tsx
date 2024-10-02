interface ProgressBarProps {
  step: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ step }) => {
  return (
    <div className="progress-bar flex items-center justify-between my-4 gap-3">
      {/* Step 1: Email */}
      <div className="relative flex-1 flex items-center">
        <div
          className={`progress-line rounded-xl h-1 flex-1 transition-all duration-500 ${
            step >= 1 ? 'bg-brandPrimary' : 'bg-gray-300'
          }`}
        />
      </div>

      {/* Step 2: OTP */}
      <div className="relative flex-1 flex items-center">
        <div
          className={`progress-line rounded-xl h-1 flex-1 transition-all duration-500 ${
            step >= 2 ? 'bg-brandPrimary' : 'bg-gray-300'
          }`}
        />
      </div>

      {/* Step 3: New Password */}
      <div className="relative flex-1 flex items-center">
        <div
          className={`progress-line rounded-xl h-1 flex-1 transition-all duration-500 ${
            step >= 3 ? 'bg-brandPrimary' : 'bg-gray-300'
          }`}
        />
      </div>
    </div>
  );
};