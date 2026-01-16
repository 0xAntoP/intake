"use client";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepLabels?: string[];
}

export function ProgressIndicator({
  currentStep,
  totalSteps,
  stepLabels,
}: ProgressIndicatorProps) {
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">
          Step {currentStep} of {totalSteps}
        </span>
        {stepLabels && stepLabels[currentStep - 1] && (
          <span className="text-sm text-gray-500">
            {stepLabels[currentStep - 1]}
          </span>
        )}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      {stepLabels && (
        <div className="flex justify-between mt-2">
          {stepLabels.map((label, index) => (
            <span
              key={label}
              className={`text-xs ${
                index + 1 <= currentStep ? "text-blue-600" : "text-gray-400"
              }`}
            >
              {index + 1}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
