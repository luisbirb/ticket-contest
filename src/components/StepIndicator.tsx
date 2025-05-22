import React from 'react';
import { FormStep } from '../types';

interface StepIndicatorProps {
  currentStep: FormStep;
  onStepClick?: (step: FormStep) => void;
}

interface Step {
  id: FormStep;
  label: string;
}

export function StepIndicator({ currentStep, onStepClick }: StepIndicatorProps) {
  const steps: Step[] = [
    { id: 'ticket-info', label: 'Ticket Info' },
    { id: 'contest-reason', label: 'Contest Reason' },
    { id: 'evidence', label: 'Evidence' },
    { id: 'review', label: 'Review' },
    { id: 'confirmation', label: 'Confirmation' }
  ];

  const getCurrentStepIndex = () => {
    return steps.findIndex(step => step.id === currentStep);
  };

  const getStepStatus = (stepId: FormStep) => {
    const currentIndex = getCurrentStepIndex();
    const stepIndex = steps.findIndex(step => step.id === stepId);
    
    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'upcoming';
  };

  return (
    <div className="w-full py-4 mb-6">
      <div className="hidden sm:flex justify-between relative">
        <div className="absolute top-1/2 h-0.5 w-full bg-gray-200 -translate-y-1/2 z-0"></div>
        
        {steps.map((step, index) => {
          const status = getStepStatus(step.id);
          
          return (
            <div 
              key={step.id} 
              className={`flex flex-col items-center relative z-10 ${onStepClick ? 'cursor-pointer' : ''}`}
              onClick={() => {
                if (onStepClick && status !== 'upcoming') {
                  onStepClick(step.id);
                }
              }}
            >
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  status === 'completed' ? 'bg-blue-600 text-white' : 
                  status === 'current' ? 'bg-blue-100 text-blue-600 border-2 border-blue-600' :
                  'bg-white text-gray-400 border-2 border-gray-200'
                }`}
              >
                {status === 'completed' ? (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                ) : (
                  index + 1
                )}
              </div>
              <span 
                className={`mt-2 text-xs font-medium ${
                  status === 'completed' ? 'text-blue-600' : 
                  status === 'current' ? 'text-blue-600' :
                  'text-gray-500'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
      
      {/* Mobile version - just show current step */}
      <div className="sm:hidden">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
            Step {getCurrentStepIndex() + 1}: {steps[getCurrentStepIndex()]?.label}
          </div>
        </div>
      </div>
    </div>
  );
}