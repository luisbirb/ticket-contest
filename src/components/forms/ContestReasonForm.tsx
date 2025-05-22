import React, { useState } from 'react';
import { ContestReason } from '../../types';
import { Button } from '../Button';

interface ContestReasonFormProps {
  contestReasons: ContestReason[];
  selectedReason: ContestReason | null;
  customReason: string;
  onSelectReason: (reason: ContestReason | null) => void;
  onCustomReasonChange: (reason: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function ContestReasonForm({
  contestReasons,
  selectedReason,
  customReason,
  onSelectReason,
  onCustomReasonChange,
  onNext,
  onBack
}: ContestReasonFormProps) {
  const [showTemplateText, setShowTemplateText] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };
  
  const isFormValid = () => {
    if (selectedReason?.id === 'custom') {
      return customReason.trim().length > 10;
    }
    return !!selectedReason;
  };
  
  const handleReasonSelect = (reason: ContestReason) => {
    onSelectReason(reason);
    if (reason.id === 'custom') {
      setShowTemplateText(false);
    }
  };
  
  const getSuccessRateColor = (rate: string) => {
    switch (rate) {
      case 'High':
        return 'bg-green-100 text-green-800';
      case 'Medium-High':
        return 'bg-green-100 text-green-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-fadeIn">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Select Contest Reason</h2>
      <p className="text-gray-600 mb-6">
        Choose the reason that best fits why you believe the ticket should be dismissed. 
        The success rate indicates how often similar appeals have been successful.
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-3">
            {contestReasons.map((reason) => (
              <div
                key={reason.id}
                className={`border rounded-lg p-4 transition-all cursor-pointer ${
                  selectedReason?.id === reason.id
                    ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                    : 'border-gray-200 hover:border-blue-200 hover:bg-gray-50'
                }`}
                onClick={() => handleReasonSelect(reason)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-md font-medium text-gray-900">{reason.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{reason.description}</p>
                  </div>
                  {reason.successRate !== 'Varies' && (
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSuccessRateColor(reason.successRate)}`}>
                      {reason.successRate}
                    </span>
                  )}
                </div>
                
                {selectedReason?.id === reason.id && reason.id !== 'custom' && (
                  <div className="mt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Response Template</span>
                      <button
                        type="button"
                        className="text-sm text-blue-600 hover:text-blue-800"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowTemplateText(!showTemplateText);
                        }}
                      >
                        {showTemplateText ? 'Hide' : 'Show'}
                      </button>
                    </div>
                    
                    {showTemplateText && (
                      <div className="mt-2 p-3 bg-gray-50 border border-gray-200 rounded-md">
                        <p className="text-sm text-gray-700 whitespace-pre-line">{reason.template}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {selectedReason?.id === 'custom' && (
            <div className="mt-4">
              <label htmlFor="customReason" className="block text-sm font-medium text-gray-700 mb-2">
                Explain why this ticket should be dismissed
              </label>
              <textarea
                id="customReason"
                value={customReason}
                onChange={(e) => onCustomReasonChange(e.target.value)}
                rows={5}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Provide a detailed explanation of why you believe this ticket should be dismissed. Include relevant facts and circumstances."
              ></textarea>
              <p className="mt-1 text-sm text-gray-500">
                {customReason.length} characters (minimum 10 required)
              </p>
            </div>
          )}
        </div>
        
        <div className="mt-6 flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
          >
            Back
          </Button>
          <Button 
            type="submit" 
            disabled={!isFormValid()}
          >
            Continue to Evidence
          </Button>
        </div>
      </form>
    </div>
  );
}