import { ReactNode } from "react";
import { motion } from "motion/react";

type StepperProps = {
  step: number;
  steps: ReactNode[];
  onStepClick?: (idx: number) => void;
};

export const Stepper = ({ step, steps, onStepClick }: StepperProps) => (
  <div className="flex justify-center mb-8">
    {steps.map((icon, idx) => (
      <div key={idx} className="flex items-center">
        <motion.button
          type="button"
          disabled={!onStepClick || step === idx}
          onClick={onStepClick ? () => onStepClick(idx) : undefined}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: step === idx ? 1.15 : 1, opacity: 1, boxShadow: step === idx ? '0 0 0 4px #81CAA8' : 'none' }}
          transition={{ duration: 0.18, ease: 'easeInOut' }}
          className={`flex items-center justify-center rounded-full w-12 h-12 p-2 text-lg font-bold border-2 transition-all duration-200 focus:outline-none
            ${step === idx ? "bg-primary-light border-primary-light text-primary-dark" :
              step > idx ? "bg-primary-main border-primary-main text-white" :
              "bg-gray-800 border-gray-600 text-gray-400"}
            ${onStepClick && step !== idx ? "cursor-pointer hover:scale-110" : "cursor-default"}
          `}
          aria-current={step === idx ? "step" : undefined}
        >
          {icon}
        </motion.button>
        {idx < steps.length - 1 && (
          <motion.div
            className="w-8 h-1 bg-gray-600 mx-1 sm:mx-2 rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.1 * idx, duration: 0.18, ease: 'easeInOut' }}
          />
        )}
      </div>
    ))}
  </div>
);
